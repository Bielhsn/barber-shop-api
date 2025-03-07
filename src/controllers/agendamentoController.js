import { buscarHorariosDisponiveis, salvarAgendamento } from '../services/agendamentoService.js';

export const listarHorariosDisponiveis = (req, res) => {
    const { data } = req.query;
    const horarios = buscarHorariosDisponiveis(data);
    res.json(horarios);
};

export const criarAgendamento = (req, res) => {
    const agendamento = req.body;
    const sucesso = salvarAgendamento(agendamento);
    if (sucesso) {
        res.status(201).json({ message: 'Agendamento realizado com sucesso!' });
    } else {
        res.status(400).json({ message: 'Horário já reservado.' });
    }
};
