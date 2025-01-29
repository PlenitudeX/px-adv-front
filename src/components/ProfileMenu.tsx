import React, { Fragment } from "react";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import Image from "next/image";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

interface ProfileMenuProps {
  user: UserProfile;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ user }) => (
  <Menu as="div" className="relative ml-3">
    <div>
      <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Open user menu</span>
        <Image
          src="/perfil.jpeg"
          alt="Imagem de perfil"
          width={96}
          height={96}
          className="h-8 w-8 rounded-full"
        />
      </MenuButton>
    </div>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <MenuItems className="absolute right-0 z-10 mt-2 px-2 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu>
          <p className="text-slate-400 text-sm">
          {user.email}

          </p>
        </Menu>
        <MenuItem>
          {({ active }) => (
            <a
              href="/admin"
              className={`block px-4 py-2 text-sm text-gray-700 ${
                active ? "bg-gray-100" : ""
              }`}
            >
              Perfil
            </a>
          )}
        </MenuItem>
        <MenuItem>
          {({ active }) => (
            <Link
              href="/api/auth/logout"
              className={`block px-4 py-2 text-sm text-gray-700 ${
                active ? "bg-gray-100" : ""
              }`}
            >
              Sair
            </Link>
          )}
        </MenuItem>
      </MenuItems>
    </Transition>
  </Menu>
);

export default ProfileMenu;
