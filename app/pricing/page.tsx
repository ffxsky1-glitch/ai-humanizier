"use client"

import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type PlanTier = {
  id: string
  name: string
  price: string
  cadence: string
  description: string
  highlight?: string
  features: string[]
  cta: string
  isPaid: boolean
}

const tiers: PlanTier[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    cadence: "forever",
    description: "Core rewriting features with no login needed.",
    features: ["Instant AI rewrite", "Private by default", "No signup required", "Basic tone smoothing"],
    cta: "Start Free",
    isPaid: false,
  },
  {
    id: "starter",
    name: "Starter",
    price: "$1",
    cadence: "per month",
    description: "For students and solo creators who need faster, cleaner rewrites.",
    features: ["Longer inputs", "Priority processing", "Cleaner structure", "Commercial use"],
    cta: "Get Starter",
    isPaid: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$19",
    cadence: "per month",
    description: "Best for professionals who rewrite daily and want steady quality.",
    highlight: "Most popular",
    features: ["Longest inputs", "Best output quality", "Faster response times", "Enhanced privacy controls"],
    cta: "Go Pro",
    isPaid: true,
  },
  {
    id: "business",
    name: "Business",
    price: "$39",
    cadence: "per month",
    description: "For teams needing consistent output at higher volume.",
    features: ["Team-friendly limits", "Shared billing", "Priority support", "Dedicated success guidance"],
    cta: "Start Business",
    isPaid: true,
  },
]

export default function PricingPage() {
  const searchParams = useSearchParams()
  const status = searchParams.get("status")
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const banner = useMemo(() => {
    if (status === "success") {
      return { tone: "success", text: "Payment completed. Your plan is active." }
    }
    if (status === "cancelled") {
      return { tone: "neutral", text: "Checkout cancelled. You can try again anytime." }
    }
    return null
  }, [status])

  const handleCheckout = async (planId: string) => {
    setErrorMessage(null)
    setLoadingPlan(planId)
    try {
      const response = await fetch("/api/creem/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      })
      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}))
        throw new Error(errorBody.error || "Checkout failed.")
      }
      const data = (await response.json()) as { checkout_url?: string }
      if (!data.checkout_url) {
        throw new Error("Checkout URL missing.")
      }
      window.location.href = data.checkout_url
    } catch (error) {
      const message = error instanceof Error ? error.message : "Checkout failed."
      setErrorMessage(message)
    } finally {
      setLoadingPlan(null)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center gap-4">
            <span className="inline-flex items-center rounded-full border border-border bg-muted/40 px-4 py-1 text-xs font-medium text-muted-foreground">
              Fast AI rewriting, no login needed
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Simple pricing for Rewritify
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Pick a plan that matches your volume. Free core features stay free, while paid tiers unlock longer inputs,
              faster processing, and premium output quality.
            </p>
          </div>

          {banner ? (
            <div
              className={`mt-8 rounded-lg border px-4 py-3 text-sm ${
                banner.tone === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                  : "border-border bg-muted/40 text-foreground"
              }`}
            >
              {banner.text}
            </div>
          ) : null}

          {errorMessage ? (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
              {errorMessage}
            </div>
          ) : null}

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {tiers.map((tier) => (
              <Card key={tier.id} className="relative">
                <CardHeader className="gap-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    {tier.highlight ? (
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {tier.highlight}
                      </span>
                    ) : null}
                  </div>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <div className="text-3xl font-bold text-foreground">{tier.price}</div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">{tier.cadence}</div>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {tier.features.map((feature) => (
                      <li key={feature}>• {feature}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  {tier.isPaid ? (
                    <Button
                      className="w-full"
                      onClick={() => handleCheckout(tier.id)}
                      disabled={loadingPlan === tier.id}
                    >
                      {loadingPlan === tier.id ? "Redirecting..." : tier.cta}
                    </Button>
                  ) : (
                    <Link href="/#rewrite-section" className="w-full">
                      <Button variant="outline" className="w-full">
                        {tier.cta}
                      </Button>
                    </Link>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-muted/20 p-6">
              <h3 className="text-base font-semibold text-foreground">Built for real workflows</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Rewritify keeps meaning intact while making output sound natural for essays, reports, and client updates.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-6">
              <h3 className="text-base font-semibold text-foreground">Privacy-first by default</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                No login is required to use core tools. Paid tiers keep your rewrite history protected and private.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-6">
              <h3 className="text-base font-semibold text-foreground">Made to reduce detection risk</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Tuned for smoother structure and human cadence to help lower detection signals from AI checkers.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
