package com.example.gerenciadorfisio.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;


@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Sessao {

    @Id
    @GeneratedValue
    private Long id;

    private LocalDate data;

    private LocalTime horario;

    private String descricao;

    private String observacoes;

}
