package com.example.gerenciadorfisio.application.services;

import com.example.gerenciadorfisio.application.ports.SessaoPorta;
import com.example.gerenciadorfisio.application.ports.UsuarioPorta;
import com.example.gerenciadorfisio.application.ports.TratamentoPorta;

import com.example.gerenciadorfisio.application.DTOs.SessaoRequest;
import com.example.gerenciadorfisio.application.DTOs.SessaoResponse;
import com.example.gerenciadorfisio.domain.entities.Sessao;
import com.example.gerenciadorfisio.domain.entities.Tratamento;
import com.example.gerenciadorfisio.domain.entities.EnumStatusSessao;
import com.example.gerenciadorfisio.domain.repository.SessaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class SessaoService implements SessaoPorta {

    @Autowired
    private SessaoRepository sessaoRepository;
    @Autowired
    private UsuarioPorta usuarioService;
    @Autowired
    private TratamentoPorta tratamentoService;

    @Transactional(readOnly = true)
    public List<SessaoResponse> listarTodos() {
        // A empresa vem do JWT validado, nunca de parâmetros do cliente.
        Long empresaId = usuarioService.getUsuarioLogado().empresaId();
        List<Sessao> sessoes = sessaoRepository.findByEmpresa_Id(empresaId);
        return sessoes.stream().map(SessaoResponse::new).toList();
    }

    @Transactional(readOnly = true)
    public Sessao buscarPorId(Long id) {
        return sessaoRepository.findByIdAndEmpresa_Id(id, usuarioService.getUsuarioLogado().empresaId())
                .orElse(null);
    }

    @Transactional(readOnly = true)
    public SessaoResponse buscarResponsePorId(Long id) {
        Sessao s = buscarPorId(id);
        return s == null ? null : new SessaoResponse(s);
    }

    private void preencher(Sessao s, SessaoRequest request) {
        if (request.tratamentoId() == null) {
            throw new IllegalArgumentException("Informe o tratamento da sessão!");
        }
        Tratamento t = tratamentoService.buscarPorId(request.tratamentoId());
        if (t == null) {
            throw new IllegalArgumentException("Tratamento não encontrado ou sem permissão!");
        }
        s.setTratamento(t);
        s.setData(request.data());
        s.setHorario(request.horario());
        s.setDescricao(request.descricao());
        s.setObservacoes(request.observacoes());
        s.setRealizada(request.realizada());
        s.validarSessao();
    }

    @Transactional
    public SessaoResponse salvarSessao(SessaoRequest request) {
        Sessao s = new Sessao();
        preencher(s, request);
        s.setResponsavel(usuarioService.getUsuarioEntidadeLogado());
        s.setEmpresa(usuarioService.getUsuarioEntidadeLogado().getEmpresa());
        return new SessaoResponse(sessaoRepository.save(s));
    }

    @Transactional
    public boolean atualizar(Long id, SessaoRequest request) {
        Sessao s = buscarPorId(id);
        if (s == null) return false;
        preencher(s, request);
        sessaoRepository.save(s);
        return true;
    }

    @Transactional
    public boolean atualizarStatus(Long id, EnumStatusSessao status) {
        Sessao s = buscarPorId(id);
        if (s == null) return false;
        s.setStatus(status);
        sessaoRepository.save(s);
        return true;
    }
}
