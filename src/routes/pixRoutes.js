import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import crypto from "crypto";
import Agendamento from "../models/agendamentoModel.js";
import QRCode from 'qrcode';

dotenv.config();

const router = express.Router();

const pixChaves = {
    "Leandro": "5511966526732", // Número do Leandro
    "Vitor": "5583998017216" // Número do Vitor
};

// Endpoint para gerar QR Code Pix via Mercado Pago
router.post("/gerar-pix", async (req, res) => {
    try {
        const { valor, barbeiro } = req.body;
        if (!valor) return res.status(400).json({ error: "O valor é obrigatório!" });
        if (!barbeiro || !pixChaves[barbeiro]) return res.status(400).json({ error: "Barbeiro inválido!" });

        const chavePix = pixChaves[barbeiro]; // 🔹 Seleciona a chave conforme o barbeiro
        const nomeRecebedor = barbeiro.toUpperCase(); // 🔹 Nome do barbeiro em maiúsculas
        const cidade = "SAO PAULO";
        const identificador = "AGENDAMENTO123";
        const valorFormatado = valor.toFixed(2).replace('.', ''); // 🔹 Formata o valor

        // 🔹 Monta o código PIX para pagamento direto ao barbeiro
        const pixCode = `00020126360014BR.GOV.BCB.PIX0114${chavePix}520400005303986540${valorFormatado}5802BR5920${nomeRecebedor}6009${cidade}62100510${identificador}6304ABCD`;

        const qrImage = await QRCode.toDataURL(pixCode);

        res.json({ qrCode: pixCode, qrImage, barbeiro });
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

        // 🔹 Remove qualquer formatação errada do telefone
        telefone = telefone.replace(/\D/g, '');

        console.log(`📞 Telefone do pagador: ${telefone} - Status: ${status}`);

        if (status === "approved") {
            // ✅ Atualiza pagamento no banco
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