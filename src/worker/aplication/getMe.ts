import type { IWorker } from "@/worker/domain/IWorker";
import type { IJWT } from "@/services/interfaces/IJWT";
import { error } from "elysia";

export class GetMeWorker {
  constructor(
    private readonly workerRepository: IWorker,
    private readonly jwt: IJWT
  ) {}

  async execute(token: string) {
    const data = await this.jwt.verify(token);
    if (!data) {
      return {
        error: "Not Authorized",
      };
    }
    const worker = await this.workerRepository.getById(data);
    if (!worker) {
      return {
        error: "Not Authorized",
      };
    }
    return worker;
  }
}
