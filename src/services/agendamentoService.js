const agendamentos = [];

export const buscarHorariosDisponiveis = (data) => {
    const horariosBase = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
    return horariosBase.map(hora => {
        const ocupado = agendamentos.some(a => a.data === data && a.hora === hora);
        return { hora, disponivel: !ocupado };
    });
};

export const salvarAgendamento = (agendamento) => {
    const { data, hora } = agendamento;
    const ocupado = agendamentos.some(a => a.data === data && a.hora === hora);
    if (ocupado) return false;
    agendamentos.push(agendamento);
    return true;
};
