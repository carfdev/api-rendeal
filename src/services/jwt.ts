import type { IJWT } from "@/services/interfaces/IJWT";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export class JWT implements IJWT {
  async sign(payload: string): Promise<string> {
    const token = jwt.sign({ data: payload }, JWT_SECRET, {
      expiresIn: "1d",
    });
    return token;
  }
  async verify(token: string): Promise<string | null> {
    try {
      const data: { data: string } = (await jwt.verify(
        token,
        JWT_SECRET
      )) as any;
      return data.data as string;
    } catch (error) {
      return null;
    }
  }
}
