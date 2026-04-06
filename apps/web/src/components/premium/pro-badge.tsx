import { cn } from "@my-better-t-app/ui/lib/utils";
import { Star } from "lucide-react";

interface ProBadgeProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ProBadge({ size = "md", className }: ProBadgeProps) {
  const sizeClasses = {
    sm: "px-1.5 py-0.5 text-[10px]",
    md: "px-2 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm",
  };

  const iconSize = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
    lg: "w-4 h-4",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-bold uppercase rounded-full pro-gradient text-white relative overflow-hidden",
        sizeClasses[size],
        className
      )}
    >
      <span className="absolute inset-0 animate-shimmer" />
      <Star className={cn("relative z-10", iconSize[size])} />
      <span className="relative z-10">PRO</span>
    </span>
  );
}
