import { Admin } from "@/admin/domain/Admin";
import type { IAdmin } from "@/admin/domain/IAdmin";
import { DB } from "@/services/pg";

export class AdminRepository implements IAdmin {
  private db: DB;

  constructor() {
    this.db = new DB(); // Initialize the database connection
  }

  /**
   * Retrieves an admin by their email address.
   * @param email - The email of the admin to retrieve.
   * @returns A promise that resolves to an Admin object if found, or null if not.
   */
  async getAdminByEmail(email: string): Promise<Admin | null> {
    // Query the database to find a unique admin by email
    const admin = await this.db.findUnique.admins({ email }, { "*": true });

    if (admin) {
      // If an admin is found, return an instance of the Admin class
      return new Admin(admin.id, admin.email, admin.password, admin.rol_id);
    } else {
      // If no admin is found, return null
      return null;
    }
  }
}
