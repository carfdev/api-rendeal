import { Worker } from "@/worker/domain/Worker";

export interface IWorker {
  create(
    email: string,
    password: string,
    name: string,
    surname: string,
    dni: string,
    address: string,
    city: string,
    postalCode: string
  ): Promise<Worker | { message: string }>;

  getByEmail(email: string): Promise<Worker | null>;

  getById(id: string): Promise<Worker | null>;
}
