package com.example.gerenciadorfisio.repository;

import com.example.gerenciadorfisio.entities.Paciente;
import com.example.gerenciadorfisio.entities.Sessao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {


}

