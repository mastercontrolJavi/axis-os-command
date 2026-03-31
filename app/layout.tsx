import type { Metadata } from "next"
import { Playfair_Display } from 'next/font/google'
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { Toaster } from "sonner"

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: "DREXIT HQ",
  description: "Personal command center — budget, goals, fitness, and business tracking",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={playfair.variable}>
      <body>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-6xl px-6 py-8">
              {children}
            </div>
          </main>
        </div>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#ffffff',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '12px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
            },
          }}
        />
      </body>
    </html>
  )
}
