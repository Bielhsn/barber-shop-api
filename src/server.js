import express from 'express';
import cors from 'cors';
import agendamentoRoutes from './routes/agendamentoRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/agendamentos', agendamentoRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
});
