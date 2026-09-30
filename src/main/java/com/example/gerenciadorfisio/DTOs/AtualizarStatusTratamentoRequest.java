package com.example.gerenciadorfisio.DTOs;

import com.example.gerenciadorfisio.entities.EnumStatusTratamento;

public record AtualizarStatusTratamentoRequest(EnumStatusTratamento status) {
}