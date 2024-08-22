// Import services and repositories
import { Hash } from "@/services/hash"; // Service for password hashing
import { JWT } from "@/services/jwt"; // Service for JWT generation and verification
import { AdminRepository } from "@/admin/infraestructure/AdminRepository"; // Repository for Admin entity

// Import application services
import { Login } from "@/admin/aplication/login"; // Service for handling login logic
import { Create } from "@/admin/aplication/create"; // Service for handling admin creation logic

// Import controllers
import { LoginController } from "./controllers/loginController"; // Controller for login endpoint
import { CreateController } from "./controllers/createController"; // Controller for create admin endpoint

// Instantiate services
const hash = new Hash(); // Hash service for hashing passwords
const jwt = new JWT(); // JWT service for token operations

// Instantiate repository
const adminRepository = new AdminRepository(); // Repository for database interactions with Admin entity

// Instantiate application services with injected dependencies
const login = new Login(adminRepository, jwt, hash); // Login service with dependencies
const create = new Create(adminRepository, jwt, hash); // Create service with dependencies

// Instantiate controllers with injected application services
export const loginController = new LoginController(login); // LoginController with Login service
export const createController = new CreateController(create); // CreateController with Create service
