"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { MessageSquare } from "lucide-react";

function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-gray-800 text-white border-gray-800">
      <Link className="flex items-center justify-center" href="#">
        <MessageSquare className="h-6 w-6 mr-2 text-teal-400" />
        <span className="font-bold text-xl">Echovault</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        {!session && (
          <>
            <Link
              className="text-sm font-medium hover:text-teal-400"
              href="#features"
            >
              Features
            </Link>
            <Link
              className="text-sm font-medium hover:text-teal-400"
              href="#how-it-works"
            >
              How It Works
            </Link>
            <Link
              className="text-sm font-medium hover:text-teal-400"
              href="#testimonials"
            >
              Testimonials
            </Link>
            <Link
              className="text-sm font-medium hover:text-teal-400"
              href="#faq"
            >
              FAQ
            </Link>
          </>
        )}
      </nav>
      <div className="ml-4 flex items-center gap-2">
        {session ? (
          <Button
            onClick={() => signOut()}
            className="bg-teal-600 text-white hover:bg-teal-700"
            variant="outline"
          >
            Logout
          </Button>
        ) : (
          <Link href="/sign-in">
            <Button
              variant="default"
              className="bg-teal-600 text-white hover:bg-teal-700"
            >
              Log in
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
