"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import GoogleLogo from "../../../public/images/google-logo.png";
export default function Googlebtn() {
  return (
    <button
      onClick={() => signIn("google")}
      className="flex items-center gap-4 w-full"
    >
      <Image
        src={GoogleLogo}
        alt="google"
        height={30}
        width={30}
      />
      <span className="bg-blue-500 text-white py-3 w-full">
        Sign in with Google
      </span>
    </button>
  );
}
