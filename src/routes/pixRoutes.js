import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import Agendamento from "../models/agendamentoModel.js";
import pkg from "pix-utils";
import QRCode from "qrcode";

dotenv.config();

// Importa a classe Pix do pacote pix-utils
const { Pix } = pkg;

// Inicializa o roteador do Express
const router = express.Router();

// Chaves Pix dos barbeiros
const pixChaves = {
    "Leandro": "5511966526732",
    "Vitor": "5583998017216"
};

const gerarPixCode = (chavePix, nomeRecebedor, cidade, valor) => {
    const pix = new Pix({
        version: "01",
        key: chavePix,
        name: nomeRecebedor.toUpperCase().substring(0, 25), // No máximo 25 caracteres
        city: cidade.toUpperCase().substring(0, 15), // No máximo 15 caracteres
        amount: valor.toFixed(2),
        transactionId: "AGENDAMENTO123" // Identificador do pagamento
    });

    return pix.getPayload(); // Retorna o código PIX válido
};

// Endpoint para gerar QR Code Pix
router.post('/gerar-pix', async (req, res) => {
    try {
        const { valor, barbeiro } = req.body;

        if (!valor || !barbeiro) {
            return res.status(400).json({ error: "Valor e barbeiro são obrigatórios!" });
        }

        if (!pixChaves[barbeiro]) {
            return res.status(400).json({ error: "Barbeiro não encontrado!" });
        }

        // Gera o código PIX com pix-utils
        const pixCode = gerarPixCode(pixChaves[barbeiro], barbeiro, "São Paulo", valor);

        console.log("Código Pix Gerado:", pixCode); // Para debug no Railway

        // Gera o QR Code
        const qrImage = await QRCode.toDataURL(pixCode);

        res.json({ qrCode: pixCode, qrImage });
    } catch (error) {
        console.error("Erro ao gerar QR Code:", error);
        res.status(500).json({ error: "Erro ao gerar QR Code" });
    }
});

// Endpoint para receber notificações do Mercado Pago
router.post("/webhook-pix", async (req, res) => {
    try {
        console.log("📩 Webhook recebido:", JSON.stringify(req.body, null, 2));

        const paymentId = req.body.data?.id;
        if (!paymentId) {
            console.error("🚨 ID do pagamento não recebido no webhook!");
            return res.status(400).json({ error: "ID do pagamento não recebido!" });
        }

        // Consultar o status do pagamento no Mercado Pago
        const paymentResponse = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
            headers: {
                "Authorization": `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
            }
        });

        const status = paymentResponse.data.status;
        let telefone = paymentResponse.data.payer?.phone?.number;

        if (!telefone) {
            console.error("🚨 Nenhum telefone encontrado no webhook!");
            return res.status(400).json({ error: "Telefone do pagador não encontrado!" });
        }

        telefone = telefone.replace(/\D/g, '');

        console.log(`📞 Telefone do pagador: ${telefone} - Status: ${status}`);

        if (status === "approved") {
            // Atualiza pagamento no banco
            const agendamento = await Agendamento.findOneAndUpdate(
                { telefone: telefone },
                { pago: true },
                { new: true }
            );

            if (!agendamento) {
                console.error(`🚨 Nenhum agendamento encontrado para telefone ${telefone}`);
                return res.status(404).json({ error: "Agendamento não encontrado!" });
            }

            console.log(`✅ Pagamento confirmado para telefone ${telefone}`);
        }

        res.sendStatus(200);
    } catch (error) {
        console.error("❌ Erro no webhook:", error.response?.data || error.message);
        res.sendStatus(500);
    }
});

export default router;