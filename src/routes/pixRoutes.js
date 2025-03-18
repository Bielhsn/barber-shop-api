import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import crypto from "crypto";
import Agendamento from "../models/agendamentoModel.js";

dotenv.config();

const router = express.Router();

// Endpoint para gerar QR Code Pix via Mercado Pago
router.post("/gerar-pix", async (req, res) => {
    try {
        const { valor, email, cpf, telefone } = req.body;

        if (!valor) {
            return res.status(400).json({ error: "O valor é obrigatório!" });
        }

        // Criando o objeto `payer` corretamente
        let payer = { email: "pagador@teste.com" }; // E-mail genérico caso nenhum seja enviado
        if (email) {
            payer.email = email;
        }
        if (cpf) {
            payer.identification = { type: "CPF", number: cpf };
        }
        if (telefone) {
            payer.phone = { area_code: telefone.substring(0, 2), number: telefone.substring(2) };
        }

        const idempotencyKey = crypto.randomUUID(); // Gerando uma chave única

        const pixResponse = await axios.post(
            "https://api.mercadopago.com/v1/payments",
            {
                transaction_amount: parseFloat(valor),
                payment_method_id: "pix",
                payer: payer,
                notification_url: `${process.env.WEBHOOK_URL}/webhook-pix`
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                    "X-Idempotency-Key": idempotencyKey // Garantindo idempotência
                }
            }
        );

        const qrCode = pixResponse.data.point_of_interaction.transaction_data.qr_code;
        const qrCodeImage = pixResponse.data.point_of_interaction.transaction_data.qr_code_base64;

        return res.json({ qrCode, qrImage: qrCodeImage });
    } catch (error) {
        console.error("Erro ao gerar o Pix:", error.response?.data || error.message);
        return res.status(500).json({ error: "Erro ao gerar o QR Code Pix" });
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