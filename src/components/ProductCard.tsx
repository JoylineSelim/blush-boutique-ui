import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
  isNew?: boolean;
  isFavorite?: boolean;
  onAddToCart: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  rating,
  reviewCount,
  category,
  isNew = false,
  isFavorite = false,
  onAddToCart,
  onToggleFavorite,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-card rounded-3xl shadow-soft hover:shadow-elegant transition-all duration-500 overflow-hidden animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-t-3xl bg-gradient-pearl">
        <Link to={`/product/${id}`}>
          <img
            src={image}
            alt={name}
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isNew && (
            <span className="bg-gradient-primary text-white text-xs font-medium px-3 py-1 rounded-full shadow-soft">
              New
            </span>
          )}
          {originalPrice && (
            <span className="bg-destructive text-white text-xs font-medium px-3 py-1 rounded-full shadow-soft">
              Sale
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-4 right-4 rounded-full bg-white/80 backdrop-blur-sm shadow-soft transition-all duration-300",
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90",
            isFavorite && "text-lipstick opacity-100 scale-100"
          )}
          onClick={() => onToggleFavorite(id)}
        >
          <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
        </Button>

        {/* Quick Add to Cart - Mobile */}
        <div className={cn(
          "absolute bottom-4 left-4 right-4 transition-all duration-300 md:hidden",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <Button
            onClick={() => onAddToCart(id)}
            className="w-full"
            variant="luxury"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
          {category}
        </p>

        {/* Product Name */}
        <Link to={`/product/${id}`}>
          <h3 className="font-semibold text-lg text-card-foreground mb-2 line-clamp-2 hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.floor(rating)
                    ? "text-gold fill-current"
                    : "text-muted-foreground/30"
                )}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {rating} ({reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">
              ${price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button - Desktop */}
        <div className="hidden md:block">
          <Button
            onClick={() => onAddToCart(id)}
            className={cn(
              "w-full transition-all duration-300",
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            )}
            variant="luxury"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;