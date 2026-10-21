package com.example.gerenciadorfisio.application.services;

import com.example.gerenciadorfisio.domain.entities.EnumStatusTratamento;
import com.example.gerenciadorfisio.domain.entities.Tratamento;
import com.example.gerenciadorfisio.domain.repository.TratamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TratamentoService {

    @Autowired
    private TratamentoRepository tratamentoRepository;

    public List<Tratamento> listarTodos() {
        return tratamentoRepository.findAll();
    }

    public Tratamento buscarPorId(Long id) {
        return tratamentoRepository.findById(id).orElse(null);
    }

    public Tratamento salvarTratamento(Tratamento tratamento) {
        tratamento.validarTratamento();
        return tratamentoRepository.save(tratamento);
    }

    public boolean atualizar(Long id, Tratamento tratamento) {
        Tratamento tratamentoBanco = buscarPorId(id);
        if (tratamentoBanco == null) {
            return false;
        }
        tratamento.validarTratamento();
        tratamentoBanco.setStatus(tratamento.getStatus());
        tratamentoBanco.setNome(tratamento.getNome());
        tratamentoBanco.setDescricao(tratamento.getDescricao());
        tratamentoBanco.setDataInicio(tratamento.getDataInicio());
        tratamentoBanco.setDataFinal(tratamento.getDataFinal());
        tratamentoBanco.setTotalSessoes(tratamento.getTotalSessoes());
        tratamentoBanco.setSessoesRealizadas(tratamento.getSessoesRealizadas());
        tratamentoRepository.save(tratamentoBanco);
        return true;
    }

    public boolean atualizarStatus(Long id, EnumStatusTratamento status) {
        Tratamento tratamentoBanco = buscarPorId(id);
        if (tratamentoBanco == null) {
            return false;
        }
        tratamentoBanco.setStatus(status);
        tratamentoRepository.save(tratamentoBanco);
        return true;
    }
}
