"use client";

import {
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  auth,
  provider,
} from "../firebase";

interface AuthProps {
  user: any;
}

export default function Auth({
  user,
}: AuthProps) {

  const login =
    async () => {

      await signInWithPopup(
        auth,
        provider
      );
    };

  const logout =
    async () => {

      await signOut(
        auth
      );
    };

  if (user) {

    return (

      <div className="flex items-center gap-4">

        <img
          src={user.photoURL}
          alt=""
          className="w-12 h-12 rounded-full"
        />

        <div>

          <p className="font-semibold text-black">
            {user.displayName}
          </p>

          <p className="text-sm text-gray-500">
            {user.email}
          </p>

        </div>

        <button
          onClick={logout}
          className="bg-black text-white px-5 py-3 rounded-2xl"
        >
          Выйти
        </button>

      </div>
    );
  }

  return (

    <button
      onClick={login}
      className="bg-black text-white px-6 py-4 rounded-2xl"
    >
      Войти через Google
    </button>
  );
}