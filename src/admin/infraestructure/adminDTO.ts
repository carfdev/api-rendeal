import { t } from "elysia";

// Define the data transfer object (DTO) for the login request
export const loginAdminDTO = {
  body: t.Object(
    {
      email: t.String({
        format: "email",
        error: {
          status: "error",
          message: "Invalid email format",
        },
      }), // Email field with format validation
      password: t.String({
        minLength: 8,
        error: {
          status: "error",
          message: "Password must be at least 8 characters long",
        },
      }), // Password field with minimum length validation
    },
    {
      error: {
        status: "error",
        message: "Email and password are required", // General error message for missing fields
      },
    }
  ),
};

// Define the data transfer object (DTO) for creating a new admin
export const createAdminDTO = {
  body: t.Object(
    {
      email: t.String({
        format: "email",
        error: {
          status: "error",
          message: "Invalid email format",
        },
      }), // Email field with format validation
      password: t.String({
        minLength: 8,
        error: {
          status: "error",
          message: "Password must be at least 8 characters long",
        },
      }), // Password field with minimum length validation
    },
    {
      error: {
        status: "error",
        message: "Email and password are required", // General error message for missing fields
      },
    }
  ),
};
