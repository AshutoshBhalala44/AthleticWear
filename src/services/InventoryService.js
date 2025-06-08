
import { Product } from '../models/Product.js';

export class InventoryService {
  static checkStock(products, productId, quantity = 1) {
    const product = products.find(p => p.productId === productId);
    return product ? product.stock >= quantity : false;
  }

  static updateStock(products, productId, quantity) {
    const product = products.find(p => p.productId === productId);
    if (product) {
      product.stock = Math.max(0, product.stock - quantity);
    }
  }

  static isAvailable(products, productId) {
    const product = products.find(p => p.productId === productId);
    return product ? product.stock > 0 : false;
  }
}
