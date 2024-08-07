import { LoginClient } from "@/client/aplication/login";

type ClientBody = {
  body: {
    email: string;
    password: string;
  };
};

export class LoginClientController {
  constructor(private readonly loginClient: LoginClient) {}

  async handle({ body, set }: { body: ClientBody["body"]; set: any }) {
    const { email, password } = body;

    try {
      const res = await this.loginClient.execute(email, password);
      if (res.error) {
        set.status = 401;
        return {
          status: "error",
          message: res.error,
        };
      } else if (res.token && res.client) {
        return {
          status: "success",
          token: res.token,
          user: {
            id: res.client.id,
            email: res.client.email,
            name: res.client.name,
            surname: res.client.surname,
            dni: res.client.dni,
            address: res.client.address,
            city: res.client.city,
            postalCode: res.client.postalCode,
            workerId: res.client.workerId,
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
