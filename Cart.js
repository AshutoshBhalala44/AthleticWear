// Cart class related to RegisterUser
class Cart {
  constructor(cartID, user) {
    this.cartID = cartID;
    this.userID = user.userId;
    this.items = [];
  }

  addItem(product) {
    this.items.push(product);
    console.log(`Added ${product.name} to cart.`);
  }

  removeItem(product) {
    const index = this.items.findIndex(
      (p) => p.name === product.name && p.price === product.price
    );
    if (index > -1) {
      this.items.splice(index, 1);
      console.log(`Removed ${product.name} from cart.`);
    } else {
      console.log(`${product.name} not found in cart.`);
    }
  }

  getTotal() {
    return this.items.reduce((total, p) => total + p.price * p.quantity, 0);
  }
}