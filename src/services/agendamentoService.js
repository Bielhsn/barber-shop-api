import mongoose from 'mongoose'
import Agendamento from '../models/agendamentoModel.js'

// Definição do schema (estrutura do agendamento no banco)
const agendamentoSchema = new mongoose.Schema({
    nome: String,
    telefone: String,
    data: String,
    hora: String,
    servico: String,
    barbeiro: { type: String, enum: ['Leandro', 'Vitor'], required: true },
    status: { type: String, default: 'pendente' }
});

//Função para listar todos os agendamentos confirmados
export const listarTodosAgendamentos = async () => {
    try {
        return await Agendamento.find({ status: "confirmado" });
    } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
        return [];
    }
};

//Função para buscar horários disponíveis
export const buscarHorariosDisponiveis = async (data, barbeiro) => {
    const horariosBase = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

    try {
        const agendamentosNoBanco = await Agendamento.find({ data, barbeiro });

        return horariosBase.map(hora => ({
            hora,
            disponivel: !agendamentosNoBanco.some(a => a.hora === hora) //Bloqueia apenas se o mesmo barbeiro estiver agendado
        }));
    } catch (error) {
        console.error("Erro ao buscar horários:", error);
        throw error;
    }
};

// Função para salvar um novo agendamento
export const salvarAgendamento = async (agendamento) => {
    try {
        const { nome, telefone, data, hora, servico, barbeiro } = agendamento;

        console.log(`📢 Tentando agendar: ${telefone} para ${data} às ${hora} com ${barbeiro}`);

        // Verifica se o horário já está ocupado para o mesmo barbeiro
        const ocupado = await Agendamento.findOne({ data, hora, barbeiro });

        if (ocupado) {
            console.error(`🚨 Horário já ocupado: ${data} às ${hora}`);
            return false;
        }

        const novoAgendamento = new Agendamento({
            nome,
            telefone,
            data,
            hora,
            servico,
            barbeiro,
            pago: true
        });

        await novoAgendamento.save();
        console.log(`✅ Agendamento salvo: ${JSON.stringify(novoAgendamento, null, 2)}`);

        return novoAgendamento;
    } catch (error) {
        console.error("❌ Erro ao salvar agendamento no MongoDB:", error);
        return false;
    }
};

// Função para confirmar pagamento de um agendamento
export const confirmarPagamento = async (agendamentoId) => {
    try {
        const agendamento = await Agendamento.findById(agendamentoId);
        if (!agendamento) {
            throw new Error("Agendamento não encontrado.");
        }

        agendamento.status = "confirmado";
        await agendamento.save();

        return { mensagem: "Pagamento confirmado e agendamento atualizado!" };
    } catch (error) {
        console.error("Erro ao confirmar pagamento:", error);
        throw new Error("Erro ao atualizar agendamento.");
    }
};

export const buscarAgendamento = async (telefone, paymentId) => {
    try {
        let agendamento = await Agendamento.findOne({ telefone: telefone });

        if (!agendamento) {
            console.warn(`⚠️ Nenhum agendamento encontrado para telefone ${telefone}. Tentando buscar por paymentId ${paymentId}...`);
            agendamento = await Agendamento.findOne({ paymentId: paymentId });
        }

        return agendamento;
    } catch (error) {
        console.error("❌ Erro ao buscar agendamento:", error);
        return null;
    }
};
