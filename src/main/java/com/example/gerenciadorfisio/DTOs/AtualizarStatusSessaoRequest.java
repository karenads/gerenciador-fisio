package com.example.gerenciadorfisio.DTOs;

import com.example.gerenciadorfisio.entities.EnumStatusSessao;

/*
  DTO utilizado para receber apenas
  o novo status de uma sessão.

  DTO significa Data Transfer Object:
  um objeto usado para transportar dados
  entre o frontend e o backend.

  Como aqui precisamos alterar somente o status,
  não é necessário receber uma Sessao completa.

  O record é uma forma enxuta de criar
  uma classe somente para armazenar dados.
*/
public record AtualizarStatusSessaoRequest(
        EnumStatusSessao status
) {
}