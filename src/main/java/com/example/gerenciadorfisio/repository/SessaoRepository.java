package com.example.gerenciadorfisio.repository;

import com.example.gerenciadorfisio.entities.Sessao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/*
  Repository responsável pelo acesso
  aos dados da entidade Sessao.

  JpaRepository<Sessao, Long> informa:
  - Sessao = entidade manipulada
  - Long = tipo do ID da entidade

  Ao estender JpaRepository, o Spring Data JPA
  já disponibiliza métodos prontos como:
  findAll(), findById(), save() e delete().
*/
@Repository
public interface SessaoRepository extends JpaRepository<Sessao, Long> {

}