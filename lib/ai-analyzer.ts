import { generateObject, generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"
import type { CompetitorData } from "./types"

const analysisSchema = z.object({
  summary: z.string().describe("Overall market analysis summary"),
  opportunities: z.array(z.string()).describe("Market opportunities identified"),
  threats: z.array(z.string()).describe("Competitive threats identified"),
  recommendations: z.array(z.string()).describe("Strategic recommendations"),
  positioning: z.string().describe("Suggested market positioning"),
})

export class AIAnalyzer {
  async analyzeCompetitors(competitors: CompetitorData[]): Promise<{
    summary: string
    opportunities: string[]
    threats: string[]
    recommendations: string[]
  }> {
    const competitorSummary = competitors.map((comp) => ({
      name: comp.name,
      description: comp.description,
      pricing: comp.pricing,
      features: comp.features,
      marketingTone: comp.marketingTone,
    }))

    const { object } = await generateObject({
      model: openai("gpt-4o"),
      schema: analysisSchema,
      prompt: `
        Analyze the following competitor data and provide strategic insights:
        
        ${JSON.stringify(competitorSummary, null, 2)}
        
        Please provide:
        1. A comprehensive market analysis summary
        2. Key opportunities in the market
        3. Competitive threats to be aware of
        4. Strategic recommendations for differentiation
        5. Suggested market positioning
        
        Focus on actionable insights that would help a business compete effectively.
      `,
    })

    return {
      summary: object.summary,
      opportunities: object.opportunities,
      threats: object.threats,
      recommendations: object.recommendations,
    }
  }

  async enhanceCompetitorData(rawData: Partial<CompetitorData>): Promise<CompetitorData> {
    const { text: enhancedDescription } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        Analyze this competitor's website data and provide an enhanced description:
        
        Name: ${rawData.name}
        Description: ${rawData.description}
        Features: ${rawData.features?.join(", ")}
        CTAs: ${rawData.callsToAction?.join(", ")}
        
        Provide a concise but comprehensive description of what this company does,
        their target market, and their key value proposition.
      `,
    })

    return {
      id: crypto.randomUUID(),
      url: rawData.url || "",
      name: rawData.name || "Unknown Company",
      description: enhancedDescription,
      pricing: rawData.pricing || [],
      features: rawData.features || [],
      marketingTone: rawData.marketingTone || "Professional",
      designStyle: rawData.designStyle || {
        primaryColors: ["#000000"],
        layout: "Modern",
        imagery: "Professional",
      },
      callsToAction: rawData.callsToAction || [],
      createdAt: new Date(),
      analysisId: "",
    }
  }
}
