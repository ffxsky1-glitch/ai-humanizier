"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().finally(() => {
      router.replace("/")
    })
  }, [router])

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-foreground">Signing you in...</h1>
        <p className="text-sm text-muted-foreground mt-2">Please wait a moment.</p>
      </div>
    </main>
  )
}
