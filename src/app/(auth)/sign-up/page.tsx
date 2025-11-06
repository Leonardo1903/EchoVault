"use client"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type * as z from "zod"
import Link from "next/link"
import axios, { type AxiosError } from "axios"
import { useDebounceCallback } from "usehooks-ts"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import type { ApiResponse } from "@/types/ApiResponse"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ArrowRight, CheckCircle2, Loader2, Shield, Sparkles, X, Eye, EyeOff } from "lucide-react"

export default function Page() {
  const [username, setUsername] = useState("")
  const [usernameMessage, setUsernameMessage] = useState("")
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const debounced = useDebounceCallback(setUsername, 300)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true)
        setUsernameMessage("")
        try {
          const response = await axios.get(`/api/check-username-unique?username=${username}`)
          setUsernameMessage(response.data.message)
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>
          setUsernameMessage(axiosError.response?.data.message ?? "An error occurred while checking username")
        } finally {
          setIsCheckingUsername(false)
        }
      }
    }
    checkUsernameUnique()
  }, [username])

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true)

    // confirm password validation (client-side)
    const confirmPassword = form.getValues("confirmPassword" as any)
    if (data.password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Password and confirmation do not match.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", data)
      toast({
        title: "Account created",
        description: response.data.message,
      })
      router.replace(`/verify/${data.username}`)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      const errorMessage = axiosError.response?.data.message
      toast({
        title: "An error occurred",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
                <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-purple-400" />
                </div>
              </div>
              <Badge variant="outline" className="border-purple-500/20 bg-purple-500/10 text-purple-300 text-md mb-4">
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                <span>Get Started</span>
              </Badge>
              <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Create Your Account</h1>
              <p className="text-gray-400">Join EchoVault to start your anonymous feedback journey</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  name="username"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Username</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Choose a unique username"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              debounced(e.target.value)
                            }}
                            className="bg-gray-800/80 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500 pr-10"
                          />
                          {isCheckingUsername && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <Loader2 className="animate-spin h-5 w-5 text-gray-400" />
                            </div>
                          )}
                          {!isCheckingUsername && usernameMessage && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              {usernameMessage === "Username is unique" ? (
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                              ) : (
                                <X className="h-5 w-5 text-red-500" />
                              )}
                            </div>
                          )}
                        </div>
                      </FormControl>
                      {!isCheckingUsername && usernameMessage && (
                        <p
                          className={`text-sm mt-1 ${
                            usernameMessage === "Username is unique" ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {usernameMessage}
                        </p>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email address"
                          {...field}
                          className="bg-gray-800/80 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Create a secure password"
                            type={showPassword ? "text" : "password"}
                            {...field}
                            className="bg-gray-800/80 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((s) => !s)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Confirm password (registered manually to avoid changing schema here) */}
                <FormItem>
                  <FormLabel className="text-gray-300">Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Confirm your password"
                        type={showConfirmPassword ? "text" : "password"}
                        {...form.register("confirmPassword" as any)}
                        className="bg-gray-800/80 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((s) => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                        aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </FormControl>
                </FormItem>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </Form>

            <div className="text-center pt-4 border-t border-gray-800">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link href="/sign-in" className="text-purple-400 hover:text-purple-300 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}