export interface CompetitorData {
  id: string
  url: string
  name: string
  description: string
  pricing: PricingTier[]
  features: string[]
  marketingTone: string
  designStyle: {
    primaryColors: string[]
    layout: string
    imagery: string
  }
  callsToAction: string[]
  createdAt: Date
  analysisId: string
}

export interface PricingTier {
  name: string
  price: string
  features: string[]
  isPopular?: boolean
}

export interface Analysis {
  id: string
  userId: string
  title: string
  competitors: CompetitorData[]
  summary: string
  opportunities: string[]
  threats: string[]
  recommendations: string[]
  createdAt: Date
}

export interface User {
  id: string
  email: string
  name: string
  plan: "free" | "pro" | "enterprise"
  analysesCount: number
  maxAnalyses: number
}
