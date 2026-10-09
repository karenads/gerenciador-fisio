package com.example.gerenciadorfisio.application.DTOs;

import com.example.gerenciadorfisio.domain.entities.EnumStatusPaciente;

public record AtualizarStatusPacienteRequest(EnumStatusPaciente status) {
}