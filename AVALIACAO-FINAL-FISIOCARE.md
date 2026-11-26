# FisioCare — roteiro da avaliação final

## Preparação
1. Configure `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET` e `ADMIN_SECRET` no ambiente do backend (Render: **Environment**).
2. Para teste local com Docker, use `docker compose up -d --build`. O Compose fornece valores **apenas de demonstração** e banco local `fisiocare`.
3. Use um **banco de teste separado** para a demonstração de inicialização. **Não apague o banco real do Render**.
4. Execute o JavaFX em `front/back`; execute o Next.js em `front` usando `npm ci` e `npm run dev`.
5. O JavaFX utiliza `http://localhost:8080`: para cadastrar no Render é necessário apontar a API conscientemente, sem expor as chaves.

## 1. Bootstrap: clínica e primeiro administrador
- Em banco vazio, a tela JavaFX cadastra Razão Social, Nome Fantasia, CNPJ e o primeiro usuário ADMIN.
- Informe a chave configurada em `ADMIN_SECRET` no campo "Chave do admin" (a chave local de acesso ao menu é distinta).
- O backend valida o CNPJ e associa o ADMIN à nova empresa.
- É possível criar uma segunda clínica com um segundo administrador e outro CNPJ, sem INSERT manual.
- Faça login no React em `/login` com cada administrador.

## 2. Autenticação e proteção
- `POST /auth/login` gera um JWT; `JwtFilter` exige Bearer nas rotas privadas.
- Swagger: `/swagger-ui/index.html`. Faça uma chamada a `GET /pacientes` sem token e mostre **401**; clique **Authorize**, informe o JWT e repita.
- Para demonstrar o teste de desligar segurança pedido pelo professor: a exigência de token existe **tanto na configuração Spring Security como no JwtFilter**. Faça esse teste apenas em ambiente descartável, desative temporariamente ambos e restaure em seguida. Nunca publique um backend sem essas proteções.
- `POST /auth/logout` revoga o JWT no banco. Revogar o token, e não apenas reiniciar a API, produz um 401 para o teste do interceptor.

## 3. Multiempresa (principal teste)
1. Crie Clínica A e Clínica B via JavaFX.
2. Autentique como ADMIN A; crie Paciente A, Tratamento A e Sessão A na API/React.
3. Faça logout, entre como ADMIN B e consulte `GET /pacientes`, `GET /tratamentos`, `GET /sessoes`.
4. Tente `GET /pacientes/{idA}` no Swagger: recebe 404 para registro de outra empresa. Repita com PUT/PATCH/DELETE.
5. O backend usa `UsuarioLogado.empresaId()` derivado do token validado. A empresa nunca é aceita do formulário.
6. Tratamento só usa Paciente da mesma empresa; Sessão só usa Tratamento da mesma empresa.
7. ADMIN acessa todos os registros **da sua clínica**, não os de outras clínicas.

## 4. Redux + Axios
- `front/app/redux/store.ts`: junta `authSlice` e `pacienteSlice`.
- `authSlice`: mantém JWT e usuário exclusivamente na store em memória.
- `pacienteSlice`: mantém lista de pacientes.
- `front/app/services/api.ts`: interceptor de requisição acrescenta Bearer; ao receber 401 faz logout e limpa pacientes.
- Teste: entrar, revogar token via API ou logout com outro cliente, tentar listar pacientes: volta para login.

## 5. Integração externa (ViaCEP)
- Formulário de pacientes: digitar CEP, clicar "Buscar endereço".
- `GET /pacientes/cep/{cep}` acessa ViaCEP no backend; o endereço volta ao formulário React.
- Mostre o JSON no Swagger e o campo preenchido na tela.

## 6. Camadas e JPA — explicação oral curta
- **domain/entities**: Usuario, Empresa, Paciente, Tratamento, Sessao; relacionamentos JPA.
- **domain/repository**: consultas ao PostgreSQL por empresa.
- **application/ports**: contratos (interfaces) entre Controller e Service.
- **application/services**: regras de negócio, autorização e transações.
- **presetation**: Controller REST e DTOs de entrada/saída.
- **infra/configuration**: JWT, Spring Security, Swagger, bootstrap de registros anteriores.
- **JPA**: empresa possui múltiplos usuários/pacientes/tratamentos/sessões; paciente possui tratamentos; tratamento possui sessões.
- **Redux**: Store = estado central; Slice = conjunto de estado e reducers; Reducer = atualiza estado a partir de actions.

## 7. Cuidados com banco antigo
- `EmpresaLegadaInitializer` associa registros existentes sem empresa a uma clínica legada, preservando-os.
- `ddl-auto=update` não substitui uma estratégia de migração em produção: faça backup e teste antes de usar um banco com dados importantes.
- Senhas antigas em texto simples são convertidas para BCrypt no primeiro login válido; novos cadastros e recuperações usam BCrypt.
- Revogue a senha de banco e chaves de JWT/ADMIN que já foram compartilhadas ou publicadas no Git.
- O fluxo de recuperação atual ainda precisa de entrega segura do token por e-mail antes de uso em produção; utilize **ViaCEP** na demonstração de integração externa.
