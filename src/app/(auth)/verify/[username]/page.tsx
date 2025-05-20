"use client";

import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { verifySchema } from "@/schemas/verifySchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Shield,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const params = useParams<{ username: string }>();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post<ApiResponse>("/api/verify-code", {
        username: params.username,
        code: data.code,
      });
      toast({
        title: "Account Verified",
        description: response.data.message,
      });

      router.replace("/sign-in");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: "Verification Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 relative">
        {/* Background elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>

        {/* Card with gradient border */}
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur-xl opacity-20"></div>
          <div className="relative bg-gray-900 rounded-xl border border-gray-800 shadow-2xl p-8 space-y-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-green-400" />
                </div>
              </div>
              <Badge
                variant="outline"
                className="border-purple-500/20 bg-purple-500/10 text-purple-300 text-md mb-4"
              >
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                <span>One Last Step</span>
              </Badge>
              <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
                Verify Your Account
              </h1>
              <p className="text-gray-400 mb-2">
                We&apos;ve sent a verification code to your email
              </p>
              <p className="text-sm text-gray-500">
                For user:{" "}
                <span className="text-purple-400">@{params.username}</span>
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  name="code"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">
                        Verification Code
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the 6-digit code"
                          {...field}
                          className="bg-gray-800/80 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500 text-center text-lg tracking-widest"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify Account
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </Form>

            <div className="text-center pt-4 border-t border-gray-800">
              <p className="text-gray-400 text-sm">
                Didn&apos;t receive a code?{" "}
                <Link
                  href="#"
                  className="text-purple-400 hover:text-purple-300"
                >
                  Resend Code
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
