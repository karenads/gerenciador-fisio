package com.example.gerenciadorfisio.configuration;

import com.example.gerenciadorfisio.domain.entities.*;
import com.example.gerenciadorfisio.domain.repository.*;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class EmpresaLegadaInitializer implements ApplicationRunner {

    private final EmpresaRepository empresaRepository;
    private final UsuarioRepository usuarioRepository;
    private final PacienteRepository pacienteRepository;
    private final TratamentoRepository tratamentoRepository;
    private final SessaoRepository sessaoRepository;

    public EmpresaLegadaInitializer(EmpresaRepository empresaRepository,
                                    UsuarioRepository usuarioRepository,
                                    PacienteRepository pacienteRepository,
                                    TratamentoRepository tratamentoRepository,
                                    SessaoRepository sessaoRepository) {
        this.empresaRepository = empresaRepository;
        this.usuarioRepository = usuarioRepository;
        this.pacienteRepository = pacienteRepository;
        this.tratamentoRepository = tratamentoRepository;
        this.sessaoRepository = sessaoRepository;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        // Na primeira execução, associa os registros antigos à clínica legada.
        var usuarios = usuarioRepository.findAll();
        if (usuarios.isEmpty()) return;

        var antigos = usuarios.stream().filter(u -> u.getEmpresa() == null).toList();
        Empresa legada = empresaRepository.findAll().stream()
                .filter(e -> "Clínica anterior à multiempresa".equals(e.getRazaoSocial()))
                .findFirst().orElse(null);

        if (!antigos.isEmpty()) {
            if (legada == null) {
                legada = new Empresa();
                legada.setRazaoSocial("Clínica anterior à multiempresa");
                legada.setNomeFantasia("FisioCare - dados anteriores");
                legada = empresaRepository.save(legada);
            }
            for (Usuario u : antigos) u.setEmpresa(legada);
        }
        for (Paciente p : pacienteRepository.findAll()) {
            if (p.getEmpresa() == null) {
                p.setEmpresa(p.getResponsavel() == null ? legada : p.getResponsavel().getEmpresa());
            }
        }
        for (Tratamento t : tratamentoRepository.findAll()) {
            if (t.getEmpresa() == null) {
                Empresa e = t.getResponsavel() == null ? null : t.getResponsavel().getEmpresa();
                if (e == null && t.getPaciente() != null) e = t.getPaciente().getEmpresa();
                t.setEmpresa(e == null ? legada : e);
            }
        }
        for (Sessao s : sessaoRepository.findAll()) {
            if (s.getEmpresa() == null) {
                Empresa e = s.getResponsavel() == null ? null : s.getResponsavel().getEmpresa();
                if (e == null && s.getTratamento() != null) e = s.getTratamento().getEmpresa();
                s.setEmpresa(e == null ? legada : e);
            }
        }
    }
}
