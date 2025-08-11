import type { CompetitorData } from "./types"

export class CompetitorScraper {
  private async scrapeWebsite(url: string): Promise<Partial<CompetitorData>> {
    try {
      // In a real implementation, you'd use Playwright here
      // For this MVP, we'll simulate the scraping process
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; CompetitorBot/1.0)",
        },
      })

      const html = await response.text()

      // Extract basic information (simplified for MVP)
      const name = this.extractTitle(html)
      const description = this.extractDescription(html)
      const pricing = await this.extractPricing(html)
      const features = this.extractFeatures(html)
      const callsToAction = this.extractCTAs(html)

      return {
        url,
        name,
        description,
        pricing,
        features,
        callsToAction,
        marketingTone: "Professional", // Would be AI-analyzed in full version
        designStyle: {
          primaryColors: ["#000000", "#ffffff"],
          layout: "Modern",
          imagery: "Professional",
        },
      }
    } catch (error) {
      console.error(`Error scraping ${url}:`, error)
      throw new Error(`Failed to scrape ${url}`)
    }
  }

  private extractTitle(html: string): string {
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    return titleMatch ? titleMatch[1].trim() : "Unknown Company"
  }

  private extractDescription(html: string): string {
    const metaDesc = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)
    return metaDesc ? metaDesc[1] : "No description available"
  }

  private async extractPricing(html: string): Promise<any[]> {
    // Simplified pricing extraction
    const priceMatches = html.match(/\$\d+(?:\.\d{2})?/g) || []
    return priceMatches.slice(0, 3).map((price, index) => ({
      name: `Plan ${index + 1}`,
      price,
      features: ["Feature 1", "Feature 2", "Feature 3"],
    }))
  }

  private extractFeatures(html: string): string[] {
    // Simplified feature extraction
    return ["Core functionality", "Customer support", "Analytics dashboard", "API access"]
  }

  private extractCTAs(html: string): string[] {
    const ctaPatterns = [/Get Started/gi, /Sign Up/gi, /Try Free/gi, /Contact Us/gi, /Learn More/gi]

    const ctas: string[] = []
    ctaPatterns.forEach((pattern) => {
      const matches = html.match(pattern)
      if (matches) ctas.push(...matches)
    })

    return [...new Set(ctas)].slice(0, 5)
  }

  async scrapeCompetitors(urls: string[]): Promise<Partial<CompetitorData>[]> {
    const results = await Promise.allSettled(urls.map((url) => this.scrapeWebsite(url)))

    return results
      .filter((result): result is PromiseFulfilledResult<Partial<CompetitorData>> => result.status === "fulfilled")
      .map((result) => result.value)
  }
}
