import type { IAdmin } from "@/admin/domain/IAdmin";
import type { IJWT } from "@/services/interfaces/IJWT";
import type { IHash } from "@/services/interfaces/IHash";

export class Login {
  constructor(
    private readonly adminRepository: IAdmin,
    private readonly jwt: IJWT,
    private readonly hash: IHash
  ) {}

  async execute(email: string, password: string) {
    const admin = await this.adminRepository.getAdmin(email);
    if (admin) {
      const isPasswordValid = await this.hash.comparePassword(
        password,
        admin.password
      );
      if (!isPasswordValid) {
        return {
          error: "Email or password is incorrect",
        };
      }

      const token = await this.jwt.sign(
        admin.id as unknown as Record<string, any>
      );

      return {
        token,
      };
    } else {
      return {
        error: "Email or password is incorrect",
      };
    }
  }
}
