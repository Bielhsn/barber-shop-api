import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import crypto from "crypto";
import Agendamento from "../models/agendamentoModel.js";
import qrcode from "qrcode";

dotenv.config();

const router = express.Router();

const chavePix = "+5511966529732"; // 🔄 Substitua pelo seu número real

// Endpoint para gerar QR Code Pix via Mercado Pago
router.post("/gerar-pix", async (req, res) => {
    try {
        const valor = req.body.valor; // Opcional: se quiser incluir um valor fixo no PIX

        // 🔹 Gerando código PIX no formato correto
        let codigoPix = `00020126360014br.gov.bcb.pix0114${chavePix}5204000053039865802BR5903SeuNome6008SaoPaulo62120508RANDOMID6304ABCD`;

        // 🔹 Gerando QR Code
        const qrImage = await qrcode.toDataURL(codigoPix);

        res.json({ qrCode: codigoPix, qrImage });
    } catch (error) {
        console.error("Erro ao gerar QR Code PIX:", error);
        res.status(500).json({ error: "Erro ao gerar QR Code PIX" });
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