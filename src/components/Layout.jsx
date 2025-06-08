
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { ShoppingCart, User, LogOut, Package } from "lucide-react";

export const Layout = ({ children }) => {
  const { getCartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-14 items-center justify-between">
          <Link to="/" className="font-bold text-xl">
            AthleticGear
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </Button>
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link to="/orders">
                  <Button variant="ghost" size="icon">
                    <Package className="h-5 w-5" />
                  </Button>
                </Link>
                <span className="text-sm text-muted-foreground">
                  Welcome, {user?.name}
                </span>
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
      {children}
    </div>
  );
};
