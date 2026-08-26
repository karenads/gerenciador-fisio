package com.example.gerenciadorfisio.repository;

import com.example.gerenciadorfisio.entities.Tratamento;
import com.example.gerenciadorfisio.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {


}
