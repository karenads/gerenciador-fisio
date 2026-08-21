package com.example.gerenciadorfisio.controllers;
import com.example.gerenciadorfisio.entities.Tratamento;
import com.example.gerenciadorfisio.entities.tratamento;
import com.example.gerenciadorfisio.repository.TratamentoRepository;
import com.example.gerenciadorfisio.repository.tratamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tratamentos")
public class TratamentoController {

    @Autowired
    private TratamentoRepository tratamentoRepository;

    @GetMapping
    public ResponseEntity<?> listarTodos(){

        return ResponseEntity.ok(tratamentoRepository.findAll());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Tratamento> criar(@RequestBody Tratamento tratamento){

        var tratamentoBanco = tratamentoRepository.save(tratamento);

        return ResponseEntity.ok(tratamentoBanco);

    }
}
