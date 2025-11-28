

export class SearchViewModel {
  url: string = "";
  private service: SearchService;

  constructor() {
    this.service = new SearchService();
  }

  setUrl(value: string) {
    this.url = value;
  }

  async searchProduct() {
    if (!this.url) {
      alert("กรุณากรอก URL");
      return;
    }

    try {
      const data = await this.service.searchProductByUrl(this.url);
      console.log("ผลลัพธ์จาก API:", data);
      return data;
    } catch (err) {
      console.error("SearchViewModel error:", err);
    }
  }
}
import { MailService, SearchService } from "feature/services/ProductService";

export class DetailPageViewModel {
  product: Product | null = null;
  error: string = "";
  loading: boolean = false;
  private service: ProductService;

  constructor() {
    this.service = new ProductService();
  }

  async loadProduct(id: string) {
    this.loading = true;
    this.error = "";

    try {
      this.product = await this.service.getProductById(id);
    } catch (err) {
      this.error = "โหลดสินค้าล้มเหลว";
      console.error(err);
    } finally {
      this.loading = false;
    }
  }
}
import { ProductService } from "feature/services/ProductService";
import { Product } from "feature/types";

export class ProductListViewModel {
  products: Product[] = [];
  loading: boolean = false;
  error: string = "";
  private service: ProductService;

  constructor() {
    this.service = new ProductService();
  }

  async loadProducts() {
    this.loading = true;
    this.error = "";

    try {
      this.products = await this.service.getAllProducts();
    } catch (err) {
      this.error = "โหลดสินค้าทั้งหมดล้มเหลว";
      console.error(err);
    } finally {
      this.loading = false;
    }
  }
}

export class ModalMailViewModel {
  email: string = "";
  isOpen: boolean = false;
  isSubmitting: boolean = false;
  productId: string | undefined;
  private service: MailService;

  constructor(productId?: string) {
    this.productId = productId;
    this.service = new MailService();
  }

  setEmail(value: string) {
    this.email = value;
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  async submit() {
    if (!this.email) return;

    this.isSubmitting = true;
    try {
      await this.service.sendMail(this.email, this.productId);
      this.isSubmitting = false;
      this.email = "";
      this.closeModal();
    } catch (e) {
      console.error("Submit Error:", e);
      this.isSubmitting = false;
    }
  }
}
