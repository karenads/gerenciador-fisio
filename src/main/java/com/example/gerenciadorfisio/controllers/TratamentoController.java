package com.example.gerenciadorfisio.controllers;

import com.example.gerenciadorfisio.DTOs.AtualizarStatusTratamentoRequest;
import com.example.gerenciadorfisio.entities.EnumStatusTratamento;
import com.example.gerenciadorfisio.entities.Tratamento;
import com.example.gerenciadorfisio.repository.TratamentoRepository;
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
    private TratamentoRepository tratamentoRepository;

    @GetMapping
    @Operation(summary = "Método de consulta de lista de tratamentos!", description = "Método responsável em efetuar a consulta de todos os tratamentos sem filtro!")
    public ResponseEntity<?> listarTodos(){

        return ResponseEntity.ok(tratamentoRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tratamento> buscarPorId(@PathVariable Long id){
        Tratamento tratamentoBanco = tratamentoRepository.findById(id).orElse(null);
        if (tratamentoBanco != null){
            return ResponseEntity.ok(tratamentoBanco);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Método de cadastro de tratamento!", description = "Método responsável em efetuar o cadastro de um novo tratamento no sistema!")
    public ResponseEntity<Tratamento> criar(@RequestBody Tratamento tratamento){

        var tratamentoBanco = tratamentoRepository.save(tratamento);

        return ResponseEntity.ok(tratamentoBanco);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusTratamentoRequest statusRequest){
        Tratamento tratamentoBanco = tratamentoRepository.findById(id).orElse(null);
        if (tratamentoBanco != null){
            tratamentoBanco.setStatus(statusRequest.status());
            tratamentoRepository.save(tratamentoBanco);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Método de edição de tratamentos",
            description = "Método responsável pela edição de tratamentos cadastrados no sistema")
    public ResponseEntity<Tratamento> atualizar(@PathVariable Long id, @RequestBody Tratamento tratamento){
        try {
            Tratamento tratamentoBanco = tratamentoRepository.findById(id).orElse(null);
            if (tratamentoBanco != null){
                tratamentoBanco.setStatus(tratamento.getStatus());
                tratamentoBanco.setNome(tratamento.getNome());
                tratamentoBanco.setDescricao(tratamento.getDescricao());
                tratamentoBanco.setDataInicio(tratamento.getDataInicio());
                tratamentoBanco.setDataFinal(tratamento.getDataFinal());
                tratamentoBanco.setTotalSessoes(tratamento.getTotalSessoes());
                tratamentoBanco.setSessoesRealizadas(tratamento.getSessoesRealizadas());
                tratamentoRepository.save(tratamentoBanco);
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.notFound().build();

        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}/excluir")
    public ResponseEntity<Void> excluir(@PathVariable Long id){
        Tratamento tratamentoBanco = tratamentoRepository.findById(id).orElse(null);
        if (tratamentoBanco != null){
            tratamentoBanco.setStatus(EnumStatusTratamento.EXCLUIDO);
            tratamentoRepository.save(tratamentoBanco);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}