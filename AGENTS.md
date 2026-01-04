# AGENTS.md

## Project
AI Humanizer Next.js app with a Replicate-backed humanization API.

## Key Paths
- UI: components/hero-section.tsx
- API: app/api/humanize/route.ts
- Env: .env.local (REPLICATE_API_TOKEN)

## Dev
- Install: npm install
- Run: npm run dev
- URL: http://localhost:3000

## Notes
- Input upload supports .txt and .md.
- Humanize button calls /api/humanize and returns the model output.
