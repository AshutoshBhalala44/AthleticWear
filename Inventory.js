class Inventory {
    #productId;
    #quantity;

    constructor(productId,quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }

    checkStock(productId) {
        //Checks the amount of the product based on the productId.
    }

    updateStock(productId, quantity){
        //Updates the quantity of a specified product.
    }
}

export default Inventory;