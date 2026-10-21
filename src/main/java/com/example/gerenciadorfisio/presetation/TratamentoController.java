package com.example.gerenciadorfisio.presetation;

import com.example.gerenciadorfisio.application.DTOs.AtualizarStatusTratamentoRequest;
import com.example.gerenciadorfisio.application.services.TratamentoService;
import com.example.gerenciadorfisio.domain.entities.EnumStatusTratamento;
import com.example.gerenciadorfisio.domain.entities.Tratamento;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tratamentos")
@Tag(name = "Tratamento", description = "Grupo de APIs responsável por controlar a estrutura de criação e consulta de tratamentos do sistema!")
public class TratamentoController {

    @Autowired
    private TratamentoService tratamentoService;

    @GetMapping
    @Operation(summary = "Método de consulta de lista de tratamentos!", description = "Método responsável em efetuar a consulta de todos os tratamentos sem filtro!")
    public ResponseEntity<?> listarTodos() {
        return ResponseEntity.ok(tratamentoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tratamento> buscarPorId(@PathVariable Long id) {
        Tratamento tratamentoBanco = tratamentoService.buscarPorId(id);
        if (tratamentoBanco != null) {
            return ResponseEntity.ok(tratamentoBanco);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> criar(@RequestBody Tratamento tratamento) {
        try {
            return ResponseEntity.ok(tratamentoService.salvarTratamento(tratamento));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusTratamentoRequest statusRequest) {
        if (tratamentoService.atualizarStatus(id, statusRequest.status())) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody Tratamento tratamento) {
        try {
            if (tratamentoService.atualizar(id, tratamento)) {
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}/excluir")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (tratamentoService.atualizarStatus(id, EnumStatusTratamento.EXCLUIDO)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
