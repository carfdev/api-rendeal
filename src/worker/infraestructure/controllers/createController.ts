import { CreateWorker } from "@/worker/aplication/create";
type WorkerBody = {
  body: {
    password: string;
    id: string;
    email: string;
    name: string;
    surname: string;
    dni: string;
    address: string;
    city: string;
    postalCode: string;
  };
};

export class CreateWorkerController {
  constructor(private readonly CreateWorker: CreateWorker) {}

  async handle({ body, set }: { body: WorkerBody["body"]; set: any }) {
    const { password, email, name, surname, dni, address, city, postalCode } =
      body;
    try {
      const worker: any = await this.CreateWorker.execute(
        email,
        password,
        name,
        surname,
        dni,
        address,
        city,
        postalCode
      );

      if (worker.message) {
        set.status = 500;
        return {
          message: worker.message,
        };
      }

      set.status = 201;
      return {
        status: "success",
        user: {
          id: worker.id,
          email: worker.email,
          name: worker.name,
          surname: worker.surname,
          dni: worker.dni,
          address: worker.address,
          city: worker.city,
          postalCode: worker.postalCode,
        },
      };
    } catch (e) {
      const error = e as Error;
      set.status = 500;
      return {
        message: error.message,
      };
    }
  }
}
