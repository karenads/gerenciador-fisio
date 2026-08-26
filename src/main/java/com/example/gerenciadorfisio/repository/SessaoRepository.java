package com.example.gerenciadorfisio.repository;

import com.example.gerenciadorfisio.entities.Sessao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessaoRepository extends JpaRepository<Sessao, Long> {


}

