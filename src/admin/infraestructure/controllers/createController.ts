import { Create } from "@/admin/aplication/create";

type AdminBody = {
  email: string;
  password: string;
};

export class CreateController {
  constructor(private readonly create: Create) {}

  /**
   * Handles the request to create a new admin.
   * @param set - An object to set response status.
   * @param token - The authorization token.
   * @param body - The request body containing the email and password.
   * @returns An object with the status and message of the operation.
   */
  async handle({
    set,
    token,
    body,
  }: {
    set: { status: number };
    token: string;
    body: AdminBody;
  }) {
    // Validate the request body
    if (!body.email || !body.password) {
      set.status = 400;
      return {
        status: "error",
        message: "Email and password are required",
      };
    }

    // Validate the presence of the token
    if (!token) {
      set.status = 401;
      return {
        status: "error",
        message: "Unauthorized",
      };
    }

    // Attempt to create the new admin
    const admin = await this.create.execute(body.email, body.password, token);

    // Check for errors during the admin creation process
    if (admin?.error) {
      set.status = 400;
      return {
        status: "error",
        message: admin.error,
      };
    }

    // Check if admin creation was unsuccessful
    if (!admin) {
      set.status = 500; // Set status to 500 for server error
      return {
        status: "error",
        message: "Error creating admin",
      };
    }

    // Successful admin creation
    set.status = 200;
    return {
      status: "success",
      message: "Admin created successfully",
    };
  }
}
