
import { Product } from '../models/Product.js';

// Product data converted to Product model instances
const productData = [
  {
    productId: "1",
    name: "Premium Running Shoes",
    price: 129.99,
    category: "Footwear",
    gender: "Unisex",
    sizes: ["7", "8", "9", "10", "11", "12"],
    stock: 25,
    description: "High-performance running shoes with advanced cushioning technology for maximum comfort and support during your workouts."
  },
  {
    productId: "4",
    name: "Athletic Performance T-Shirt",
    price: 34.99,
    category: "Apparel",
    gender: "Unisex",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 50,
    description: "Moisture-wicking athletic shirt designed for optimal performance and comfort during intense training sessions."
  },
  {
    productId: "7",
    name: "Men's Athletic T-Shirt",
    price: 29.99,
    category: "Apparel",
    gender: "Men",
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 30,
    description: "Comfortable and breathable men's athletic t-shirt perfect for workouts, running, and everyday active wear."
  },
  {
    productId: "8",
    name: "Women's Athletic T-Shirt",
    price: 32.99,
    category: "Apparel",
    gender: "Women",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 15,
    description: "Stylish and functional women's athletic t-shirt with moisture-wicking fabric for ultimate comfort during exercise."
  }
];

export class ProductStore {
  static products = productData.map(data => Product.fromJSON(data));

  static getAllProducts() {
    return this.products;
  }

  static getProductById(productId) {
    return this.products.find(p => p.productId === productId);
  }

  static updateProductStock(productId, quantity) {
    const product = this.getProductById(productId);
    if (product) {
      product.updateStock(quantity);
    }
  }

  static checkProductStock(productId, quantity = 1) {
    const product = this.getProductById(productId);
    return product ? product.checkStock(quantity) : false;
  }

  static isProductAvailable(productId) {
    const product = this.getProductById(productId);
    return product ? product.isAvailable() : false;
  }
}
