package com.example.gerenciadorfisio.presetation;

import com.example.gerenciadorfisio.application.DTOs.AtualizarStatusPacienteRequest;
import com.example.gerenciadorfisio.application.services.PacienteService;
import com.example.gerenciadorfisio.domain.entities.EnumStatusPaciente;
import com.example.gerenciadorfisio.domain.entities.Paciente;
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
    private PacienteService pacienteService;

    @GetMapping
    @Operation(summary = "Método de consulta de lista de pacientes!", description = "Método responsável em efetuar a consulta de todos os pacientes sem filtro!")
    public ResponseEntity<?> listarTodos() {
        return ResponseEntity.ok(pacienteService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Paciente> buscarPorId(@PathVariable Long id) {
        Paciente pacienteBanco = pacienteService.buscarPorId(id);
        if (pacienteBanco != null) {
            return ResponseEntity.ok(pacienteBanco);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> criar(@RequestBody Paciente paciente) {
        try {
            return ResponseEntity.ok(pacienteService.salvarPaciente(paciente));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusPacienteRequest statusRequest) {
        if (pacienteService.atualizarStatus(id, statusRequest.status())) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody Paciente paciente) {
        try {
            if (pacienteService.atualizar(id, paciente)) {
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}/excluir")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (pacienteService.atualizarStatus(id, EnumStatusPaciente.EXCLUIDO)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
