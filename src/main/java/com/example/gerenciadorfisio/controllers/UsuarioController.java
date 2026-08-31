package com.example.gerenciadorfisio.controllers;


import com.example.gerenciadorfisio.DTOs.AtualizarStatusRequest;
import com.example.gerenciadorfisio.entities.EnumStatusUsuario;
import com.example.gerenciadorfisio.entities.Usuario;
import com.example.gerenciadorfisio.repository.UsuarioRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")

// A @Tag é uma anotação do Swagger/OpenAPI usada para agrupar e organizar os endpoints da sua API na documentação do Swagger UI
@Tag(name = "Usuario", description = "Grupo de APIs Responsável por controlar a estrutura de criação e consulta de usuários do sistema!")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    //Esse @Operation também é do Swagger/OpenAPI, mas ele serve para documentar uma operação específica da API, enquanto o @Tag organiza o controller em um grupo
    @Operation(summary = "Método de consulta de lista de usuários!", description = "Método responsável em efetuar a consulta de todos os usuários sem filtro!")
    public ResponseEntity<?> listarTodos(){

        return ResponseEntity.ok(usuarioRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id){
        Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);
        if (usuarioBanco!=null){
            return ResponseEntity.ok(usuarioBanco);
        }
        return ResponseEntity.notFound().build();
    }

    //Acesso -> saida -> Nome -> Entrada
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Método de criação de usuários!", description = "Método responsável em efetuar a criação de novos usuários!")
    public ResponseEntity<Usuario> criar(@RequestBody Usuario usuario){

        var usuarioBanco = usuarioRepository.save(usuario);

        return ResponseEntity.ok(usuarioBanco);
    }

    /* Quando o cliente precisa atualizar apenas alguns atributos (ex: mudar apenas o e-mail de um usuário)*/
    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusRequest statusRequest){
        Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);
        if (usuarioBanco!= null){
            usuarioBanco.setStatus(statusRequest.status());
            usuarioRepository.save(usuarioBanco);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    /*É utilizado para atualizações completas, onde o corpo da requisição deve conter todos os campos do objeto,
    caso algum campo não seja incluído no corpo da requisição, ele pode ser resolvido para null ou valor padrão*/
    @PutMapping("/{id}")
    @Operation(summary = "Método de edição de usuarios",
            description = "Método responsável pela edição de usuarios cadastrados no sistema")
    public ResponseEntity<Usuario> atualizar(@PathVariable Long id, @RequestBody Usuario usuario){
        try {
            Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);
            if (usuarioBanco!= null){
                usuarioBanco.setStatus(usuario.getStatus());
                usuarioBanco.setNome(usuario.getNome());
                usuarioBanco.setCpf(usuario.getCpf());
                usuarioBanco.setEmail(usuario.getEmail());
                usuarioBanco.setSenha(usuario.getSenha());
                usuarioRepository.save(usuarioBanco);
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.notFound().build();

        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}/excluir")
    public ResponseEntity<Void> excluir(@PathVariable Long id){
        Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);
        if (usuarioBanco!= null){
            usuarioBanco.setStatus(EnumStatusUsuario.EXCLUIDO);
            usuarioRepository.save(usuarioBanco);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }


}