package com.example.gerenciadorfisio.controllers;

import com.example.gerenciadorfisio.entities.Sessao;
import com.example.gerenciadorfisio.entities.Tratamento;
import com.example.gerenciadorfisio.repository.SessaoRepository;
import com.example.gerenciadorfisio.repository.TratamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


    @RestController
    @RequestMapping("/sessoes")
    public class SessaoController {

        @Autowired
        private SessaoRepository sessaoRepository;

        @GetMapping
        public ResponseEntity<?> listarTodos(){

            return ResponseEntity.ok(sessaoRepository.findAll());
        }

        @PostMapping
        @ResponseStatus(HttpStatus.CREATED)
        public ResponseEntity<Sessao> criar(@RequestBody Sessao sessao){

            var sessaoBanco = sessaoRepository.save(sessao);

            return ResponseEntity.ok(sessaoBanco);

        }
    }


