import Product from 'product.js';

class Inventory {
  constructor() {
    this.products = new Map(); // key: productID, value: Product instance
  }

  addProduct(product) {
    if (product instanceof Product) {
      this.products.set(product.productID, product);
    } else {
      throw new Error("Invalid product type.");
    }
  }

  removeProduct(productID) {
    this.products.delete(productID);
  }

  getProduct(productID) {
    return this.products.get(productID);
  }

  listProductsByCategory(category) {
    const results = [];
    for (let product of this.products.values()) {
      if (product.category === category) {
        results.push(product);
      }
    }
    return results;
  }

  checkAvailability(productID) {
    const product = this.products.get(productID);
    return product ? product.isInStock() : false;
  }
}

export default Inventory;