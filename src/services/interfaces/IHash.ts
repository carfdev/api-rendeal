/**
 * Interface for hashing and verifying passwords.
 * This interface defines the methods required to securely hash a password
 * and later compare it with a stored hash.
 */
export interface IHash {
  /**
   * Hashes the given password using a secure algorithm.
   *
   * @param password - The plaintext password to be hashed.
   * @returns A promise that resolves to the hashed password as a string.
   *
   * @throws This method may throw an error if the hashing operation fails.
   */
  hashPassword(password: string): Promise<string>;

  /**
   * Compares a plaintext password with a hashed password.
   *
   * @param password - The plaintext password to compare.
   * @param hash - The hashed password to compare against.
   * @returns A promise that resolves to a boolean indicating whether the passwords match.
   *
   * @throws This method may throw an error if the comparison operation fails.
   */
  comparePassword(password: string, hash: string): Promise<boolean>;
}
