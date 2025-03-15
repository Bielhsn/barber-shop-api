const mercadopago = require("mercadopago");

// Configurar Mercado Pago com o token do .env
mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_ACCESS_TOKEN);

const gerarPix = async (req, res) => {
    try {
        const { valor } = req.body; // Recebe o valor do Pix no frontend

        const payment = await mercadopago.payment.create({
            transaction_amount: parseFloat(valor),
            payment_method_id: "pix",
            payer: {
                email: "cliente@email.com" // Opcional, pode vir do formulário
            }
        });

        return res.json({ qrCode: payment.response.point_of_interaction.transaction_data.qr_code });
    } catch (error) {
        console.error("Erro ao gerar Pix:", error);
        return res.status(500).json({ error: "Erro ao gerar QR Code Pix" });
    }
};

module.exports = { gerarPix };