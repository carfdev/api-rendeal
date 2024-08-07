import type { IClient } from "@/client/domain/IClient";
import type { IHash } from "@/services/interfaces/IHash";
import type { IJWT } from "@/services/interfaces/IJWT";

export class LoginClient {
  constructor(
    private readonly clientRepository: IClient,
    private readonly hash: IHash,
    private readonly jwt: IJWT
  ) {}

  async execute(email: string, password: string) {
    const client = await this.clientRepository.getByEmail(email);
    if (client) {
      const isPasswordValid = await this.hash.compare(
        password,
        client.password
      );
      if (!isPasswordValid) {
        return {
          error: "Email or password is not valid",
        };
      }
      const token = await this.jwt.sign(client.id);
      return {
        token,
        client,
      };
    } else {
      return {
        error: "Email or password is not valid",
      };
    }
  }
}
