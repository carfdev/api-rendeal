import { Server } from "@/server";

// Create a new instance of the Server class
const server = new Server();

// Start the server and handle potential errors
server.start().catch((error) => {
  console.error("Failed to start the server:", error);
  process.exit(1); // Exit the process with an error code
});
