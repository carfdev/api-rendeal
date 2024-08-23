import type { IEmail } from "@/services/interfaces/IEmail"; // Import the IEmail interface
import { Resend } from "resend"; // Import the Resend service for sending emails

// Implement the Email class according to the IEmail interface
export class Email implements IEmail {
  private readonly resend: Resend; // Declare a private Resend instance

  constructor() {
    // Initialize the Resend instance with the API key from environment variables
    this.resend = new Resend(Bun.env.RESEND_API_KEY);
  }

  // Implementation of the sendForgotPassword method defined in the IEmail interface
  async sendForgotPassword(
    email: string,
    body: string
  ): Promise<{ error: string } | { success: string }> {
    try {
      // Use the Resend service to send an email
      const response = await this.resend.emails.send({
        from: "No-reply <no-reply@webiz.se>", // The sender's email address
        to: [email], // The recipient's email address
        subject: "Forgot Password", // The subject of the email
        html: body, // The HTML content of the email, passed as a parameter
      });

      // Check if the response indicates a failure to send the email
      if (!response) {
        return { error: "Failed to send email" }; // Return an error if the email was not sent
      }

      // If the email was sent successfully, return a success message
      return { success: "Email sent successfully" };
    } catch (e) {
      // Catch any errors that occur during the email sending process
      const error = e as Error;
      return { error: error.message }; // Return the error message
    }
  }
}
