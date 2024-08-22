import { Elysia } from "elysia"; // Import the Elysia framework for routing and middleware

// Import controller instances and DTOs for validation
import { loginController, createController } from "./dependencies"; // Controllers for handling requests
import { loginAdminDTO, createAdminDTO } from "./adminDTO"; // DTOs for validating request bodies

// Create and configure the admin router with a "/admin" prefix
export const adminRouter = new Elysia({ prefix: "/admin" })
  .post(
    "/login", // Route for handling login requests
    loginController.handle.bind(loginController), // Bind the handle method from LoginController to this route
    loginAdminDTO // Apply DTO for validating login request body
  )
  .post(
    "/create", // Route for handling admin creation requests
    createController.handle.bind(createController), // Bind the handle method from CreateController to this route
    createAdminDTO // Apply DTO for validating admin creation request body
  );
