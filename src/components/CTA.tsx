import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-900/20 via-black to-black relative overflow-hidden w-full">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1.5s" }}
      ></div>
      <div className="relative px-4 md:px-6 w-full">
        <div className="flex flex-col items-center space-y-8 text-center max-w-3xl mx-auto">
          <Badge
            variant="outline"
            className="border-purple-500/20 bg-purple-500/10 text-purple-300 text-md"
          >
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            Get Started Today
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Ready to transform your team&apos;s{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              communication?
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Join thousands of teams already using EchoVault to foster growth,
            improve collaboration, and build stronger organizations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white "
              >
                Request a Demo
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center space-x-2 pt-4">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <p className="text-sm text-gray-400">No credit card required</p>
          </div>
        </div>
      </div>
    </section>
  );
}
