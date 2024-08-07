import { LoginWorker } from "@/worker/aplication/login";

type WorkerBody = {
  body: {
    email: string;
    password: string;
  };
};

export class LoginWorkerController {
  constructor(private readonly loginWorker: LoginWorker) {}

  async handle({ body, set }: { body: WorkerBody["body"]; set: any }) {
    const { email, password } = body;

    try {
      const res = await this.loginWorker.execute(email, password);
      if (res.error) {
        set.status = 401;
        return {
          status: "error",
          message: res.error,
        };
      } else if (res.token && res.worker) {
        return {
          status: "success",
          token: res.token,
          user: {
            id: res.worker.id,
            email: res.worker.email,
            name: res.worker.name,
            surname: res.worker.surname,
            dni: res.worker.dni,
            address: res.worker.address,
            city: res.worker.city,
            postalCode: res.worker.postalCode,
          },
        };
      }
    } catch (e) {
      set.status = 401;
      return {
        status: "error",
        message: "Email or password is not valid",
      };
    }
  }
}
