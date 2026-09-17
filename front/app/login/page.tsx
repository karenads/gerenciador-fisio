'use client'

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
    const router = useRouter();

    const handlerLogin = async(formData: FormData) => {
        router.push("/home")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-purple-50 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-purple-700">
                        Entrar no sistema
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Acesse sua conta para continuar no sistema.
                    </p>
                </div>

                <form action={handlerLogin} className="space-y-6">

                    {/* E-mail */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-purple-900">
                            E-mail
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Digite seu e-mail"
                            className="w-full rounded-lg border border-purple-200 px-4 py-3 text-gray-700 outline-none transition duration-200 placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                        />
                    </div>

                    {/* Senha */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-purple-900">
                            Senha
                        </label>

                        <input
                            type="password"
                            name="senha"
                            placeholder="Digite sua senha"
                            className="w-full rounded-lg border border-purple-200 px-4 py-3 text-gray-700 outline-none transition duration-200 placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                        />
                    </div>

                    {/* Recuperar senha */}
                    <div className="flex justify-end">
                        <Link
                            href="/recuperar-senha"
                            className="text-sm font-semibold text-purple-600 transition hover:text-purple-800"
                        >
                            Esqueci minha senha
                        </Link>
                    </div>

                    {/* Botão entrar */}
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-purple-600 py-3 font-semibold text-white transition duration-200 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300"
                    >
                        Entrar
                    </button>

                </form>
            </div>
        </div>
    );
}