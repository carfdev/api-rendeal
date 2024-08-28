import { ForgotPassword } from "@/admin/aplication/forgotPassword";

// Define the expected structure of the request body
type Body = {
  email: string;
  link: string;
};

export class ForgotPasswordController {
  constructor(private readonly forgotPassword: ForgotPassword) {}

  // Handle the request for resetting a password
  async handle({ body, set }: { body: Body; set: { status: number } }) {
    const { email, link } = body; // Extract the email from the request body

    try {
      // Execute the forgot password logic with the provided email
      const res = await this.forgotPassword.execute(email, link);

      // Check if the response contains an error
      if (res.error) {
        set.status = 400; // Set HTTP status to 400 (Bad Request)
        return {
          status: "error", // Return an error response
          message: res.error,
        };
      }

      // If successful, set HTTP status to 200 (OK)
      set.status = 200;
      return {
        status: "success", // Return a success response
        message: res.success,
      };
    } catch (e) {
      // Handle any exceptions that occur during the process
      const error = e as Error;
      set.status = 400; // Set HTTP status to 400 (Bad Request)
      return {
        status: "error", // Return an error response
        message: error.message,
      };
    }
  }
}
