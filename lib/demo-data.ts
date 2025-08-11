import type { Analysis } from "./types"

export const DEMO_ANALYSIS: Analysis = {
  id: "demo-analysis",
  userId: "demo-user",
  title: "Demo Competitor Analysis",
  competitors: [
    {
      id: "demo-1",
      url: "https://example-competitor-1.com",
      name: "TechFlow Solutions",
      description:
        "A comprehensive project management platform designed for modern teams, offering advanced collaboration tools, automated workflows, and real-time analytics to streamline business operations and boost productivity.",
      pricing: [
        {
          name: "Starter",
          price: "$29/month",
          features: ["Up to 10 users", "Basic reporting", "Email support", "5GB storage"],
        },
        {
          name: "Professional",
          price: "$79/month",
          features: ["Up to 50 users", "Advanced analytics", "Priority support", "Custom integrations", "50GB storage"],
        },
        {
          name: "Enterprise",
          price: "$199/month",
          features: ["Unlimited users", "Custom workflows", "24/7 support", "White-label options", "Unlimited storage"],
        },
      ],
      features: [
        "Project Management",
        "Team Collaboration",
        "Time Tracking",
        "Custom Workflows",
        "API Integration",
        "Advanced Reporting",
        "Mobile Apps",
        "Third-party Integrations",
      ],
      marketingTone: "Professional and Enterprise-focused",
      designStyle: {
        primaryColors: ["#2563eb", "#1e40af"],
        layout: "Clean and Modern",
        imagery: "Professional Business",
      },
      callsToAction: ["Start Free Trial", "Schedule Demo", "Contact Sales", "Watch Demo"],
      createdAt: new Date(),
      analysisId: "demo-analysis",
    },
    {
      id: "demo-2",
      url: "https://example-competitor-2.com",
      name: "WorkSpace Pro",
      description:
        "An all-in-one workspace solution that combines document management, team communication, and project tracking in a single, intuitive platform designed for growing businesses and remote teams.",
      pricing: [
        {
          name: "Basic",
          price: "$19/month",
          features: ["5 team members", "10GB storage", "Basic templates", "Email support"],
        },
        {
          name: "Premium",
          price: "$49/month",
          features: ["25 team members", "100GB storage", "Advanced templates", "Integrations", "Priority support"],
        },
        {
          name: "Business",
          price: "$99/month",
          features: ["Unlimited members", "1TB storage", "Custom branding", "Advanced security", "API access"],
        },
      ],
      features: [
        "Document Management",
        "Team Chat",
        "Task Management",
        "File Sharing",
        "Mobile Apps",
        "Video Conferencing",
        "Calendar Integration",
        "Custom Templates",
      ],
      marketingTone: "Friendly and Approachable",
      designStyle: {
        primaryColors: ["#059669", "#047857"],
        layout: "Minimalist and Clean",
        imagery: "Diverse Teams",
      },
      callsToAction: ["Try for Free", "Get Started", "Learn More", "Book a Call"],
      createdAt: new Date(),
      analysisId: "demo-analysis",
    },
    {
      id: "demo-3",
      url: "https://example-competitor-3.com",
      name: "AgileBoard",
      description:
        "A specialized agile project management tool built for software development teams, featuring sprint planning, backlog management, and advanced reporting capabilities with seamless CI/CD integration.",
      pricing: [
        {
          name: "Developer",
          price: "$15/month",
          features: ["Up to 3 projects", "Basic agile tools", "Community support", "5GB storage"],
        },
        {
          name: "Team",
          price: "$45/month",
          features: ["Unlimited projects", "Advanced reporting", "Email support", "CI/CD integration", "25GB storage"],
        },
        {
          name: "Enterprise",
          price: "$120/month",
          features: ["Advanced security", "Custom fields", "24/7 support", "SSO integration", "Unlimited storage"],
        },
      ],
      features: [
        "Sprint Planning",
        "Backlog Management",
        "Burndown Charts",
        "CI/CD Integration",
        "Code Repository Links",
        "Time Tracking",
        "Custom Workflows",
        "Team Velocity Tracking",
      ],
      marketingTone: "Technical and Developer-focused",
      designStyle: {
        primaryColors: ["#7c3aed", "#5b21b6"],
        layout: "Dashboard-heavy",
        imagery: "Code and Development",
      },
      callsToAction: ["Start Free Trial", "View Demo", "Developer Docs", "Contact Team"],
      createdAt: new Date(),
      analysisId: "demo-analysis",
    },
  ],
  summary:
    "The project management software market shows clear segmentation with three distinct approaches: TechFlow Solutions targets enterprise clients with comprehensive features and premium pricing, WorkSpace Pro focuses on small-to-medium businesses with user-friendly design and competitive pricing, while AgileBoard specializes in developer teams with technical features and agile methodologies. Each competitor has carved out their niche, but there are opportunities for differentiation through specialized features, better user experience, or underserved market segments.",
  opportunities: [
    "Gap in mobile-first project management solutions for field teams",
    "Underserved small business segment with budget constraints under $20/month",
    "Integration opportunities with emerging AI and automation tools",
    "Potential for industry-specific customizations (healthcare, education, construction)",
    "White-label solutions for agencies and consultants",
    "Focus on async/remote work collaboration features",
    "Simplified onboarding for non-technical users",
  ],
  threats: [
    "Established competitors with strong brand recognition and customer loyalty",
    "Price competition from low-cost alternatives and open-source solutions",
    "Feature creep making products complex for new users",
    "Large tech companies (Microsoft, Google, Atlassian) with integrated ecosystems",
    "Economic downturn affecting business software spending",
    "Increasing customer acquisition costs in saturated market",
    "Security and compliance requirements raising barriers to entry",
  ],
  recommendations: [
    "Focus on a specific niche or industry vertical to differentiate from general solutions",
    "Emphasize ease of use and quick setup as key differentiators against complex competitors",
    "Consider freemium model with generous free tier to compete with established players",
    "Invest heavily in mobile experience as competitors seem primarily desktop-focused",
    "Build strong integration ecosystem with popular business tools (Slack, Google Workspace, etc.)",
    "Offer exceptional customer support and onboarding as a competitive advantage",
    "Develop AI-powered features for task automation and intelligent insights",
    "Create industry-specific templates and workflows for faster adoption",
  ],
  createdAt: new Date(),
}
