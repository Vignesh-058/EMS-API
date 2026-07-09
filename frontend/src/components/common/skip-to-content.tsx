import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface SkipToContentProps {
  contentId?: string
  label?: string
}

export function SkipToContent({ 
  contentId = "main-content", 
  label = "Skip to main content" 
}: SkipToContentProps) {
  return (
    <Button
      asChild
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100]",
        "shadow-floating"
      )}
    >
      <a href={`#${contentId}`}>{label}</a>
    </Button>
  )
}
