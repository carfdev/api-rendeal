import { Client } from "@/client/domain/Client";
import type { IClient } from "@/client/domain/IClient";
import { PostgresDB } from "@/services/pg";

export class ClientRepository implements IClient {
  private db: PostgresDB;
  constructor() {
    this.db = new PostgresDB();
  }

  async create(
    email: string,
    password: string,
    name: string,
    surname: string,
    dni: string,
    address: string,
    city: string,
    postalCode: string,
    workerId: string
  ): Promise<Client | { message: string }> {
    const client = await this.db.create("Client", {
      email,
      password,
      name,
      lastname: surname,
      dni,
      address,
      city,
      postalcode: postalCode,
      workerid: workerId,
    });
    if (client.message) {
      return {
        message: client.message,
      };
    }
    return new Client(
      client.id,
      client.email,
      client.password,
      client.name,
      client.lastname,
      client.dni,
      client.address,
      client.city,
      client.postalcode,
      client.workerid
    );
  }

  async isWorker(id: string): Promise<boolean> {
    const worker = await this.db.findUnique("Worker", { id });

    if (!worker) return false;
    return true;
  }

  async getByEmail(email: string): Promise<Client | null> {
    const client = await this.db.findUnique("Client", { email });

    if (!client) return null;
    return new Client(
      client.id,
      client.email,
      client.password,
      client.name,
      client.lastname,
      client.dni,
      client.address,
      client.city,
      client.postalcode,
      client.workerid
    );
  }
}
