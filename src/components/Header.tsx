"use client";

import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import ProfileMenu from "./ProfileMenu";

export default function Header() {
  const { user, isLoading } = useUser();

  return (
    <header className="bg-oab-blue text-white p-4 px-10 flex justify-between items-center">
      <h1 className="text-2xl font-bold font-oab">SISTEMAS DE PROCESSOS</h1>
      <div>
        {!isLoading && !user && (
          <div className="relative">
            <Link
              href="/api/auth/login"
              className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-primary hover:text-secondary"
            >
              Login
            </Link>
          </div>
        )}
        {user && user.picture && <ProfileMenu user={user} />}
      </div>
    </header>
  );
}
