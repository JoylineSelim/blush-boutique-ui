import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

// Import product images
import productLipstick1 from "@/assets/product-lipstick-1.jpg";
import productGloss1 from "@/assets/product-gloss-1.jpg";
import productLipstick2 from "@/assets/product-lipstick-2.jpg";

// Mock product data
const products = [
  {
    id: "1",
    name: "Velvet Rose Lipstick",
    price: 28.99,
    originalPrice: 35.99,
    image: productLipstick1,
    rating: 4.8,
    reviewCount: 247,
    category: "Lipstick",
    isNew: true,
    isFavorite: false,
  },
  {
    id: "2",
    name: "Nude Goddess Gloss",
    price: 22.50,
    image: productGloss1,
    rating: 4.9,
    reviewCount: 189,
    category: "Lip Gloss",
    isNew: false,
    isFavorite: true,
  },
  {
    id: "3",
    name: "Coral Dream Lipstick",
    price: 26.99,
    image: productLipstick2,
    rating: 4.7,
    reviewCount: 156,
    category: "Lipstick",
    isNew: false,
    isFavorite: false,
  },
  {
    id: "4",
    name: "Berry Bliss Matte",
    price: 31.99,
    image: productLipstick1,
    rating: 4.6,
    reviewCount: 203,
    category: "Lipstick",
    isNew: true,
    isFavorite: false,
  },
  {
    id: "5",
    name: "Crystal Clear Gloss",
    price: 19.99,
    originalPrice: 24.99,
    image: productGloss1,
    rating: 4.5,
    reviewCount: 98,
    category: "Lip Gloss",
    isNew: false,
    isFavorite: true,
  },
  {
    id: "6",
    name: "Sunset Coral Luxury",
    price: 39.99,
    image: productLipstick2,
    rating: 4.9,
    reviewCount: 312,
    category: "Lipstick",
    isNew: false,
    isFavorite: false,
  },
];

const categories = ["All", "Lipstick", "Lip Gloss", "New Arrivals"];
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Rating", "Newest"];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [favorites, setFavorites] = useState<string[]>(["2", "5"]);

  const handleAddToCart = (productId: string) => {
    console.log("Adding to cart:", productId);
    // Add toast notification here
  };

  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = products.filter(product => {
    if (selectedCategory === "All") return true;
    if (selectedCategory === "New Arrivals") return product.isNew;
    return product.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <Hero />

      {/* Products Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our <span className="bg-gradient-primary bg-clip-text text-transparent">Collection</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our carefully curated selection of premium beauty products, 
              each designed to enhance your natural radiance.
            </p>
          </div>

          {/* Filters and Controls */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8 items-start lg:items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-background border border-border rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {sortOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex rounded-full border border-border overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className={cn(
            "grid gap-6 mb-12",
            viewMode === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          )}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                isFavorite={favorites.includes(product.id)}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center">
            <Button variant="outline" size="lg">
              Load More Products
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
