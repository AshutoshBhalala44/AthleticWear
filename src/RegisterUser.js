class RegisterUser{
    #userId;
    #name;
    #email;
    #password;
    constructor(userId, name, email, password){
        // initialization of class
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.password = password
         
    }

    login(email, password){
        //logging in as register user.
    }

    register(name, email, password){
        //registering a user.
    }

    viewOrders(userId){
        //getting order for register user.
    }
}

export default RegisterUser;