import axios from "axios";
import { Product } from "feature/types";

const BASE_URL = "https://tiwper777.pythonanywhere.com";

export class ProductService {
  async getProductById(id: string): Promise<Product> {
    try {
      const res = await axios.get(`${BASE_URL}/api/product/${id}`);
      return res.data;
    } catch (err) {
      console.error("ProductService.getProductById error:", err);
      throw err;
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const res = await axios.get(`${BASE_URL}/api/products`);
      return res.data;
    } catch (err) {
      console.error("ProductService.getAllProducts error:", err);
      throw err;
    }
  }
}

export class SearchService {
  async searchProductByUrl(url: string) {
    if (!url) throw new Error("URL is required");

    try {
      const res = await axios.post(`${BASE_URL}/api/search`, { url });
      return res.data;
    } catch (err) {
      console.error("SearchService error:", err);
      throw err;
    }
  }
}

export class MailService {
  async sendMail(email: string, productId?: string) {
    if (!email) throw new Error("Email is required");

    const url = `${BASE_URL}/api/send-mail/`;

    const payload = {
      email,
      product_id: productId,   // ⭐ ต้องใช้ชื่อ product_id
    };

    console.log("📤 Sending mail with data:", { url, payload });

    try {
      const res = await axios.post(
        url,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("📥 Response:", res.data);
      return res.data;

    } catch (err: any) {
      console.error("❌ MailService error:", err.response?.data || err);
      throw err;
    }
  }
}


