import { Link } from "react-router-dom"
import { AlertCircle, FileQuestion, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface ErrorPageProps {
  code?: 403 | 404 | 500
  title?: string
  description?: string
}

const errorConfig = {
  403: {
    icon: ShieldAlert,
    title: "Access Denied",
    description: "You do not have permission to view this page or perform this action.",
    action: "Return to Dashboard",
    href: "/dashboard",
  },
  404: {
    icon: FileQuestion,
    title: "Page Not Found",
    description: "The page you are looking for doesn't exist or has been moved.",
    action: "Go Back Home",
    href: "/dashboard",
  },
  500: {
    icon: AlertCircle,
    title: "Server Error",
    description: "Something went wrong on our end. We are investigating the issue.",
    action: "Try Again Later",
    href: "/dashboard",
  },
}

export function ErrorPage({ code = 404, title, description }: ErrorPageProps) {
  const config = errorConfig[code]
  const Icon = config.icon

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 text-center animate-in fade-in-50 duration-500">
      <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-destructive/10">
        <Icon className="h-16 w-16 text-destructive" aria-hidden="true" />
      </div>
      <h1 className="mb-4 text-7xl font-bold tracking-tight text-foreground">{code}</h1>
      <h2 className="text-3xl font-semibold tracking-tight text-foreground">{title || config.title}</h2>
      <p className="mb-8 mt-4 max-w-md text-lg text-muted-foreground">
        {description || config.description}
      </p>
      <Button size="lg" asChild>
        <Link to={config.href}>
          {config.action}
        </Link>
      </Button>
    </div>
  )
}
