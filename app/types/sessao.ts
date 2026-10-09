export class Sessao {
  constructor(
    public id: number | null,
    public data: string,
    public horario: string,
    public descricao: string,
    public observacoes: string,
    public realizada: boolean,
    public status: "ATIVO" | "EXCLUIDO"
  ) {}
}

export interface SessaoFormProps {
  sessaoExistente?: Sessao;
}