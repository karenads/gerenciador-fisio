"use client";

/*
  Importa a classe Tratamento, que representa
  a estrutura dos dados de um tratamento.

  TratamentoFormProps define as propriedades
  que este formulário pode receber.
*/
import { Tratamento, TratamentoFormProps } from "@/app/types/tratamento";

/*
  Axios é utilizado para realizar requisições HTTP
  entre o frontend e o backend Spring Boot.
*/
import axios from "@/node_modules/axios/index";

/*
  Link permite navegar entre páginas
  utilizando o sistema de rotas do Next.js.
*/
import Link from "@/node_modules/next/link";

/*
  useRouter permite realizar navegação
  programaticamente através do código.
*/
import { useRouter } from "@/node_modules/next/navigation";

/*
  useState permite armazenar e atualizar
  os dados do tratamento dentro do componente.
*/
import { useState } from "react";

/*
  Formulário utilizado tanto para:
  - cadastrar um novo tratamento
  - editar um tratamento existente
*/
export default function TratamentoForm({
  tratamentoExistente,
}: TratamentoFormProps) {
  /*
    Inicializa o sistema de navegação
    do Next.js.
  */
  const router = useRouter();

  /*
    ESTADO DO TRATAMENTO

    Se tratamentoExistente tiver sido recebido,
    significa que estamos editando um tratamento.

    Caso contrário, cria um novo tratamento
    com campos vazios, números iniciando em 0
    e status ATIVO.
  */
  const [tratamento, setTratamento] = useState<Tratamento>(
    tratamentoExistente || new Tratamento(null, "", "", "", "", 0, 0, "ATIVO"),
  );

  /*
    ALTERAÇÃO DOS CAMPOS DE TEXTO

    campo informa qual propriedade deve ser alterada.
    valor contém o novo valor digitado pelo usuário.
  */
  const handlerChange = (
    campo: "nome" | "descricao" | "dataInicio" | "dataFinal",
    valor: string,
  ) => {
    /*
      Atualiza o estado criando um novo objeto Tratamento.

      valorAnterior representa os dados
      antes da alteração.

      Apenas o campo selecionado recebe
      o novo valor.
  */
    setTratamento(
      (valorAnterior) =>
        new Tratamento(
          // Mantém o ID atual.
          valorAnterior.id,

          // Altera o nome quando necessário.
          campo === "nome" ? valor : valorAnterior.nome,

          // Altera a descrição quando necessário.
          campo === "descricao" ? valor : valorAnterior.descricao,

          // Altera a data inicial quando necessário.
          campo === "dataInicio" ? valor : valorAnterior.dataInicio,

          // Altera a data final quando necessário.
          campo === "dataFinal" ? valor : valorAnterior.dataFinal,

          // Mantém o total de sessões.
          valorAnterior.totalSessoes,

          // Mantém a quantidade de sessões realizadas.
          valorAnterior.sessoesRealizadas,

          // Mantém o status atual.
          valorAnterior.status,
        ),
    );
  };

  /*
    ALTERAÇÃO DOS CAMPOS NUMÉRICOS

    Esta função é separada porque
    totalSessoes e sessoesRealizadas
    são do tipo number.
  */
  const handlerChangeNumero = (
    campo: "totalSessoes" | "sessoesRealizadas",
    valor: number,
  ) => {
    setTratamento(
      (valorAnterior) =>
        new Tratamento(
          // Mantém os dados que não foram alterados.
          valorAnterior.id,
          valorAnterior.nome,
          valorAnterior.descricao,
          valorAnterior.dataInicio,
          valorAnterior.dataFinal,

          /*
            Se o campo alterado for totalSessoes,
            utiliza o novo valor.

            Caso contrário, mantém o valor anterior.
          */
          campo === "totalSessoes" ? valor : valorAnterior.totalSessoes,

          /*
            Faz a mesma verificação
            para sessoesRealizadas.
          */
          campo === "sessoesRealizadas"
            ? valor
            : valorAnterior.sessoesRealizadas,

          // Mantém o status atual.
          valorAnterior.status,
        ),
    );
  };

  /*
    SALVAR TRATAMENTO

    Esta função é executada quando
    o formulário é enviado.

    Ela decide entre:
    - PUT para edição
    - POST para cadastro
  */
  const handlerSalvar = async (formData: FormData) => {
    try {
      /*
        Recupera o token armazenado
        no localStorage do navegador.
      */
      const token = localStorage.getItem("token");

      /* ==================== EDITAR ==================== */

      /*
        Se tratamentoExistente tiver valor,
        significa que o formulário está
        sendo utilizado para edição.
      */
      if (tratamentoExistente) {
        /*
          AXIOS PUT

          Atualiza um tratamento existente.

          O ID é colocado na URL
          para identificar o registro.

          Exemplo:
          PUT http://localhost:8080/tratamentos/4

          O objeto tratamento é enviado
          no corpo da requisição.
        */
        const dadosRetorno = await axios.put(
          "http://localhost:8080/tratamentos/" + tratamento.id,
          tratamento,
          {
            headers: {
              /*
                Envia o token no cabeçalho
                Authorization.
              */
              Authorization: "Bearer " + token,
            },
          },
        );

        /*
          HTTP 200 indica que a atualização
          foi realizada com sucesso.
        */
        if (dadosRetorno.status == 200) {
          alert("Tratamento foi atualizado com sucesso!");
        } else {
          alert(dadosRetorno.data);

          return;
        }

        /* ==================== CADASTRAR ==================== */
      } else {
        /*
          AXIOS POST

          Cria um novo tratamento no backend.

          POST:
          http://localhost:8080/tratamentos
        */
        const dadosRetorno = await axios.post(
          "http://localhost:8080/tratamentos",
          tratamento,
          {
            headers: {
              // Envia o token para autenticação.
              Authorization: "Bearer " + token,
            },
          },
        );

        /*
          Considera sucesso caso o backend
          retorne HTTP 200 ou 201.
        */
        if (dadosRetorno.status == 200 || dadosRetorno.status == 201) {
          alert("Tratamento foi salvo com sucesso!");
        } else {
          alert(dadosRetorno.data);

          return;
        }
      }

      /*
        Depois de cadastrar ou editar,
        redireciona para a nova rota
        da listagem de tratamentos.

        Como tratamentos agora está
        diretamente dentro de (sistema),
        a rota correta é /tratamentos.
      */
      router.push("/tratamentos");

      /*
        Solicita uma atualização da rota.
      */
      router.refresh();
    } catch (error) {
      // Mostra o erro no console.
      console.error(error);

      // Informa o usuário.
      alert("Erro ao salvar tratamento!");
    }
  };

  return (
    /*
      Quando o formulário é enviado,
      handlerSalvar é executado.
    */
    <form action={handlerSalvar} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* ==================== NOME ==================== */}

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Nome do tratamento
          </label>

          <input
            name="nome"
            // Valor atual armazenado no estado.
            value={tratamento.nome}
            // Atualiza o nome quando o usuário digita.
            onChange={(e) => handlerChange("nome", e.target.value)}
            required
            type="text"
            placeholder="Digite o nome do tratamento"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        {/* ==================== DATA DE INÍCIO ==================== */}

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Data de início
          </label>

          <input
            name="dataInicio"
            value={tratamento.dataInicio}
            onChange={(e) => handlerChange("dataInicio", e.target.value)}
            required
            type="datetime-local"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        {/* ==================== DATA FINAL ==================== */}

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Data final
          </label>

          <input
            name="dataFinal"
            value={tratamento.dataFinal}
            onChange={(e) => handlerChange("dataFinal", e.target.value)}
            type="datetime-local"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        {/* ==================== TOTAL DE SESSÕES ==================== */}

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Total de sessões
          </label>

          <input
            name="totalSessoes"
            value={tratamento.totalSessoes}
            /*
              e.target.value vem do input.

              Number transforma esse valor
              para o tipo number.
            */
            onChange={(e) =>
              handlerChangeNumero("totalSessoes", Number(e.target.value))
            }
            min={0}
            type="number"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        {/* ==================== SESSÕES REALIZADAS ==================== */}

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Sessões realizadas
          </label>

          <input
            name="sessoesRealizadas"
            value={tratamento.sessoesRealizadas}
            onChange={(e) =>
              handlerChangeNumero("sessoesRealizadas", Number(e.target.value))
            }
            min={0}
            type="number"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        {/* ==================== DESCRIÇÃO ==================== */}

        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700">
            Descrição
          </label>

          <textarea
            name="descricao"
            value={tratamento.descricao}
            onChange={(e) => handlerChange("descricao", e.target.value)}
            rows={4}
            placeholder="Descreva o tratamento..."
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>
      </div>

      {/* ==================== BOTÕES ==================== */}

      <div className="flex items-center justify-end gap-4 border-t border-purple-100 pt-4">
        {/*
          CANCELAR

          Como a pasta tratamentos foi movida
          para diretamente dentro de (sistema),
          a rota correta agora é /tratamentos.
        */}
        <Link
          href="/tratamentos"
          className="rounded-xl border border-purple-200 px-5 py-3 text-center font-semibold text-purple-700 transition hover:bg-purple-50"
        >
          Cancelar
        </Link>

        {/*
          SALVAR

          type="submit" envia o formulário
          e executa handlerSalvar.
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
