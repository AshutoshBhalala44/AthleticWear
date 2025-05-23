// Cart class related to RegisterUser
class Cart {
  #cartID;
  #userID;
  #items;
  constructor(cartID, user) {
    this.cartID = cartID;
    this.userID = user.userId;
    this.items = [];
  }

  addItem(product) {
    //adding item.
  }

  removeItem(product) {
    //removing item.
  }

  getTotal (items) {
    //getting total
  }
}

export default Cart;