package com.example.gerenciadorfisio.domain.entities;

import com.example.gerenciadorfisio.domain.valueobject.CPF;
import com.example.gerenciadorfisio.domain.valueobject.Email;
import com.example.gerenciadorfisio.domain.valueobject.Telefone;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
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

    private EnumStatusPaciente status = EnumStatusPaciente.ATIVO;

    // Validação dos dados do paciente pelos Value Objects.
    public void setCpf(String cpf) {
        this.cpf = new CPF(cpf).toString();
    }

    public void setEmail(String email) {
        this.email = new Email(email).toString();
    }

    public void setTelefone(String telefone) {
        this.telefone = new Telefone(telefone).toString();
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        if (dataNascimento != null && dataNascimento.isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("Data de nascimento inválida!");
        }
        this.dataNascimento = dataNascimento;
    }

}
