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
    try {
      // Query the database to find a unique admin by email
      const adminData = await this.db.findUnique.admins(
        { email },
        { "*": true }
      );

      if (adminData) {
        // If an admin is found, return an instance of the Admin class
        return new Admin(
          adminData.id,
          adminData.email,
          adminData.password,
          adminData.rol_id
        );
      } else {
        // If no admin is found, return null
        return null;
      }
    } catch (error) {
      console.error("Failed to retrieve admin by email:", error);
      return null; // Handle database errors
    }
  }

  /**
   * Retrieves an admin by their ID.
   * @param id - The ID of the admin to retrieve.
   * @returns A promise that resolves to an Admin object if found, or null if not.
   */
  async getAdminById(id: string): Promise<Admin | null> {
    try {
      // Query the database to find a unique admin by ID
      const adminData = await this.db.findUnique.admins({ id }, { "*": true });

      if (adminData) {
        // If an admin is found, return an instance of the Admin class
        return new Admin(
          adminData.id,
          adminData.email,
          adminData.password,
          adminData.rol_id
        );
      } else {
        // If no admin is found, return null
        return null;
      }
    } catch (error) {
      console.error("Failed to retrieve admin by ID:", error);
      return null; // Handle database errors
    }
  }

  /**
   * Creates a new admin in the database.
   * @param email - The email of the new admin.
   * @param password - The password of the new admin (hashed).
   * @returns A promise that resolves to the created Admin object if successful, or null if not.
   */
  async createAdmin(email: string, password: string): Promise<Admin | null> {
    try {
      // Create a new admin in the database
      const adminData = await this.db.create.admins({
        email,
        password,
        rol_id: 1,
      });

      if (adminData) {
        // If the admin was created successfully, return an instance of the Admin class
        return new Admin(
          adminData.id,
          adminData.email,
          adminData.password,
          adminData.rol_id
        );
      } else {
        // If the admin was not created, return null
        return null;
      }
    } catch (error) {
      console.error("Failed to create admin:", error);
      return null; // Handle database errors
    }
  }

  /**
   * Updates the password of an admin in the database.
   * @param email - The email of the admin to update.
   * @param password - The new password of the admin (hashed).
   * @returns A promise that resolves to the updated Admin object if successful, or null if not.
   */
  async updatePassword(email: string, password: string): Promise<Admin | null> {
    try {
      // Update the password of the admin in the database
      const adminData = await this.db.update.admins({ email }, { password });

      if (adminData) {
        // If the password was updated successfully, return an instance of the Admin class
        return new Admin(
          adminData.id,
          adminData.email,
          adminData.password,
          adminData.rol_id
        );
      } else {
        // If the password was not updated, return null
        return null;
      }
    } catch (error) {
      console.error("Failed to update admin password:", error);
      return null; // Handle database errors
    }
  }
}
