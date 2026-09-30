'use client'

/*
  Link permite navegar entre as páginas do Next.js.
  Usuario define a estrutura dos dados do usuário.
  UsuarioFormProps define as propriedades recebidas pelo formulário.
*/
import Link from "next/link";
import { Usuario, UsuarioFormProps } from "../../../types/usuario";

// useState permite armazenar e atualizar os dados do formulário.
import { useState } from "react";

// useRouter permite navegar entre páginas através do código.
import { useRouter } from "next/navigation";

// Axios realiza as requisições HTTP para o backend Spring Boot.
import axios from "axios";

/*
  Formulário utilizado tanto para cadastrar quanto
  para editar usuários.

  usuarioExistente é uma propriedade opcional.
  Se existir, estamos editando um usuário.
  Caso contrário, estamos cadastrando.
*/
export default function UsuarioForm({ usuarioExistente }: UsuarioFormProps) {

  // Inicializa o sistema de navegação do Next.js.
  const router = useRouter();

  /*
    ESTADO DO USUÁRIO

    useState armazena os dados preenchidos no formulário.

    Se usuarioExistente tiver sido recebido, utiliza
    seus dados para preencher os campos.

    Caso contrário, cria um novo usuário com:
    - ID null, pois ainda não foi cadastrado;
    - campos de texto vazios;
    - status inicial ATIVO.

    <Usuario> define o tipo dos dados armazenados.
  */
  const [usuario, setUsuario] = useState<Usuario>(
    usuarioExistente ||
    new Usuario(null, "", "", "ATIVO", "", "")
  );

  /*
    ATUALIZAÇÃO DOS CAMPOS

    handlerChange é executada quando o usuário
    altera algum campo do formulário.

    campo: identifica qual propriedade será modificada.
    valor: contém o novo valor digitado.

    O TypeScript restringe campo aos valores:
    nome, email, cpf ou senha.
  */
  const handlerChange = (
    campo: "nome" | "email" | "cpf" | "senha",
    valor: string
  ) => {

    /*
      setUsuario atualiza o estado do componente.

      valorAnterior representa os dados anteriores.

      Um novo objeto Usuario é criado, alterando
      somente o campo selecionado e preservando
      as demais informações, incluindo ID e status.
    */
    setUsuario(
      (valorAnterior) =>
        new Usuario(
          valorAnterior.id,

          // Altera o nome somente quando campo for "nome".
          campo === "nome" ? valor : valorAnterior.nome,

          // Altera o e-mail somente quando campo for "email".
          campo === "email" ? valor : valorAnterior.email,

          // Preserva o status atual.
          valorAnterior.status,

          // Altera o CPF somente quando campo for "cpf".
          campo === "cpf" ? valor : valorAnterior.cpf,

          // Altera a senha somente quando campo for "senha".
          campo === "senha" ? valor : valorAnterior.senha
        )
    );
  };


  /*
    SALVAR USUÁRIO

    Função assíncrona executada quando o formulário
    é enviado.

    A função recebe formData, mas os dados enviados
    para o backend vêm do estado usuario, atualizado
    através dos eventos onChange dos inputs.

    Utiliza PUT para edição e POST para cadastro.
  */
  const handlerSalvar = async (formData: FormData) => {

    /*
      EDITAR

      Se usuarioExistente foi recebido,
      significa que estamos editando um usuário.
    */
    if (usuarioExistente) {

      /*
        AXIOS PUT

        Envia os dados atualizados para o backend.

        O ID é colocado na URL para identificar
        qual usuário deve ser atualizado.

        Exemplo:
        PUT http://localhost:8080/usuarios/3

        O objeto usuario é enviado no corpo da requisição.

        <number> informa ao TypeScript o tipo
        esperado no corpo da resposta.
      */
      var dadosRetorno = await
        axios.put<number>('http://localhost:8080/usuarios/' + usuario.id, usuario);

      /*
        Verifica se o backend respondeu com HTTP 200,
        indicando que a requisição foi bem-sucedida.
      */
      if (dadosRetorno.status == 200) {

        alert("Usuário foi salvo com sucesso!");

      } else {

        // Exibe a resposta caso o status seja diferente.
        alert(dadosRetorno.data);

        // Interrompe a função sem redirecionar.
        return;
      }


      /*
        CADASTRAR
  
        Se usuarioExistente não foi recebido,
        estamos cadastrando um novo usuário.
      */
    } else {

      /*
        AXIOS POST

        Envia o objeto usuario para o backend,
        solicitando a criação de um novo registro.

        POST http://localhost:8080/usuarios
      */
      var dadosRetorno = await axios.post<number>('http://localhost:8080/usuarios', usuario)

      /*
        Verifica se a resposta HTTP foi 200.

        Este código mantém a verificação utilizada
        originalmente no formulário.
      */
      if (dadosRetorno.status == 200) {

        alert("Usuário foi salvo com sucesso!");

      } else {

        alert(dadosRetorno.data);

        return;
      }

    }

    /*
      Após cadastrar ou editar com sucesso,
      redireciona para a listagem de usuários.
    */
    router.push("/usuarios");

  }

  /*
    INTERFACE DO FORMULÁRIO

    form action executa handlerSalvar quando
    o usuário envia o formulário.

    As classes Tailwind CSS definem a aparência,
    o espaçamento e a responsividade.
  */
  return (
    <form action={handlerSalvar} className="space-y-6">

      {/* Organiza os campos em uma ou duas colunas,
          dependendo do tamanho da tela. */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* ==================== NOME ==================== */}

        <div className="space-y-2">

          <label className="block text-sm font-semibold text-gray-700">
            Nome completo
          </label>

          {/*
            Input controlado pelo estado usuario.

            value apresenta o nome armazenado.
            onChange atualiza o nome quando o usuário digita.
            required torna o campo obrigatório.
          */}
          <input
            name="nome"
            value={usuario.nome}
            onChange={(e) => handlerChange("nome", e.target.value)}
            required
            type="text"
            placeholder="Digite o nome do usuário"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />

        </div>


        {/* ==================== CPF ==================== */}

        <div className="space-y-2">

          <label className="block text-sm font-semibold text-gray-700">
            CPF
          </label>

          {/* Atualiza somente a propriedade cpf do usuário. */}
          <input
            name="cpf"
            value={usuario.cpf}
            onChange={(e) => handlerChange("cpf", e.target.value)}
            required
            type="text"
            placeholder="000.000.000-00"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />

        </div>


        {/* ==================== E-MAIL ==================== */}

        <div className="space-y-2">

          <label className="block text-sm font-semibold text-gray-700">
            E-mail
          </label>

          {/*
            type="email" utiliza a validação
            básica de formato de e-mail do navegador.
          */}
          <input
            name="email"
            value={usuario.email}
            onChange={(e) => handlerChange("email", e.target.value)}
            required
            type="email"
            placeholder="usuario@email.com"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />

        </div>


        {/* ==================== SENHA ==================== */}

        <div className="space-y-2">

          <label className="block text-sm font-semibold text-gray-700">
            Senha
          </label>

          {/*
            type="password" oculta visualmente
            os caracteres digitados.

            O valor é armazenado no estado usuario
            através de handlerChange.
          */}
          <input
            name="senha"
            value={usuario.senha}
            onChange={(e) => handlerChange("senha", e.target.value)}
            required
            type="password"
            placeholder="Digite a senha"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />

        </div>

      </div>


      {/* ==================== BOTÕES ==================== */}

      <div className="flex items-center justify-end gap-4 border-t border-purple-100 pt-4">

        {/*
          CANCELAR

          Retorna para a listagem de usuários
          através do Link do Next.js.
        */}
        <Link
          href="/usuarios"
          className="rounded-xl border border-purple-200 px-5 py-3 text-center font-semibold text-purple-700 transition hover:bg-purple-50"
        >
          Cancelar
        </Link>

        {/*
          SALVAR

          type="submit" envia o formulário,
          executando a função handlerSalvar.
        */}
        <button
          type="submit"
          className="rounded-xl bg-purple-700 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-purple-800"
        >
          Salvar
        </button>

      </div>

    </form>
  );
}