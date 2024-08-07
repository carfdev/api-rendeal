import type { IWorker } from "@/worker/domain/IWorker";
import { Worker } from "@/worker/domain/Worker";
import { PostgresDB } from "@/services/pg";

export class WorkerRepository implements IWorker {
  private db: PostgresDB;
  constructor() {
    this.db = new PostgresDB();
  }
  async create(
    email: string,
    password: string,
    name: string,
    lastname: string,
    dni: string,
    address: string,
    city: string,
    postalCode: string
  ): Promise<Worker | { message: string }> {
    const worker = await this.db.create("Worker", {
      email,
      password,
      name,
      lastname,
      dni,
      address,
      city,
      postalcode: postalCode,
    });

    if (worker.message) {
      return {
        message: worker.message,
      };
    }
    return new Worker(
      worker.id,
      worker.email,
      worker.password,
      worker.name,
      worker.lastname,
      worker.dni,
      worker.address,
      worker.city,
      worker.postalcode
    );
  }

  async getByEmail(email: string): Promise<Worker | null> {
    const worker = await this.db.findUnique("Worker", { email });

    if (!worker) return null;
    return new Worker(
      worker.id,
      worker.email,
      worker.password,
      worker.name,
      worker.lastname,
      worker.dni,
      worker.address,
      worker.city,
      worker.postalcode
    );
  }

  async getById(id: string): Promise<Worker | null> {
    const worker = await this.db.findUnique("Worker", { id });
    if (!worker) return null;
    return new Worker(
      worker.id,
      worker.email,
      worker.password,
      worker.name,
      worker.lastname,
      worker.dni,
      worker.address,
      worker.city,
      worker.postalcode
    );
  }
}
