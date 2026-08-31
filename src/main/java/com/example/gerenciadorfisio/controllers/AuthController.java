package com.example.gerenciadorfisio.controllers;

import com.example.gerenciadorfisio.DTOs.ForgotPasswordRequest;
import com.example.gerenciadorfisio.DTOs.LoginRequest;
import com.example.gerenciadorfisio.DTOs.LoginResponse;
import com.example.gerenciadorfisio.DTOs.ResetPasswordRequest;
import com.example.gerenciadorfisio.repository.UsuarioRepository;
import com.example.gerenciadorfisio.services.PasswordResetService;
import com.example.gerenciadorfisio.services.TokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.HttpURLConnection;

@RestController
@RequestMapping("/auth")
@Tag(name = "Autenticação", description = "Controller de autenticação")
public class AuthController {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordResetService passwordResetService;

    @PostMapping("/login")
    @Operation(summary = "Autenticação de usuarios", description = "Método de login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){

        if (usuarioRepository.existsUsuarioByEmailAndSenha(loginRequest.email(), loginRequest.senha())){

            var token = tokenService.gerarToken(loginRequest.email());

            //Gerar o token
            return ResponseEntity.ok(new LoginResponse(token));
        }
        return ResponseEntity.status(HttpURLConnection.HTTP_UNAUTHORIZED).build();
    }

    @PostMapping("/login/esqueci-senha")
    @Operation(
            summary = "Solicitar recuperação de senha",
            description = "Gera um token temporário para recuperação da senha"
    )
    public ResponseEntity<?> esqueciSenha(
            @RequestBody ForgotPasswordRequest request) {

        String token = passwordResetService.gerarTokenRecuperacao(
                request.email()
        );

        return ResponseEntity.ok(token);
    }

    @PostMapping("/login/recuperar-senha")
    @Operation(
            summary = "Recuperar senha",
            description = "Valida o token e altera a senha do usuário"
    )
    public ResponseEntity<?> recuperarSenha(
            @RequestBody ResetPasswordRequest request) {

        passwordResetService.recuperarSenha(
                request.token(),
                request.novaSenha()
        );

        return ResponseEntity.ok("Senha alterada com sucesso!");
    }
}