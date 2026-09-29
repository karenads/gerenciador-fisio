package com.example.gerenciadorfisio.controllers;

import com.example.gerenciadorfisio.entities.EnumStatusUsuario;
import com.example.gerenciadorfisio.entities.Paciente;
import com.example.gerenciadorfisio.repository.PacienteRepository;
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

    @GetMapping("/{id}")
    public ResponseEntity<Paciente> buscarPorId(@PathVariable Long id){
        Paciente pacienteBanco = pacienteRepository.findById(id).orElse(null);
        if (pacienteBanco != null){
            return ResponseEntity.ok(pacienteBanco);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Método de cadastro de paciente!", description = "Método responsável por realizar o cadastro de um novo paciente no sistema!")
    public ResponseEntity<Paciente> criar(@RequestBody Paciente paciente){

        var pacienteBanco = pacienteRepository.save(paciente);

        return ResponseEntity.ok(pacienteBanco);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Método de edição de pacientes",
            description = "Método responsável pela edição de pacientes cadastrados no sistema")
    public ResponseEntity<Paciente> atualizar(@PathVariable Long id, @RequestBody Paciente paciente){
        try {
            Paciente pacienteBanco = pacienteRepository.findById(id).orElse(null);
            if (pacienteBanco != null){
                pacienteBanco.setStatus(paciente.getStatus());
                pacienteBanco.setNome(paciente.getNome());
                pacienteBanco.setCpf(paciente.getCpf());
                pacienteBanco.setTelefone(paciente.getTelefone());
                pacienteBanco.setEmail(paciente.getEmail());
                pacienteBanco.setDataNascimento(paciente.getDataNascimento());
                pacienteBanco.setEndereco(paciente.getEndereco());
                pacienteBanco.setObservacoes(paciente.getObservacoes());
                pacienteRepository.save(pacienteBanco);
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.notFound().build();

        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}/excluir")
    public ResponseEntity<Void> excluir(@PathVariable Long id){
        Paciente pacienteBanco = pacienteRepository.findById(id).orElse(null);
        if (pacienteBanco != null){
            pacienteBanco.setStatus(EnumStatusUsuario.EXCLUIDO);
            pacienteRepository.save(pacienteBanco);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}