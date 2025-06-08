
export class Payment {
  constructor(paymentId, amount, status = 'pending', paymentInfo = {}) {
    this.paymentId = paymentId;
    this.amount = amount;
    this.status = status;
    this.paymentInfo = paymentInfo;
  }

  static fromJSON(data) {
    return new Payment(data.paymentId, data.amount, data.status, data.paymentInfo);
  }

  toJSON() {
    return {
      paymentId: this.paymentId,
      amount: this.amount,
      status: this.status,
      paymentInfo: this.paymentInfo
    };
  }

  async processPayment() {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.status = 'completed';
    return { success: true };
  }

  refund() {
    this.status = 'refunded';
    return { success: true };
  }
}
