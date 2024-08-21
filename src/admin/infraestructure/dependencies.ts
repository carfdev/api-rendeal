import { Hash } from "@/services/hash";
import { JWT } from "@/services/jwt";

import { AdminRepository } from "@/admin/infraestructure/AdminRepository";
import { Login } from "@/admin/aplication/login";
import { LoginController } from "./controllers/loginController";

const hash = new Hash();
const jwt = new JWT();
const adminRepository = new AdminRepository();
const login = new Login(adminRepository, jwt, hash);
export const loginController = new LoginController(login);
