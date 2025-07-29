import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Plus, Minus, ShoppingBag, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

const ShoppingCart = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: ShoppingCartProps) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Handle checkout logic here
    console.log("Processing checkout...", { items, total });
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Cart Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-full max-w-md bg-card shadow-luxury transition-transform duration-300 z-50 flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">Shopping Bag</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Your bag is empty
                </h3>
                <p className="text-muted-foreground mb-4">
                  Add some beautiful products to get started
                </p>
                <Button onClick={onClose} variant="outline">
                  Continue Shopping
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-background/50 rounded-2xl border border-border/50"
                >
                  {/* Product Image */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-pearl flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-foreground truncate">
                      {item.name}
                    </h4>
                    {item.variant && (
                      <p className="text-xs text-muted-foreground">{item.variant}</p>
                    )}
                    <p className="text-sm font-semibold text-primary mt-1">
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive flex-shrink-0"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Order Summary */}
        {items.length > 0 && (
          <div className="border-t border-border/50 p-6 space-y-4">
            {/* Order Summary */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-border/50 pt-2">
                <div className="flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Free Shipping Banner */}
            {subtotal < 50 && (
              <div className="bg-muted/50 rounded-xl p-3 text-center">
                <p className="text-xs text-muted-foreground">
                  Add <span className="font-semibold text-primary">
                    ${(50 - subtotal).toFixed(2)}
                  </span> more for free shipping
                </p>
                <div className="w-full bg-border rounded-full h-2 mt-2">
                  <div
                    className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Checkout Button */}
            <Button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full"
              variant="luxury"
              size="lg"
            >
              {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
            </Button>

            {/* Continue Shopping */}
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full"
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;