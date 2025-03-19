import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import Agendamento from "../models/agendamentoModel.js";
import { QrCodePix } from "qrcode-pix"; // Correção na importação
import QRCode from "qrcode";

dotenv.config();

const router = express.Router();

const pixChaves = {
    "Leandro": "5511966526732",
    "Vitor": "5583998017216"
};

// **Função para gerar código Pix usando qrcode-pix**
const gerarPixCode = async (chavePix, nomeRecebedor, cidade, valor) => {
    try {
        console.log("🔹 Gerando código PIX para:", chavePix, nomeRecebedor, cidade, valor);

        const pix = new QrCodePix({
            version: "01",
            key: chavePix,
            name: nomeRecebedor.substring(0, 25), 
            city: cidade.substring(0, 15), 
            transactionId: "AGENDAMENTO123",
            amount: valor.toFixed(2)
        });

        console.log("✅ Objeto PIX criado!");

        const pixPayload = await pix.payload();
        console.log("✅ Código Pix Gerado:", pixPayload);

        return pixPayload;
    } catch (error) {
        console.error("❌ Erro ao gerar código PIX:", error);
        return null;
    }
};

// **Endpoint para gerar QR Code Pix**
router.post('/gerar-pix', async (req, res) => {
    try {
        const { valor, barbeiro } = req.body;

        if (!valor || !barbeiro) {
            return res.status(400).json({ error: "Valor e barbeiro são obrigatórios!" });
        }

        if (!pixChaves[barbeiro]) {
            return res.status(400).json({ error: "Barbeiro não encontrado!" });
        }

        const pixCode = await gerarPixCode(pixChaves[barbeiro], barbeiro, "Sao Paulo", valor);
        if (!pixCode) {
            return res.status(500).json({ error: "Erro ao gerar código PIX" });
        }

        console.log("Código Pix Gerado:", pixCode); // Debug no Railway

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