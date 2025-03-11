import mongoose from 'mongoose'
import Agendamento from '../models/agendamentoModel.js'

// Definição do schema (estrutura do agendamento no banco)
const agendamentoSchema = new mongoose.Schema({
    nome: String,
    telefone: String,
    data: String,
    hora: String,
    servico: String
})

// Função para listar todos os agendamentos do banco
export const listarTodosAgendamentos = async () => {
    return await Agendamento.find()
}

export const buscarHorariosDisponiveis = async (data) => {
    const horariosBase = ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']

    try {
        const agendamentosNoBanco = await Agendamento.find({ data })
        return horariosBase.map(hora => ({
            hora,
            disponivel: !agendamentosNoBanco.some(a => a.hora === hora)
        }))
    } catch (error) {
        console.error("Erro ao buscar horários:", error)
        throw error
    }
}


// Função para salvar um novo agendamento no banco
export const salvarAgendamento = async (agendamento) => {
    try {
        const { data, hora } = agendamento

        // Verifica se já existe um agendamento nesse horário
        const ocupado = await Agendamento.findOne({ data, hora })
        if (ocupado) return false

        // Salva no banco de dados
        const novoAgendamento = new Agendamento(agendamento)
        await novoAgendamento.save()
        return true
    } catch (error) {
        console.error("Erro ao salvar agendamento no MongoDB:", error)
        return false
    }
}
