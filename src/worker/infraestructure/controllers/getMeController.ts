import { GetMeWorker } from "@/worker/aplication/getMe";

export class GetMeWorkerController {
  constructor(private readonly getMeWorker: GetMeWorker) {}

  async handle({ token, set }: { token: string; set: any }) {
    try {
      const res: any = await this.getMeWorker.execute(token);
      if (res.error) {
        set.status = 401;
        return {
          status: "error",
          message: res.error,
        };
      }
      return {
        status: "success",
        user: {
          id: res.id,
          email: res.email,
          name: res.name,
          surname: res.surname,
          dni: res.dni,
          address: res.address,
          city: res.city,
          postalCode: res.postalCode,
        },
      };
    } catch (e) {
      const error = e as Error;
      return {
        status: "error",
        message: error.message,
      };
    }
  }
}
