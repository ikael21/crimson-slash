import { createInertiaApp, type ResolvedComponent } from '@inertiajs/react'
import { ReactNode, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initializeTheme } from "@/hooks/use-appearance"

import PersistentLayout from '@/layouts/persistent-layout'

const appName = import.meta.env.VITE_APP_NAME ?? "Crimson Slash"

void createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  progress: {
    color: "#4B5563",
  },

  resolve: (name) => {
    const pages = import.meta.glob<{default: ResolvedComponent}>('../pages/**/*.tsx', {
      eager: true,
    })
    const page = pages[`../pages/${name}.tsx`]
    if (!page) {
      console.error(`Missing Inertia page component: '${name}.tsx'`)
    }

    page.default.layout ??= (page: ReactNode) => (
      <PersistentLayout>{page}</PersistentLayout>
    )

    return page
  },

  setup({ el, App, props }) {
    createRoot(el).render(
      <StrictMode>
        <App {...props} />
      </StrictMode>
    )
  },

  defaults: {
    form: {
      forceIndicesArrayFormatInFormData: false,
    },
    future: {
      useDataInertiaHeadAttribute: true,
      useDialogForErrorModal: true,
      preserveEqualProps: true,
    },
  },
}).catch((error) => {
  // This ensures this entrypoint is only loaded on Inertia pages
  // by checking for the presence of the root element (#app by default).
  // Feel free to remove this `catch` if you don't need it.
  if (document.getElementById("app")) {
    throw error
  } else {
    console.error(
      "Missing root element.\n\n" +
      "If you see this error, it probably means you loaded Inertia.js on non-Inertia pages.\n" +
      'Consider moving <%= vite_typescript_tag "inertia.tsx" %> to the Inertia-specific layout instead.',
    )
  }
})

initializeTheme()
