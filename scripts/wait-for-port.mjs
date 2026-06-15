import net from "node:net";

const [host = "127.0.0.1", portValue = "8080"] = process.argv.slice(2);
const port = Number(portValue);
const timeoutMs = Number(process.env.WAIT_FOR_PORT_TIMEOUT_MS ?? 30000);
const intervalMs = Number(process.env.WAIT_FOR_PORT_INTERVAL_MS ?? 250);
const startedAt = Date.now();

if (!Number.isInteger(port) || port <= 0 || port > 65535) {
  console.error(`Invalid port: ${portValue}`);
  process.exit(1);
}

async function canConnect() {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host, port });

    socket.once("connect", () => {
      socket.end();
      resolve(true);
    });

    socket.once("error", () => {
      socket.destroy();
      resolve(false);
    });
  });
}

while (Date.now() - startedAt < timeoutMs) {
  if (await canConnect()) {
    process.exit(0);
  }

  await new Promise((resolve) => setTimeout(resolve, intervalMs));
}

console.error(`Timed out waiting for ${host}:${port}`);
process.exit(1);
