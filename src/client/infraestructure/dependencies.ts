import { Hash } from "@/services/hash";
import { JWT } from "@/services/jwt";

import { ClientRepository } from "@/client/infraestructure/ClientRepository";
import { CreateClient } from "@/client/aplication/create";
import { CreateClientController } from "@/client/infraestructure/controllers/createController";

import { LoginClient } from "../aplication/login";
import { LoginClientController } from "../infraestructure/controllers/loginController";

const hash = new Hash();
const jwt = new JWT();
const clientRepository = new ClientRepository();
const createClient = new CreateClient(clientRepository, hash, jwt);
export const createClientController = new CreateClientController(createClient);

const loginClient = new LoginClient(clientRepository, hash, jwt);
export const loginClientController = new LoginClientController(loginClient);
