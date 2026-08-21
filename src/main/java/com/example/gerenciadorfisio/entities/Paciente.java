package com.example.gerenciadorfisio.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Paciente {

    @Id
    @GeneratedValue
    private Long id;

    private String nome;

    private String cpf;

    private String telefone;

    private String email;

    private LocalDate dataNascimento;

    private String endereco;

    private String observacoes;

}
