package com.example.gerenciadorfisio.repository;

import com.example.gerenciadorfisio.entities.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {

//conversão do objeto pro sql
//faz a ponte entre a entidade e o banco

}

