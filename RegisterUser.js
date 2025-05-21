class RegisterUser{
    constructor(userId, name, email, password){
        // initialization of class
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.password = password
         
    }

    login(){
        console.log("logging in as register user");
        return true;
    }

    viewOrders(){
        console.log("getting order for register user");
        return true;
    }
}