import type { IHash } from "@/services/interfaces/IHash";

export class Hash implements IHash {
  async hash(password: string): Promise<string> {
    const hash = await Bun.password.hash(password);
    return hash;
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const isMatch = await Bun.password.verify(password, hash);
    return isMatch;
  }
}
