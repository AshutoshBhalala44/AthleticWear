
import { Cart } from '../models/Cart.js';
import { Product } from '../models/Product.js';
import { Session } from '../models/Session.js';

export class CartService {
  static getSessionId() {
    let sessionId = localStorage.getItem('guest_session_id');
    if (!sessionId) {
      const session = Session.generateGuestSession();
      sessionId = session.sessionId;
      localStorage.setItem('guest_session_id', sessionId);
    }
    return sessionId;
  }

  static loadCart() {
    const sessionId = this.getSessionId();
    const savedCart = localStorage.getItem(`cart_items_${sessionId}`);
    
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      return new Cart(sessionId, cartData);
    }
    
    return new Cart(sessionId, []);
  }

  static saveCart(cart) {
    const sessionId = this.getSessionId();
    localStorage.setItem(`cart_items_${sessionId}`, JSON.stringify(cart.items));
  }

  static clearCart() {
    const sessionId = this.getSessionId();
    localStorage.removeItem(`cart_items_${sessionId}`);
  }
}
