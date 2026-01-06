import { Head, router } from '@inertiajs/react'
import { ArrowLeft, Home, RotateCcw } from 'lucide-react'
import CrimsonSlashLogo from '@/components/crimson-slash-logo'
import { Button } from '@/components/ui/button'
import type { ReactNode } from 'react'

interface ErrorPageProps {
  status: number
}

const errorData: Record<number, { title: string; description: string }> = {
  400: {
    title: 'Bad Request',
    description: "The server couldn't understand your request. Please check the request and try again.",
  },
  403: {
    title: 'Forbidden',
    description: "You don't have permission to access this resource.",
  },
  404: {
    title: 'Page Not Found',
    description: "The page you're looking for doesn't exist or has been moved.",
  },
  422: {
    title: 'Request Rejected',
    description: 'The change you requested was rejected. This might be a security measure or a validation error.',
  },
  500: {
    title: 'Server Error',
    description: 'We encountered an unexpected error. Our team has been notified. Please try again in a moment.',
  },
  503: {
    title: 'Service Unavailable',
    description: 'We are doing some maintenance. Please check back soon.',
  },
}

export default function ErrorPage({ status }: ErrorPageProps) {
  const { title, description } = errorData[status] ?? {
    title: 'Unexpected Error',
    description: 'Something went wrong. Please try again.',
  }

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      router.visit('/')
    }
  }

  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <>
      <Head title={`${status} - ${title}`} />

      {/* Background effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(220,38,38,0.15),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(239,68,68,0.2),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(220,38,38,0.1),transparent)] dark:bg-[radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(239,68,68,0.15),transparent)]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="flex min-h-svh items-center justify-center p-6">
        <main className="animate-in fade-in slide-in-from-bottom-4 flex max-w-md flex-col items-center gap-8 text-center duration-500">
          {/* Logo */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-red-500/20 blur-xl animate-pulse" />
            <div className="relative flex size-16 items-center justify-center rounded-xl bg-black shadow-lg shadow-red-500/25">
              <CrimsonSlashLogo className="size-10" />
            </div>
          </div>

          {/* Error code */}
          <h1 className="bg-gradient-to-br from-red-500 to-foreground bg-clip-text text-[clamp(5rem,20vw,10rem)] font-bold leading-none tracking-tighter text-transparent">
            {status}
          </h1>

          {/* Error message */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="text-muted-foreground max-w-sm">{description}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {status === 500 && (
              <Button onClick={handleRetry} variant="default" className="gap-2">
                <RotateCcw className="size-4" />
                Try again
              </Button>
            )}
            <Button onClick={handleGoBack} variant={status === 500 ? 'outline' : 'default'} className="gap-2">
              <ArrowLeft className="size-4" />
              Go back
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <a href="/">
                <Home className="size-4" />
                Home
              </a>
            </Button>
          </div>
        </main>
      </div>
    </>
  )
}

ErrorPage.layout = (page: ReactNode) => page
