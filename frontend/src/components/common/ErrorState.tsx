import { AlertCircle, WifiOff, FileSearch, SearchX, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type ErrorStateType = "no-data" | "no-search" | "no-internet" | "unexpected" | "loading"

interface ErrorStateProps {
  type: ErrorStateType
  title?: string
  message?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({ type, title, message, onRetry, className }: ErrorStateProps) {
  let defaultTitle = ""
  let defaultMessage = ""
  let Icon = AlertCircle
  let iconClass = "text-muted-foreground"

  switch (type) {
    case "no-data":
      defaultTitle = "No Data Found"
      defaultMessage = "There is no information available at this time."
      Icon = FileSearch
      iconClass = "text-primary/50"
      break
    case "no-search":
      defaultTitle = "No Results Found"
      defaultMessage = "We couldn't find anything matching your search criteria."
      Icon = SearchX
      iconClass = "text-muted-foreground"
      break
    case "no-internet":
      defaultTitle = "Connection Error"
      defaultMessage = "Please check your internet connection and try again."
      Icon = WifiOff
      iconClass = "text-destructive"
      break
    case "unexpected":
      defaultTitle = "Unexpected Error"
      defaultMessage = "Something went wrong on our end. Please try again later."
      Icon = AlertCircle
      iconClass = "text-destructive"
      break
    case "loading":
      return (
        <div className={cn("flex flex-col items-center justify-center p-8", className)}>
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-sm text-muted-foreground">{title || "Loading..."}</p>
        </div>
      )
  }

  return (
    <div className={cn("flex flex-col items-center justify-center p-12 text-center border rounded-xl bg-card shadow-sm", className)}>
      <div className="rounded-full bg-muted/50 p-4 mb-4">
        <Icon className={cn("h-8 w-8", iconClass)} />
      </div>
      <h3 className="text-lg font-semibold">{title || defaultTitle}</h3>
      <p className="text-sm text-muted-foreground mt-2 max-w-sm">
        {message || defaultMessage}
      </p>
      {onRetry && (
        <Button variant="outline" className="mt-6" onClick={onRetry}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  )
}
