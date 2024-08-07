import type { IWorker } from "@/worker/domain/IWorker";
import type { IHash } from "@/services/interfaces/IHash";
import type { IJWT } from "@/services/interfaces/IJWT";

export class LoginWorker {
  constructor(
    private readonly workerRepository: IWorker,
    private readonly hash: IHash,
    private readonly jwt: IJWT
  ) {}

  async execute(email: string, password: string) {
    const worker = await this.workerRepository.getByEmail(email);
    if (worker) {
      const isPasswordValid = await this.hash.compare(
        password,
        worker.password
      );
      if (!isPasswordValid) {
        return {
          error: "Email or password is not valid",
        };
      }
      const token = await this.jwt.sign(worker.id);
      return {
        token,
        worker,
      };
    } else {
      return {
        error: "Email or password is not valid",
      };
    }
  }
}
