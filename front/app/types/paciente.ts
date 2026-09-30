export class Paciente {
    constructor(
        public id: number | null,
        public nome: string,
        public cpf: string,
        public telefone: string,
        public email: string,
        public dataNascimento: string,
        public endereco: string,
        public observacoes: string,
        public status: string
    ) {}
}

export interface PacienteFormProps {
    pacienteExistente?: Paciente;
}