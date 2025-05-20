import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Zap,
  Lock,
  UserCheck,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export default function Features() {
  return (
    <section className="py-20 bg-black w-full">
      <div className="px-4 md:px-6 w-full">
        <div className="flex flex-col items-center text-center mb-12">
          <Badge
            variant="outline"
            className="border-purple-500/20 bg-purple-500/10 text-purple-300 mb-4 text-md"
          >
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            Key Features
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Everything you need for{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              honest feedback
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl">
            EchoVault combines security, anonymity, and AI to create the perfect
            environment for meaningful communication.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-gray-900/50 border-gray-800 overflow-hidden group relative">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-5">
                <Shield className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Complete Anonymity</h3>
              <p className="text-gray-400">
                Our platform ensures that feedback remains completely anonymous,
                creating a safe space for honest communication without fear of
                judgment.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/50 border-gray-800 overflow-hidden group relative">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-5">
                <Zap className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI-Powered Insights</h3>
              <p className="text-gray-400">
                Leverage Google&apos;s Generative AI to analyze feedback
                patterns and provide actionable insights for continuous
                improvement.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/50 border-gray-800 overflow-hidden group relative">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-lg bg-pink-500/10 flex items-center justify-center mb-5">
                <Lock className="h-6 w-6 text-pink-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Enterprise Security</h3>
              <p className="text-gray-400">
                Built with state-of-the-art security measures to protect your
                data and maintain confidentiality at all times.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <Card className="bg-gray-900/50 border-gray-800 overflow-hidden group relative">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-5">
                <UserCheck className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Personalized Dashboard</h3>
              <p className="text-gray-400">
                Access a user-friendly dashboard to manage your messages,
                settings, and view feedback in a structured format.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/50 border-gray-800 overflow-hidden group relative">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-5">
                <MessageSquare className="h-6 w-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Message Suggestions</h3>
              <p className="text-gray-400">
                Get AI-generated message suggestions to help you provide
                constructive and meaningful feedback.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
