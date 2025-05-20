"use client";

import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowRight, Loader2, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCompletion } from "@ai-sdk/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import * as z from "zod";
import { ApiResponse } from "@/types/ApiResponse";
import Link from "next/link";
import { useParams } from "next/navigation";
import { messageSchema } from "@/schemas/messageSchema";

const specialChar = "||";

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?||What's one thing you're proud of?";

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const {
    complete,
    completion,
    isLoading: isSuggestLoading,
    error,
  } = useCompletion({
    api: "/api/suggest-messages",
    initialCompletion: initialMessageString,
  });

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch("content");

  const handleMessageClick = (message: string) => {
    form.setValue("content", message);
  };

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>("/api/send-message", {
        ...data,
        username,
      });

      toast({
        title: response.data.message,
        variant: "default",
      });
      form.reset({ ...form.getValues(), content: "" });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ?? "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSuggestedMessages = async () => {
    try {
      complete("");
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto py-16 px-4 max-w-4xl">
        {/* Profile Header */}
        <div className="mb-12 text-center">
          <Badge
            variant="outline"
            className="border-purple-500/20 bg-purple-500/10 text-purple-300 text-md mb-2"
          >
            <MessageSquare className="mr-1 h-3.5 w-3.5" />
            <span>Anonymous Feedback</span>
          </Badge>
          <h1 className="text-4xl font-bold mb-4 text-white">
            Send Feedback to{" "}
            <span className="text-purple-400">@{username}</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Your message will be completely anonymous. Be honest, be
            constructive, be kind.
          </p>
        </div>

        {/* Message Form */}
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur-xl opacity-20"></div>
          <Card className="relative bg-gray-900 border-gray-800 shadow-xl">
            <CardContent className="p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300 text-lg font-medium">
                          Your Anonymous Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write your anonymous message here..."
                            className="resize-none min-h-[150px] bg-gray-800/80 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-center">
                    {isLoading ? (
                      <Button
                        disabled
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-6 text-lg"
                      >
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isLoading || !messageContent}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6 text-lg"
                      >
                        Send Anonymously
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Suggested Messages */}
        <div className="mt-12 space-y-6">
          <div className="text-center">
            <Badge
              variant="outline"
              className="border-purple-500/20 bg-purple-500/10 text-purple-300 text-md mb-2"
            >
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              <span>AI Suggestions</span>
            </Badge>
            <h2 className="text-2xl font-bold text-white mb-2">
              Need Inspiration?
            </h2>
            <p className="text-gray-400 mb-6">
              Let our AI suggest some messages for you. Tap any suggestion to
              use it.
            </p>
            <Button
              onClick={fetchSuggestedMessages}
              className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
              disabled={isSuggestLoading}
            >
              {isSuggestLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <>
                  Generate Suggestions
                  <Sparkles className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-xl opacity-10"></div>
            <Card className="relative bg-gray-900/80 border-gray-800">
              <CardHeader>
                <h3 className="text-lg font-semibold text-white">
                  Suggested Messages
                </h3>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {error ? (
                  <p className="text-red-500 col-span-full">{error.message}</p>
                ) : (
                  parseStringMessages(completion).map((message, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto py-3 w-full bg-gray-800 hover:bg-gray-700
                      hover:text-white text-white border border-gray-700 text-left break-words overflow-wrap break-word whitespace-normal transition-all duration-200"
                      onClick={() => handleMessageClick(message)}
                    >
                      {message}
                    </Button>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-12 border-gray-800" />

        {/* CTA Section */}
        <div className="text-center py-8">
          <Badge
            variant="outline"
            className="border-purple-500/20 bg-purple-500/10 text-purple-300 text-md mb-2"
          >
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            <span>Join EchoVault</span>
          </Badge>
          <h2 className="text-2xl font-bold text-white mb-4">
            Create Your Own Message Board
          </h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Sign up to receive anonymous feedback and insights from your peers,
            friends, and team.
          </p>
          <Link href="/sign-up">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg">
              Create Your Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
