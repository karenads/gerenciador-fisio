package com.example.gerenciadorfisio.domain.repository;

import com.example.gerenciadorfisio.domain.entities.Sessao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SessaoRepository extends JpaRepository<Sessao, Long> {
    List<Sessao> findByResponsavel_Id(Long id);

    // A consulta já restringe os resultados à empresa autenticada.
    List<Sessao> findByEmpresa_Id(Long empresaId);
    java.util.Optional<Sessao> findByIdAndEmpresa_Id(Long id, Long empresaId);
}
