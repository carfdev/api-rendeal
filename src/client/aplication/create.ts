import type { IClient } from "@/client/domain/IClient";
import type { IHash } from "@/services/interfaces/IHash";
import type { IJWT } from "@/services/interfaces/IJWT";

export class CreateClient {
  constructor(
    private readonly clientRepository: IClient,
    private readonly hash: IHash,
    private readonly jwt: IJWT
  ) {}

  async execute(
    email: string,
    password: string,
    name: string,
    surname: string,
    dni: string,
    address: string,
    city: string,
    postalCode: string,
    token: string
  ) {
    try {
      const data: string | null = await this.jwt.verify(token);
      if (!data) {
        return {
          message: "Not authorized to create a client",
        };
      } else {
        const workerId = data;
        const isWorker = await this.clientRepository.isWorker(workerId);
        if (!isWorker) {
          return {
            message: "Not authorized to create a client",
          };
        } else {
          const hashedPassword = await this.hash.hash(password);
          const client = await this.clientRepository.create(
            email,
            hashedPassword,
            name,
            surname,
            dni,
            address,
            city,
            postalCode,
            workerId
          );
          return client;
        }
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
