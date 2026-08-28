package com.example.gerenciadorfisio.controllers;
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

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Método de cadastro de tratamento!", description = "Método responsável em efetuar o cadastro de um novo tratamento no sistema!")
    public ResponseEntity<Tratamento> criar(@RequestBody Tratamento tratamento){

        var tratamentoBanco = tratamentoRepository.save(tratamento);

        return ResponseEntity.ok(tratamentoBanco);

    }
}
