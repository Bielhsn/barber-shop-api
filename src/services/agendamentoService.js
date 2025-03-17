import mongoose from 'mongoose'
import Agendamento from '../models/agendamentoModel.js'

// Definição do schema (estrutura do agendamento no banco)
const agendamentoSchema = new mongoose.Schema({
    nome: String,
    telefone: String,
    data: String,
    hora: String,
    servico: String,
    barbeiro: { type: String, enum: ['Leandro', 'Vitor'], required: true }, // 🔹 Opções fixas
    status: { type: String, default: 'pendente' } // 🔹 Inicia como "pendente" até o pagamento ser aprovado
});

// **Função para listar todos os agendamentos confirmados**
export const listarTodosAgendamentos = async () => {
    try {
        return await Agendamento.find({ status: "confirmado" }); // 🔹 Apenas agendamentos pagos
    } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
        return [];
    }
};

// **Função para buscar horários disponíveis para um barbeiro específico**
export const buscarHorariosDisponiveis = async (data, barbeiro) => {
    const horariosBase = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

    try {
        // 🔹 Agora a busca é por data *e* barbeiro
        const agendamentosNoBanco = await Agendamento.find({ data, barbeiro });

        return horariosBase.map(hora => ({
            hora,
            disponivel: !agendamentosNoBanco.some(a => a.hora === hora) // 🔹 Bloqueia apenas se o mesmo barbeiro estiver agendado
        }));
    } catch (error) {
        console.error("Erro ao buscar horários:", error);
        throw error;
    }
};

// **Função para salvar um novo agendamento no banco**
export const salvarAgendamento = async (agendamento) => {
    try {
        const { data, hora, barbeiro } = agendamento;

        // Verifica se o barbeiro já tem um agendamento nesse horário
        const ocupado = await Agendamento.findOne({ data, hora, barbeiro });

        if (ocupado) {
            return false; // ⛔ Horário já ocupado por esse barbeiro
        }

        // Define o status como "pendente" até a confirmação do pagamento
        const novoAgendamento = new Agendamento({
            ...agendamento,
            status: "pendente" 
        });

        await novoAgendamento.save();
        return novoAgendamento; // Retorna o agendamento criado
    } catch (error) {
        console.error("Erro ao salvar agendamento no MongoDB:", error);
        return false;
    }
};

// **Função para confirmar pagamento de um agendamento**
export const confirmarPagamento = async (agendamentoId) => {
    try {
        const agendamento = await Agendamento.findById(agendamentoId);
        if (!agendamento) {
            throw new Error("Agendamento não encontrado.");
        }

        agendamento.status = "confirmado"; // ✅ Agora está pago!
        await agendamento.save();

        return { mensagem: "Pagamento confirmado e agendamento atualizado!" };
    } catch (error) {
        console.error("Erro ao confirmar pagamento:", error);
        throw new Error("Erro ao atualizar agendamento.");
    }
};