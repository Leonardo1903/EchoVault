import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageSquare,
  Shield,
  Zap,
  ChevronRight,
  Star,
  ChevronDown,
  LineChart,
  TrendingUp,
} from "lucide-react";

export default function DarkModeLandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100 dark">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Empower Your Team with{" "}
                  <span className="text-teal-400">Anonymous Feedback</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Echovault: The AI-powered platform for honest, constructive
                  feedback. Improve communication, foster growth, and build
                  stronger teams.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="h-11 px-8 bg-teal-600 text-white hover:bg-teal-700"
                  >
                    Get Started for Free
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-11 px-8 text-gray-300 border-gray-700 hover:bg-gray-800"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <Shield className="h-10 w-10 mb-4 text-teal-400" />
                  <CardTitle>Anonymous Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Share thoughts without fear of judgment. Our platform
                    ensures complete anonymity for honest, open communication.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <Zap className="h-10 w-10 mb-4 text-teal-400" />
                  <CardTitle>AI-Generated Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Leverage AI to analyze feedback patterns, providing
                    actionable insights and suggestions for improvement.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <MessageSquare className="h-10 w-10 mb-4 text-teal-400" />
                  <CardTitle>Secure Communication</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Built with state-of-the-art security measures to protect
                    your data and maintain confidentiality.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-900"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              How Echovault Works
            </h2>
            <p className="text-xl text-center mb-8 text-gray-400">
              Echovault is designed for both individuals and teams to give and
              receive anonymous feedback.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                    1
                  </div>
                  <p className="text-xl">
                    Give feedback anonymously (no account required)
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                    2
                  </div>
                  <p className="text-xl">
                    Create an account or log in to view feedback
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                    3
                  </div>
                  <p className="text-xl">Set up individual or team workspace</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                    4
                  </div>
                  <p className="text-xl">
                    Receive AI-generated insights from feedback
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                    5
                  </div>
                  <p className="text-xl">
                    Take action based on feedback and insights
                  </p>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-gray-100 text-center">
                  The Feedback Loop
                </h3>
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-teal-600">
                    <MessageSquare className="h-8 w-8 text-white" />
                  </div>
                  <ChevronDown className="h-6 w-6 text-teal-400" />
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-teal-600">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <ChevronDown className="h-6 w-6 text-teal-400" />
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-teal-600">
                    <LineChart className="h-8 w-8 text-white" />
                  </div>
                  <ChevronDown className="h-6 w-6 text-teal-400" />
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-teal-600">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <Link href="/signup">
                    <Button className="bg-teal-600 text-white hover:bg-teal-700">
                      Start Your Feedback Journey
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="testimonials"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Alex Johnson",
                  role: "Team Lead, TechCorp",
                  content:
                    "Echovault has transformed our team dynamics. The anonymous feedback feature encourages honesty, and the AI insights have been invaluable for our growth.",
                },
                {
                  name: "Sarah Lee",
                  role: "HR Manager, InnovateCo",
                  content:
                    "As an HR professional, I've seen a significant improvement in employee satisfaction since implementing Echovault. It's a game-changer for organizational communication.",
                },
                {
                  name: "Michael Chen",
                  role: "Startup Founder",
                  content:
                    "Echovault helped us build a culture of continuous improvement from day one. The AI-generated insights have guided our decision-making and team development strategies.",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-yellow-400" />
                      <Star className="h-5 w-5 text-yellow-400" />
                      <Star className="h-5 w-5 text-yellow-400" />
                      <Star className="h-5 w-5 text-yellow-400" />
                      <Star className="h-5 w-5 text-yellow-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-400">
                      &quot;{testimonial.content}&quot;
                    </p>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-900"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  question: "How does Echovault ensure anonymity?",
                  answer:
                    "Echovault uses advanced encryption and data separation techniques to ensure that feedback cannot be traced back to individual users. We never store identifying information alongside feedback data.",
                },
                {
                  question:
                    "Can I integrate Echovault with other tools we use?",
                  answer:
                    "Yes, Echovault offers integrations with popular project management and communication tools. For custom integrations, please contact our sales team.",
                },
                {
                  question: "How accurate are the AI-generated insights?",
                  answer:
                    "Our AI model is continuously trained on a large dataset of workplace feedback. While not perfect, many users find the insights to be highly accurate and valuable for identifying trends and areas for improvement.",
                },
                {
                  question:
                    "Is there a limit to how much feedback I can give or receive?",
                  answer:
                    "There are no strict limits on feedback volume. However, we encourage thoughtful, constructive feedback and provide guidelines to help users make the most of the platform.",
                },
              ].map((item, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-xl">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to transform your team&apos;s communication?
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of teams already using Echovault to foster
                growth, improve collaboration, and build stronger organizations.
              </p>
              <Link href="/signup">
                <Button
                  size="lg"
                  className="h-11 px-8 bg-teal-600 text-white hover:bg-teal-700"
                >
                  Start Your Free Trial
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6  border-t border-gray-800">
        <p className="text-xs text-gray-500">
          © 2024 Echovault. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-500 hover:text-gray-400"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-500 hover:text-gray-400"
            href="#"
          >
            Privacy Policy
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-500 hover:text-gray-400"
            href="#"
          >
            Cookie Policy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
