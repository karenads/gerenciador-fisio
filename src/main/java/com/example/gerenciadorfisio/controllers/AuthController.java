package com.example.gerenciadorfisio.controllers;

import com.example.gerenciadorfisio.DTOs.LoginRequest;
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

    @PostMapping("/login")
    @Operation(summary = "Autenticação de usuarios", description = "Método de login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
        if (loginRequest.email().equals("string")&& loginRequest.senha().equals("string")){

            var token = tokenService.gerarToken(loginRequest.email());

            //Gerar o token
            return ResponseEntity.ok(token);
        }
        return ResponseEntity.status(HttpURLConnection.HTTP_UNAUTHORIZED).build();
    }
}