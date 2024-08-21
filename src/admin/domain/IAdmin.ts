import { Admin } from "@/admin/domain/Admin";

export interface IAdmin {
  getAdmin(email: string): Promise<Admin | null>;
}
