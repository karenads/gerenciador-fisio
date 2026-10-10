package com.example.gerenciadorfisio.domain.entities;

import com.example.gerenciadorfisio.application.DTOs.CriarAdminRequest;
import com.example.gerenciadorfisio.domain.entities.EnumStatusUsuario;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data // Gera getters, setters, toString, equals e hashCode
@NoArgsConstructor // Gera um construtor vazio
@AllArgsConstructor // Gera um construtor com todos os atributos
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String cpf;

    private String email;

    private String senha;

    private String role = "ROLE_USER";


    private EnumStatusUsuario status = EnumStatusUsuario.ATIVO;

    public Usuario(CriarAdminRequest criarAdminRequest) {

        this.setCpf(criarAdminRequest.cpf());
        this.setNome(criarAdminRequest.nome());
        this.setSenha(criarAdminRequest.senha());
        this.setEmail(criarAdminRequest.email());
        this.setRole("ROLE_ADMIN");

    }
}