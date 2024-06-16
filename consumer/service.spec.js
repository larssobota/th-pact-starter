import { PactV4, SpecificationVersion } from "@pact-foundation/pact";
import { expect } from "chai";
import ProductService from "./service.js";

const mockProvider = new PactV4({
  consumer: "ConsumerShopApp",
  provider: "ProviderShopApi",
  dir: process.cwd() + "/pacts",
  logLevel: "error",
  spec: SpecificationVersion.SPECIFICATION_VERSION_V4,
});

describe("ProductService", () => {

  describe("isServiceAvailable", () => {
    it("returns true if the service is available", async () => {
      // Arrange: Setup our expected interactions
      await mockProvider
        .addInteraction()
        .given("The service is up and running")
        .uponReceiving("a request for the status")
        .withRequest("GET", "/status/")
        .willRespondWith(200)
        .executeTest(async (mockserver) => {
          // Act: test our API client behaves correctly
          const productService = new ProductService(mockserver.url);

          const result = await productService.isServiceAvailable();

          // Assert: check the result
          expect(result).to.be.true;
        });
    });

    it("returns false if the service is not available", async () => {
      // Arrange: Setup our expected interactions
      await mockProvider
        .addInteraction()
        .given("The service is not available")
        .uponReceiving("a request for the status")
        .withRequest("GET", "/status/")
        .willRespondWith(503)
        .executeTest(async (mockserver) => {
          // Act: test our API client behaves correctly
          const productService = new ProductService(mockserver.url);

          const result = await productService.isServiceAvailable();

          // Assert: check the result
          expect(result).to.be.false;
        });
    });
  });

});
