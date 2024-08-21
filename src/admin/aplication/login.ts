import type { IAdmin } from "@/admin/domain/IAdmin";
import type { IJWT } from "@/services/interfaces/IJWT";
import type { IHash } from "@/services/interfaces/IHash";

export class Login {
  constructor(
    private readonly adminRepository: IAdmin,
    private readonly jwt: IJWT,
    private readonly hash: IHash
  ) {}

  /**
   * Executes the login process.
   * @param email - The admin's email address.
   * @param password - The admin's password.
   * @returns A promise that resolves to either a token or an error message.
   */

  async execute(email: string, password: string) {
    // Validate input
    if (!email || !password) {
      return { error: "Email and password are required" };
    }
    // Retrieve the admin by email
    const admin = await this.adminRepository.getAdminByEmail(email);

    if (!admin) {
      return { error: "Email or password is incorrect" };
    }
    // Verify the password
    const isPasswordValid = await this.hash.comparePassword(
      password,
      admin.password
    );
    if (!isPasswordValid) {
      return { error: "Email or password is incorrect" };
    }
    // Generate the JWT token
    const token = await this.jwt.sign(
      admin.id as unknown as Record<string, any>
    );
    return { token };
  }
}
