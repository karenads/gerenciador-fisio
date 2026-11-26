package com.example.gerenciadorfisio.domain.repository;

import com.example.gerenciadorfisio.domain.entities.Tratamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TratamentoRepository extends JpaRepository<Tratamento, Long> {
    List<Tratamento> findByResponsavel_Id(Long id);

    // A consulta já restringe os resultados à empresa autenticada.
    List<Tratamento> findByEmpresa_Id(Long empresaId);
    java.util.Optional<Tratamento> findByIdAndEmpresa_Id(Long id, Long empresaId);
}
