package com.example.gerenciadorfisio.application.DTOs;

import com.example.gerenciadorfisio.domain.entities.EnumStatusUsuario;

public record AtualizarStatusRequest(EnumStatusUsuario status) {
}
