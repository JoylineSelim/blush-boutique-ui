
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Sparkles, Users, Award, ShoppingBag, Star } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Self-Love",
      description: "We believe beauty starts from within. Our products are designed to help you celebrate your unique beauty and boost your confidence."
    },
    {
      icon: Sparkles,
      title: "Quality First",
      description: "Every product is carefully formulated with premium ingredients and rigorously tested to ensure the highest quality standards."
    },
    {
      icon: Users,
      title: "Inclusive Beauty",
      description: "Beauty has no boundaries. We create products for all skin tones, types, and preferences because everyone deserves to feel beautiful."
    },
    {
      icon: Award,
      title: "Innovation",
      description: "We continuously innovate to bring you the latest beauty trends and breakthrough formulations that deliver real results."
    }
  ];

  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "50+", label: "Unique Shades" },
    { number: "4.9", label: "Average Rating" },
    { number: "99%", label: "Customer Satisfaction" }
  ];

  const team = [
    {
      name: "Elena Rodriguez",
      role: "Founder & CEO",
      description: "Former makeup artist with 15+ years in the beauty industry, passionate about creating inclusive beauty products."
    },
    {
      name: "Maya Chen",
      role: "Head of Product Development",
      description: "Cosmetic chemist with expertise in sustainable formulations and innovative beauty technology."
    },
    {
      name: "Sofia Kim",
      role: "Creative Director",
      description: "Fashion and beauty photographer who brings artistic vision to our brand aesthetics and campaigns."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-elegant">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wide">
                Our Story
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold">
              <span className="text-foreground">Beauty That</span>
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Empowers You
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Founded in 2020, Blush Boutique was born from a simple belief: everyone deserves to feel confident and beautiful in their own skin. What started as a passion project has grown into a community of beauty lovers who celebrate authenticity and self-expression.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                Our Journey Began With a Dream
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  It all started when our founder, Elena, couldn't find the perfect nude lipstick that matched her skin tone. After years of working as a professional makeup artist, she realized this was a common struggle for many women of all backgrounds.
                </p>
                <p>
                  Determined to solve this problem, Elena partnered with leading cosmetic chemists to create a line of beauty products that truly cater to everyone. Our breakthrough came with developing an innovative color-matching technology that adapts to different undertones.
                </p>
                <p>
                  Today, we're proud to offer over 50 carefully curated shades and continue to expand our collection based on feedback from our amazing community of customers.
                </p>
              </div>
              <Button variant="luxury" size="lg">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Shop Our Collection
              </Button>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-pearl rounded-3xl p-8 shadow-luxury">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center p-4">
                      <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-foreground">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do, from product development to customer service.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-soft transition-all duration-300">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-foreground">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind Blush Boutique who make beauty magic happen every day.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6 space-y-4">
                  <div className="w-20 h-20 bg-gradient-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                    <p className="text-primary font-medium">{member.role}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-pearl border-border/50 shadow-luxury">
            <CardContent className="p-12 space-y-6">
              <Star className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                "To empower individuals to express their authentic selves through high-quality, inclusive beauty products that celebrate diversity and boost confidence. We believe that beauty is not about conforming to standards, but about embracing what makes you uniquely you."
              </p>
              <div className="pt-4">
                <Button variant="luxury" size="lg">
                  Join Our Community
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
