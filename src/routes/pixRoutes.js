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

// Função para calcular o CRC16 (necessário para validar o código PIX)
const calcularCRC16 = (payload) => {
    let crc = 0xFFFF;
    for (let i = 0; i < payload.length; i++) {
        crc ^= payload.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
            if ((crc & 0x8000) !== 0) {
                crc = (crc << 1) ^ 0x1021;
            } else {
                crc <<= 1;
            }
        }
    }
    return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
};

const gerarPixCode = (chavePix, nomeRecebedor, cidade, valor, identificador) => {
    let payload = `00020126360014BR.GOV.BCB.PIX0114${chavePix}520400005303986540${valor.toFixed(2).replace('.', '')}5802BR5925${nomeRecebedor.toUpperCase()}6009${cidade.toUpperCase()}6212${identificador}6304`;
    
    // Adiciona o CRC16 no final do código Pix
    let crc16 = calcularCRC16(payload);
    return `${payload}${crc16}`;
};

// Endpoint para gerar QR Code Pix via Mercado Pago
router.post('/gerar-pix', async (req, res) => {
    try {
        const { valor, barbeiro } = req.body;

        if (!valor || !barbeiro) {
            return res.status(400).json({ error: "Valor e barbeiro são obrigatórios!" });
        }

        // Chaves Pix diferentes para cada barbeiro
        const chavesPix = {
            "Leandro": "5511966526732",
            "Vitor": "5583998017216"
        };

        if (!chavesPix[barbeiro]) {
            return res.status(400).json({ error: "Barbeiro não encontrado!" });
        }

        // Gerar código Pix com os dados do barbeiro
        const pixCode = gerarPixCode(
            chavesPix[barbeiro],
            barbeiro, 
            "Sao Paulo", 
            valor, 
            "AGENDAMENTO123"
        );

        // Gerar imagem QR Code
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