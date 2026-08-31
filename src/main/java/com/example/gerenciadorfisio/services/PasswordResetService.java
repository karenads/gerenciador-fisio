package com.example.gerenciadorfisio.services;

import com.example.gerenciadorfisio.entities.PasswordResetToken;
import com.example.gerenciadorfisio.entities.Usuario;
import com.example.gerenciadorfisio.repository.PasswordResetTokenRepository;
import com.example.gerenciadorfisio.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PasswordResetService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;


    //Gera o token temporario com o tempo de 15 minutos
    public String gerarTokenRecuperacao(String email){

        var usuario = usuarioRepository.findByEmail(email);

        if (usuario.isEmpty()){
            throw new RuntimeException("Usuario não encontrado");
        }
        String token = UUID.randomUUID().toString();

        PasswordResetToken passwordResetToken = new PasswordResetToken();

        passwordResetToken.setToken(token);
        passwordResetToken.setUsuario(usuario.get());
        passwordResetToken.setExpiracao(LocalDateTime.now().plusMinutes(15));

        passwordResetTokenRepository.save(passwordResetToken);

        return token;
    }

    //Verifica se o token ainda é valido
    public boolean tokenExpirado(PasswordResetToken passwordResetToken){
        return LocalDateTime.now().isAfter(passwordResetToken.getExpiracao());
    }


    public PasswordResetToken validarToken(String token) {

        var tokenEncontrado = passwordResetTokenRepository.findByToken(token);

        if (tokenEncontrado.isEmpty()) {
            throw new RuntimeException("Token inválido");
        }

        PasswordResetToken passwordResetToken = tokenEncontrado.get();

        if (LocalDateTime.now().isAfter(passwordResetToken.getExpiracao())) {
            throw new RuntimeException("Token expirado");
        }

        return passwordResetToken;
    }

    public void recuperarSenha(String token, String novaSenha) {

        PasswordResetToken passwordResetToken = validarToken(token);

        Usuario usuario = passwordResetToken.getUsuario();

        usuario.setSenha(novaSenha);

        usuarioRepository.save(usuario);

        passwordResetTokenRepository.delete(passwordResetToken);
    }
}
