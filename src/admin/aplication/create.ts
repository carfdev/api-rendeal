import type { IAdmin } from "@/admin/domain/IAdmin";
import type { IJWT } from "@/services/interfaces/IJWT";
import type { IHash } from "@/services/interfaces/IHash";

export class Create {
  constructor(
    private readonly adminRepository: IAdmin,
    private readonly jwt: IJWT,
    private readonly hash: IHash
  ) {}

  /**
   * Executes the creation of a new admin user.
   * @param email - Email of the new admin.
   * @param password - Password of the new admin.
   * @param token - JWT token for authorization.
   * @returns The created Admin object or an error message.
   */
  async execute(email: string, password: string, token: string): Promise<any> {
    try {
      // Verify the JWT token and extract the creator's ID
      const creatorId = (await this.jwt.verify(token)) as string;
      if (!creatorId) {
        return { error: "Not authorized: Invalid token." };
      }

      // Fetch the admin associated with the creator's ID
      const admin = await this.adminRepository.getAdminById(creatorId);
      if (!admin) {
        return { error: "Not authorized: Insufficient permissions." };
      }

      // Check if the admin has the required role to create a new admin
      if (Number(admin.rolId) !== 1) {
        return { error: "Not authorized: Insufficient permissions." };
      }

      // Hash the password for the new admin
      const hashedPassword = await this.hash.hashPassword(password);

      // Create and return the new admin object
      const newAdmin = await this.adminRepository.createAdmin(
        email,
        hashedPassword
      );

      return newAdmin;
    } catch (error) {
      // Log the error for debugging purposes and return a generic error message
      console.error("Error creating admin:", error);
      return { error: "Failed to create admin." };
    }
  }
}
