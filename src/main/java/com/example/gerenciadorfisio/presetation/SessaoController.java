package com.example.gerenciadorfisio.presetation;

import com.example.gerenciadorfisio.application.DTOs.AtualizarStatusSessaoRequest;
import com.example.gerenciadorfisio.application.services.SessaoService;
import com.example.gerenciadorfisio.domain.entities.EnumStatusSessao;
import com.example.gerenciadorfisio.domain.entities.Sessao;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sessoes")
@Tag(name = "Sessão", description = "Grupo de APIs responsável por controlar a estrutura de criação e consulta de sessoes do sistema!")
public class SessaoController {

    @Autowired
    private SessaoService sessaoService;

    @GetMapping
    @Operation(summary = "Método de consulta de lista de sessoes!", description = "Método responsável em efetuar a consulta de todos os sessoes sem filtro!")
    public ResponseEntity<?> listarTodos() {
        return ResponseEntity.ok(sessaoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sessao> buscarPorId(@PathVariable Long id) {
        Sessao sessaoBanco = sessaoService.buscarPorId(id);
        if (sessaoBanco != null) {
            return ResponseEntity.ok(sessaoBanco);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> criar(@RequestBody Sessao sessao) {
        try {
            return ResponseEntity.ok(sessaoService.salvarSessao(sessao));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusSessaoRequest statusRequest) {
        if (sessaoService.atualizarStatus(id, statusRequest.status())) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody Sessao sessao) {
        try {
            if (sessaoService.atualizar(id, sessao)) {
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}/excluir")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (sessaoService.atualizarStatus(id, EnumStatusSessao.EXCLUIDO)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
