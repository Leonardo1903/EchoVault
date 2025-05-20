import { Sparkles } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export default function FAQ() {
  const faqs = [
    {
      question: "How does EchoVault ensure anonymity?",
      answer:
        "EchoVault uses advanced encryption and data separation techniques to ensure that feedback cannot be traced back to individual users. We never store identifying information alongside feedback data.",
    },
    {
      question: "Can I integrate EchoVault with other tools we use?",
      answer:
        "Yes, EchoVault offers integrations with popular project management and communication tools. For custom integrations, please contact our sales team.",
    },
    {
      question: "How accurate are the AI-generated insights?",
      answer:
        "Our AI model is continuously trained on a large dataset of workplace feedback. While not perfect, many users find the insights to be highly accurate and valuable for identifying trends and areas for improvement.",
    },
    {
      question: "Is there a limit to how much feedback I can give or receive?",
      answer:
        "There are no strict limits on feedback volume. However, we encourage thoughtful, constructive feedback and provide guidelines to help users make the most of the platform.",
    },
    {
      question: "Do I need to create an account to give feedback?",
      answer:
        "No, you can give anonymous feedback without creating an account. However, to receive feedback and access the dashboard features, you'll need to create an account.",
    },
    {
      question: "Is EchoVault suitable for small teams?",
      answer:
        "EchoVault is designed to scale with your needs. Whether you're a small startup or a large enterprise, our platform can help improve communication and foster growth.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-black w-full">
      <div className="px-4 md:px-6 w-full">
        <div className="flex flex-col items-center text-center mb-16">
         <Badge variant="outline" className="border-purple-500/20 bg-purple-500/10 text-purple-300 mb-4 text-md">
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            Common Questions
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl">
            Everything you need to know about EchoVault and how it can help your team.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`}>
                <AccordionTrigger className="text-lg font-semibold">{item.question}</AccordionTrigger>
                <AccordionContent className="text-gray-400">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}