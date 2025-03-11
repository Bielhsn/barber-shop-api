import mongoose from 'mongoose'

const agendamentoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    telefone: { type: String, required: true },
    data: { type: String, required: true },
    hora: { type: String, required: true },
    servico: { type: String, required: true }
})

const Agendamento = mongoose.model('Appointment', agendamentoSchema, 'appointments')

export default Agendamento