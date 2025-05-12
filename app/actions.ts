"use server"

import { Resend } from "resend"

// Initialize Resend with your API key
// In production, use environment variables
const resend = new Resend(process.env.RESEND_API_KEY || "re_123456789")

interface EmailData {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendEmail(data: EmailData) {
  try {
    // Validate input
    if (!data.name || !data.email || !data.subject || !data.message) {
      return {
        success: false,
        error: "Please fill out all fields",
      }
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      }
    }

    // If RESEND_API_KEY is not set, simulate success for development
    if (!process.env.RESEND_API_KEY) {
      console.log("RESEND_API_KEY not set, simulating email send:", data)

      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return {
        success: true,
      }
    }

    // Send email using Resend
    const { data: emailResponse, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "your-email@example.com", // Replace with your email
      subject: `Portfolio Contact: ${data.subject}`,
      reply_to: data.email,
      text: `
Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}
      `,
    })

    if (error) {
      console.error("Email send error:", error)
      return {
        success: false,
        error: "Failed to send email. Please try again.",
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error("Unexpected error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    }
  }
}
