import { t } from "elysia";

// Define the data transfer object (DTO) for the login request
export const loginAdminDTO = {
  // Define the structure of the request body
  body: t.Object({
    email: t.String(), // Email field as a string
    password: t.String(), // Password field as a string
  }),
};
