import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FavoriteProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([
    {
      id: "1",
      name: "Velvet Matte Lipstick",
      price: 24.99,
      image: "/src/assets/product-lipstick-1.jpg",
      category: "Lipstick",
      inStock: true
    },
    {
      id: "2",
      name: "Glossy Lip Gloss",
      price: 18.99,
      image: "/src/assets/product-gloss-1.jpg",
      category: "Lip Gloss",
      inStock: true
    },
    {
      id: "3",
      name: "Rose Gold Lipstick",
      price: 26.99,
      image: "/src/assets/product-lipstick-2.jpg",
      category: "Lipstick",
      inStock: false
    }
  ]);

  const { toast } = useToast();

  const removeFavorite = (productId: string) => {
    setFavorites(prev => prev.filter(item => item.id !== productId));
    toast({
      title: "Removed from favorites",
      description: "Product has been removed from your wishlist.",
    });
  };

  const addToCart = (product: FavoriteProduct) => {
    if (!product.inStock) return;
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    toast({
      title: "Favorites cleared",
      description: "All products have been removed from your wishlist.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">My Favorites</h1>
              <p className="text-muted-foreground">
                {favorites.length} {favorites.length === 1 ? 'item' : 'items'} in your wishlist
              </p>
            </div>
            
            {favorites.length > 0 && (
              <Button variant="outline" onClick={clearAllFavorites}>
                Clear All
              </Button>
            )}
          </div>

          {favorites.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-semibold mb-4">No favorites yet</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Start browsing our products and save your favorites here for easy access later.
              </p>
              <Button>
                <a href="/products">Browse Products</a>
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((product) => (
                <Card key={product.id} className="relative group">
                  <button
                    onClick={() => removeFavorite(product.id)}
                    className="absolute top-2 right-2 z-10 p-1 bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  
                  <CardContent className="p-0">
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-medium">Out of Stock</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
                      <h3 className="font-medium mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-lg font-semibold mb-3">${product.price}</p>
                      
                      <div className="space-y-2">
                        <Button 
                          className="w-full" 
                          onClick={() => addToCart(product)}
                          disabled={!product.inStock}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                        
                        <Button variant="outline" className="w-full">
                          <a href={`/product/${product.id}`}>View Details</a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {favorites.length > 0 && (
            <div className="mt-12 text-center">
              <Card className="p-8">
                <h3 className="text-xl font-semibold mb-4">Love these products?</h3>
                <p className="text-muted-foreground mb-6">
                  Get notified when items go on sale or when new similar products arrive.
                </p>
                <Button>
                  Enable Notifications
                </Button>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;