import { type NextRequest, NextResponse } from "next/server"
import { CompetitorScraper } from "@/lib/scraper"
import { AIAnalyzer } from "@/lib/ai-analyzer"

export async function POST(request: NextRequest) {
  try {
    const { urls, title } = await request.json()

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: "Please provide valid URLs to analyze" }, { status: 400 })
    }

    // Initialize services
    const scraper = new CompetitorScraper()
    const analyzer = new AIAnalyzer()

    // Scrape competitor data
    const rawCompetitorData = await scraper.scrapeCompetitors(urls)

    // Enhance data with AI
    const enhancedCompetitors = await Promise.all(rawCompetitorData.map((data) => analyzer.enhanceCompetitorData(data)))

    // Generate analysis
    const analysis = await analyzer.analyzeCompetitors(enhancedCompetitors)

    // Create analysis object
    const analysisResult = {
      id: crypto.randomUUID(),
      title: title || "Competitor Analysis",
      competitors: enhancedCompetitors,
      ...analysis,
      createdAt: new Date(),
    }

    return NextResponse.json(analysisResult)
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze competitors" }, { status: 500 })
  }
}
