import { useAzureSocketIO } from "@azure/web-pubsub-socket.io";
import dotenv from "dotenv";
import { Server } from "socket.io";

dotenv.config();

const PORT = process.env.PORT ?? 5000;

let io = new Server(PORT, { cors: { origin: "*" } });

useAzureSocketIO(io, {
  hub: "Hub",
  connectionString: process.env.AZURE_SOCKET_IO_CONNECTION_STRING,
});

io.on("connection", (socket) => {
  socket.on("invalidate", () => {
    io.emit("invalidate-res");
  });
});

console.log("Server is listening on port:", PORT);
