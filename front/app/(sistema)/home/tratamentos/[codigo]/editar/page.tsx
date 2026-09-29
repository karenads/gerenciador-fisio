'use client'

import Link from "@/node_modules/next/link";
import { useParams, useRouter } from "@/node_modules/next/navigation";
import { useEffect, useState } from "react";
import axios from "@/node_modules/axios/index";

import TratamentoForm from "@/app/(sistema)/home/tratamentos/components/TratamentoForm";
import { Tratamento } from "@/app/types/tratamento";

export default function EditarTratamento() {

  const parametro = useParams();
  const codigo = Number(parametro.codigo);

  const router = useRouter();

  const [tratamento, setTratamento] = useState<Tratamento | null>(null);

  useEffect(() => {
    buscarDados();
  }, []);

 const buscarDados = async () => {
  try {

    // COLOCAR ENDPOINT DO GET POR CÓDIGO AQUI DEPOIS
    const url: string = "";

    // Enquanto não tiver endpoint, não faz a requisição
    if (!url) {
      return;
    }

    const token = localStorage.getItem("token");

    const valorTratamentoBack = await axios.get<Tratamento>(
      url + codigo,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

      if (valorTratamentoBack.status == 200) {

        setTratamento(valorTratamentoBack.data);

      } else {

        router.push("/home/tratamentos");

      }

    } catch (error) {

      alert("Erro ao buscar tratamento!");

      router.push("/home/tratamentos");

    }
  };

  if (!tratamento) {

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 p-8">

        <p className="text-gray-600">
          Carregando dados do tratamento...
        </p>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6 py-10 md:px-10">

      <div className="mx-auto w-full max-w-4xl">

        {/* Cabeçalho */}
        <div className="mb-8">

          <Link
            href="/home/tratamentos"
            className="inline-flex items-center gap-2 text-sm font-medium text-purple-700 transition hover:text-purple-900"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-purple-200 bg-white transition hover:border-purple-400">
              ←
            </span>

            Voltar para tratamentos
          </Link>

          <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-purple-600">
            FisioCare
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-800 md:text-4xl">
            Editar tratamento {codigo}
          </h1>

          <p className="mt-2 text-gray-600">
            Atualize os dados do tratamento.
          </p>

        </div>

        {/* Formulário */}
        <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm md:p-8">

          <TratamentoForm tratamentoExistente={tratamento} />

        </div>

      </div>

    </div>
  );
}