package com.example.gerenciadorfisio.controllers;


import com.example.gerenciadorfisio.entities.Usuario;
import com.example.gerenciadorfisio.repository.UsuarioRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")

// A @Tag é uma anotação do Swagger/OpenAPI usada para agrupar e organizar os endpoints da sua API na documentação do Swagger UI
@Tag(name = "Usuario", description = "Grupo de APIs Responsável por controlar a estrutura de criação e consulta de usuários do sistema!")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    //Esse @Operation também é do Swagger/OpenAPI, mas ele serve para documentar uma operação específica da API, enquanto o @Tag organiza o controller em um grupo
    @Operation(summary = "Método de consulta de lista de usuários!", description = "Método responsável em efetuar a consulta de todos os usuários sem filtro!")

    public ResponseEntity<?> listarTodos(){

        return ResponseEntity.ok(usuarioRepository.findAll());
    }

    //Acesso -> saida -> Nome -> Entrada

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Método de criação de usuários!", description = "Método responsável em efetuar a criação de novos usuários!")
    public ResponseEntity<Usuario> criar(@RequestBody Usuario usuario){

        var usuarioBanco = usuarioRepository.save(usuario);

        return ResponseEntity.ok(usuarioBanco);
    }
}