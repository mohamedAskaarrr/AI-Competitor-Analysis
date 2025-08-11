"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Plus, Trash2, Search, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react"
import type { Analysis, CompetitorData } from "@/lib/types"

export function CompetitorDashboard() {
  const [urls, setUrls] = useState<string[]>([""])
  const [title, setTitle] = useState("")
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const addUrlField = () => {
    setUrls([...urls, ""])
  }

  const removeUrlField = (index: number) => {
    setUrls(urls.filter((_, i) => i !== index))
  }

  const updateUrl = (index: number, value: string) => {
    const newUrls = [...urls]
    newUrls[index] = value
    setUrls(newUrls)
  }

  const analyzeCompetitors = async () => {
    const validUrls = urls.filter((url) => url.trim())
    if (validUrls.length === 0) return

    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls: validUrls, title }),
      })

      if (response.ok) {
        const result = await response.json()
        setAnalysis(result)
      }
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const exportAnalysis = async (format: "csv" | "json") => {
    if (!analysis) return

    try {
      const response = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analysis, format }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${analysis.title}.${format}`
        a.click()
        window.URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error("Export failed:", error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Competitor Analysis</h1>
        <p className="text-gray-600">Analyze your competitors automatically with AI-powered insights</p>
      </div>

      {!analysis ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Start New Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Analysis Title</label>
              <Input
                placeholder="e.g., SaaS Competitors Q4 2024"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Competitor URLs</label>
              <div className="space-y-2">
                {urls.map((url, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="https://competitor.com"
                      value={url}
                      onChange={(e) => updateUrl(index, e.target.value)}
                    />
                    {urls.length > 1 && (
                      <Button variant="outline" size="icon" onClick={() => removeUrlField(index)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" onClick={addUrlField} className="w-full bg-transparent">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another URL
                </Button>
              </div>
            </div>

            <Button
              onClick={analyzeCompetitors}
              disabled={isAnalyzing || urls.filter((u) => u.trim()).length === 0}
              className="w-full"
            >
              {isAnalyzing ? "Analyzing..." : "Start Analysis"}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{analysis.title}</h2>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => exportAnalysis("csv")}>
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" onClick={() => exportAnalysis("json")}>
                <Download className="w-4 h-4 mr-2" />
                Export JSON
              </Button>
              <Button onClick={() => setAnalysis(null)}>New Analysis</Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="competitors">Competitors</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
              <TabsTrigger value="recommendations">Strategy</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Competitors Analyzed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analysis.competitors.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Opportunities Found</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{analysis.opportunities.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Threats Identified</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">{analysis.threats.length}</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Market Analysis Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="competitors" className="space-y-4">
              <div className="grid gap-4">
                {analysis.competitors.map((competitor, index) => (
                  <CompetitorCard key={index} competitor={competitor} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600">
                      <TrendingUp className="w-5 h-5" />
                      Opportunities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.opportunities.map((opportunity, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{opportunity}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <AlertTriangle className="w-5 h-5" />
                      Threats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.threats.map((threat, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{threat}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Strategic Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {analysis.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-sm leading-relaxed">{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}

function CompetitorCard({ competitor }: { competitor: CompetitorData }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{competitor.name}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">{competitor.url}</p>
          </div>
          <Badge variant="outline">{competitor.marketingTone}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-700">{competitor.description}</p>

        {competitor.pricing.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm mb-2">Pricing</h4>
            <div className="flex flex-wrap gap-2">
              {competitor.pricing.map((tier, index) => (
                <Badge key={index} variant="secondary">
                  {tier.name}: {tier.price}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {competitor.features.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm mb-2">Key Features</h4>
            <div className="flex flex-wrap gap-1">
              {competitor.features.slice(0, 6).map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {competitor.callsToAction.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm mb-2">Calls to Action</h4>
            <div className="flex flex-wrap gap-1">
              {competitor.callsToAction.map((cta, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {cta}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
