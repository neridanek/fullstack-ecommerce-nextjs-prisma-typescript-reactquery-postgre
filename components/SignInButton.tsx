import { sign } from "crypto";
import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "./auth/useAuth";

const SignInButton = () => {
  const { signIn, session, status } = useAuth();
  const router = useRouter();
  const handleSignIn = () => signIn("google");

  return (
    <button
      onClick={handleSignIn}
      className="mt-6 group outline-none relative w-28 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
    >
      Zaloguj sie
    </button>
  );
};

export default SignInButton;
