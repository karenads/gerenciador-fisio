package com.example.gerenciadorfisio.application.services;

import com.example.gerenciadorfisio.application.DTOs.*;
import com.example.gerenciadorfisio.domain.entities.Usuario;
import com.example.gerenciadorfisio.domain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TokenService tokenService;

    @Value("${spring.secret}")
    private String secret;


    public LoginResponse validarUsuarioAutenticadoRetornaToken(LoginRequest resquest) {

        if (usuarioRepository.existsUsuarioByEmailAndSenha(resquest.email(), resquest.senha())) {

            var token = tokenService.gerarToken(resquest.email());
            return new LoginResponse(token);
        }
        return null;
    }


    public List<UsuarioResponse> listarTodosUsuariosTable(){

        return  usuarioRepository.findAll()
                .stream()
                .map(UsuarioResponse::new)
                .toList();
    }

    public CriarAdminResponse criarAdmin(CriarAdminRequest criarAdminRequest) {

        if(!criarAdminRequest.secretKey().equals(secret)){
            return new CriarAdminResponse(0L,"Usuario Salvo com sucesso!");

        }

        Usuario usuarioAdminSalvar = new Usuario(criarAdminRequest);
        usuarioRepository.save(usuarioAdminSalvar);

        return new CriarAdminResponse(usuarioAdminSalvar.getId(),"Usuario Salvo com sucesso!");
    }

    public UsuarioResponse salvarUsuario(UsuarioRequest usuario, Long id) {

        if (id == 0L) {
            Usuario usuarioBanco = new Usuario(usuario);
            usuarioRepository.save(usuarioBanco);
            return new UsuarioResponse(usuarioBanco);
        }

        Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);
        if (usuarioBanco != null) {
            usuarioBanco.setNome(usuario.nome());
            usuarioBanco.setCpf(new com.example.gerenciadorfisio.domain.valueobject.CPF(usuario.cpf()));
            usuarioBanco.setEmail(usuario.email());
            usuarioBanco.setSenha(usuario.senha());
            usuarioRepository.save(usuarioBanco);
            return new UsuarioResponse(usuarioBanco);
        }
        return null;
    }

    public UsuarioResponse buscarPorId(Long id) {
        Usuario usuario = usuarioRepository.findById(id).orElse(null);
        if (usuario == null) {
            return null;
        }
        return new UsuarioResponse(usuario);
    }

    public boolean atualizarStatus(EnumStatusUsuario status, Long id) {
        Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);
        if (usuarioBanco == null) {
            return false;
        }
        usuarioBanco.setStatus(status);
        usuarioRepository.save(usuarioBanco);
        return true;
    }
}
