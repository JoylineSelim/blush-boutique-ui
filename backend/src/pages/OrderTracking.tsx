import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Truck, CheckCircle, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderStatus {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
  active: boolean;
  icon: React.ReactNode;
}

const OrderTracking = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [orderData, setOrderData] = useState<any>(null);

  // Mock order data
  const mockOrderData = {
    orderNumber: "BB-2024-001234",
    status: "In Transit",
    estimatedDelivery: "March 15, 2024",
    totalAmount: 89.97,
    items: [
      { name: "Velvet Rose Lipstick", quantity: 1, price: 28.99 },
      { name: "Nude Goddess Gloss", quantity: 2, price: 22.50 },
    ],
    shippingAddress: {
      name: "Sarah Johnson",
      address: "123 Beauty Lane, Apt 4B",
      city: "New York, NY 10001",
    },
    trackingStatuses: [
      {
        id: "1",
        title: "Order Placed",
        description: "Your order has been confirmed and is being prepared",
        timestamp: "March 10, 2024 at 2:30 PM",
        completed: true,
        active: false,
        icon: <CheckCircle className="h-5 w-5" />,
      },
      {
        id: "2",
        title: "Processing",
        description: "Your beauty products are being carefully packaged",
        timestamp: "March 11, 2024 at 10:15 AM",
        completed: true,
        active: false,
        icon: <Package className="h-5 w-5" />,
      },
      {
        id: "3",
        title: "Shipped",
        description: "Your package is on its way to you",
        timestamp: "March 12, 2024 at 3:45 PM",
        completed: true,
        active: true,
        icon: <Truck className="h-5 w-5" />,
      },
      {
        id: "4",
        title: "Out for Delivery",
        description: "Your package is out for delivery",
        timestamp: "",
        completed: false,
        active: false,
        icon: <MapPin className="h-5 w-5" />,
      },
      {
        id: "5",
        title: "Delivered",
        description: "Your order has been delivered",
        timestamp: "",
        completed: false,
        active: false,
        icon: <CheckCircle className="h-5 w-5" />,
      },
    ],
  };

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setOrderData(mockOrderData);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Track Your <span className="bg-gradient-primary bg-clip-text text-transparent">Order</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Enter your order details to track your beauty package
          </p>
        </div>

        {!orderData ? (
          /* Order Lookup Form */
          <div className="max-w-md mx-auto">
            <div className="bg-card rounded-3xl shadow-elegant p-8 border border-border/50">
              <form onSubmit={handleTrackOrder} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="orderNumber" className="text-sm font-medium text-card-foreground">
                    Order Number
                  </label>
                  <Input
                    id="orderNumber"
                    type="text"
                    placeholder="BB-2024-XXXXXX"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    className="h-12 rounded-full"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-card-foreground">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-full"
                    required
                  />
                </div>

                <Button type="submit" className="w-full" variant="luxury" size="lg">
                  Track Order
                </Button>
              </form>
            </div>
          </div>
        ) : (
          /* Order Tracking Results */
          <div className="space-y-8">
            {/* Order Header */}
            <div className="bg-card rounded-3xl shadow-elegant p-8 border border-border/50">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Order Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Order Number:</span>
                      <span className="font-medium">{orderData.orderNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="text-primary font-medium">{orderData.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total:</span>
                      <span className="font-medium">${orderData.totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estimated Delivery:</span>
                      <span className="font-medium">{orderData.estimatedDelivery}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Shipping Address</h3>
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium text-foreground">{orderData.shippingAddress.name}</p>
                    <p>{orderData.shippingAddress.address}</p>
                    <p>{orderData.shippingAddress.city}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-card rounded-3xl shadow-elegant p-8 border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-6">Order Items</h3>
              <div className="space-y-4">
                {orderData.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-border/50 last:border-b-0">
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tracking Progress */}
            <div className="bg-card rounded-3xl shadow-elegant p-8 border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-8">Tracking Progress</h3>
              
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>
                
                {/* Status Items */}
                <div className="space-y-8">
                  {orderData.trackingStatuses.map((status: OrderStatus, index: number) => (
                    <div key={status.id} className="relative flex items-start gap-6">
                      {/* Icon */}
                      <div
                        className={cn(
                          "relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300",
                          status.completed
                            ? "bg-primary border-primary text-white"
                            : status.active
                            ? "bg-primary/10 border-primary text-primary animate-pulse-soft"
                            : "bg-background border-border text-muted-foreground"
                        )}
                      >
                        {status.completed ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          status.icon
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 pb-8">
                        <div className="flex items-center justify-between">
                          <h4
                            className={cn(
                              "text-base font-medium",
                              status.completed || status.active
                                ? "text-foreground"
                                : "text-muted-foreground"
                            )}
                          >
                            {status.title}
                          </h4>
                          {status.timestamp && (
                            <span className="text-sm text-muted-foreground">
                              {status.timestamp}
                            </span>
                          )}
                        </div>
                        <p
                          className={cn(
                            "text-sm mt-1",
                            status.completed || status.active
                              ? "text-muted-foreground"
                              : "text-muted-foreground/60"
                          )}
                        >
                          {status.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" onClick={() => setOrderData(null)}>
                Track Another Order
              </Button>
              <Button variant="default">
                Contact Support
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;