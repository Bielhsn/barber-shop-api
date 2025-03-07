import express from 'express';
import { listarHorariosDisponiveis, criarAgendamento } from '../controllers/agendamentoController.js';

const router = express.Router();

router.get('/disponiveis', listarHorariosDisponiveis);
router.post('/', criarAgendamento);

export default router;
