import CrimsonSlashLogo from "@/components/crimson-slash-logo"

export default function AppLogo() {
  return (
    <>
      <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
        <CrimsonSlashLogo className="size-7 fill-current text-white" />
      </div>
      <div className="ml-1 grid flex-1 text-left text-sm">
        <span className="mb-0.5 truncate leading-tight font-semibold">
          {import.meta.env.VITE_APP_NAME ?? "Crimson Slash"}
        </span>
      </div>
    </>
  )
}

