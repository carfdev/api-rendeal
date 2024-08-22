import { t } from "elysia";

// Define the data transfer object (DTO) for the login request
export const loginAdminDTO = {
  body: t.Object({
    email: t.String({
      format: "email",
    }), // Email field with email format validation
    password: t.String({ minLength: 8 }), // Password field with minimum length validation
  }),
};

// Define the data transfer object (DTO) for creating a new admin
export const createAdminDTO = {
  body: t.Object({
    email: t.String({
      format: "email",
    }), // Email field with email format validation
    password: t.String({ minLength: 8 }), // Password field with minimum length validation
  }),
};
