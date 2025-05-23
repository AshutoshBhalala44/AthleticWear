class Payment {
    #paymentId;
    #amount;
    #status;
  
    constructor(paymentId, amount, status) {
        this.paymentId = paymentId;
        this.amount = amount;
        this.status = status;
    }

    process() {
        //Payment processing
    }

    refund() {
        //refund processing
    }
    }

export default Payment;
