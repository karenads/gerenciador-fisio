package com.example.gerenciadorfisio.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Entity
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

    private String status;
}
