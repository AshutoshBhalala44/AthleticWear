class Order {
    #orderId;
    #userId;
    #itemsOrdered;
    #status;

    constructor(orderId, userId, itemsOrdered, status) {
        this.orderId = orderId;
        this.userId = userId;
        this.itemsOrdered = itemsOrdered;
        this.status = status;
    }

    checkout() {
        //manages order checkout
    }

    cancel() {
        //cancels order
    }

    confirmPayment() {
        //Payment confirmation
    }
}

export default Order;
