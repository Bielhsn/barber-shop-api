import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import QRCode from "qrcode";
import Agendamento from "../models/agendamentoModel.js";

dotenv.config();

// Inicializa o roteador do Express
const router = express.Router();

// Chaves Pix dos barbeiros
const pixChaves = {
    "Leandro": "5511966526732",
    "Vitor": "5583998017216"
};

// Função para calcular o CRC16
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
// Função para gerar o código Pix
const gerarPixCode = (chavePix, nomeRecebedor, cidade, valor, identificador) => {
    let valorFormatado = valor.toFixed(2).replace('.', '').padStart(4, '0'); // Garante duas casas decimais
    let nomeFormatado = nomeRecebedor.padEnd(25, ' ').substring(0, 25); // Nome com até 25 caracteres
    let identificadorFormatado = identificador.substring(0, 14).padEnd(14, ' '); // Identificador com 14 caracteres exatos

    let payload = `000201` + 
        `26360014BR.GOV.BCB.PIX0114${chavePix}` + // Chave Pix
        `52040000` + // Código Merchant Category
        `5303986` + // Código de moeda (986 = BRL)
        `54${valorFormatado}` + // Valor do PIX
        `5802BR` + // Código do país
        `59${nomeFormatado.length.toString().padStart(2, '0')}${nomeFormatado}` + // Nome do recebedor
        `60${cidade.length.toString().padStart(2, '0')}${cidade.toUpperCase()}` + // Cidade
        `62${identificadorFormatado.length.toString().padStart(2, '0')}${identificadorFormatado}` + // Identificador
        `6304`; // CRC16 será adicionado depois

    let crc16 = calcularCRC16(payload);
    return `${payload}${crc16}`;
};

// Endpoint para gerar QR Code Pix
router.post('/gerar-pix', async (req, res) => {
    try {
        const { valor, barbeiro } = req.body;

        if (!valor || !barbeiro) {
            return res.status(400).json({ error: "Valor e barbeiro são obrigatórios!" });
        }

        const chavesPix = {
            "Leandro": "5511966526732",
            "Vitor": "5583998017216"
        };

        if (!chavesPix[barbeiro]) {
            return res.status(400).json({ error: "Barbeiro não encontrado!" });
        }

        // ✅ Gerar código Pix com a função corrigida
        const pixCode = gerarPixCode(
            chavesPix[barbeiro], // Chave Pix correta do barbeiro
            barbeiro, // Nome do recebedor
            "SAO PAULO", // Cidade do pagamento
            valor, // Valor do PIX
            "AGENDAMENTO123" // Identificador único
        );

        console.log("Código Pix Gerado:", pixCode);

        // ✅ Gerar imagem QR Code
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