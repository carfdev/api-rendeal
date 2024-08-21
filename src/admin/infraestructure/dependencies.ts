import { Hash } from "@/services/hash"; // Import the Hash service for password hashing
import { JWT } from "@/services/jwt"; // Import the JWT service for token generation and verification

import { AdminRepository } from "@/admin/infraestructure/AdminRepository"; // Import the Admin repository
import { Login } from "@/admin/aplication/login"; // Import the Login service
import { LoginController } from "./controllers/loginController"; // Import the Login controller

// Instantiate the services and repository
const hash = new Hash(); // Create an instance of the Hash service
const jwt = new JWT(); // Create an instance of the JWT service
const adminRepository = new AdminRepository(); // Create an instance of the Admin repository

// Create an instance of the Login service, injecting the repository, JWT, and Hash services
const login = new Login(adminRepository, jwt, hash);

// Create an instance of the LoginController, injecting the Login service
export const loginController = new LoginController(login); // Export the LoginController instance
