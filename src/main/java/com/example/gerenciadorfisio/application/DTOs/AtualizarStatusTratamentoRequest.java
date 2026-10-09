package com.example.gerenciadorfisio.application.DTOs;

import com.example.gerenciadorfisio.domain.entities.EnumStatusTratamento;

public record AtualizarStatusTratamentoRequest(EnumStatusTratamento status) {
}