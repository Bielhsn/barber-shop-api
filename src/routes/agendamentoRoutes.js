import express from 'express'
import { listarTodosAgendamentos, buscarHorariosDisponiveis, salvarAgendamento } from '../services/agendamentoService.js'
import Agendamento from "../models/agendamentoModel.js";

const router = express.Router()

// Endpoint correto para pegar horários disponíveis
router.get("/verificar-pagamento", async (req, res) => {
    try {
        const { telefone } = req.query;
        if (!telefone) {
            return res.status(400).json({ error: "Telefone é obrigatório!" });
        }

        console.log(`🔍 Buscando pagamento para telefone: ${telefone}`);

        const agendamento = await Agendamento.findOne({ telefone });

        if (!agendamento) {
            console.log(`🚨 Nenhum agendamento encontrado para telefone ${telefone}`);
            return res.status(404).json({ error: "Agendamento não encontrado." });
        }

        console.log(`📢 Status do pagamento: ${agendamento.pago}`);
        res.json({ pago: agendamento.pago || false });

    } catch (error) {
        console.error("❌ Erro ao verificar pagamento:", error);
        res.status(500).json({ error: "Erro no servidor." });
    }
});

router.get('/disponiveis', async (req, res) => {
    const { data, barbeiro } = req.query;

    if (!data || !barbeiro) {
        return res.status(400).json({ erro: "Data e barbeiro são obrigatórios!" });
    }

    try {
        const horarios = await buscarHorariosDisponiveis(data, barbeiro);
        res.json(horarios);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar horários", detalhe: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const agendamentos = await Agendamento.find({});
        res.json(agendamentos);
    } catch (error) {
        console.error("Erro ao listar agendamentos:", error);
        res.status(500).json({ erro: "Erro ao buscar agendamentos." });
    }
});


router.post('/', async (req, res) => {
    const agendamento = req.body
    const sucesso = await salvarAgendamento(agendamento)
    if (!sucesso) {
        return res.status(400).json({ erro: "Horário já ocupado!" })
    }
    res.status(201).json({ mensagem: "Agendamento realizado com sucesso!" })
})

export default router
