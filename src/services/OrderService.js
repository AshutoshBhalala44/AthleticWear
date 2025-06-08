
import { Order } from '../models/Order.js';
import { Payment } from '../models/Payment.js';

export class OrderService {
  static async createOrder(orderData) {
    const orderId = Date.now().toString();
    const order = new Order(
      orderId,
      orderData.userId,
      orderData.items,
      orderData.total,
      new Date().toISOString(),
      'completed',
      'active',
      orderData.shippingInfo,
      orderData.paymentInfo
    );
    
    return order;
  }

  static saveOrder(order) {
    const orders = this.getOrders();
    const updatedOrders = [order.toJSON(), ...orders];
    localStorage.setItem('user_orders', JSON.stringify(updatedOrders));
  }

  static getOrders() {
    const storedOrders = localStorage.getItem('user_orders');
    return storedOrders ? JSON.parse(storedOrders) : [];
  }

  static cancelOrder(orderId) {
    const orders = this.getOrders();
    const updatedOrders = orders.map(orderData => {
      if (orderData.id === orderId) {
        const order = Order.fromJSON(orderData);
        order.cancel();
        return order.toJSON();
      }
      return orderData;
    });
    
    localStorage.setItem('user_orders', JSON.stringify(updatedOrders));
    return { success: true };
  }

  static async processPayment(paymentInfo, amount) {
    const payment = new Payment(Date.now().toString(), amount, 'pending', paymentInfo);
    const result = await payment.processPayment();
    return { success: result.success, payment };
  }
}
