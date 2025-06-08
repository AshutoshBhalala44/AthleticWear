
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getTotalAmount, getShipping, getFinalTotal } = useCart();
  const { isAuthenticated } = useAuth();

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <Button asChild>
            <Link to="/">Start Shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={`${item.productId}-${item.selectedSize || 'default'}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      {item.selectedSize && (
                        <p className="text-sm text-muted-foreground">Size: {item.selectedSize}</p>
                      )}
                      <p className="text-muted-foreground">${item.price}</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.productId, item.selectedSize, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.productId, item.selectedSize, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <span className="font-semibold min-w-20 text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.productId, item.selectedSize)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${getTotalAmount().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{getShipping() === 0 ? 'Free' : `$${getShipping().toFixed(2)}`}</span>
              </div>
              {getShipping() === 0 && (
                <p className="text-sm text-green-600">🎉 Free shipping on orders over $100!</p>
              )}
              <hr />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${getFinalTotal().toFixed(2)}</span>
              </div>
              
              <Button className="w-full" size="lg" asChild>
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>
              
              {!isAuthenticated && (
                <p className="text-sm text-center text-muted-foreground">
                  You can checkout as a guest or <Link to="/login" className="text-primary hover:underline">login</Link> for order tracking
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
