import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from "lucide-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    subscribeNewsletter: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register attempt:", formData);
    // Handle registration logic here
  };

  return (
    <div className="min-h-screen bg-gradient-elegant flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      {/* Background Elements */}
      <div className="absolute top-20 right-20 animate-float">
        <div className="w-24 h-24 bg-gradient-primary rounded-full opacity-10 blur-xl" />
      </div>
      <div className="absolute bottom-32 left-10 animate-float" style={{ animationDelay: "1s" }}>
        <div className="w-16 h-16 bg-blush rounded-full opacity-20 blur-lg" />
      </div>

      <div className="max-w-md w-full space-y-8">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors duration-300 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-elegant">
              <span className="text-white font-bold text-xl">B</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">
              Join Blush Boutique
            </h2>
            <p className="text-muted-foreground">
              Create your account and discover your perfect beauty match
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-card/50 backdrop-blur-md rounded-3xl shadow-luxury p-8 border border-border/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium text-card-foreground">
                  First Name
                </Label>
                <div className="relative">
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="pl-12 h-12 rounded-full border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-colors duration-300"
                    required
                  />
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium text-card-foreground">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="h-12 rounded-full border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-colors duration-300"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-card-foreground">
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-12 h-12 rounded-full border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-colors duration-300"
                  required
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-card-foreground">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-12 pr-12 h-12 rounded-full border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-colors duration-300"
                  required
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-card-foreground">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="pl-12 pr-12 h-12 rounded-full border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-colors duration-300"
                  required
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                  className="rounded border-border text-primary focus:ring-primary mt-1"
                  required
                />
                <span className="text-sm text-muted-foreground leading-5">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary hover:text-primary-hover">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary hover:text-primary-hover">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.subscribeNewsletter}
                  onChange={(e) => setFormData({ ...formData, subscribeNewsletter: e.target.checked })}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">
                  Subscribe to our newsletter for beauty tips and exclusive offers
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" variant="luxury" size="lg">
              Create Account
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-12 rounded-full">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
              <Button variant="outline" className="h-12 rounded-full">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>
            </div>
          </form>
        </div>

        {/* Sign In Link */}
        <div className="text-center">
          <span className="text-muted-foreground">Already have an account? </span>
          <Link
            to="/login"
            className="text-primary hover:text-primary-hover font-medium transition-colors duration-300"
          >
            Sign in now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;