import { Admin } from "@/admin/domain/Admin";
import type { IAdmin } from "@/admin/domain/IAdmin";
import { DB } from "@/services/pg";

export class AdminRepository implements IAdmin {
  private db: DB;
  constructor() {
    this.db = new DB();
  }

  async getAdmin(email: string): Promise<Admin | null> {
    const admin = await this.db.findUnique.admins({ email }, { "*": true });
    if (admin) {
      return new Admin(admin.id, admin.email, admin.password, admin.rol_id);
    } else {
      return null;
    }
  }
}
