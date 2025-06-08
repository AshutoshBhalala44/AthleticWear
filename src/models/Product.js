
export class Product {
  constructor(productId, name, price, category, gender, sizes = [], stock = 0, description = '') {
    this.productId = productId;
    this.name = name;
    this.price = price;
    this.category = category;
    this.gender = gender;
    this.sizes = sizes;
    this.stock = stock;
    this.description = description;
  }

  static fromJSON(data) {
    return new Product(
      data.productId,
      data.name,
      data.price,
      data.category,
      data.gender,
      data.sizes || [],
      data.stock || 0,
      data.description || ''
    );
  }

  toJSON() {
    return {
      productId: this.productId,
      name: this.name,
      price: this.price,
      category: this.category,
      gender: this.gender,
      sizes: this.sizes,
      stock: this.stock,
      description: this.description
    };
  }

  isAvailable() {
    return this.stock > 0;
  }

  checkStock(quantity = 1) {
    return this.stock >= quantity;
  }

  updateStock(quantity) {
    this.stock = Math.max(0, this.stock - quantity);
  }

  restoreStock(quantity) {
    this.stock += quantity;
  }
}
