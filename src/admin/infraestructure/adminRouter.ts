import { Elysia } from "elysia"; // Import the Elysia framework

import { loginController } from "./dependencies"; // Import the loginController instance from dependencies
import { loginAdminDTO } from "./adminDTO"; // Import the DTO for login validation

// Define the admin router with a "/admin" prefix
export const adminRouter = new Elysia({ prefix: "/admin" }).post(
  "/login", // Define a POST route for "/login"
  loginController.handle.bind(loginController), // Bind and assign the loginController's handle method to this route
  loginAdminDTO // Apply the DTO for request validation
);
