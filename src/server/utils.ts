// utils.ts

/**
 * Generate ASCII art for a given text.
 * @param text - The text to convert into ASCII art.
 * @returns ASCII art representation of the text.
 */
export function getAsciiArt(text: string): string {
  // Simple ASCII art generator (for demonstration purposes)
  const art = `
************************************************************
*██████╗ ███████╗███╗   ██╗██████╗ ███████╗ █████╗ ██╗     *
*██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝██╔══██╗██║     *
*██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ███████║██║     *
*██╔══██╗██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██╔══██║██║     *
*██║  ██║███████╗██║ ╚████║██████╔╝███████╗██║  ██║███████╗*
*╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝*
************************************************************
    `;
  return art;
}

/**
 * Get colored text for terminal output.
 * @param text - The text to color.
 * @param color - The color to apply (basic terminal colors).
 * @returns The colored text.
 */
export function getColoredText(
  text: string,
  color: "red" | "green" | "yellow" | "blue" | "cyan" | "gray"
): string {
  const colors: Record<string, string> = {
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    cyan: "\x1b[36m",
    gray: "\x1b[90m",
  };

  const resetColor = "\x1b[0m";
  return `${colors[color] || ""}${text}${resetColor}`;
}
