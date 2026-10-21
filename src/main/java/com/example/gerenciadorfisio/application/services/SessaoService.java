package com.example.gerenciadorfisio.application.services;

import com.example.gerenciadorfisio.domain.entities.EnumStatusSessao;
import com.example.gerenciadorfisio.domain.entities.Sessao;
import com.example.gerenciadorfisio.domain.repository.SessaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SessaoService {

    @Autowired
    private SessaoRepository sessaoRepository;

    public List<Sessao> listarTodos() {
        return sessaoRepository.findAll();
    }

    public Sessao buscarPorId(Long id) {
        return sessaoRepository.findById(id).orElse(null);
    }

    public Sessao salvarSessao(Sessao sessao) {
        sessao.validarSessao();
        return sessaoRepository.save(sessao);
    }

    public boolean atualizar(Long id, Sessao sessao) {
        Sessao sessaoBanco = buscarPorId(id);
        if (sessaoBanco == null) {
            return false;
        }
        sessao.validarSessao();
        sessaoBanco.setStatus(sessao.getStatus());
        sessaoBanco.setData(sessao.getData());
        sessaoBanco.setHorario(sessao.getHorario());
        sessaoBanco.setDescricao(sessao.getDescricao());
        sessaoBanco.setObservacoes(sessao.getObservacoes());
        sessaoBanco.setRealizada(sessao.getRealizada());
        sessaoRepository.save(sessaoBanco);
        return true;
    }

    public boolean atualizarStatus(Long id, EnumStatusSessao status) {
        Sessao sessaoBanco = buscarPorId(id);
        if (sessaoBanco == null) {
            return false;
        }
        sessaoBanco.setStatus(status);
        sessaoRepository.save(sessaoBanco);
        return true;
    }
}
