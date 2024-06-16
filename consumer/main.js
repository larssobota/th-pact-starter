import ProductService from "./service.js";

const productService = new ProductService("http://127.0.0.1:8080");

async function main() {
  await productService.getProducts().then(console.log);
}

main();
