// Define an interface for the email service
export interface IEmail {
  /**
   * Sends a "Forgot Password" email to the specified user.
   * @param email - The email address of the user to send the recovery email to.
   * @param name - The name of the user to personalize the email content.
   * @returns A promise that resolves to an object indicating the result of the operation.
   *          It may contain an 'error' message or a 'success' message.
   */
  sendForgotPassword(
    email: string,
    name: string
  ): Promise<{ error?: string; success?: string }>;
}
