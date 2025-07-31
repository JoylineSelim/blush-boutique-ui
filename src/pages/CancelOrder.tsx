import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Package, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CancelOrder = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [cancellationReason, setCancellationReason] = useState("");
  const [additionalComments, setAdditionalComments] = useState("");
  const [foundOrder, setFoundOrder] = useState<any>(null);
  const [step, setStep] = useState<"lookup" | "reason" | "confirmation">("lookup");
  
  const { toast } = useToast();

  const mockOrder = {
    id: "ORD-2024-001234",
    status: "processing",
    placedDate: "2024-01-15",
    total: 73.96,
    items: [
      {
        id: "1",
        name: "Velvet Matte Lipstick",
        price: 24.99,
        quantity: 2,
        variant: "Ruby Red"
      },
      {
        id: "2", 
        name: "Glossy Lip Gloss",
        price: 18.99,
        quantity: 1,
        variant: "Clear Shine"
      }
    ]
  };

  const cancellationReasons = [
    { value: "changed-mind", label: "Changed my mind" },
    { value: "wrong-product", label: "Ordered wrong product" },
    { value: "better-price", label: "Found better price elsewhere" },
    { value: "delivery-delay", label: "Delivery taking too long" },
    { value: "financial-reasons", label: "Financial reasons" },
    { value: "other", label: "Other reason" }
  ];

  const handleLookupOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate order lookup
    if (orderNumber.includes("001234") && email.includes("@")) {
      setFoundOrder(mockOrder);
      setStep("reason");
    } else {
      toast({
        title: "Order not found",
        description: "Please check your order number and email address.",
        variant: "destructive"
      });
    }
  };

  const handleCancelOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cancellationReason) {
      toast({
        title: "Please select a reason",
        description: "We need to know why you want to cancel your order.",
        variant: "destructive"
      });
      return;
    }

    setStep("confirmation");
    toast({
      title: "Cancellation request submitted",
      description: "Your order cancellation has been processed.",
    });
  };

  const canCancelOrder = (status: string) => {
    return ["confirmed", "processing"].includes(status);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Cancel Order</h1>
            <p className="text-muted-foreground">
              We're sorry to see you go. Let us help you cancel your order.
            </p>
          </div>

          {step === "lookup" && (
            <Card>
              <CardHeader>
                <CardTitle>Find Your Order</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLookupOrder} className="space-y-4">
                  <div>
                    <Label htmlFor="orderNumber">Order Number</Label>
                    <Input
                      id="orderNumber"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      placeholder="ORD-2024-001234"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Find Order
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {step === "reason" && foundOrder && (
            <div className="space-y-6">
              {/* Order Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Order #{foundOrder.id}</span>
                    <Badge variant={canCancelOrder(foundOrder.status) ? "secondary" : "destructive"}>
                      {foundOrder.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!canCancelOrder(foundOrder.status) ? (
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        This order cannot be cancelled as it has already been shipped. 
                        Please contact customer support for returns.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        {foundOrder.items.map((item: any) => (
                          <div key={item.id} className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {item.variant} - Qty: {item.quantity}
                              </p>
                            </div>
                            <p>${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>${foundOrder.total.toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {canCancelOrder(foundOrder.status) && (
                <Card>
                  <CardHeader>
                    <CardTitle>Cancellation Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCancelOrder} className="space-y-6">
                      <div>
                        <Label className="text-base font-medium">
                          Why are you cancelling this order?
                        </Label>
                        <RadioGroup
                          value={cancellationReason}
                          onValueChange={setCancellationReason}
                          className="mt-3"
                        >
                          {cancellationReasons.map((reason) => (
                            <div key={reason.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={reason.value} id={reason.value} />
                              <Label htmlFor={reason.value}>{reason.label}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                      
                      <div>
                        <Label htmlFor="comments">
                          Additional Comments (Optional)
                        </Label>
                        <Textarea
                          id="comments"
                          value={additionalComments}
                          onChange={(e) => setAdditionalComments(e.target.value)}
                          placeholder="Let us know how we can improve..."
                          rows={3}
                        />
                      </div>
                      
                      <Alert>
                        <Package className="h-4 w-4" />
                        <AlertDescription>
                          Your refund will be processed within 3-5 business days to your original payment method.
                        </AlertDescription>
                      </Alert>
                      
                      <div className="flex space-x-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setStep("lookup")}
                          className="flex-1"
                        >
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Back
                        </Button>
                        <Button type="submit" variant="destructive" className="flex-1">
                          Cancel Order
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {step === "confirmation" && (
            <Card>
              <CardContent className="text-center p-8">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Order Cancelled</h2>
                  <p className="text-muted-foreground">
                    Your order #{foundOrder?.id} has been successfully cancelled.
                  </p>
                </div>
                
                <div className="bg-muted p-4 rounded-lg mb-6">
                  <p className="text-sm font-medium mb-2">What happens next?</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• You'll receive a confirmation email shortly</li>
                    <li>• Refund will be processed in 3-5 business days</li>
                    <li>• No further action is required from you</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full">
                    <a href="/products">Continue Shopping</a>
                  </Button>
                  <Button variant="outline" className="w-full">
                    <a href="/contact">Contact Support</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CancelOrder;