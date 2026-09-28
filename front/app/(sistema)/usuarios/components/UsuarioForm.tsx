'use client'

import Link from "next/link";
import { Usuario, UsuarioFormProps } from "../../../types/usuario";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function UsuarioForm({usuarioExistente}: UsuarioFormProps) {
  const router = useRouter();

  //professor fez
  const [usuario, setUsuario] = useState<Usuario>(
    usuarioExistente|| 
    new Usuario(null, "", "", "ATIVO", "", "")
  );

  //atualização de valor

  const handlerChange = (
    campo: "nome" | "email" | "cpf" | "senha",
    valor: string
  ) => {
    setUsuario(
      (valorAnterior) =>
        new Usuario(
          valorAnterior.id,
          campo === "nome" ? valor : valorAnterior.nome,
          campo === "email" ? valor : valorAnterior.email,
          valorAnterior.status,
          campo === "cpf" ? valor : valorAnterior.cpf,
          campo === "senha" ? valor : valorAnterior.senha
        )
    );
  };

 
  const handlerSalvar = async (formData : FormData) =>{

    //editar
    if(usuarioExistente){
        var dadosRetorno = await  
        axios.put<number>('http://localhost:8080/usuarios'+usuario.id,usuario);

        if(dadosRetorno.status==200){
            alert("Usuário foi salvo com sucesso!");
        }else{
            alert(dadosRetorno.data);

            return;
        }


        //atualizar
    }else{
        var dadosRetorno = await  axios.post<number>('http://localhost:8080/usuarios',usuario)

        if(dadosRetorno.status==200){
            alert("Usuário foi salvo com sucesso!");
        }else{
            alert(dadosRetorno.data);

            return;
        }
    
    }

    router.push("/usuarios");

    }

  return (
    <form action={handlerSalvar} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Nome */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Nome completo
          </label>

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

        {/* CPF */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            CPF
          </label>

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

        {/* E-mail */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            E-mail
          </label>

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

        {/* Senha */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Senha
          </label>

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

      {/* Botões */}
      <div className="flex items-center justify-end gap-4 border-t border-purple-100 pt-4">
        <Link
          href="/usuarios"
          className="rounded-xl border border-purple-200 px-5 py-3 text-center font-semibold text-purple-700 transition hover:bg-purple-50"
        >
          Cancelar
        </Link>

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
