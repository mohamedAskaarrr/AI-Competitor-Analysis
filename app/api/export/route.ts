import { type NextRequest, NextResponse } from "next/server"
import type { Analysis } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const { analysisId, format } = await request.json()

    // In a real app, you'd fetch from database
    // For MVP, we'll use the data from the request
    const { analysis }: { analysis: Analysis } = await request.json()

    if (format === "csv") {
      const csv = generateCSV(analysis)
      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="${analysis.title}.csv"`,
        },
      })
    }

    if (format === "json") {
      return new NextResponse(JSON.stringify(analysis, null, 2), {
        headers: {
          "Content-Type": "application/json",
          "Content-Disposition": `attachment; filename="${analysis.title}.json"`,
        },
      })
    }

    return NextResponse.json({ error: "Invalid format" }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: "Export failed" }, { status: 500 })
  }
}

function generateCSV(analysis: Analysis): string {
  const headers = ["Company", "URL", "Description", "Pricing Tiers", "Key Features", "Marketing Tone"]
  const rows = analysis.competitors.map((comp) => [
    comp.name,
    comp.url,
    comp.description,
    comp.pricing.map((p) => `${p.name}: ${p.price}`).join("; "),
    comp.features.join("; "),
    comp.marketingTone,
  ])

  return [headers, ...rows].map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")).join("\n")
}
