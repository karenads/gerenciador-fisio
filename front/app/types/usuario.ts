/*
  Classe Usuario.

  Define a estrutura dos dados de um usuário
  no frontend utilizando TypeScript.
*/
export class Usuario {

    /*
      O constructor é utilizado para criar
      novos objetos do tipo Usuario.

      A palavra public cria e disponibiliza
      automaticamente as propriedades da classe.
    */
    constructor(

      /*
        Identificador do usuário.

        number | null significa que o ID
        pode ser um número ou null.

        No cadastro, o ID começa como null,
        pois será gerado pelo backend.
      */
      public id: number | null,

      // Nome do usuário.
      public nome: string,

      // Endereço de e-mail do usuário.
      public email: string,

      /*
        Status do usuário.

        Utiliza o tipo string, permitindo
        armazenar valores como ATIVO,
        BLOQUEADO e EXCLUIDO.
      */
      public status: string,

      // CPF do usuário.
      public cpf: string,

      // Senha do usuário.
      public senha:string,

    ) {}
  }

  /*
    Interface que define as propriedades
    recebidas pelo componente UsuarioForm.
  */
  export interface UsuarioFormProps{

    /*
      usuarioExistente é uma propriedade opcional.

      O símbolo ? significa que o componente
      pode receber ou não essa propriedade.

      Quando recebe um usuário existente,
      o formulário é utilizado para edição.

      Quando não recebe, o formulário
      é utilizado para cadastro.
    */
    usuarioExistente?:Usuario

  }