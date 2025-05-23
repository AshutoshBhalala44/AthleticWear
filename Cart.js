// Cart class related to RegisterUser
class Cart extends RegisterUser{
  #cartID;
  #userID;
  #items;
  constructor(cartID, user) {
    this.cartID = cartID;
    this.userID = user.userId;
    this.items = [];
  }

  addItem(product) {
    console.log("adding item")
  }

  removeItem(product) {
    console.log("removing item")
  }

  getTotal() {
    console.log("getting total")
  }
}

//export default RegisterUser;