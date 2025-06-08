
export class Order {
  constructor(orderId, userId, items, totalAmount, date, status = 'completed', cancelStatus = 'active', shippingInfo = {}, paymentInfo = {}) {
    this.orderId = orderId;
    this.userId = userId;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
    this.status = status;
    this.cancelStatus = cancelStatus;
    this.shippingInfo = shippingInfo;
    this.paymentInfo = paymentInfo;
    this.subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    this.shipping = this.subtotal > 100 ? 0 : 9.99;
    this.total = this.subtotal + this.shipping;
    this.refundStatus = null;
  }

  static fromJSON(data) {
    return new Order(
      data.id || data.orderId,
      data.userId,
      data.items,
      data.totalAmount || data.total,
      data.date,
      data.status,
      data.cancelStatus,
      data.shippingInfo,
      data.paymentInfo
    );
  }

  toJSON() {
    return {
      id: this.orderId,
      userId: this.userId,
      items: this.items,
      subtotal: this.subtotal,
      shipping: this.shipping,
      total: this.total,
      date: this.date,
      status: this.status,
      cancelStatus: this.cancelStatus,
      shippingInfo: this.shippingInfo,
      paymentInfo: this.paymentInfo,
      refundStatus: this.refundStatus
    };
  }

  cancel() {
    this.status = 'cancelled';
    this.cancelStatus = 'cancelled';
    this.refundStatus = 'refunded';
  }

  getStatus() {
    return this.status;
  }

  canCancel() {
    return this.status === 'completed' && this.cancelStatus !== 'cancelled';
  }
}
