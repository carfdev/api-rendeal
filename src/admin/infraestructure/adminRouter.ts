import { Elysia } from "elysia"; // Import the Elysia framework for routing and middleware

// Import controller instances and DTOs for validation
import {
  loginController,
  createController,
  getMeController,
  forgotPasswordController,
} from "./dependencies"; // Controllers for handling requests
import { loginAdminDTO, createAdminDTO, forgotPasswordDTO } from "./adminDTO"; // DTOs for validating request bodies

// Create and configure the admin router with a "/admin" prefix
export const adminRouter = new Elysia({ prefix: "/admin" })
  .get(
    "/me", // Route for retrieving admin information
    getMeController.handle.bind(getMeController) // Bind the handle method from GetMeController to this route
  )
  .post(
    "/login", // Route for handling login requests
    loginController.handle.bind(loginController), // Bind the handle method from LoginController to this route
    loginAdminDTO // Apply DTO for validating login request body
  )
  .post(
    "/create", // Route for handling admin creation requests
    createController.handle.bind(createController), // Bind the handle method from CreateController to this route
    createAdminDTO // Apply DTO for validating admin creation request body
  )
  .post(
    "/forgot-password", // Route for handling forgot password requests
    forgotPasswordController.handle.bind(forgotPasswordController), // Bind the handle method from ForgotPasswordController to this route
    forgotPasswordDTO // Apply DTO for validating forgot password request body
  );
