import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import { Pix } from "faz-um-pix";
import QRCode from "qrcode";
import { buscarAgendamento } from "../services/agendamentoService.js";
import Agendamento from "../models/agendamentoModel.js";
dotenv.config();

const router = express.Router();

// Chaves Pix dos barbeiros
const pixChaves = {
    "Leandro": "xxxxxx",
    "Vitor": "xxxxxx"
};

// Função para gerar código Pix
const gerarPixCode = async (chavePix, nomeRecebedor, cidade, valor) => {
    try {
        console.log("🔹 Gerando código PIX para:", chavePix, nomeRecebedor, cidade, valor);

        const pixCode = Pix(chavePix, nomeRecebedor, cidade, valor.toFixed(2), "Pagamento Agendamento");

        console.log("✅ Código Pix Gerado:", pixCode);
        return pixCode;
    } catch (error) {
        console.error("❌ Erro ao gerar código PIX:", error);
        return null;
    }
};

router.post("/confirmar-agendamento", async (req, res) => {
    try {
        const { nome, telefone, data, hora, servico, barbeiro } = req.body;

        console.log(`📢 Salvando agendamento para ${nome} às ${hora}`);

        const novoAgendamento = new Agendamento({
            nome,
            telefone,
            data,
            hora,
            servico,
            barbeiro,
            pago: true
        });

        await novoAgendamento.save();
        console.log("✅ Agendamento salvo!");

        res.json({ message: "Agendamento confirmado!" });
    } catch (error) {
        console.error("❌ Erro ao salvar agendamento:", error);
        res.status(500).json({ error: "Erro ao salvar agendamento." });
    }
});

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

        // Gerar código Pix
        const pixCode = await gerarPixCode(pixChaves[barbeiro], barbeiro, "São Paulo", valor);
        if (!pixCode) {
            return res.status(500).json({ error: "Erro ao gerar código PIX" });
        }

        // Gerar QR Code como imagem
        const qrImage = await QRCode.toDataURL(pixCode);

        res.json({ qrCode: pixCode, qrImage });
    } catch (error) {
        console.error("Erro ao gerar QR Code:", error);
        res.status(500).json({ error: "Erro ao gerar QR Code" });
    }
});

router.post("/webhook-pix", async (req, res) => {
    try {
        console.log("📩 Webhook recebido:", JSON.stringify(req.body, null, 2));

        const paymentId = req.body.data?.id;
        if (!paymentId) {
            console.error("🚨 ID do pagamento não recebido no webhook!");
            return res.status(400).json({ error: "ID do pagamento não recebido!" });
        }

        console.log(`🔍 Consultando pagamento com ID: ${paymentId}`);

        // Consultar o status do pagamento no Mercado Pago
        const paymentResponse = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
            headers: {
                "Authorization": `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
            }
        });

        const status = paymentResponse.data.status;
        const telefone = paymentResponse.data.payer?.phone?.number;

        console.log(`📞 Telefone do pagador recebido: ${telefone || "Não encontrado"} - Status: ${status}`);

        if (!telefone) {
            console.error("🚨 Nenhum telefone encontrado no webhook!");
            return res.status(400).json({ error: "Telefone do pagador não encontrado!" });
        }

        const telefoneFormatado = telefone.replace(/\D/g, '');

        console.log(`🔍 Buscando agendamento para telefone: ${telefoneFormatado}`);

        if (status === "approved") {
            // Atualiza pagamento no banco
            const agendamento = await buscarAgendamento(telefoneFormatado, paymentId);

            if (!agendamento) {
                console.error(`🚨 Nenhum agendamento encontrado para telefone ${telefoneFormatado}`);
                return res.status(404).json({ error: "Agendamento não encontrado!" });
            }

            console.log(`✅ Pagamento confirmado para telefone ${telefoneFormatado}`);
        }

        res.sendStatus(200);
    } catch (error) {
        console.error("❌ Erro no webhook:", error.response?.data || error.message);
        res.sendStatus(500);
    }
});

export default router;