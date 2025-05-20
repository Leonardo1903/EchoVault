"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { Shield } from "lucide-react";
import Logo from "@/assets/logo.png";
import Image from "next/image";

function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <Image src={Logo} alt="logo" className="w-6 h-6 mx-2"/>
            <span className="text-xl font-bold text-white">EchoVault</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#features"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="#testimonials"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Testimonials
          </Link>
          <Link
            href="#faq"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {session ? (
            <Button
              onClick={() => signOut()}
              className="bg-purple-600 hover:bg-purple-700 text-white"
              variant="outline"
            >
              Logout
            </Button>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-sm text-gray-400 hover:text-white transition-colors hidden md:block"
              >
                Log in
              </Link>
              <Link href="/sign-up">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
