import { ChangePassword } from "@/admin/aplication/changePassword";

// Define the expected structure of the request body
interface Request {
  password: string;
}

// Define the structure of the response object
interface Response {
  status: string;
  message: string;
}

export class ChangePasswordController {
  constructor(private readonly changePassword: ChangePassword) {}

  // Handles the request to change the password of an admin
  async handle({
    body,
    params,
    set,
  }: {
    body: Request;
    params: any;
    set: { status: number };
  }): Promise<Response> {
    // Check if the password is provided in the request body
    if (!body.password) {
      set.status = 400; // Set the HTTP status to 400 (Bad Request)
      return {
        status: "error",
        message: "Password is required", // Return an error message
      };
    }

    // Extract the token from the request parameters
    const token = params.token;
    if (!token) {
      set.status = 400; // Set the HTTP status to 400 (Bad Request)
      return {
        status: "error",
        message: "Token is required", // Return an error message
      };
    }

    // Extract the password from the request body
    const password = body.password;
    try {
      // Attempt to change the password using the provided token and password
      const result = await this.changePassword.execute(token, password);

      // Handle any errors returned by the ChangePassword service
      if (result.error) {
        set.status = 400; // Set the HTTP status to 400 (Bad Request)
        return {
          status: "error",
          message: result.error, // Return the specific error message
        };
      }

      set.status = 200; // Set the HTTP status to 200 (OK)
      return {
        status: "success",
        message: "Password changed successfully", // Return success message
      };
    } catch (error) {
      // Handle unexpected errors
      set.status = 500; // Set the HTTP status to 500 (Internal Server Error)
      return {
        status: "error",
        message: "Failed to change password", // Return a generic error message
      };
    }
  }
}
