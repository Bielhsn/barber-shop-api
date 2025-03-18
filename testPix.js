console.log("🔹 Testando geração do código Pix...");

(async () => {
    const { default: qrcodepix } = await import("qrcode-pix");

    // Corrigindo para usar qrcodepix.QrCodePix
    const pix = new qrcodepix.QrCodePix({
        version: "01",
        key: "5511966526732",
        name: "LEANDRO",
        city: "SAO PAULO",
        transactionId: "AGENDAMENTO123",
        amount: "40.00"
    });

    console.log("✅ Objeto PIX criado!");

    const payload = await pix.payload();
    console.log("✅ Código Pix Gerado:", payload);
})();
