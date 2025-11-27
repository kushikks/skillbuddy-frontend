import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillTagProps {
  skill: string;
  variant?: "teach" | "learn" | "default";
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}

export const SkillTag = ({ 
  skill, 
  variant = "default", 
  removable = false, 
  onRemove,
  className 
}: SkillTagProps) => {
  const variants = {
    teach: "bg-primary/10 text-primary border-primary/20",
    learn: "bg-secondary/10 text-secondary border-secondary/20",
    default: "bg-muted text-muted-foreground border-border",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border transition-smooth",
        variants[variant],
        className
      )}
    >
      {skill}
      {removable && onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 hover:opacity-70 transition-opacity"
          aria-label={`Remove ${skill}`}
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
};
