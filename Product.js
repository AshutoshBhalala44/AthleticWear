class Product {
    constructor(productID, name, category, price, stockQuantity) {
      this.productID = productID;
      this.name = name;
      this.category = category;
      this.price = price;
      this.stockQuantity = stockQuantity;
    }
  
    getDetails() {
      // Returns product details
      return {
        productID: this.productID,
        name: this.name,
        category: this.category,
        price: this.price,
        stockQuantity: this.stockQuantity
      };
    }
  
    updateStock(quantity) {
      // Update stock based on quantity added or removed
      this.stockQuantity += quantity;
    }
  
    isInStock() {
      // Check if product is available in stock
      return this.stockQuantity > 0;
    }
  }
  
  export default Product;
  