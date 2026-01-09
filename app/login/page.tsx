"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { supabase } from "@/lib/supabase/client"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<"google" | "github" | null>(null)
  const router = useRouter()

  const handleOAuth = async (provider: "google" | "github") => {
    setIsLoading(provider)
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setIsLoading(null)
      router.replace(`/?auth=error`)
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground">Sign in to Rewritify</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Optional login for saved rewrites and premium models.
          </p>
        </div>
        <div className="space-y-3">
          <Button
            className="w-full"
            onClick={() => handleOAuth("google")}
            disabled={isLoading !== null}
          >
            {isLoading === "google" ? "Connecting to Google..." : "Continue with Google"}
          </Button>
          <Button
            className="w-full"
            variant="secondary"
            onClick={() => handleOAuth("github")}
            disabled={isLoading !== null}
          >
            {isLoading === "github" ? "Connecting to GitHub..." : "Continue with GitHub"}
          </Button>
        </div>
      </Card>
    </main>
  )
}
