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

/*
  Controller responsável pela autenticação do sistema.

  @RestController indica que esta classe recebe
  requisições HTTP e retorna respostas.

  @RequestMapping("/auth") define a rota base
  dos endpoints de autenticação.

  @Tag organiza esses endpoints no Swagger.
*/
@RestController
@RequestMapping("/auth")
@Tag(
        name = "Autenticação",
        description = "Controller de autenticação"
)
public class AuthController {

    /*
      Dependências utilizadas pelo controller.

      @Autowired faz a injeção automática pelo Spring,
      sem precisar criar os objetos manualmente com "new".

      TokenService = geração de token JWT.
      UsuarioRepository = consulta de usuários no banco.
      PasswordResetService = recuperação e redefinição de senha.
    */
    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordResetService passwordResetService;


    /*
      POST /auth/login

      Recebe e-mail e senha através do LoginRequest.

      O repository verifica se existe um usuário
      com as credenciais informadas.

      Se existir, o TokenService gera um JWT
      e ele é devolvido através de LoginResponse.

      Caso contrário, retorna HTTP 401 - Unauthorized.
    */
    @PostMapping("/login")
    @Operation(
            summary = "Autenticação de usuarios",
            description = "Método de login"
    )
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

        if (
                usuarioRepository.existsUsuarioByEmailAndSenha(
                        loginRequest.email(),
                        loginRequest.senha()
                )
        ) {

            var token = tokenService.gerarToken(loginRequest.email());

            return ResponseEntity.ok(
                    new LoginResponse(token)
            );
        }

        return ResponseEntity
                .status(HttpURLConnection.HTTP_UNAUTHORIZED)
                .build();
    }


    /*
      POST /auth/login/esqueci-senha

      Recebe o e-mail através de ForgotPasswordRequest.

      O PasswordResetService gera um token temporário
      que será utilizado no processo de recuperação da senha.
    */
    @PostMapping("/login/esqueci-senha")
    @Operation(
            summary = "Solicitar recuperação de senha",
            description = "Gera um token temporário para recuperação da senha"
    )
    public ResponseEntity<?> esqueciSenha(
            @RequestBody ForgotPasswordRequest request
    ) {

        String token = passwordResetService.gerarTokenRecuperacao(
                request.email()
        );

        return ResponseEntity.ok(token);
    }


    /*
      POST /auth/login/recuperar-senha

      Recebe o token de recuperação
      e a nova senha através de ResetPasswordRequest.

      O PasswordResetService valida o token
      e realiza a alteração da senha.
    */
    @PostMapping("/login/recuperar-senha")
    @Operation(
            summary = "Recuperar senha",
            description = "Valida o token e altera a senha do usuário"
    )
    public ResponseEntity<?> recuperarSenha(
            @RequestBody ResetPasswordRequest request
    ) {

        passwordResetService.recuperarSenha(
                request.token(),
                request.novaSenha()
        );

        return ResponseEntity.ok(
                "Senha alterada com sucesso!"
        );
    }
}