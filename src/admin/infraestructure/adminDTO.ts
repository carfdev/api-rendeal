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

// Define the data transfer object (DTO) for the forgot password request
export const forgotPasswordDTO = {
  body: t.Object(
    {
      email: t.String({
        format: "email",
        error: {
          status: "error",
          message: "Invalid email format",
        },
      }),
      link: t.String({
        error: {
          status: "error",
          message: "Link is required",
        },
      }),
    },
    {
      error: {
        status: "error",
        message: "Email is required", // General error message for missing fields
      },
    }
  ),
};

// Define the data transfer object (DTO) for the change password request
export const updatePasswordDTO = {
  body: t.Object(
    {
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
        message: "Password is required", // General error message for missing fields
      },
    }
  ),
};
