import * as React from "react"
import { ErrorState } from "@/components/common/error-state"
import { cn } from "@/lib/utils"

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallbackMessage?: string
  className?: string
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Widget Error Caught:", error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorState
          title="Widget Crashed"
          message={this.props.fallbackMessage || this.state.error?.message || "Failed to render this component."}
          onRetry={this.handleRetry}
          className={cn("h-full w-full", this.props.className)}
        />
      )
    }

    return this.props.children
  }
}
