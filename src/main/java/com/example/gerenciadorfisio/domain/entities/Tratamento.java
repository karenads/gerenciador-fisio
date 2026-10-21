package com.example.gerenciadorfisio.domain.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tratamento {

    @Id
    @GeneratedValue
    private Long id;

    private String nome;

    private String descricao;

    private LocalDateTime dataInicio;

    private LocalDateTime dataFinal;

    private int totalSessoes;

    private int sessoesRealizadas;

    private EnumStatusTratamento status = EnumStatusTratamento.ATIVO;

    public void validarTratamento() {
        if (totalSessoes < 0 || sessoesRealizadas < 0 || sessoesRealizadas > totalSessoes) {
            throw new IllegalArgumentException("Quantidade de sessões inválida!");
        }
        if (dataInicio != null && dataFinal != null && dataFinal.isBefore(dataInicio)) {
            throw new IllegalArgumentException("Data final não pode ser anterior à data de início!");
        }
    }
}
