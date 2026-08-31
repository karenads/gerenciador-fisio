package com.example.gerenciadorfisio.repository;

import com.example.gerenciadorfisio.entities.Tratamento;
import com.example.gerenciadorfisio.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

boolean existsUsuarioByEmailAndSenha(String email, String senha);

Optional<Usuario> findByEmail(String email);

}
