import { type NextRequest, NextResponse } from "next/server"
import { CompetitorScraper } from "@/lib/scraper"
import { AIAnalyzer } from "@/lib/ai-analyzer"
import { DEMO_ANALYSIS } from "@/lib/demo-data"

export async function POST(request: NextRequest) {
  try {
    const { urls, title } = await request.json()

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: "Please provide valid URLs to analyze" }, { status: 400 })
    }

    // Check for API key - if missing, return demo data
    if (!process.env.OPENAI_API_KEY) {
      console.warn("OpenAI API key not found, returning demo data")
      return NextResponse.json({
        ...DEMO_ANALYSIS,
        title: title || "Demo Competitor Analysis (API Key Required)",
        id: crypto.randomUUID(),
        createdAt: new Date(),
      })
    }

    try {
      // Initialize services
      const scraper = new CompetitorScraper()
      const analyzer = new AIAnalyzer()

      // Scrape competitor data
      const rawCompetitorData = await scraper.scrapeCompetitors(urls)

      // Enhance data with AI
      const enhancedCompetitors = await Promise.all(
        rawCompetitorData.map((data) => analyzer.enhanceCompetitorData(data)),
      )

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
    } catch (aiError) {
      console.error("AI Analysis error:", aiError)

      // If AI fails, return demo data with error message
      return NextResponse.json({
        ...DEMO_ANALYSIS,
        title: `${title || "Demo Analysis"} (AI Service Unavailable)`,
        id: crypto.randomUUID(),
        createdAt: new Date(),
      })
    }
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze competitors" }, { status: 500 })
  }
}
