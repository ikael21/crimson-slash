import { Link } from "@inertiajs/react"
import type { PropsWithChildren } from "react"

import { BubbleBackground }  from "@/components/ui/bubble"
import CrimsonSlashLogo from "@/components/crimson-slash-logo"
import { rootPath } from "@/routes"

interface AuthLayoutProps {
  title?: string
  description?: string
}

export default function AuthSplitLayout({
  children,
  title,
  description,
}: PropsWithChildren<AuthLayoutProps>) {
  return (
    <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <BubbleBackground
          interactive={true}
          className="absolute inset-0 flex items-center justify-center"
          colors={{
            first: "99,102,241",  // indigo-500
            second: "139,92,246", // violet-500
            third: "67,56,202",   // indigo-700
            fourth: "109,40,217", // violet-700
            fifth: "49,46,129",   // indigo-900
            sixth: "76,29,149",   // violet-900
          }}
        />
        <Link
          href={rootPath()}
          className="relative z-20 flex items-center text-lg font-medium"
        >
          <CrimsonSlashLogo className="mr-2 size-8 text-white" />
          {import.meta.env.VITE_APP_NAME ?? "Crimson Slash"}
        </Link>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;In the silence before battle, the samurai sees only one truth -
              a single crimson slash can redraw the fate of nations.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
      <div className="w-full lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Link
            href={rootPath()}
            className="relative z-20 flex items-center justify-center lg:hidden"
          >
            <CrimsonSlashLogo width={128} height={128} />

          </Link>
          <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
            <h1 className="text-xl font-medium">{title}</h1>
            <p className="text-muted-foreground text-sm text-balance">
              {description}
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
