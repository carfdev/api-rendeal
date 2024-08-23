import { GetMe } from "@/admin/aplication/getMe"; // Import the GetMe service

export class GetMeController {
  constructor(private readonly getMe: GetMe) {} // Inject the GetMe service via the constructor

  /**
   * Handles the request to retrieve the logged-in admin's information.
   * @param {Object} params - The parameters for the handler.
   * @param {Object} params.set - An object to set response status.
   * @param {number} params.set.status - The HTTP status code to set.
   * @param {string} params.token - The JWT token provided for authentication.
   * @returns {Object} - The response object containing status and data or error message.
   */
  async handle({ set, token }: { set: { status: number }; token: string }) {
    // Execute the GetMe service with the provided token to retrieve admin information
    const admin = await this.getMe.execute(token);

    // If there is an error (e.g., invalid token or admin not found), respond with a 401 Unauthorized status
    if (admin.error) {
      set.status = 401; // Set HTTP status code to 401 Unauthorized
      return {
        status: "error",
        message: admin.error, // Return the error message from the GetMe service
      };
    }

    // Check if the admin has the required role (e.g., role ID 1 for administrators)
    if (Number(admin.rolId) !== 1) {
      set.status = 401; // Set HTTP status code to 401 Unauthorized
      return {
        status: "error",
        message: "Not authorized: Insufficient permissions.", // Return an authorization error message
      };
    }

    // If everything is fine, respond with a 200 OK status and the admin's information
    set.status = 200; // Set HTTP status code to 200 OK
    return {
      status: "success",
      data: {
        id: admin.id, // Include the admin's ID
        email: admin.email, // Include the admin's email
        rol: "admin", // Include the admin's role (assuming role ID 1 corresponds to "admin")
      },
    };
  }
}
