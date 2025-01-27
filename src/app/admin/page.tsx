"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
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
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // const { name, email, number, cpf, oab, pje, password, token, office } = userData;
    e.preventDefault();
    alert("Dados salvos com sucesso!");
  }
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Olá, {userData.name}
      </h1>
      <div className="m-auto w-[100%] max-w-[500px] border-2 py-2 px-3">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
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
            <label htmlFor="token">Token:</label>
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
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" type="submit">
            Salvar
          </button>
        </form>
      </div>
      <Link href="/api/auth/logout">sair</Link>
    </div>
  );
};

export default withPageAuthRequired(AdminPage);
