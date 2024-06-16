import axios from "axios";

class ProductService {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL: baseURL,
      validateStatus: false,
    });
  }

  async isServiceAvailable() {
    const response = await this.api.get("/status/");
    return response.status == 200;
  }
}

export default ProductService;
