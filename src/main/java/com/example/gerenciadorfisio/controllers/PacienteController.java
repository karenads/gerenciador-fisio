package com.example.gerenciadorfisio.controllers;

import com.example.gerenciadorfisio.entities.Paciente;
import com.example.gerenciadorfisio.entities.Sessao;
import com.example.gerenciadorfisio.repository.PacienteRepository;
import com.example.gerenciadorfisio.repository.SessaoRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pacientes")

@Tag(name = "Paciente", description = "Grupo de APIs responsável por controlar a estrutura de criação e consulta de pacientes do sistema!")

public class PacienteController {

    @Autowired
    private PacienteRepository pacienteRepository;

    @GetMapping
    @Operation(summary = "Método de consulta de lista de pacientes!", description = "Método responsável em efetuar a consulta de todos os pacientes sem filtro!")
    public ResponseEntity<?> listarTodos(){

        return ResponseEntity.ok(pacienteRepository.findAll());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Método de cadastro de paciente!", description = "Método responsável por realizar o cadastro de um novo paciente no sistema!")
    public ResponseEntity<Paciente> criar(@RequestBody Paciente paciente){

        var pacienteBanco = pacienteRepository.save(paciente);

        return ResponseEntity.ok(pacienteBanco);

    }
}
