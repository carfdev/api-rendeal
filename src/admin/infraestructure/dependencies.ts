// Import services and repositories
import { Hash } from "@/services/hash"; // Service for password hashing
import { JWT } from "@/services/jwt"; // Service for JWT generation and verification
import { Email } from "@/services/email";
import { AdminRepository } from "@/admin/infraestructure/AdminRepository"; // Repository for Admin entity

// Import application services
import { Login } from "@/admin/aplication/login"; // Service for handling login logic
import { Create } from "@/admin/aplication/create"; // Service for handling admin creation logic
import { GetMe } from "@/admin/aplication/getMe"; // Service for getting admin information
import { ForgotPassword } from "@/admin/aplication/forgotPassword"; // Service for handling forgot password logic
import { ChangePassword } from "@/admin/aplication/changePassword";

// Import controllers
import { LoginController } from "./controllers/loginController"; // Controller for login endpoint
import { CreateController } from "./controllers/createController"; // Controller for create admin endpoint
import { GetMeController } from "./controllers/getMeController"; // Controller for get admin endpoint
import { ForgotPasswordController } from "./controllers/frogotPasswordController"; // Controller for forgot password
import { ChangePasswordController } from "./controllers/changePasswordController";

// Instantiate services
const hash = new Hash(); // Hash service for hashing passwords
const jwt = new JWT(); // JWT service for token operations
const email = new Email(); // Email service for sending emails

// Instantiate repository
const adminRepository = new AdminRepository(); // Repository for database interactions with Admin entity

// Instantiate application services with injected dependencies
const login = new Login(adminRepository, jwt, hash); // Login service with dependencies
const create = new Create(adminRepository, jwt, hash); // Create service with dependencies
const getMe = new GetMe(adminRepository, jwt); // GetMe service with dependencies
const forgotPassword = new ForgotPassword(adminRepository, jwt, email); // ForgotPassword service with dependencies
const changePassword = new ChangePassword(adminRepository, jwt, hash);

// Instantiate controllers with injected application services
export const loginController = new LoginController(login); // LoginController with Login service
export const createController = new CreateController(create); // CreateController with Create service
export const getMeController = new GetMeController(getMe); // GetMeController with GetMe service
export const forgotPasswordController = new ForgotPasswordController(
  forgotPassword
); // ForgotPasswordController with ForgotPassword service
export const changePasswordController = new ChangePasswordController(
  changePassword
); // ChangePasswordController with ChangePassword service
