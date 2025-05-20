import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 lg:py-40 w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-black"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div className="relative px-4 md:px-6 w-full">
        <div className="flex flex-col items-center space-y-8 text-center max-w-3xl mx-auto">
          <Badge
            variant="outline"
            className="border-purple-500/20 bg-purple-500/10 text-purple-300 mb-2 text-md"
          >
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            AI-Powered Anonymous Feedback
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Honest Feedback,{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Stronger Teams
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            EchoVault transforms team communication with AI-powered anonymous
            feedback. Build trust, foster growth, and create a culture of
            continuous improvement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                Create Your Vault
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#how-it-works" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-gray-800 text-white hover:bg-gray-900"
              >
                See How It Works
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center space-x-4 pt-4">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-black bg-gradient-to-br from-purple-400 to-blue-500"
                ></div>
              ))}
            </div>
            <p className="text-sm text-gray-400">
              <span className="font-medium text-white">2,000+</span> teams
              already using EchoVault
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
