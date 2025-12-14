import * as React from "react"
import { cn } from "../lib/utils"

const buttonVariants = "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-blue-600 text-white hover:bg-blue-700"

export const Button = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(buttonVariants, className)}
    {...props}
  />
))
Button.displayName = "Button"
