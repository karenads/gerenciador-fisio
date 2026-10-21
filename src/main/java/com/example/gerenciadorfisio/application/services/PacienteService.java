package com.example.gerenciadorfisio.application.services;

import com.example.gerenciadorfisio.domain.entities.EnumStatusPaciente;
import com.example.gerenciadorfisio.domain.entities.Paciente;
import com.example.gerenciadorfisio.domain.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PacienteService {

    @Autowired
    private PacienteRepository pacienteRepository;

    public List<Paciente> listarTodos() {
        return pacienteRepository.findAll();
    }

    public Paciente buscarPorId(Long id) {
        return pacienteRepository.findById(id).orElse(null);
    }

    public Paciente salvarPaciente(Paciente paciente) {
        validarPaciente(paciente);
        return pacienteRepository.save(paciente);
    }

    public boolean atualizar(Long id, Paciente paciente) {
        Paciente pacienteBanco = buscarPorId(id);
        if (pacienteBanco == null) {
            return false;
        }
        validarPaciente(paciente);
        pacienteBanco.setStatus(paciente.getStatus());
        pacienteBanco.setNome(paciente.getNome());
        pacienteBanco.setCpf(paciente.getCpf());
        pacienteBanco.setTelefone(paciente.getTelefone());
        pacienteBanco.setEmail(paciente.getEmail());
        pacienteBanco.setDataNascimento(paciente.getDataNascimento());
        pacienteBanco.setEndereco(paciente.getEndereco());
        pacienteBanco.setObservacoes(paciente.getObservacoes());
        pacienteRepository.save(pacienteBanco);
        return true;
    }

    public boolean atualizarStatus(Long id, EnumStatusPaciente status) {
        Paciente pacienteBanco = buscarPorId(id);
        if (pacienteBanco == null) {
            return false;
        }
        pacienteBanco.setStatus(status);
        pacienteRepository.save(pacienteBanco);
        return true;
    }

    private void validarPaciente(Paciente paciente) {
        // Valida os campos recebidos antes de salvar.
        paciente.setCpf(paciente.getCpf());
        paciente.setTelefone(paciente.getTelefone());
        paciente.setEmail(paciente.getEmail());
        paciente.setDataNascimento(paciente.getDataNascimento());
    }
}
