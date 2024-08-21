import { Login } from "@/admin/aplication/login";

// Define the structure of the request object
type Request = {
  body: {
    email: string;
    password: string;
  };
};

// Define the structure of the response object
type Response = {
  token?: string; // Token is optional, only returned on successful login
  message: string; // Message to provide feedback
  status: string; // Status of the request (e.g., "success" or "error")
};

export class LoginController {
  constructor(private readonly login: Login) {}

  /**
   * Handles the login request.
   * @param body - Contains the email and password from the request.
   * @param set - Used to set the response status code.
   * @returns A promise that resolves to a Response object.
   */
  async handle({
    body,
    set,
  }: {
    body: Request["body"]; // Extract email and password from the request body
    set: any; // Set object to manage the response status
  }): Promise<Response> {
    const { email, password } = body; // Destructure email and password from the request body

    try {
      // Attempt to log in with the provided credentials
      const res = await this.login.execute(email, password);

      if (res.error) {
        // If there's an error (e.g., invalid credentials), set the status to 401 (Unauthorized)
        set.status = 401;
        return {
          status: "error",
          message: res.error, // Return the error message
        };
      } else {
        // If login is successful, set the status to 200 (OK)
        set.status = 200;
        return {
          status: "success",
          token: res.token, // Return the generated JWT token
          message: "Login successful", // Return a success message
        };
      }
    } catch (e) {
      // Handle any unexpected errors
      const error = e as Error;
      set.status = 500; // Set the status to 500 (Internal Server Error)
      return {
        status: "error",
        message: error.message, // Return the error message
      };
    }
  }
}
