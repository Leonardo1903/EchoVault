import { Badge } from "@/components/ui/badge";
import { Sparkles, MessageSquare, Zap, TrendingUp, LineChart } from "lucide-react";

function Link2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

export default function Working() {
  return (
    <section
      id="how-it-works"
      className="py-20 bg-gradient-to-b from-black to-gray-900 w-full"
    >
      <div className="px-4 md:px-6 w-full">
        <div className="flex flex-col items-center text-center mb-16">
          <Badge variant="outline" className="border-purple-500/20 bg-purple-500/10 text-purple-300 mb-4 text-md">
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            Simple Process
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            How{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              EchoVault
            </span>{" "}
            Works
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl">
            Our platform is designed to make anonymous feedback simple, secure,
            and actionable.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {[
              {
                title: "Share Your Unique Link",
                description:
                  "Create an account and share your personalized feedback link with anyone you want to receive feedback from.",
                icon: <Link2 className="h-5 w-5 text-purple-400" />,
              },
              {
                title: "Receive Anonymous Feedback",
                description:
                  "Others can provide honest feedback without creating an account or revealing their identity.",
                icon: <MessageSquare className="h-5 w-5 text-blue-400" />,
              },
              {
                title: "Get AI-Generated Insights",
                description:
                  "Our AI analyzes feedback patterns to provide actionable insights for personal and professional growth.",
                icon: <Zap className="h-5 w-5 text-pink-400" />,
              },
              {
                title: "Take Action & Improve",
                description:
                  "Use the insights to make meaningful changes and track your progress over time.",
                icon: <TrendingUp className="h-5 w-5 text-green-400" />,
              },
            ].map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur-xl opacity-20"></div>
            <div className="relative bg-gray-900 border border-gray-800 rounded-xl p-8">
              <div className="flex flex-col items-center space-y-6">
                <div className="w-full max-w-md mx-auto space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400">
                        Anonymous feedback
                      </p>
                      <p className="text-sm font-medium">
                        Your presentation skills are impressive, but you could improve by making more eye contact.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400">AI Insight</p>
                      <p className="text-sm font-medium">
                        Multiple feedback points suggest focusing on audience engagement during presentations.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <LineChart className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400">
                        Growth Opportunity
                      </p>
                      <p className="text-sm font-medium">
                        Consider taking a public speaking course to enhance your presentation skills.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}