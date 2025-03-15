import mongoose from 'mongoose'
import Agendamento from '../models/agendamentoModel.js'

// Definição do schema (estrutura do agendamento no banco)
const agendamentoSchema = new mongoose.Schema({
    nome: String,
    telefone: String,
    data: String,
    hora: String,
    servico: String,
    status: {type: String, default: 'pendente'}
})

// Função para listar todos os agendamentos do banco
export const listarTodosAgendamentos = async () => {
    try {
        return await Agendamento.find({ status: "confirmado" }); // 🔹 Somente pagos
    } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
        return [];
    }
};

export const buscarHorariosDisponiveis = async (data) => {
    const horariosBase = ['9:00','10:00','11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']

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


export const salvarAgendamento = async (agendamento) => {
    try {
        const { data, hora } = agendamento;

        // Verifica se já existe um agendamento nesse horário
        const ocupado = await Agendamento.findOne({ data, hora });
        if (ocupado) return false;

        // Define o status como "pendente"
        const novoAgendamento = new Agendamento({
            ...agendamento,
            status: "pendente" // 🔹 O pagamento ainda não foi realizado
        });

        await novoAgendamento.save();
        return novoAgendamento; // Retorna o agendamento criado
    } catch (error) {
        console.error("Erro ao salvar agendamento no MongoDB:", error);
        return false;
    }
};

router.post('/confirmar-pagamento', async (req, res) => {
    const { agendamentoId } = req.body;

    try {
        const agendamento = await Agendamento.findById(agendamentoId);
        if (!agendamento) {
            return res.status(404).json({ erro: "Agendamento não encontrado." });
        }

        agendamento.status = "confirmado"; // ✅ Agora está pago!
        await agendamento.save();

        res.json({ mensagem: "Pagamento confirmado e agendamento atualizado!" });
    } catch (error) {
        console.error("Erro ao confirmar pagamento:", error);
        res.status(500).json({ erro: "Erro ao atualizar agendamento." });
    }
});

