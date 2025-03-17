import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import { conectarBanco } from './config/db.js';
import agendamentoRoutes from './routes/agendamentoRoutes.js';
import pixRoutes from "./routes/pixRoutes.js"; 
import Agendamento from "./models/agendamentoModel.js"; // ✅ Nome correto

dotenv.config();

const app = express();
app.use(cors({
    origin: ["https://barcellona.com.br", "https://barbeariabarcellona.com.br", "http://localhost:3000", "http://localhost:5173"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));
app.use(express.json());

app.use('/api', pixRoutes); 
app.use('/agendamentos', agendamentoRoutes); // ✅ A verificação de pagamento já está dentro dessa rota

const PORT = process.env.PORT || 8080;

conectarBanco().then(() => {
    app.listen(PORT, () => {
        console.log(`API rodando na porta ${PORT}`);
    });
});
