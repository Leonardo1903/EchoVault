import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
):Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'EchoVault <no-reply@echovault.leonardo1903.me>',
            to: email,
            subject: 'Verify your email address',
            react: VerificationEmail({ username, otp: verifyCode }),
          });
        return {
            success:true,
            message:"Verification email sent"
        }
    } catch (error) {
        console.error("Error sending verification email", error);
        return {
            success: false,
            message: "Error sending verification email",
        };
    }
}