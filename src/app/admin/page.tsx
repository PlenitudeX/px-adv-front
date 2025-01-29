"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { FaCheckCircle, FaLock } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { UserAdv } from "@/utils/types";
import { user_db } from "@/utils/content";
import Link from "next/link";

const AdminPage = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState<UserAdv>({
    name: "",
    email: "",
    number: "",
    cpf: "",
    oab: "",
    pje: "",
    password: "",
    token: "",
    office: "",
  });
  const [step, setStep] = useState("2fa");

  useEffect(() => {
    if (user) {
      // Find the user in the database
      const userFound = user_db.find((u) => u.email === user.email);
      if (userFound) {
        setUserData(userFound);
      } else {
        console.log("User not found in the database");
      }
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // const { name, email, number, cpf, oab, pje, password, token, office } = userData;
    e.preventDefault();
    alert("Dados salvos com sucesso!");
  };
  return (
    <main className="flex w-full h-screen mt-2">
      
      <div className="w-2/3">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Olá, {userData.name}
        </h1>
        <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Como gerar Token do Gmail</h1>
      
      <div className="flex justify-center space-x-4 mb-4">
        <button 
          className={`px-4 py-2 rounded ${step === "2fa" ? "bg-blue-600 text-white" : "bg-gray-200"}`} 
          onClick={() => setStep("2fa")}>
          1️⃣ Ativar 2FA
        </button>
        <button 
          className={`px-4 py-2 rounded ${step === "app-password" ? "bg-blue-600 text-white" : "bg-gray-200"}`} 
          onClick={() => setStep("app-password")}>
          2️⃣ Gerar Senha de App
        </button>
      </div>

      {step === "2fa" && (
        <div className="p-4 border rounded shadow-md bg-white">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaLock className="text-blue-500" /> Ativar Autenticação de Dois Fatores (2FA)
          </h2>
          <ol className="list-decimal list-inside space-y-2 mt-2">
            <li>Acesse <Link href="https://myaccount.google.com/" target="_blank" className="text-blue-500 underline">Minhas Contas Google</Link></li>
            <li>No menu lateral, clique em <strong>Segurança</strong></li>
            <li>Encontre a seção <strong>Como você faz login no Google</strong></li>
            <li>Clique em <strong>Verificação em duas etapas</strong> e siga as instruções</li>
            <li>Após ativar, Siga os passos <strong>2️⃣ Gerar Senha de App</strong></li>
          </ol>
        </div>
      )}

      {step === "app-password" && (
        <div className="p-4 border rounded shadow-md bg-white">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaCheckCircle className="text-green-500" /> Gerar Senha de App
          </h2>
          <ol className="list-decimal list-inside space-y-2 mt-2">
            <li>Acesse a página de <Link href="https://myaccount.google.com/apppasswords" target="_blank" className="text-blue-500 underline">Senhas de App</Link></li>
            <li>Faça login, se necessário</li>
            <li>No campo <strong>Nome do app</strong>, digite o nome do seu app (Nome a sua escolha)</li>
            <li>Clique em <strong>Criar</strong> e copie a senha exibida</li>
            <li>Use essa senha no seu código (removendo espaços)</li>
          </ol>
        </div>
      )}
    </div>
      </div>
      <div className="w-1/3">
        <div className="w-[100%] max-w-[500px] border-2 py-2 px-3 mt-2 bg-white">
          <form className="flex flex-col gap-3 " onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                name="nome"
                placeholder="Digite seu nome"
                className="p-2 block w-full border rounded dark:text-white"
                value={userData.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Digite seu email"
                className="p-2 block w-full border rounded dark:text-white"
                value={userData.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="telefone">Telefone:</label>
              <input
                type="text"
                name="telefone"
                placeholder="Digite seu telefone"
                className="p-2 block w-full border rounded dark:text-white"
                value={userData.number}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-2">
              <div className="flex flex-col">
                <label htmlFor="cpf">CPF:</label>
                <input
                  type="text"
                  name="cpf"
                  placeholder="Digite seu CPF"
                  className="p-2 block w-full border rounded dark:text-white"
                  value={userData.cpf}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="oab">OAB:</label>
                <input
                  type="text"
                  name="oab"
                  placeholder="Digite sua OAB"
                  className="p-2 block w-full border rounded dark:text-white"
                  value={userData.oab}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex flex-col">
                <label htmlFor="pje">PJE:</label>
                <input
                  type="text"
                  name="pje"
                  placeholder="Digite seu usuário PJE"
                  className="p-2 block w-full border rounded dark:text-white"
                  value={userData.pje}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="senha">Senha:</label>
                <input
                  type="password"
                  name="senha"
                  placeholder="Digite sua senha PJE"
                  className="p-2 block w-full border rounded dark:text-white"
                  value={userData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="token">Token Gmail:</label>
              <input
                type="text"
                name="token"
                placeholder="Digite seu token Gmail"
                className="p-2 block w-full border rounded dark:text-white"
                value={userData.token}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="escritorio">Escritório:</label>
              <input
                type="text"
                name="escritorio"
                placeholder="Digite o nome do escritório"
                className="p-2 block w-full border rounded dark:text-white"
                value={userData.office}
                onChange={handleChange}
              />
            </div>
            <button
              className="mt-4 bg-oab-blue text-white px-4 py-2 rounded hover:bg-oab-blue/90"
              type="submit"
            >
              Salvar
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default withPageAuthRequired(AdminPage);
