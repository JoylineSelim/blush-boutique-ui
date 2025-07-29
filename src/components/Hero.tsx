import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-beauty.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-elegant" />
      
      {/* Hero Image */}
      <div className="absolute inset-0 opacity-30">
        <img 
          src={heroImage} 
          alt="Luxury Beauty Products" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 animate-float">
        <div className="w-16 h-16 bg-gradient-primary rounded-full opacity-20 blur-xl" />
      </div>
      <div className="absolute bottom-32 left-10 animate-float" style={{ animationDelay: "1s" }}>
        <div className="w-12 h-12 bg-blush rounded-full opacity-30 blur-lg" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-primary uppercase tracking-wide">
                  New Collection
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-foreground">Discover Your</span>
                <br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Perfect Shade
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                Embrace your natural beauty with our curated collection of premium 
                lipsticks, glosses, and beauty essentials. Each product is carefully 
                crafted to enhance your unique radiance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="luxury" className="group">
                Shop Collection
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button size="lg" variant="outline">
                Discover Shades
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Unique Shades</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4.9</div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
            </div>
          </div>

          {/* Visual Elements */}
          <div className="relative hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-20 blur-3xl animate-pulse-soft" />
              <div className="relative bg-gradient-pearl rounded-3xl p-8 shadow-luxury backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-6">
                  {/* Product previews would go here */}
                  <div className="space-y-4">
                    <div className="w-full h-24 bg-gradient-primary rounded-2xl opacity-80 animate-shimmer" />
                    <div className="w-full h-16 bg-gradient-secondary rounded-2xl opacity-60" />
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="w-full h-16 bg-gradient-secondary rounded-2xl opacity-70" />
                    <div className="w-full h-24 bg-gradient-primary rounded-2xl opacity-90" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;