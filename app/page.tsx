"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, TrendingUp, Users, Zap } from "lucide-react"
import { CompetitorDashboard } from "@/components/competitor-dashboard"

export default function AIAppIdeasLanding() {
  const [selectedIdea, setSelectedIdea] = useState<string | null>(null)

  const appIdeas = [
    {
      id: "resume-optimizer",
      title: "AI Resume Builder & ATS Optimizer",
      description: "Upload resume, get AI feedback, optimize for ATS systems",
      monetization: "$5-15/month freemium",
      difficulty: "Easy",
      timeToMarket: "1 day",
      marketSize: "Large",
      icon: <Users className="w-6 h-6" />,
      features: ["ATS compatibility check", "Industry-specific optimization", "Real-time feedback", "Export formats"],
    },
    {
      id: "social-content",
      title: "AI Social Media Content Generator",
      description: "Generate posts, captions, hashtags for different platforms",
      monetization: "$10-30/month subscription",
      difficulty: "Easy",
      timeToMarket: "1 day",
      marketSize: "Very Large",
      icon: <Sparkles className="w-6 h-6" />,
      features: ["Multi-platform optimization", "Brand voice training", "Hashtag research", "Content calendar"],
    },
    {
      id: "code-review",
      title: "AI Code Review Assistant",
      description: "Paste code, get security, performance, and style feedback",
      monetization: "$15-50/month for developers",
      difficulty: "Medium",
      timeToMarket: "1 day",
      marketSize: "Medium",
      icon: <Zap className="w-6 h-6" />,
      features: ["Security analysis", "Performance optimization", "Style consistency", "Best practices"],
    },
    {
      id: "competitor-analysis",
      title: "AI Competitor Analysis Tool",
      description: "Analyze competitor websites, pricing, features automatically",
      monetization: "$50-200/month B2B",
      difficulty: "Medium",
      timeToMarket: "1 day",
      marketSize: "Large",
      icon: <TrendingUp className="w-6 h-6" />,
      features: ["Automated monitoring", "Pricing intelligence", "Feature comparison", "Weekly reports"],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <CompetitorDashboard />
      <div className="max-w-6xl mx-auto mt-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI App Ideas You Can Build in a Day 🚀</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Monetizable AI-powered applications perfect for your GitHub portfolio and LinkedIn experience section
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {appIdeas.map((idea) => (
            <Card
              key={idea.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedIdea === idea.id ? "ring-2 ring-blue-500 shadow-lg" : ""
              }`}
              onClick={() => setSelectedIdea(selectedIdea === idea.id ? null : idea.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">{idea.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{idea.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{idea.description}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{idea.difficulty}</Badge>
                    <Badge variant="outline">{idea.timeToMarket}</Badge>
                    <Badge variant="default">{idea.marketSize} Market</Badge>
                  </div>

                  <div className="text-sm">
                    <span className="font-semibold text-green-600">💰 {idea.monetization}</span>
                  </div>

                  {selectedIdea === idea.id && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Key Features:</h4>
                      <ul className="text-sm space-y-1">
                        {idea.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Quick Implementation Strategy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">🛠️ Tech Stack</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Next.js 14 + App Router</li>
                  <li>• AI SDK + OpenAI</li>
                  <li>• Tailwind CSS + shadcn/ui</li>
                  <li>• Vercel deployment</li>
                </ul>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">💰 Monetization</h3>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Freemium model</li>
                  <li>• Usage-based pricing</li>
                  <li>• Stripe integration</li>
                  <li>• API rate limiting</li>
                </ul>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">📈 Growth Strategy</h3>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Product Hunt launch</li>
                  <li>• Twitter/LinkedIn sharing</li>
                  <li>• GitHub trending</li>
                  <li>• Community feedback</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🎯 Day-by-Day Execution Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold">Morning (2-3 hours): Core Development</h4>
                  <p className="text-sm text-gray-600">
                    Set up Next.js project, implement AI integration, build basic UI
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold">Afternoon (2-3 hours): Polish & Deploy</h4>
                  <p className="text-sm text-gray-600">Add styling, error handling, deploy to Vercel, set up domain</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold">Evening (1-2 hours): Launch & Promote</h4>
                  <p className="text-sm text-gray-600">
                    Create GitHub repo, write README, post on social media, update LinkedIn
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
