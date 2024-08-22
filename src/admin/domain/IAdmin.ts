import { Admin } from "@/admin/domain/Admin";

export interface IAdmin {
  /**
   * Fetches an admin by their email address.
   * @param email - The email of the admin to retrieve.
   * @returns A promise that resolves to an Admin object or null if not found.
   */
  getAdminByEmail(email: string): Promise<Admin | null>;
  getAdminById(id: string): Promise<Admin | null>;
  createAdmin(email: string, password: string): Promise<Admin | null>;
}
