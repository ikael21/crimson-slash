
import type { LucideIcon } from "lucide-react"
import type * as Generated from "@/types/generated"

export type Flash = {
  notice?: string
  alert?: string
}

export type SharedProps = {
  flash: Flash
}

export interface BreadcrumbItem {
  title: string
  href: string
}

export interface NavItem {
  title: string
  href: string
  icon?: LucideIcon | null
  isActive?: boolean
}

export interface Auth {
  user: Generated.User
  session: Pick<Generated.Session, "id">
}

export interface SharedData {
  auth: Auth
  flash: Flash
  [key: string]: unknown
}

export interface Skill {
  name: string
  points: number
}
