import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Endpoint para gerar QR Code Pix via Mercado Pago
router.post("/gerar-pix", async (req, res) => {
    try {
        const { valor, email, cpf, telefone } = req.body; // Cliente pode enviar um desses três

        if (!valor || (!email && !cpf && !telefone)) {
            return res.status(400).json({ error: "Valor e pelo menos um identificador (email, CPF ou telefone) são obrigatórios!" });
        }

        // Criando o objeto `payer` baseado no que o cliente enviou
        let payer = {};
        if (email) {
            payer.email = email;
        }
        if (cpf) {
            payer.identification = { type: "CPF", number: cpf };
        }
        if (telefone) {
            payer.phone = { area_code: telefone.substring(0, 2), number: telefone.substring(2) };
        }

        const pixResponse = await axios.post(
            "https://api.mercadopago.com/v1/payments",
            {
                transaction_amount: parseFloat(valor), // Valor em número
                payment_method_id: "pix",
                payer: payer, // Dados do cliente
                notification_url: `${process.env.WEBHOOK_URL}/webhook-pix` // URL para confirmar pagamento automático
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

        // Pegando os dados do QR Code Pix
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
        const paymentId = req.body.data.id; // ID do pagamento enviado pelo Mercado Pago
        
        if (!paymentId) {
            return res.status(400).json({ error: "ID do pagamento não recebido!" });
        }

        // Consultar o status do pagamento no Mercado Pago
        const paymentResponse = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
            headers: {
                "Authorization": `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
            }
        });

        const status = paymentResponse.data.status;
        const telefone = paymentResponse.data.payer.phone.number; // Pegando o telefone do pagador

        if (status === "approved") {
            // Atualizar o status do agendamento no MongoDB
            await Agendamento.findOneAndUpdate(
                { telefone: telefone }, // Encontra o agendamento pelo telefone
                { pago: true } // Atualiza para pago
            );
            console.log(`✅ Pagamento confirmado para ${telefone}`);
        }

        res.sendStatus(200);
    } catch (error) {
        console.error("Erro no webhook:", error.response?.data || error.message);
        res.sendStatus(500);
    }
});

export default router;