package com.example.gerenciadorfisio.controllers;

import com.example.gerenciadorfisio.entities.Paciente;
import com.example.gerenciadorfisio.entities.Sessao;
import com.example.gerenciadorfisio.repository.PacienteRepository;
import com.example.gerenciadorfisio.repository.SessaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pacientes")
public class PacienteController {

    @Autowired
    private PacienteRepository pacienteRepository;

    @GetMapping
    public ResponseEntity<?> listarTodos(){

        return ResponseEntity.ok(pacienteRepository.findAll());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Paciente> criar(@RequestBody Paciente paciente){

        var pacienteBanco = pacienteRepository.save(paciente);

        return ResponseEntity.ok(pacienteBanco);

    }
}
