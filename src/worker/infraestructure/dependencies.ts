import { Hash } from "@/services/hash";
import { JWT } from "@/services/jwt";

import { WorkerRepository } from "@/worker/infraestructure/WorkerRepository";
import { CreateWorker } from "@/worker/aplication/create";
import { CreateWorkerController } from "@/worker/infraestructure/controllers/createController";

import { LoginWorker } from "@/worker/aplication/login";
import { LoginWorkerController } from "@/worker/infraestructure/controllers/loginController";

import { GetMeWorker } from "@/worker/aplication/getMe";
import { GetMeWorkerController } from "@/worker/infraestructure/controllers/getMeController";

const hash = new Hash();

const jwt = new JWT();

const workerRepository = new WorkerRepository();
const createWorker = new CreateWorker(workerRepository, hash);
export const createWorkerController = new CreateWorkerController(createWorker);

const loginWorker = new LoginWorker(workerRepository, hash, jwt);
export const loginWorkerController = new LoginWorkerController(loginWorker);

const getMeWorker = new GetMeWorker(workerRepository, jwt);
export const getMeWorkerController = new GetMeWorkerController(getMeWorker);
