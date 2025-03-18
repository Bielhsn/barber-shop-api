export declare enum PixDynamicStatus {
    ATIVA = "ATIVA",
    CONCLUIDA = "CONCLUIDA",
    REMOVIDA_PELO_USUARIO_RECEBEDOR = "REMOVIDA_PELO_USUARIO_RECEBEDOR",
    REMOVIDA_PELO_PSP = "REMOVIDA_PELO_PSP"
}
type InfoAdicional = {
    readonly nome: string;
    readonly valor: string;
};
export type PIXPaylodParams = {
    readonly DPP?: string;
    readonly codMun?: string;
};
export type PIXFuturePayload = {
    readonly revisao: number;
    readonly calendario: {
        readonly criacao: string;
        readonly apresentacao: string;
        readonly dataDeVencimento?: string;
        readonly validadeAposVencimento?: number;
    };
    readonly devedor?: {
        readonly cpf?: string;
        readonly cnpj?: string;
        readonly nome?: string;
    };
    readonly recebedor?: {
        readonly cpf?: string;
        readonly cnpj?: string;
        readonly nome: string;
        readonly logradouro: string;
        readonly cidade: string;
        readonly utf: string;
        readonly cep: string;
    };
    readonly valor: {
        readonly original?: string;
        readonly multa?: string;
        readonly juros?: string;
        readonly abatimento?: string;
        readonly desconto?: string;
        readonly final: string;
    };
    readonly chave: string;
    readonly txid: string;
    readonly solicitacaoPagador?: string;
    readonly infoAdicionais: readonly InfoAdicional[];
    readonly status: PixDynamicStatus;
};
export type PIXInstantPayload = {
    readonly revisao: number;
    readonly calendario: {
        readonly criacao: string;
        readonly apresentacao: string;
        readonly expiracao: number;
    };
    readonly devedor?: {
        readonly cpf?: string;
        readonly cnpj?: string;
        readonly nome: string;
    };
    readonly valor: {
        readonly original: string;
        readonly modalidadeAlteracao?: 0 | 1;
    };
    readonly chave: string;
    readonly txid: string;
    readonly solicitacaoPagador?: string;
    readonly infoAdicionais?: readonly InfoAdicional[];
    readonly status: PixDynamicStatus;
};
export type PIXPayload = PIXInstantPayload | PIXFuturePayload;
export declare const PayloadExample: PIXPayload;
export {};
