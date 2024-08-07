import { CreateClient } from "@/client/aplication/create";

type ClientBody = {
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
    workerId: string;
  };
};

export class CreateClientController {
  constructor(private readonly createClient: CreateClient) {}

  async handle({
    set,
    token,
    body: { email, password, name, surname, dni, address, city, postalCode },
  }: {
    set: { status: number };
    token: string;
    body: ClientBody["body"];
  }) {
    const result: any = await this.createClient.execute(
      email,
      password,
      name,
      surname,
      dni,
      address,
      city,
      postalCode,
      token
    );

    if (result.message) {
      set.status = 500;
      return {
        message: result.message,
      };
    }

    set.status = 201;
    return {
      status: "success",
      user: {
        id: result.id,
        email: result.email,
        name: result.name,
        surname: result.surname,
        dni: result.dni,
        address: result.address,
        city: result.city,
        postalCode: result.postalCode,
        workerId: result.workerId,
      },
    };
  }
}
