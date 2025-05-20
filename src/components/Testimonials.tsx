import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gray-900 w-full">
      <div className="px-4 md:px-6 w-full">
        <div className="flex flex-col items-center text-center mb-16">
           <Badge variant="outline" className="border-purple-500/20 bg-purple-500/10 text-purple-300 mb-4 text-md">
            <Star className="mr-1 h-3.5 w-3.5" />
            Success Stories
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              industry leaders
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl">
            See how EchoVault has transformed communication and growth for teams of all sizes.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Alex Johnson",
              role: "Team Lead, TechCorp",
              content:
                "EchoVault has transformed our team dynamics. The anonymous feedback feature encourages honesty, and the AI insights have been invaluable for our growth.",
              avatar: "A",
              color: "from-purple-400 to-purple-600",
            },
            {
              name: "Sarah Lee",
              role: "HR Manager, InnovateCo",
              content:
                "As an HR professional, I've seen a significant improvement in employee satisfaction since implementing EchoVault. It's a game-changer for organizational communication.",
              avatar: "S",
              color: "from-blue-400 to-blue-600",
            },
            {
              name: "Michael Chen",
              role: "Startup Founder",
              content:
                "EchoVault helped us build a culture of continuous improvement from day one. The AI-generated insights have guided our decision-making and team development strategies.",
              avatar: "M",
              color: "from-pink-400 to-pink-600",
            },
          ].map((testimonial, index) => (
            <Card
              key={index}
              className="bg-gray-800/50 border-gray-700 overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="mb-6 text-gray-300">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex items-center">
                  <div
                    className={`h-10 w-10 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-medium mr-3`}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-16 flex justify-center">
          <div className="inline-flex items-center rounded-full border border-gray-700 bg-gray-800/50 px-4 py-2">
            <p className="text-sm text-gray-400">
              Join <span className="text-white font-medium">2,000+</span>{" "}
              teams already using EchoVault
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}