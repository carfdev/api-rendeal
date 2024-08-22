/**
 * Interface for handling JSON Web Tokens (JWT) securely.
 * This interface provides methods for signing a payload into a JWT
 * and verifying the validity of a JWT.
 */
export interface IJWT {
  /**
   * Signs the given payload and returns a JWT.
   *
   * @param payload - The data to be encoded in the JWT. Typically an object containing user data.
   * @returns A promise that resolves to the signed JWT as a string.
   *
   * @throws This method may throw an error if signing the token fails.
   */
  sign(payload: Record<string, any>): Promise<string>;

  /**
   * Verifies the given JWT and returns the decoded payload if valid.
   *
   * @param token - The JWT to verify.
   * @returns A promise that resolves to the decoded payload if the token is valid, or null if invalid.
   *
   * @throws This method may throw an error if the verification process fails.
   */
  verify(token: string): Promise<Record<string, any> | string | null>;
}
