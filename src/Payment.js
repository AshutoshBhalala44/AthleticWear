class Payment {
    #paymentId;
    #amount;
    #status;
  
    constructor(paymentId, amount, status) {
        this.paymentId = paymentId;
        this.amount = amount;
        this.status = status;
    }

    process(paymentId, amount) {
        //Payment processing
    }

    refund(paymentId, status) {
        //refund processing
    }
    }

export default Payment;
