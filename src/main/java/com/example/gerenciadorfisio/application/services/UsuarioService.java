package com.example.gerenciadorfisio.application.services;

import com.example.gerenciadorfisio.application.ports.UsuarioPorta;
import com.example.gerenciadorfisio.application.DTOs.*;
import com.example.gerenciadorfisio.domain.entities.Usuario;
import com.example.gerenciadorfisio.domain.entities.Empresa;
import com.example.gerenciadorfisio.domain.repository.UsuarioRepository;
import com.example.gerenciadorfisio.domain.repository.EmpresaRepository;
import com.example.gerenciadorfisio.domain.valueobject.CPF;
import com.example.gerenciadorfisio.domain.valueobject.CNPJ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UsuarioService implements UsuarioPorta {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private TokenService tokenService;

    @Value("${spring.admin-secret}")
    private String secret;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    @Transactional
    public LoginResponse validarUsuarioAutenticadoRetornaToken(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.email()).orElse(null);
        if (usuario == null || usuario.getStatus() != EnumStatusUsuario.ATIVO
                || request.senha() == null) return null;

        String senhaBanco = usuario.getSenha();
        boolean codificada = senhaBanco != null && senhaBanco.startsWith("$2");
        boolean valida = codificada
                ? passwordEncoder.matches(request.senha(), senhaBanco)
                : request.senha().equals(senhaBanco);
        if (!valida) return null;

        // Senhas antigas são convertidas para BCrypt após autenticação bem-sucedida.
        if (!codificada) {
            usuario.setSenha(passwordEncoder.encode(request.senha()));
            usuarioRepository.save(usuario);
        }
        return new LoginResponse(tokenService.gerarToken(request.email()));
    }

    @Override
    public UsuarioLogado getUsuarioLogado() {
        return (UsuarioLogado) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    @Override
    public Usuario getUsuarioEntidadeLogado() {
        UsuarioLogado logado = getUsuarioLogado();
        return usuarioRepository.findByIdAndEmpresa_Id(logado.id(), logado.empresaId())
                .orElseThrow(() -> new IllegalArgumentException("Usuário logado não encontrado!"));
    }

    @Override
    public boolean isAdmin() {
        return "ROLE_ADMIN".equals(getUsuarioLogado().role());
    }

    @Override
    public List<UsuarioResponse> listarTodosUsuariosTable() {
        return usuarioRepository.findByEmpresa_Id(getUsuarioLogado().empresaId())
                .stream().map(UsuarioResponse::new).toList();
    }

    // Cadastro inicial: cria uma clínica e seu administrador na mesma transação.
    @Override
    @Transactional
    public CriarAdminResponse criarAdmin(CriarAdminRequest request) {
        if (secret == null || secret.isBlank() || !secret.equals(request.secretKey())) {
            throw new IllegalArgumentException("Chave de administrador inválida!");
        }
        if (request.razaoSocial() == null || request.razaoSocial().isBlank()
                || request.nomeFantasia() == null || request.nomeFantasia().isBlank()) {
            throw new IllegalArgumentException("Informe os dados da clínica!");
        }
        String cnpj = new CNPJ(request.cnpj()).toString().replaceAll("\\D", "");
        if (empresaRepository.existsByCnpj(cnpj)) {
            throw new IllegalArgumentException("CNPJ já cadastrado!");
        }
        if (usuarioRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("E-mail já cadastrado!");
        }

        Empresa empresa = new Empresa();
        empresa.setRazaoSocial(request.razaoSocial());
        empresa.setNomeFantasia(request.nomeFantasia());
        empresa.setCnpj(cnpj);
        empresa = empresaRepository.save(empresa);

        Usuario usuario = new Usuario(request);
        usuario.setEmpresa(empresa);
        usuario.setSenha(passwordEncoder.encode(request.senha()));
        usuarioRepository.save(usuario);
        return new CriarAdminResponse(usuario.getId(), "Empresa e administrador criados com sucesso!");
    }

    @Override
    @Transactional
    public UsuarioResponse salvarUsuario(UsuarioRequest request, Long id) {
        Usuario usuario;
        if (id == 0L) {
            if (usuarioRepository.existsByEmail(request.email())) {
                throw new IllegalArgumentException("E-mail já cadastrado!");
            }
            usuario = new Usuario(request);
            usuario.setEmpresa(getUsuarioEntidadeLogado().getEmpresa());
            usuario.setSenha(passwordEncoder.encode(request.senha()));
        } else {
            usuario = usuarioRepository.findByIdAndEmpresa_Id(id, getUsuarioLogado().empresaId())
                    .orElse(null);
            if (usuario == null) return null;
            if (usuarioRepository.existsByEmailAndIdNot(request.email(), id)) {
                throw new IllegalArgumentException("E-mail já cadastrado!");
            }
            usuario.setNome(request.nome());
            usuario.setCpf(new CPF(request.cpf()));
            usuario.setEmail(request.email());
            if (request.senha() != null && !request.senha().isBlank()) {
                usuario.setSenha(passwordEncoder.encode(request.senha()));
            }
        }
        return new UsuarioResponse(usuarioRepository.save(usuario));
    }

    @Override
    public UsuarioResponse buscarPorId(Long id) {
        Usuario usuario = usuarioRepository.findByIdAndEmpresa_Id(id, getUsuarioLogado().empresaId())
                .orElse(null);
        return usuario == null ? null : new UsuarioResponse(usuario);
    }

    @Override
    public UsuarioResponse buscarUsuarioLogado() {
        return new UsuarioResponse(getUsuarioEntidadeLogado());
    }

    @Override
    @Transactional
    public boolean atualizarStatus(EnumStatusUsuario status, Long id) {
        Usuario usuario = usuarioRepository.findByIdAndEmpresa_Id(id, getUsuarioLogado().empresaId())
                .orElse(null);
        if (usuario == null) return false;
        usuario.setStatus(status);
        usuarioRepository.save(usuario);
        return true;
    }

    @Override
    @Transactional
    public boolean atualizarRole(Long id, String role) {
        if (!"ROLE_ADMIN".equals(role) && !"ROLE_FISIOTERAPEUTA".equals(role)
                && !"ROLE_RECEPCAO".equals(role)) {
            throw new IllegalArgumentException("Perfil inválido!");
        }
        Usuario usuario = usuarioRepository.findByIdAndEmpresa_Id(id, getUsuarioLogado().empresaId())
                .orElse(null);
        if (usuario == null) return false;
        usuario.setRole(role);
        usuarioRepository.save(usuario);
        return true;
    }
}
