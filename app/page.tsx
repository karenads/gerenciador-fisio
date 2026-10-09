'use client'

import Link from "next/link";

export default function Home() {
  return (
    <>
      <header>
        <nav className="navbar">
          <a href="#inicio" className="logo">
            <div className="logo-icon">✚</div>
            FisioCare
          </a>

          <div className="nav-links">
            <a href="#inicio">Início</a>
            <a href="#historia">Nossa História</a>
            <a href="#funcionalidades">Funcionalidades</a>

        
            <Link href="/login" className="btn-login">Entrar</Link>
            
          </div>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-container">
            <div className="hero-content">
              <div className="hero-tag">
                Gestão inteligente para fisioterapia
              </div>

              <h1>
                Tecnologia que organiza,{" "}
                <span>cuidado que aproxima.</span>
              </h1>

              <p className="hero-description">
                Simplifique a rotina da sua clínica, organize seus
                atendimentos e acompanhe a evolução de cada paciente de
                forma próxima, humana e eficiente.
              </p>

              <div className="hero-buttons">
                <a href="#funcionalidades" className="btn-primary">
                  Conhecer o FisioCare
                </a>

                <a href="#historia" className="btn-secondary">
                  Nossa História
                </a>
              </div>
            </div>

            <div className="hero-card-wrapper">
              <div className="hero-circle"></div>

              <div className="hero-card">
                <div className="hero-card-top">
                  <div className="avatar">♡</div>

                  <div>
                    <div className="patient-name">
                      Acompanhamento do paciente
                    </div>
                    <div className="patient-info">FisioCare</div>
                  </div>
                </div>

                <div className="card-status">
                  <div className="status-title">
                    Evolução do tratamento
                  </div>

                  <div className="status-value">
                    Evolução positiva
                  </div>

                  <div className="progress-bar">
                    <div className="progress"></div>
                  </div>
                </div>

                <div className="card-status">
                  <div className="status-title">
                    Próxima sessão
                  </div>

                  <div className="status-value">
                    Hoje • 14:30
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="historia" id="historia">
          <div className="section-container">
            <div className="section-heading">
              <span>Nossa História</span>
              <h2>Tecnologia criada para cuidar</h2>
              <p>
                Organização para o profissional. Mais atenção para o
                paciente.
              </p>
            </div>

            <div className="story-content">
              <p>
                O <strong>FisioCare</strong> nasceu com a proposta de
                tornar o atendimento fisioterapêutico mais organizado,
                humano e próximo dos pacientes. A ideia surgiu da
                necessidade de facilitar a rotina de clínicas e
                profissionais de fisioterapia, centralizando informações
                importantes em um único sistema.
              </p>

              <p>
                O projeto busca unir{" "}
                <strong>tecnologia, empatia e dedicação</strong>,
                permitindo que os profissionais acompanhem cada paciente
                de forma mais cuidadosa, desde o cadastro inicial até a
                evolução do tratamento.
              </p>

              <p>
                Com o FisioCare, será possível organizar informações como
                dados dos pacientes, agendamentos, sessões realizadas,
                histórico de atendimento, observações e evolução clínica.
              </p>

              <p>
                Mais do que um sistema de gerenciamento, o FisioCare
                pretende valorizar o vínculo entre profissional e
                paciente. A tecnologia ajuda a reduzir tarefas
                administrativas e permite que o fisioterapeuta tenha mais
                tempo para aquilo que realmente importa:{" "}
                <strong>
                  cuidar das pessoas com atenção, empatia e dedicação.
                </strong>
              </p>
            </div>
          </div>
        </section>

        <section id="funcionalidades">
          <div className="section-container">
            <div className="section-heading">
              <span>Funcionalidades</span>
              <h2>Tudo em um só lugar</h2>
              <p>
                Ferramentas para organizar a rotina clínica e acompanhar
                cada paciente com mais cuidado.
              </p>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">♙</div>
                <h3>Pacientes</h3>
                <p>
                  Centralize os dados e informações importantes de cada
                  paciente.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">◫</div>
                <h3>Agendamentos</h3>
                <p>
                  Organize sessões e horários de forma simples e prática.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">✓</div>
                <h3>Sessões</h3>
                <p>
                  Registre sessões realizadas e informações relevantes do
                  atendimento.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">↗</div>
                <h3>Evolução clínica</h3>
                <p>
                  Acompanhe o progresso do paciente durante todo o
                  tratamento.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">✎</div>
                <h3>Observações</h3>
                <p>
                  Registre informações importantes para o acompanhamento
                  individual.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">♡</div>
                <h3>Cuidado humanizado</h3>
                <p>
                  Menos tempo com tarefas administrativas e mais tempo
                  dedicado ao paciente.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="purpose">
          <div className="purpose-content">
            <h2>Mais do que um sistema.</h2>

            <p>
              O FisioCare acredita que a tecnologia deve aproximar pessoas.
              Por isso, cada funcionalidade foi pensada para facilitar a
              rotina do profissional e contribuir para um atendimento mais
              organizado, atencioso e humano.
            </p>
          </div>
        </section>
      </main>

      <footer>
        <p>
          © 2026 <strong>FisioCare</strong> — Tecnologia que organiza,
          cuidado que aproxima.
        </p>
      </footer>

      <style jsx>{`
        :global(*) {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          scroll-behavior: smooth;
        }

        :global(body) {
          background: #fbfaff;
          color: #2d2936;
          font-family: Arial, Helvetica, sans-serif;
        }

        header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(117, 82, 200, 0.08);
        }

        .navbar {
          max-width: 1200px;
          margin: 0 auto;
          padding: 18px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #7552c8;
          font-size: 1.5rem;
          font-weight: 800;
        }

        .logo-icon {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          background: linear-gradient(135deg, #7552c8, #a88ae8);
          color: white;
          font-size: 22px;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .nav-links a {
          text-decoration: none;
          color: #6d6877;
          font-weight: 500;
          transition: 0.3s;
        }

        .nav-links a:hover {
          color: #7552c8;
        }

        .btn-login {
          background: #7552c8;
          color: white !important;
          padding: 11px 22px;
          border-radius: 12px;
          font-weight: 700 !important;
          box-shadow: 0 7px 20px rgba(117, 82, 200, 0.22);
        }

        .btn-login:hover {
          background: #5637a6;
          transform: translateY(-2px);
        }

        .hero {
          min-height: 100vh;
          padding: 140px 32px 80px;
          display: flex;
          align-items: center;
          background:
            radial-gradient(
              circle at 90% 20%,
              rgba(168, 138, 232, 0.22),
              transparent 32%
            ),
            linear-gradient(135deg, #fbfaff 0%, #f5f1ff 100%);
        }

        .hero-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          align-items: center;
          gap: 70px;
        }

        .hero-tag {
          display: inline-block;
          padding: 8px 14px;
          margin-bottom: 22px;
          border-radius: 50px;
          background: #eee8ff;
          color: #7552c8;
          font-size: 0.88rem;
          font-weight: 700;
        }

        .hero h1 {
          font-size: clamp(3rem, 5vw, 5rem);
          line-height: 1.05;
          margin-bottom: 24px;
        }

        .hero h1 span {
          color: #7552c8;
        }

        .hero-description {
          max-width: 600px;
          font-size: 1.1rem;
          color: #6d6877;
          line-height: 1.7;
          margin-bottom: 34px;
        }

        .hero-buttons {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .btn-primary,
        .btn-secondary {
          padding: 14px 24px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 700;
          transition: 0.3s;
        }

        .btn-primary {
          background: #7552c8;
          color: white;
          box-shadow: 0 12px 28px rgba(117, 82, 200, 0.25);
        }

        .btn-primary:hover {
          background: #5637a6;
          transform: translateY(-3px);
        }

        .btn-secondary {
          background: white;
          color: #7552c8;
          border: 1px solid #eee8ff;
        }

        .btn-secondary:hover {
          background: #eee8ff;
        }

        .hero-card-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-circle {
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            rgba(117, 82, 200, 0.18),
            rgba(168, 138, 232, 0.08)
          );
        }

        .hero-card {
          width: 360px;
          position: relative;
          z-index: 2;
          padding: 32px;
          background: rgba(255, 255, 255, 0.92);
          border-radius: 28px;
          border: 1px solid rgba(117, 82, 200, 0.1);
          box-shadow: 0 18px 45px rgba(85, 55, 166, 0.15);
        }

        .hero-card-top {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 26px;
        }

        .avatar {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #eee8ff;
          color: #7552c8;
          font-size: 24px;
        }

        .patient-name {
          font-weight: 700;
        }

        .patient-info {
          color: #6d6877;
          font-size: 0.85rem;
        }

        .card-status {
          margin-top: 18px;
          padding: 18px;
          border-radius: 16px;
          background: #f7f4ff;
        }

        .status-title {
          color: #6d6877;
          font-size: 0.8rem;
          margin-bottom: 7px;
        }

        .status-value {
          color: #7552c8;
          font-size: 1.15rem;
          font-weight: 700;
        }

        .progress-bar {
          width: 100%;
          height: 9px;
          margin-top: 12px;
          border-radius: 20px;
          background: #ded5f5;
          overflow: hidden;
        }

        .progress {
          width: 74%;
          height: 100%;
          background: linear-gradient(90deg, #7552c8, #a88ae8);
        }

        section {
          padding: 100px 32px;
        }

        .section-container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .section-heading {
          max-width: 700px;
          margin: 0 auto 55px;
          text-align: center;
        }

        .section-heading span {
          color: #7552c8;
          font-size: 0.85rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.4px;
        }

        .section-heading h2 {
          font-size: 2.6rem;
          margin: 12px 0 16px;
        }

        .section-heading p {
          color: #6d6877;
        }

        .historia {
          background: white;
        }

        .story-content {
          max-width: 900px;
          margin: 0 auto;
          padding: 50px;
          border-radius: 24px;
          background: linear-gradient(135deg, #f7f4ff, #ffffff);
          border-left: 5px solid #7552c8;
          box-shadow: 0 18px 45px rgba(85, 55, 166, 0.08);
        }

        .story-content p {
          margin-bottom: 20px;
          color: #6d6877;
          line-height: 1.8;
        }

        .story-content p:last-child {
          margin-bottom: 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
        }

        .feature-card {
          background: white;
          padding: 28px;
          border-radius: 20px;
          border: 1px solid rgba(117, 82, 200, 0.08);
          box-shadow: 0 8px 25px rgba(48, 36, 77, 0.06);
          transition: 0.3s;
        }

        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(117, 82, 200, 0.12);
        }

        .feature-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
          border-radius: 14px;
          background: #eee8ff;
          color: #7552c8;
          font-size: 20px;
        }

        .feature-card h3 {
          margin-bottom: 10px;
        }

        .feature-card p {
          color: #6d6877;
          line-height: 1.6;
          font-size: 0.93rem;
        }

        .purpose {
          margin: 60px 32px 100px;
          padding: 75px 32px;
          border-radius: 32px;
          background: linear-gradient(135deg, #5637a6, #7552c8);
          color: white;
          text-align: center;
        }

        .purpose-content {
          max-width: 780px;
          margin: 0 auto;
        }

        .purpose h2 {
          font-size: 2.8rem;
          margin-bottom: 18px;
        }

        .purpose p {
          color: rgba(255, 255, 255, 0.88);
          line-height: 1.8;
        }

        footer {
          padding: 40px 32px;
          background: #241c38;
          color: #d7d0e7;
          text-align: center;
        }

        footer strong {
          color: white;
        }

        @media (max-width: 900px) {
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero-description {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-buttons {
            justify-content: center;
          }

          .hero-tag {
            margin-left: auto;
            margin-right: auto;
          }

          .nav-links a:not(.btn-login) {
            display: none;
          }

          .hero-card-wrapper {
            margin-top: 35px;
          }
        }

        @media (max-width: 500px) {
          .navbar {
            padding: 14px 18px;
          }

          .logo {
            font-size: 1.2rem;
          }

          .hero {
            padding-left: 20px;
            padding-right: 20px;
          }

          .hero-card {
            width: 100%;
          }

          .hero-circle {
            width: 300px;
            height: 300px;
          }

          .story-content {
            padding: 28px;
          }

          section {
            padding-left: 20px;
            padding-right: 20px;
          }

          .purpose {
            margin-left: 20px;
            margin-right: 20px;
          }
        }
      `}</style>
    </>
  );
}