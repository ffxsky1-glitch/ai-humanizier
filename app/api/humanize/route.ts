import { NextResponse } from "next/server"

const MODEL_VERSION_ID = "3a66bc6c1327de5459cb18b2f10550693bc69662a5e29c67a971776f8574f1b1"
const REPLICATE_API_URL = "https://api.replicate.com/v1/predictions"

type PredictionResponse = {
  id: string
  status: "starting" | "processing" | "succeeded" | "failed" | "canceled"
  output?: unknown
  error?: string | null
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const splitIntoChunks = (text: string, maxChars: number) => {
  const paragraphs = text.split(/\n{2,}/)
  const chunks: string[] = []

  for (const paragraph of paragraphs) {
    const trimmed = paragraph.trim()
    if (!trimmed) continue

    if (trimmed.length <= maxChars) {
      chunks.push(trimmed)
      continue
    }

    const sentences = trimmed.split(/(?<=[.!?])\s+/)
    let buffer = ""
    for (const sentence of sentences) {
      if (!sentence) continue
      const candidate = buffer ? `${buffer} ${sentence}` : sentence
      if (candidate.length > maxChars && buffer) {
        chunks.push(buffer)
        buffer = sentence
      } else {
        buffer = candidate
      }
    }
    if (buffer) chunks.push(buffer)
  }

  return chunks
}

const normalizeOutput = (output: unknown) => {
  if (typeof output === "string") return output
  if (Array.isArray(output)) {
    const candidates = output.filter((item) => typeof item === "string").map((item) => item.trim())
    const longest = candidates.sort((a, b) => b.length - a.length)[0]
    if (longest) return longest
    return output.join("\n")
  }
  if (output == null) return ""
  return JSON.stringify(output)
}

export async function POST(request: Request) {
  const token = process.env.REPLICATE_API_TOKEN
  if (!token) {
    return NextResponse.json({ error: "Missing REPLICATE_API_TOKEN." }, { status: 500 })
  }

  const payload = (await request.json().catch(() => null)) as { text?: string } | null
  const text = payload?.text?.trim()
  if (!text) {
    return NextResponse.json({ error: "Text is required." }, { status: 400 })
  }

  const chunks = splitIntoChunks(text, 700)
  const outputs: string[] = []

  for (const chunk of chunks) {
    const prompt = `paraphrase: ${chunk}`
    const maxLength = Math.min(320, Math.max(120, Math.ceil(chunk.length * 1.2)))

    const requestBody = JSON.stringify({
      version: MODEL_VERSION_ID,
      input: {
        prompt,
        max_length: maxLength,
        num_return_sequences: 2,
        num_beams: 4,
        num_beam_groups: 2,
        temperature: 0.7,
        top_p: 0.95,
        repetition_penalty: 1.05,
        diversity_penalty: 1.1,
        no_repeat_ngram_size: 3,
      },
    })

    let prediction: PredictionResponse | null = null
    const maxCreateAttempts = 3
    for (let attempt = 0; attempt < maxCreateAttempts; attempt += 1) {
      const createResponse = await fetch(REPLICATE_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: requestBody,
      })

      if (createResponse.status === 429) {
        const retryAfter = Number(createResponse.headers.get("retry-after") || "1")
        await sleep(Math.min(2000, retryAfter * 1000))
        continue
      }

      if (!createResponse.ok) {
        const errorBody = await createResponse.text()
        return NextResponse.json(
          { error: `Replicate request failed: ${errorBody || createResponse.statusText}` },
          { status: 500 },
        )
      }

      prediction = (await createResponse.json()) as PredictionResponse
      break
    }

    if (!prediction) {
      return NextResponse.json({ error: "Replicate request failed: rate limited." }, { status: 429 })
    }

    const maxAttempts = 60
    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
      if (prediction.status === "succeeded" || prediction.status === "failed" || prediction.status === "canceled") {
        break
      }
      await sleep(1000)
      const statusResponse = await fetch(`${REPLICATE_API_URL}/${prediction.id}`, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!statusResponse.ok) {
        const errorBody = await statusResponse.text()
        return NextResponse.json(
          { error: `Replicate status failed: ${errorBody || statusResponse.statusText}` },
          { status: 500 },
        )
      }

      prediction = (await statusResponse.json()) as PredictionResponse
    }

    if (prediction.status !== "succeeded") {
      return NextResponse.json(
        { error: prediction.error || "Replicate prediction did not succeed." },
        { status: 500 },
      )
    }

    outputs.push(normalizeOutput(prediction.output))
    await sleep(200)
  }

  return NextResponse.json({ output: outputs.join("\n\n") })
}
