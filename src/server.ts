import { createApp } from "./app";
import { config } from "./config/config";

function main() {
  const app = createApp();

  const server = app.listen(config.PORT, () => {
    console.info(`API server started on port ${config.PORT}`);
  });

  server.requestTimeout = config.INCOMING_HTTP_TIMEOUT;
}

main();
