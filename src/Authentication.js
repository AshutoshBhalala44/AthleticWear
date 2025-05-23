class Authentication {
    constructor(userInstance) {
      console.log("constructor")
    }
  
    login(email, password) {
      console.log("logining into application");
    }
  
    logout() {
        
         console.log("No user is currently logged in.");
    }
  
    validateCredentials(email, password) {
      console.log("validating credentials")
    }
  }

  export default RegisterUser;