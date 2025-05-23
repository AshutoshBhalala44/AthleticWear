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
  
    getDetails(productID, name, price, description) {
      // Returns product details
    }
  
    isAvailable(productId, stock) {
      // Check if product is available in stock
    }
  }
  
  export default Product;
  