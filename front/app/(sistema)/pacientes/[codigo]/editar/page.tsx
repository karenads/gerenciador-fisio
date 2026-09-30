"use client";

import Link from "@/node_modules/next/link";
import PacienteForm from "@/app/(sistema)/home/pacientes/components/PacienteForm";
import { useParams, useRouter } from "@/node_modules/next/navigation";
import { useEffect, useState } from "react";
import { Paciente } from "@/app/types/paciente";
import axios from "@/node_modules/axios/index";

export default function EditarPaciente() {
  const parametro = useParams();
  const codigo = Number(parametro.codigo);

  const [paciente, setPaciente] = useState<Paciente | null>(null);

  const router = useRouter();

  useEffect(() => {
    buscarDados();
  }, []);

  const buscarDados = async () => {
    try {
      const token = localStorage.getItem("token");

      const valorPacienteBack = await axios.get<Paciente>(
        "http://localhost:8080/pacientes/" + codigo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (valorPacienteBack.status == 200) {
        setPaciente(valorPacienteBack.data);
      } else {
        router.push("/home/pacientes");
      }

    } catch (error) {
      console.error(error);
      alert("Erro ao buscar paciente!");
      router.push("/home/pacientes");
    }
  };

  if (!paciente) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 p-8">
        <p className="text-gray-600">
          Carregando dados...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6 py-10 md:px-10">
      <div className="mx-auto max-w-4xl">

        <div className="mb-10">
          <Link
            href="/home/pacientes"
            className="inline-flex items-center gap-2 text-sm font-medium text-purple-700 transition hover:text-purple-900"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-purple-200 bg-white transition hover:border-purple-400">
              ←
            </span>

            Voltar para Listagem
          </Link>

          <div className="mt-6">
            <p className="mb-2 text-sm font-bold tracking-[3px] text-purple-600">
              FISIOCARE
            </p>

            <h1 className="text-4xl font-black text-gray-800 md:text-5xl">
              Editar Paciente {codigo}
            </h1>

            <p className="mt-3 text-gray-600">
              Preencha os dados para editar o paciente.
            </p>
          </div>
        </div>

        <div>
          <PacienteForm pacienteExistente={paciente} />
        </div>

      </div>
    </div>
  );
}