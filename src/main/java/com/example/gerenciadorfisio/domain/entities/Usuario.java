package com.example.gerenciadorfisio.domain.entities;

import com.example.gerenciadorfisio.application.DTOs.CriarAdminRequest;
import com.example.gerenciadorfisio.application.DTOs.UsuarioRequest;
import com.example.gerenciadorfisio.application.DTOs.EnumStatusUsuario;
import com.example.gerenciadorfisio.domain.valueobject.CPF;
import com.example.gerenciadorfisio.domain.valueobject.Email;
import jakarta.persistence.*;
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

    @Embedded
    private CPF cpf;

    private String email;

    private String senha;

    public void setEmail(String email) {
        this.email = new Email(email).toString();
    }

    private String role = "ROLE_USER";


    private EnumStatusUsuario status = EnumStatusUsuario.ATIVO;

    public Usuario(CriarAdminRequest criarAdminRequest) {

        this.setCpf(new CPF(criarAdminRequest.cpf()));
        this.setNome(criarAdminRequest.nome());
        this.setSenha(criarAdminRequest.senha());
        this.setEmail(criarAdminRequest.email());
        this.setRole("ROLE_ADMIN");

    }

    public Usuario(UsuarioRequest usuario) {

        this.setCpf(new CPF(usuario.cpf()));
        this.setNome(usuario.nome());
        this.setSenha(usuario.senha());
        this.setEmail(usuario.email());
        this.setRole("ROLE_USER");
    }
}