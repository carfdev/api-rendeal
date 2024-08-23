import type { IAdmin } from "@/admin/domain/IAdmin";
import type { IJWT } from "@/services/interfaces/IJWT";

export class GetMe {
  constructor(
    private readonly adminRepository: IAdmin,
    private readonly jwt: IJWT
  ) {}

  /**
   * Executes the retrieval of the logged-in admin's information.
   * @param token - JWT token for authorization.
   * @returns The Admin object if found, or an error message.
   */
  async execute(token: string): Promise<any> {
    try {
      // Verify the JWT token and extract the admin's ID
      const adminId = (await this.jwt.verify(token)) as string;
      if (!adminId) {
        return { error: "Not authorized: Invalid token." };
      }

      // Fetch the admin associated with the extracted ID
      const admin = await this.adminRepository.getAdminById(adminId);
      if (!admin) {
        return { error: "Not authorized: Admin not found." };
      }

      // Return the admin information
      return admin;
    } catch (error) {
      // Log the error and return a generic error message
      console.error("Error fetching admin:", error);
      return { error: "Not authorized: Invalid token." };
    }
  }
}
