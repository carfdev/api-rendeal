import type { IHash } from "@/services/interfaces/IHash";

/**
 * Class that implements IHash to provide password hashing and comparison functionality.
 * This class uses bcrypt as the algorithm for secure password storage.
 */
export class Hash implements IHash {
  private readonly algorithm = "bcrypt"; // Algorithm for hashing, can be configured externally.
  private readonly cost = 10; // Cost factor for bcrypt, consider configuring externally.

  /**
   * Hashes the given password using bcrypt algorithm.
   *
   * @param password - The plaintext password to be hashed.
   * @returns A promise that resolves to the hashed password.
   *
   * @throws An error if the hashing process fails.
   */
  async hashPassword(password: string): Promise<string> {
    try {
      const hash = await Bun.password.hash(password, {
        algorithm: this.algorithm,
        cost: this.cost,
      });
      return hash;
    } catch (error) {
      // Handle the 'unknown' type by checking if it's an instance of Error
      if (error instanceof Error) {
        throw new Error(`Failed to hash password: ${error.message}`);
      } else {
        throw new Error("Failed to hash password: An unknown error occurred.");
      }
    }
  }

  /**
   * Compares a plaintext password with a hashed password.
   *
   * @param password - The plaintext password to compare.
   * @param hash - The hashed password to compare against.
   * @returns A promise that resolves to a boolean indicating whether the passwords match.
   *
   * @throws An error if the comparison process fails.
   */
  async comparePassword(password: string, hash: string): Promise<boolean> {
    try {
      const isMatch = await Bun.password.verify(password, hash);
      return isMatch;
    } catch (error) {
      // Handle the 'unknown' type by checking if it's an instance of Error
      if (error instanceof Error) {
        throw new Error(`Failed to compare password: ${error.message}`);
      } else {
        throw new Error(
          "Failed to compare password: An unknown error occurred."
        );
      }
    }
  }
}
