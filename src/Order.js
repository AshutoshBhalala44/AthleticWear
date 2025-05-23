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

    checkout(orderId, userId, itemsOrdered) {
        //manages order checkout
    }

    cancel(status) {
        //cancels order
    }

    confirmPayment(orderId, userId) {
        //Payment confirmation
    }
}

export default Order;
