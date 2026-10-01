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

/*
  Controller responsável pelos endpoints relacionados às sessões.

  @RestController indica que a classe recebe requisições HTTP
  e retorna respostas para o frontend.

  @RequestMapping("/sessoes") define a rota principal.
  Portanto, todos os endpoints deste controller começam com /sessoes.

  @Tag organiza os endpoints deste controller dentro do Swagger.
*/
@RestController
@RequestMapping("/sessoes")
@Tag(
        name = "Sessão",
        description = "Grupo de APIs responsável por controlar a estrutura de criação e consulta de sessões do sistema!"
)
public class SessaoController {

    /*
      @Autowired realiza a injeção de dependência.

       Isso significa que o Spring cria e fornece
       automaticamente a instância necessária de
       SessaoRepository para o Controller.

       Assim, não precisamos criar o objeto manualmente
       usando "new".
    */
    @Autowired
    private SessaoRepository sessaoRepository;


    /*
      GET /sessoes

      Busca todas as sessões cadastradas.

      findAll() é fornecido pelo Spring Data JPA
      através do repository.
    */
    @GetMapping
    @Operation(
            summary = "Método de consulta de lista de sessões!",
            description = "Método responsável em efetuar a consulta de todas as sessões sem filtro!"
    )
    public ResponseEntity<?> listarTodos() {
        return ResponseEntity.ok(sessaoRepository.findAll());
    }


    /*
      GET /sessoes/{id}

      Busca uma sessão específica pelo ID.

      @PathVariable recebe o valor informado na própria URL.

      Exemplo:
      GET /sessoes/5
      id = 5
    */
    @GetMapping("/{id}")
    public ResponseEntity<Sessao> buscarPorId(@PathVariable Long id) {

        Sessao sessaoBanco = sessaoRepository.findById(id).orElse(null);

        if (sessaoBanco != null) {
            return ResponseEntity.ok(sessaoBanco);
        }

        // Retorna HTTP 404 caso a sessão não exista.
        return ResponseEntity.notFound().build();
    }


    /*
      POST /sessoes

      Cadastra uma nova sessão.

      @RequestBody transforma o JSON recebido
      na requisição em um objeto Sessao.

      save() salva o objeto no banco através do JPA.
    */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(
            summary = "Método de cadastro de sessão!",
            description = "Método responsável em efetuar o cadastro de uma nova sessão no sistema!"
    )
    public ResponseEntity<Sessao> criar(@RequestBody Sessao sessao) {

        var sessaoBanco = sessaoRepository.save(sessao);

        return ResponseEntity.ok(sessaoBanco);
    }


    /*
      PATCH /sessoes/{id}/status

      Atualiza somente o status da sessão.

      É utilizado um DTO porque não é necessário
      receber todos os dados da sessão para alterar apenas o status.
    */
    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> atualizarStatus(
            @PathVariable Long id,
            @RequestBody AtualizarStatusSessaoRequest statusRequest
    ) {

        Sessao sessaoBanco = sessaoRepository.findById(id).orElse(null);

        if (sessaoBanco != null) {

            sessaoBanco.setStatus(statusRequest.status());

            sessaoRepository.save(sessaoBanco);

            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }


    /*
      PUT /sessoes/{id}

      Atualiza os dados de uma sessão existente.

      Primeiro busca a sessão pelo ID.
      Depois atualiza seus atributos com os dados
      recebidos no corpo da requisição.
    */
    @PutMapping("/{id}")
    @Operation(
            summary = "Método de edição de sessões",
            description = "Método responsável pela edição de sessões cadastradas no sistema"
    )
    public ResponseEntity<Sessao> atualizar(
            @PathVariable Long id,
            @RequestBody Sessao sessao
    ) {

        try {

            Sessao sessaoBanco = sessaoRepository.findById(id).orElse(null);

            if (sessaoBanco != null) {

                /*
                  Atualiza o objeto recuperado do banco
                  com os novos valores recebidos.
                */
                sessaoBanco.setStatus(sessao.getStatus());
                sessaoBanco.setData(sessao.getData());
                sessaoBanco.setHorario(sessao.getHorario());
                sessaoBanco.setDescricao(sessao.getDescricao());
                sessaoBanco.setObservacoes(sessao.getObservacoes());
                sessaoBanco.setRealizada(sessao.getRealizada());

                // Salva novamente a sessão já atualizada.
                sessaoRepository.save(sessaoBanco);

                return ResponseEntity.ok().build();
            }

            return ResponseEntity.notFound().build();

        } catch (RuntimeException e) {

            throw new RuntimeException(e);
        }
    }


    /*
      DELETE /sessoes/{id}/excluir

      Neste projeto a sessão não é apagada fisicamente
      do banco de dados.

      É realizada uma exclusão lógica:
      o status é alterado para EXCLUIDO
      e o registro continua armazenado.
    */
    @DeleteMapping("/{id}/excluir")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {

        Sessao sessaoBanco = sessaoRepository.findById(id).orElse(null);

        if (sessaoBanco != null) {

            sessaoBanco.setStatus(EnumStatusSessao.EXCLUIDO);

            sessaoRepository.save(sessaoBanco);

            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }
}