import { Verifier } from "@pact-foundation/pact";
import { startServer } from "./server.mjs";
import fs from "node:fs";

const server = startServer(8080);

const verifierOptions = {
  provider: "ProviderShopApi",
  logLevel: "ERROR",
  providerBaseUrl: "http://localhost:8080",
  pactUrls: ["./pacts/ConsumerShopApp-ProviderShopApi.json"],
  stateHandlers: {
    [null]: () => {
      // This is the "default" state handler, when no state is given
    },
    "The service is not available": {
      setup: () => fs.writeFileSync("service-unavailable.txt", ""),
      teardown: () => fs.rmSync("service-unavailable.txt"),
    },
  },
};

new Verifier(verifierOptions)
  .verifyProvider()
  .then(() => console.log("Pact Verification Complete!"))
  .catch((error) => console.error("Pact Verification Failed: ", error))
  .finally(() => server.close());
