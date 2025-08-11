import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Competitor Analysis Tool",
  description: "Analyze your competitors automatically with AI-powered insights",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-900">CompetitorAI</h1>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Free Plan: 3/5 analyses</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                  Upgrade to Pro
                </button>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
