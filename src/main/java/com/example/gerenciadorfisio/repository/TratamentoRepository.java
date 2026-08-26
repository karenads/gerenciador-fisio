package com.example.gerenciadorfisio.repository;

import com.example.gerenciadorfisio.entities.Tratamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TratamentoRepository extends JpaRepository<Tratamento, Long> {


}
