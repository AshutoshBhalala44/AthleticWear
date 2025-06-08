
export class Cart {
  constructor(cartId, items = []) {
    this.cartId = cartId;
    this.items = items;
  }

  static fromJSON(data) {
    return new Cart(data.cartId, data.items || []);
  }

  toJSON() {
    return {
      cartId: this.cartId,
      items: this.items
    };
  }

  addItem(product, quantity = 1, selectedSize = null) {
    const cartKey = `${product.productId}-${selectedSize || 'default'}`;
    const existingItem = this.items.find(item => 
      item.productId === product.productId && 
      (item.selectedSize || 'default') === (selectedSize || 'default')
    );
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({
        ...product,
        quantity,
        selectedSize,
        cartKey
      });
    }
  }

  removeItem(productId, selectedSize = null) {
    this.items = this.items.filter(item => 
      !(item.productId === productId && 
        (item.selectedSize || 'default') === (selectedSize || 'default'))
    );
  }

  updateQuantity(productId, selectedSize = null, quantity) {
    if (quantity <= 0) {
      this.removeItem(productId, selectedSize);
      return;
    }

    const item = this.items.find(item =>
      item.productId === productId && 
      (item.selectedSize || 'default') === (selectedSize || 'default')
    );
    
    if (item) {
      item.quantity = quantity;
    }
  }

  getTotalAmount() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getCartCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getShipping() {
    const total = this.getTotalAmount();
    return total > 100 ? 0 : 9.99; // Free shipping over $100
  }

  getFinalTotal() {
    return this.getTotalAmount() + this.getShipping();
  }

  clearCart() {
    this.items = [];
  }
}
