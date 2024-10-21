// import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { render } from '@react-email/components';
import nodemailer from 'nodemailer';

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
):Promise<ApiResponse> {
    try {
        // await resend.emails.send({
        //     from: 'EchoVault <onboarding@resend.dev>',
        //     to: email,
        //     subject: 'Verify your email address',
        //     react: VerificationEmail({ username, otp: verifyCode }),
        //   });
        // return {
        //     success:true,
        //     message:"Verification email sent"
        // }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_PASS,
            }
        });

        const emailHtml = await render(VerificationEmail({ username, otp: verifyCode }));

        
        const options = {
            from: process.env.MY_EMAIL,
            to: email,
            subject: "EchoVault OTP Verification | EchoVault",
            html: emailHtml,
        };

        await transporter.sendMail(options);


        return {
            success: true,
            message: "Verification email sent successfully.",
        };
    } catch (error) {
        console.error("Error sending verification email", error);
        return {
            success: false,
            message: "Error sending verification email",
        };
    }
}