package com.example.gerenciadorfisio.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

/*
  Entidade que representa uma sessão de fisioterapia.

  @Entity: indica que a classe será persistida no banco.
  @Data: gera getters, setters, toString, equals e hashCode.
  @NoArgsConstructor: gera construtor vazio.
  @AllArgsConstructor: gera construtor com todos os atributos.
*/
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Sessao {

    /*
      @Id define a chave primária.
      @GeneratedValue gera o ID automaticamente.
    */
    @Id
    @GeneratedValue
    private Long id;

    // Data e horário da sessão.
    private LocalDate data;
    private LocalTime horario;

    // Informações registradas na sessão.
    private String descricao;
    private String observacoes;

    // true = realizada | false = pendente.
    private Boolean realizada;

    // Status definido pelos valores do EnumStatusSessao.
    private EnumStatusSessao status;
}