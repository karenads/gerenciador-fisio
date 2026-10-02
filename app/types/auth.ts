/*
  Interface que define o formato
  da resposta retornada pelo backend
  após um login realizado com sucesso.

  Nesse caso, esperamos receber
  um token de autenticação.
*/
export interface LoginResponse {

  /*
    Token retornado pelo backend.

    Ele é armazenado no localStorage
    e utilizado nas requisições autenticadas.
  */
  token: string;
}