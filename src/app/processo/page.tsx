"use client";
import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

const ProcessoPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Verificar Processos
      </h1>
      <div className="m-auto w-[100%] max-w-[500px] border-2 py-2 px-3">
        <form>
          <div className="flex flex-col">
            <label htmlFor="numero">Número do processo:</label>
            <input
              type="text"
              name="numero"
              placeholder="Digite o número do processo"
              className="p-2 block w-full border rounded dark:text-white"
            />
          </div>
          <button className="bg-blue-500 text-white p-2 rounded mt-4">
            Buscar
          </button>
        </form>
      </div>
    </div>
  );
};

export default withPageAuthRequired(ProcessoPage);
