import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter,
  ChevronDown,
  Grid3X3,
  List
} from "lucide-react";
import { cn } from "@/lib/utils";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

// Mock products data
const mockProducts = [
  {
    id: "1",
    name: "Velvet Matte Lipstick - Rose Elegance",
    price: 24.99,
    originalPrice: 29.99,
    image: "/src/assets/product-lipstick-1.jpg",
    rating: 4.8,
    reviewCount: 247,
    category: "Lipstick",
    isNew: true,
    isFavorite: false
  },
  {
    id: "2", 
    name: "Crystal Lip Gloss - Diamond Shine",
    price: 18.99,
    image: "/src/assets/product-gloss-1.jpg",
    rating: 4.6,
    reviewCount: 189,
    category: "Lip Gloss",
    isNew: false,
    isFavorite: false
  },
  {
    id: "3",
    name: "Luxury Matte Lipstick - Sunset Coral",
    price: 26.99,
    originalPrice: 32.99,
    image: "/src/assets/product-lipstick-2.jpg",
    rating: 4.9,
    reviewCount: 312,
    category: "Lipstick",
    isNew: false,
    isFavorite: true
  },
  {
    id: "4",
    name: "Glossy Lip Balm - Natural Nude",
    price: 14.99,
    image: "/src/assets/product-gloss-1.jpg",
    rating: 4.4,
    reviewCount: 156,
    category: "Lip Balm",
    isNew: true,
    isFavorite: false
  },
  {
    id: "5",
    name: "Shimmer Lip Gloss - Pink Paradise",
    price: 19.99,
    image: "/src/assets/product-gloss-1.jpg",
    rating: 4.7,
    reviewCount: 203,
    category: "Lip Gloss",
    isNew: false,
    isFavorite: false
  },
  {
    id: "6",
    name: "Bold Matte Lipstick - Classic Red",
    price: 25.99,
    image: "/src/assets/product-lipstick-1.jpg",
    rating: 4.8,
    reviewCount: 278,
    category: "Lipstick",
    isNew: false,
    isFavorite: false
  }
];

const categories = ["All", "Lipstick", "Lip Gloss", "Lip Balm"];
const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Customer Rating", value: "rating" },
  { label: "Newest", value: "newest" }
];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleAddToCart = (productId: string) => {
    console.log("Added to cart:", productId);
  };

  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Filter and sort products
  const filteredProducts = mockProducts
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return a.isNew ? -1 : 1;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-elegant">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Our Beauty Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our curated selection of premium beauty products designed to enhance your natural radiance
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 rounded-full border-border/30 bg-background/50"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "luxury" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Sort and View Options */}
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-background border border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className="flex border border-border rounded-full p-1">
                <Button
                  variant={viewMode === "grid" ? "luxury" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-full h-8 w-8 p-0"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "luxury" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-full h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} of {mockProducts.length} products
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className={cn(
            "grid gap-6 mb-16",
            viewMode === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1 lg:grid-cols-2"
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
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-pearl rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No products found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search terms or filters
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Newsletter Section */}
        <div className="bg-gradient-primary rounded-3xl p-8 text-center text-white mb-16">
          <h2 className="text-2xl font-bold mb-4">
            Stay Updated with New Products
          </h2>
          <p className="text-white/90 mb-6 max-w-md mx-auto">
            Be the first to know about our latest beauty arrivals and exclusive offers
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/70"
            />
            <Button variant="pearl" className="rounded-full whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;