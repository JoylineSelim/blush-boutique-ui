import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-white shadow-soft hover:shadow-elegant hover:scale-105 rounded-full",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full shadow-soft",
        outline: "border-2 border-primary/20 bg-white/80 backdrop-blur-sm text-primary hover:bg-primary/5 hover:border-primary/40 rounded-full shadow-soft",
        secondary: "bg-gradient-secondary text-secondary-foreground hover:shadow-soft rounded-full",
        ghost: "hover:bg-accent/50 hover:text-accent-foreground rounded-full",
        link: "text-primary underline-offset-4 hover:underline rounded-none",
        lipstick: "bg-lipstick text-white shadow-soft hover:shadow-elegant hover:scale-105 rounded-full",
        nude: "bg-nude text-foreground shadow-soft hover:shadow-elegant hover:scale-105 rounded-full",
        pearl: "bg-gradient-pearl text-foreground shadow-soft hover:shadow-elegant hover:scale-105 rounded-full border border-border/50",
        luxury: "bg-gradient-primary text-white shadow-luxury hover:shadow-luxury hover:scale-105 rounded-full relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full before:animate-shimmer",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2",
        lg: "h-14 px-8 py-4 text-base",
        icon: "h-12 w-12",
        xs: "h-8 px-3 py-1 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
