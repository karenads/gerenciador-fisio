package com.example.gerenciadorfisio.controllers;

import com.example.gerenciadorfisio.entities.Sessao;
import com.example.gerenciadorfisio.entities.Tratamento;
import com.example.gerenciadorfisio.repository.SessaoRepository;
import com.example.gerenciadorfisio.repository.TratamentoRepository;
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

        @PostMapping
        @ResponseStatus(HttpStatus.CREATED)
        @Operation(summary = "Método de cadastro de sessão!", description = "Método responsável em efetuar o cadastro de uma nova sessão no sistema!")
        public ResponseEntity<Sessao> criar(@RequestBody Sessao sessao){

            var sessaoBanco = sessaoRepository.save(sessao);

            return ResponseEntity.ok(sessaoBanco);

        }
    }


