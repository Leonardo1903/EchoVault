"use client";
import { useToast } from "@/hooks/use-toast";
import React, { useCallback, useEffect, useState } from "react";
import { Message } from "@/models/user.model";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { AcceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Copy,
  Loader2,
  MessageSquare,
  Link as LinkIcon,
  RefreshCcw,
  Shield,
  Sparkles,
} from "lucide-react";
import { MessageCard } from "@/components/MessageCard";
import { User } from "next-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const { toast } = useToast();

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(AcceptMessageSchema),
  });

  const { register, watch, setValue } = form;

  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ??
          "Failed to fetch message settings",
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue, toast]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/get-messages");
        setMessages(response.data.messages || []);
        if (response.data.messages.length === 0) {
          toast({
            title: "No Messages",
            description: "No messages present",
            variant: "default",
          });
        } else if (refresh) {
          toast({
            title: "Messages Refreshed",
            description: "Showing latest messages",
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: "Error",
          description:
            axiosError.response?.data.message ?? "Failed to fetch messages",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessages();
    fetchAcceptMessage();
  }, [session, fetchAcceptMessage, fetchMessages]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
      toast({
        title: response.data.message,
        variant: "default",
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ?? "Failed to update settings",
        variant: "destructive",
      });
    }
  };

  if (!session || !session.user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="text-center text-gray-300 p-8">
          <p className="mb-4">Please log in to access your dashboard</p>
          <Button
            asChild
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            <Link href="/sign-in">
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const { username } = session.user as User;
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(profileUrl);
    toast({
      title: "Link Copied to Clipboard",
      description: "Share it with others to receive feedback",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white pb-16">
      <div className="bg-gradient-to-br from-purple-900/20 via-black to-black relative py-16">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
            <Badge
              variant="outline"
              className="border-purple-500/20 bg-purple-500/10 text-purple-300 text-md mb-4"
            >
              <Shield className="mr-1 h-3.5 w-3.5" />
              <span>Your Dashboard</span>
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Welcome,{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                @{username}
              </span>
            </h1>
            <p className="text-xl text-gray-400">
              Manage your messages and settings from your personal dashboard
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <div className="relative mb-8">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur-xl opacity-20"></div>
          <Card className="relative bg-gray-900 border-gray-800 overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-purple-400" />
                <span className="text-white">Your Unique Feedback Link</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="flex-1 w-full bg-gray-800 rounded-lg border border-gray-700 px-4 py-3 text-gray-300 overflow-hidden overflow-ellipsis">
                  {profileUrl}
                </div>
                <Button
                  onClick={copyToClipboard}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white sm:w-auto w-full"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Link
                </Button>
              </div>
              <p className="text-gray-400 text-sm mt-3">
                Share this link with others to receive anonymous feedback
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="relative mb-8">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-xl opacity-20"></div>
          <Card className="relative bg-gray-900 border-gray-800 overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-400" />
                <span className="text-white">Message Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 p-2 rounded-lg bg-gray-800/50 border border-gray-700">
                <Switch
                  {...register("acceptMessages")}
                  checked={acceptMessages}
                  onCheckedChange={handleSwitchChange}
                  disabled={isSwitchLoading}
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-blue-600"
                />
                <div className="flex-1">
                  <p className="font-medium text-white">Accept Messages</p>
                  <p className="text-sm text-gray-400">
                    {acceptMessages
                      ? "You are currently receiving anonymous messages"
                      : "You are not receiving anonymous messages"}
                  </p>
                </div>
                <div
                  className="px-3 py-1 rounded-full text-sm font-medium bg-opacity-20 border border-opacity-20"
                  style={{
                    backgroundColor: acceptMessages
                      ? "rgba(139, 92, 246, 0.1)"
                      : "rgba(75, 85, 99, 0.1)",
                    borderColor: acceptMessages
                      ? "rgba(139, 92, 246, 0.2)"
                      : "rgba(75, 85, 99, 0.2)",
                    color: acceptMessages ? "#a78bfa" : "#9ca3af",
                  }}
                >
                  {acceptMessages ? "Active" : "Inactive"}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur-xl opacity-20"></div>
          <Card className="relative bg-gray-900 border-gray-800 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-400" />
                <span className="text-white">Your Messages</span>
              </CardTitle>
              <Button
                onClick={() => fetchMessages(true)}
                variant="outline"
                size="sm"
                className="text-gray-300 border-gray-700 bg-gray-800 hover:bg-gray-700 hover:text-white"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                  <>
                    <RefreshCcw className="h-4 w-4 mr-2" />
                    Refresh
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="animate-spin h-8 w-8 text-purple-500" />
                </div>
              ) : messages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {messages.map((message) => (
                    <MessageCard
                      key={message._id as string}
                      message={message}
                      onMessageDelete={handleDeleteMessage}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 px-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
                    <MessageSquare className="h-8 w-8 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">
                    No Messages Yet
                  </h3>
                  <p className="text-gray-400 max-w-md mx-auto mb-6">
                    Share your unique link with others to start receiving
                    anonymous feedback.
                  </p>
                  <Button
                    onClick={copyToClipboard}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Your Link
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
