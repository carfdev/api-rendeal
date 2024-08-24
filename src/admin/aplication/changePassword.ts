import type { IAdmin } from "@/admin/domain/IAdmin";
import type { IJWT } from "@/services/interfaces/IJWT";
import type { IHash } from "@/services/interfaces/IHash";

export class ChangePassword {
  constructor(
    private readonly adminRepository: IAdmin, // Interface for the Admin repository
    private readonly jwt: IJWT, // Interface for JWT service
    private readonly hash: IHash // Interface for Hashing service
  ) {}

  async execute(token: string, password: string): Promise<any> {
    // Validate input: Ensure both token and password are provided
    if (!token || !password) {
      return { error: "Token and password are required" };
    }

    try {
      // Verify the JWT token and extract the admin's email from it
      const adminEmail = (await this.jwt.verify(token)) as { email: string };
      if (!adminEmail) {
        return { error: "The link is invalid" }; // Return an error if the token is invalid or expired
      }

      // Hash the new password before storing it
      const hashedPassword = await this.hash.hashPassword(password);

      // Update the admin's password in the repository using the extracted email
      const admin = await this.adminRepository.updatePassword(
        adminEmail.email,
        hashedPassword
      );

      // Return the updated admin information (or success response)
      return admin;
    } catch (e) {
      // Catch and return any errors that occur during the process
      return { error: "Failed to change password" };
    }
  }
}
