import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, Truck, Package, MapPin, Phone, Mail } from "lucide-react";

const OrderStatus = () => {
  const [order] = useState({
    id: "ORD-2024-001234",
    status: "shipped",
    placedDate: "2024-01-15",
    estimatedDelivery: "2024-01-20",
    trackingNumber: "1Z9999W99999999999",
    total: 73.96,
    shippingAddress: {
      name: "Sarah Johnson",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001"
    },
    items: [
      {
        id: "1",
        name: "Velvet Matte Lipstick",
        price: 24.99,
        quantity: 2,
        variant: "Ruby Red",
        image: "/src/assets/product-lipstick-1.jpg"
      },
      {
        id: "2",
        name: "Glossy Lip Gloss",
        price: 18.99,
        quantity: 1,
        variant: "Clear Shine",
        image: "/src/assets/product-gloss-1.jpg"
      }
    ]
  });

  const orderStatuses = [
    {
      title: "Order Confirmed",
      description: "We've received your order",
      timestamp: "Jan 15, 2024 at 2:30 PM",
      completed: true,
      active: false,
      icon: CheckCircle
    },
    {
      title: "Processing",
      description: "Your order is being prepared",
      timestamp: "Jan 16, 2024 at 9:00 AM",
      completed: true,
      active: false,
      icon: Package
    },
    {
      title: "Shipped",
      description: "Your order is on its way",
      timestamp: "Jan 17, 2024 at 4:15 PM",
      completed: true,
      active: true,
      icon: Truck
    },
    {
      title: "Out for Delivery",
      description: "Your order is out for delivery",
      timestamp: "",
      completed: false,
      active: false,
      icon: Truck
    },
    {
      title: "Delivered",
      description: "Your order has been delivered",
      timestamp: "",
      completed: false,
      active: false,
      icon: CheckCircle
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge variant="secondary">Confirmed</Badge>;
      case "processing":
        return <Badge className="bg-yellow-500">Processing</Badge>;
      case "shipped":
        return <Badge className="bg-blue-500">Shipped</Badge>;
      case "delivered":
        return <Badge className="bg-green-500">Delivered</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getProgressValue = (status: string) => {
    switch (status) {
      case "confirmed": return 20;
      case "processing": return 40;
      case "shipped": return 60;
      case "out-for-delivery": return 80;
      case "delivered": return 100;
      default: return 0;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Order Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Order #{order.id}</h1>
                <p className="text-muted-foreground">
                  Placed on {new Date(order.placedDate).toLocaleDateString()}
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                {getStatusBadge(order.status)}
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Order Progress</span>
                <span className="text-sm text-muted-foreground">
                  Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                </span>
              </div>
              <Progress value={getProgressValue(order.status)} className="h-2" />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Timeline */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {orderStatuses.map((status, index) => {
                      const Icon = status.icon;
                      return (
                        <div key={index} className="flex items-start space-x-4">
                          <div className={`p-2 rounded-full ${
                            status.completed 
                              ? "bg-primary text-primary-foreground" 
                              : status.active
                              ? "bg-primary/20 text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          
                          <div className="flex-1">
                            <h3 className={`font-medium ${
                              status.completed || status.active ? "text-foreground" : "text-muted-foreground"
                            }`}>
                              {status.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">{status.description}</p>
                            {status.timestamp && (
                              <p className="text-xs text-muted-foreground mt-1">{status.timestamp}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.variant}</p>
                          <p className="text-sm">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary & Actions */}
            <div className="space-y-6">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    <p className="font-medium">{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.address}</p>
                    <p>
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Tracking Information */}
              {order.status === "shipped" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Package className="h-5 w-5 mr-2" />
                      Tracking
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium mb-2">Tracking Number:</p>
                    <p className="text-sm font-mono bg-muted p-2 rounded">{order.trackingNumber}</p>
                    <Button variant="outline" className="w-full mt-4">
                      Track Package
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${(order.total - 5.99 - (order.total - 5.99) * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>$5.99</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${((order.total - 5.99) * 0.08).toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="space-y-3">
                <Button variant="outline" className="w-full">
                  <a href="/order-tracking">Track Another Order</a>
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
                
                {order.status !== "delivered" && (
                  <Button variant="destructive" className="w-full">
                    <a href="/cancel-order">Cancel Order</a>
                  </Button>
                )}
                
                <Button className="w-full">
                  <a href="/products">Continue Shopping</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderStatus;