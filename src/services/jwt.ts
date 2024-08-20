import type { IJWT } from "@/services/interfaces/IJWT";
import jwt, { JwtPayload } from "jsonwebtoken";

// Ensure JWT_SECRET is securely loaded from environment variables.
const JWT_SECRET = Bun.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not defined.");
}

export class JWT implements IJWT {
  /**
   * Signs the given payload and returns a JWT.
   *
   * @param payload - The data to be encoded in the JWT.
   * @returns A promise that resolves to the signed JWT as a string.
   *
   * @throws This method may throw an error if the signing process fails.
   */
  async sign(payload: Record<string, any>): Promise<string> {
    try {
      // Assert that JWT_SECRET is a string
      const token = jwt.sign({ data: payload }, JWT_SECRET as string, {
        expiresIn: "1d", // Token expiration can be configured externally if needed.
      });
      return token;
    } catch (error) {
      // Log the error if necessary
      throw new Error(
        `Failed to sign JWT: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  /**
   * Verifies the given JWT and returns the decoded payload if valid.
   *
   * @param token - The JWT to verify.
   * @returns A promise that resolves to the decoded payload if valid, or null if invalid.
   *
   * @throws This method may throw an error if the verification process fails.
   */
  async verify(token: string): Promise<Record<string, any> | null> {
    try {
      // Assert that JWT_SECRET is a string
      const data = jwt.verify(token, JWT_SECRET as string) as JwtPayload;
      return data.data || null; // Safeguard against missing 'data' in the payload.
    } catch (error) {
      // Optionally log the error for debugging
      return null; // Return null if verification fails, indicating the token is invalid.
    }
  }
}
