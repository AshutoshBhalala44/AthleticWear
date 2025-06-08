
import { User } from '../models/User.js';

export class AuthService {
  static async login(email, password) {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email && password) {
        const userData = {
          userId: Date.now().toString(),
          name: email.split('@')[0],
          email: email
        };
        
        const user = User.fromJSON(userData);
        localStorage.setItem('auth_user', JSON.stringify(user.toJSON()));
        
        return { success: true, user };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async register(name, email, password) {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (name && email && password) {
        const userData = {
          userId: Date.now().toString(),
          name: name,
          email: email
        };
        
        const user = User.fromJSON(userData);
        localStorage.setItem('auth_user', JSON.stringify(user.toJSON()));
        
        return { success: true, user };
      } else {
        throw new Error('All fields are required');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static logout() {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('user_orders');
    return { success: true };
  }

  static getCurrentUser() {
    const storedUser = localStorage.getItem('auth_user');
    return storedUser ? User.fromJSON(JSON.parse(storedUser)) : null;
  }
}
