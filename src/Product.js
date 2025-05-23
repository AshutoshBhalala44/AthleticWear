class Product {
    #productID;
    #name;
    #description;
    #price;
    #stock;

    constructor(productID, name, description, price, stock) {
      this.productID = productID;
      this.name = name;
      this.description = description;
      this.price = price;
      this.stock = stock;
    }
  
    getDetails() {
      // Returns product details
    }
  
    isAvailable() {
      // Check if product is available in stock
    }
  }
  
  export default Product;
  