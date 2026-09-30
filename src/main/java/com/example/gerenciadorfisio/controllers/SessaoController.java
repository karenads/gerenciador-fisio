package com.example.gerenciadorfisio.controllers;

import com.example.gerenciadorfisio.DTOs.AtualizarStatusSessaoRequest;
import com.example.gerenciadorfisio.entities.EnumStatusSessao;
import com.example.gerenciadorfisio.entities.Sessao;
import com.example.gerenciadorfisio.repository.SessaoRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sessoes")

@Tag(name = "Sessão", description = "Grupo de APIs responsável por controlar a estrutura de criação e consulta de sessões do sistema!")

public class SessaoController {

    @Autowired
    private SessaoRepository sessaoRepository;

    @GetMapping
    @Operation(summary = "Método de consulta de lista de sessões!", description = "Método responsável em efetuar a consulta de todas as sessões sem filtro!")
    public ResponseEntity<?> listarTodos(){

        return ResponseEntity.ok(sessaoRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sessao> buscarPorId(@PathVariable Long id){
        Sessao sessaoBanco = sessaoRepository.findById(id).orElse(null);
        if (sessaoBanco != null){
            return ResponseEntity.ok(sessaoBanco);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Método de cadastro de sessão!", description = "Método responsável em efetuar o cadastro de uma nova sessão no sistema!")
    public ResponseEntity<Sessao> criar(@RequestBody Sessao sessao){

        var sessaoBanco = sessaoRepository.save(sessao);

        return ResponseEntity.ok(sessaoBanco);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusSessaoRequest statusRequest){
        Sessao sessaoBanco = sessaoRepository.findById(id).orElse(null);
        if (sessaoBanco != null){
            sessaoBanco.setStatus(statusRequest.status());
            sessaoRepository.save(sessaoBanco);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Método de edição de sessões",
            description = "Método responsável pela edição de sessões cadastradas no sistema")
    public ResponseEntity<Sessao> atualizar(@PathVariable Long id, @RequestBody Sessao sessao){
        try {
            Sessao sessaoBanco = sessaoRepository.findById(id).orElse(null);
            if (sessaoBanco != null){
                sessaoBanco.setStatus(sessao.getStatus());
                sessaoBanco.setData(sessao.getData());
                sessaoBanco.setHorario(sessao.getHorario());
                sessaoBanco.setDescricao(sessao.getDescricao());
                sessaoBanco.setObservacoes(sessao.getObservacoes());
                sessaoBanco.setRealizada(sessao.getRealizada());
                sessaoRepository.save(sessaoBanco);
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.notFound().build();

        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}/excluir")
    public ResponseEntity<Void> excluir(@PathVariable Long id){
        Sessao sessaoBanco = sessaoRepository.findById(id).orElse(null);
        if (sessaoBanco != null){
            sessaoBanco.setStatus(EnumStatusSessao.EXCLUIDO);
            sessaoRepository.save(sessaoBanco);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}