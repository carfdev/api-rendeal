import type { IWorker } from "@/worker/domain/IWorker";
import type { IHash } from "@/services/interfaces/IHash";

export class CreateWorker {
  constructor(
    private readonly workerRepository: IWorker,
    private readonly hash: IHash
  ) {}

  async execute(
    email: string,
    password: string,
    name: string,
    surname: string,
    dni: string,
    address: string,
    city: string,
    postalCode: string
  ) {
    const hashedPassword = await this.hash.hash(password);
    const worker = await this.workerRepository.create(
      email,
      hashedPassword,
      name,
      surname,
      dni,
      address,
      city,
      postalCode
    );
    return worker;
  }
}
