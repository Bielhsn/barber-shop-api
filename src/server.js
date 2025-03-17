import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import { conectarBanco } from './config/db.js';
import agendamentoRoutes from './routes/agendamentoRoutes.js';
import pixRoutes from "./routes/pixRoutes.js"; // ✅ Verifique se está correto

dotenv.config();

const app = express();
app.use(cors({
    origin: ["https://barcellona.com.br", "https://barbeariabarcellona.com.br", "http://localhost:3000", "http://localhost:5173"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));
app.use(express.json());

// ✅ Certifique-se de que esta linha está no código
app.use('/api', pixRoutes); 

// Rotas de agendamentos
app.use('/agendamentos', agendamentoRoutes);

//Rota de verificação de pagamento
app.get("/verificar-pagamento", async (req, res) => {
    try {
        const { telefone } = req.query;
        if (!telefone) {
            return res.status(400).json({ error: "Telefone é obrigatório!" });
        }

        const agendamento = await Agendamento.findOne({ telefone });

        if (!agendamento) {
            return res.status(404).json({ error: "Agendamento não encontrado." });
        }

        res.json({ pago: agendamento.pago });
    } catch (error) {
        console.error("Erro ao verificar pagamento:", error);
        res.status(500).json({ error: "Erro no servidor." });
    }
});

const PORT = process.env.PORT || 8080;

conectarBanco().then(() => {
    app.listen(PORT, () => {
        console.log(`API rodando na porta ${PORT}`);
    });
});