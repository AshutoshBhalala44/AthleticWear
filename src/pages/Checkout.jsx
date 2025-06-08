import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/Layout';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { updateStock } from '@/data/products';

export default function Checkout() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutAsGuest, setCheckoutAsGuest] = useState(false);
  const [guestEmail, setGuestEmail] = useState('');
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    zipCode: '',
    country: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const { cartItems, getTotalAmount, getShipping, getFinalTotal, clearCart } = useCart();
  const { user, isAuthenticated, addOrder } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleShippingChange = (field, value) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field, value) => {
    setPaymentInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update stock for each item
      cartItems.forEach(item => {
        updateStock(item.productId, item.quantity);
      });
      
      // Create order record
      const orderData = {
        items: cartItems,
        subtotal: getTotalAmount(),
        shipping: getShipping(),
        total: getFinalTotal(),
        shippingInfo,
        paymentInfo: {
          ...paymentInfo,
          cardNumber: `****-****-****-${paymentInfo.cardNumber.slice(-4)}`
        },
        status: 'completed',
        cancelStatus: 'active',
        guestEmail: checkoutAsGuest ? guestEmail : null
      };
      
      if (isAuthenticated) {
        addOrder(orderData);
      }
      
      toast({
        title: "Order placed successfully!",
        description: `Your order total was $${getFinalTotal().toFixed(2)}`,
      });

      clearCart();
      
      if (isAuthenticated) {
        navigate('/orders');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        {!isAuthenticated && !checkoutAsGuest && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Checkout Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button asChild className="h-auto p-4">
                  <Link to="/login" className="flex flex-col items-center space-y-2">
                    <span className="font-semibold">Login to Account</span>
                    <span className="text-sm opacity-80">Access order history and saved info</span>
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto p-4"
                  onClick={() => setCheckoutAsGuest(true)}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <span className="font-semibold">Continue as Guest</span>
                    <span className="text-sm opacity-80">No account needed</span>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {(isAuthenticated || checkoutAsGuest) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {checkoutAsGuest && (
                <Card>
                  <CardHeader>
                    <CardTitle>Guest Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label htmlFor="guestEmail">Email Address</Label>
                      <Input
                        id="guestEmail"
                        type="email"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        We'll send your order confirmation to this email
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) => handleShippingChange('address', e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) => handleShippingChange('city', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">Zip Code</Label>
                      <Input
                        id="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={(e) => handleShippingChange('zipCode', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={shippingInfo.country}
                      onChange={(e) => handleShippingChange('country', e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cardholderName">Cardholder Name</Label>
                    <Input
                      id="cardholderName"
                      value={paymentInfo.cardholderName}
                      onChange={(e) => handlePaymentChange('cardholderName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => handlePaymentChange('expiryDate', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={`${item.productId}-${item.selectedSize || 'default'}`} className="flex justify-between">
                      <span>
                        {item.name} {item.selectedSize && `(${item.selectedSize})`} × {item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <hr />
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${getTotalAmount().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{getShipping() === 0 ? 'Free' : `$${getShipping().toFixed(2)}`}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${getFinalTotal().toFixed(2)}</span>
                  </div>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleSubmit}
                    disabled={isProcessing || (checkoutAsGuest && !guestEmail)}
                  >
                    {isProcessing ? 'Processing...' : `Pay $${getFinalTotal().toFixed(2)}`}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
