import { NextResponse } from "next/server"

const planToEnvKey: Record<string, string> = {
  starter: "CREEM_PRODUCT_STARTER_ID",
  pro: "CREEM_PRODUCT_PRO_ID",
  business: "CREEM_PRODUCT_BUSINESS_ID",
}

export async function POST(request: Request) {
  const { plan } = (await request.json().catch(() => ({}))) as { plan?: string }
  const planKey = plan?.toLowerCase()
  if (!planKey || !(planKey in planToEnvKey)) {
    return NextResponse.json({ error: "Invalid plan." }, { status: 400 })
  }

  const apiKey = process.env.CREEM_API_KEY
  const apiBase = process.env.CREEM_API_BASE || "https://api.creem.io"
  const productId = process.env[planToEnvKey[planKey]]

  if (!apiKey || !productId) {
    return NextResponse.json({ error: "Creem configuration missing." }, { status: 500 })
  }

  const origin = request.headers.get("origin") || "http://localhost:3000"
  const payload = {
    product_id: productId,
    units: 1,
    success_url: `${origin}/pricing?status=success`,
    metadata: {
      plan: planKey,
    },
  }

  const response = await fetch(`${apiBase}/v1/checkouts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    return NextResponse.json(
      { error: `Creem checkout failed: ${errorBody || response.statusText}` },
      { status: 500 },
    )
  }

  const data = (await response.json()) as { checkout_url?: string }
  if (!data.checkout_url) {
    return NextResponse.json({ error: "Creem checkout URL missing." }, { status: 500 })
  }

  return NextResponse.json({ checkout_url: data.checkout_url })
}
