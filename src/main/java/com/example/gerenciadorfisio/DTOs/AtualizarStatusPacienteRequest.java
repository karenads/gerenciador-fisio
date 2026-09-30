package com.example.gerenciadorfisio.DTOs;

import com.example.gerenciadorfisio.entities.EnumStatusPaciente;

public record AtualizarStatusPacienteRequest(EnumStatusPaciente status) {
}