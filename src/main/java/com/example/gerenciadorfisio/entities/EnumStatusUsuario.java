package com.example.gerenciadorfisio.entities;

/*
  Enum que define os possíveis
  status de um usuário no sistema.

  ATIVO = usuário liberado para utilizar o sistema.
  BLOQUEADO = usuário temporariamente impedido de acessar.
  EXCLUIDO = usuário marcado como excluído no sistema.

  O enum limita os valores possíveis,
  evitando status inválidos.
*/
public enum EnumStatusUsuario {
    ATIVO,
    BLOQUEADO,
    EXCLUIDO
}