export class User {
  constructor(userId, name, email) {
    this.userId = userId;
    this.name = name;
    this.email = email;
  }

  static fromJSON(data) {
    return new User(data.userId, data.name, data.email);
  }

  toJSON() {
    return {
      userId: this.userId,
      name: this.name,
      email: this.email
    };
  }

  // Authentication methods would typically be handled by AuthService
  // but keeping interface consistent with class diagram
  async login(email, password) {
    // This will be handled by AuthService
    return { success: false, error: "Use AuthService for login" };
  }

  async register(name, email, password) {
    // This will be handled by AuthService
    return { success: false, error: "Use AuthService for registration" };
  }

  logout() {
    // This will be handled by AuthService
    return { success: false, error: "Use AuthService for logout" };
  }
}
