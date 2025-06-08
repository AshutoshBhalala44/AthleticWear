
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Orders() {
  const { isAuthenticated, orders, cancelOrder } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'cancelled':
        return 'destructive';
      case 'pending':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const canCancelOrder = (order) => {
    return order.status === 'completed' && order.cancelStatus !== 'cancelled';
  };

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
        
        {orders.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">You haven't placed any orders yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Placed on {formatDate(order.date)}
                      </p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Badge variant={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                      {order.refundStatus && (
                        <Badge variant="outline">
                          Refunded
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Items:</h4>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.name} × {item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>${order.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Shipping</span>
                        <span>{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between font-medium text-lg border-t pt-2 mt-2">
                        <span>Total</span>
                        <span>${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">Shipping Address:</h4>
                      <div className="text-sm text-muted-foreground">
                        <p>{order.shippingInfo.address}</p>
                        <p>{order.shippingInfo.city}, {order.shippingInfo.zipCode}</p>
                        <p>{order.shippingInfo.country}</p>
                      </div>
                    </div>

                    {canCancelOrder(order) && (
                      <div className="border-t pt-4">
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => cancelOrder(order.id)}
                        >
                          Cancel Order & Refund
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
