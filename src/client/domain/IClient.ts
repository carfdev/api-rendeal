import { Client } from "@/client/domain/Client";

export interface IClient {
  create(
    email: string,
    password: string,
    name: string,
    surname: string,
    dni: string,
    address: string,
    city: string,
    postalCode: string,
    workerId: string
  ): Promise<Client | { message: string }>;

  isWorker(id: string): Promise<boolean>;
  getByEmail(email: string): Promise<Client | null>;
}
