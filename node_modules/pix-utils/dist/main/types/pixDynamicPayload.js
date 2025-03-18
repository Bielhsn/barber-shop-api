"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayloadExample = exports.PixDynamicStatus = void 0;
var PixDynamicStatus;
(function (PixDynamicStatus) {
    PixDynamicStatus["ATIVA"] = "ATIVA";
    PixDynamicStatus["CONCLUIDA"] = "CONCLUIDA";
    PixDynamicStatus["REMOVIDA_PELO_USUARIO_RECEBEDOR"] = "REMOVIDA_PELO_USUARIO_RECEBEDOR";
    PixDynamicStatus["REMOVIDA_PELO_PSP"] = "REMOVIDA_PELO_PSP";
})(PixDynamicStatus = exports.PixDynamicStatus || (exports.PixDynamicStatus = {}));
exports.PayloadExample = {
    txid: 'fc9a4366-ff3d-4964-b5db-c6c91a8722d3',
    revisao: 3,
    calendario: {
        criacao: '2020-09-15T19:39:54.013Z',
        apresentacao: '2020-04-01T18:00:00Z',
        expiracao: 3600,
    },
    status: PixDynamicStatus.ATIVA,
    valor: {
        original: '500.00',
        final: '500.00',
        modalidadeAlteracao: 0,
    },
    chave: '7407c9c8-f78b-11ea-adc1-0242ac120002',
    solicitacaoPagador: 'Informar cartão fidelidade',
    infoAdicionais: [{ nome: 'quantidade', valor: '2' }],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGl4RHluYW1pY1BheWxvYWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdHlwZXMvcGl4RHluYW1pY1BheWxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsSUFBWSxnQkFLWDtBQUxELFdBQVksZ0JBQWdCO0lBQzFCLG1DQUFlLENBQUE7SUFDZiwyQ0FBdUIsQ0FBQTtJQUN2Qix1RkFBbUUsQ0FBQTtJQUNuRSwyREFBdUMsQ0FBQTtBQUN6QyxDQUFDLEVBTFcsZ0JBQWdCLEdBQWhCLHdCQUFnQixLQUFoQix3QkFBZ0IsUUFLM0I7QUEyRVksUUFBQSxjQUFjLEdBQWU7SUFDeEMsSUFBSSxFQUFFLHNDQUFzQztJQUM1QyxPQUFPLEVBQUUsQ0FBQztJQUNWLFVBQVUsRUFBRTtRQUNWLE9BQU8sRUFBRSwwQkFBMEI7UUFDbkMsWUFBWSxFQUFFLHNCQUFzQjtRQUNwQyxTQUFTLEVBQUUsSUFBSTtLQUNoQjtJQUNELE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxLQUFLO0lBRTlCLEtBQUssRUFBRTtRQUNMLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLEtBQUssRUFBRSxRQUFRO1FBQ2YsbUJBQW1CLEVBQUUsQ0FBQztLQUN2QjtJQUVELEtBQUssRUFBRSxzQ0FBc0M7SUFFN0Msa0JBQWtCLEVBQUUsNEJBQTRCO0lBRWhELGNBQWMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUM7Q0FDckQsQ0FBQyJ9