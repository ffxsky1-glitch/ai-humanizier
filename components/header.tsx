"use client"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Link from "next/link"

export function Header() {
  const handleRewriteClick = () => {
    const input = document.getElementById("rewrite-input") as HTMLTextAreaElement | null
    if (input) {
      input.scrollIntoView({ behavior: "smooth", block: "center" })
      input.focus()
      return
    }
    const section = document.getElementById("rewrite-section")
    section?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            RW
          </div>
          <span className="text-xl font-bold text-foreground">Rewritify</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Reviews
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            FAQ
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline-flex items-center rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            Free core features
          </span>
          <span className="hidden md:inline-flex items-center text-xs text-muted-foreground">
            No login needed
          </span>
          <span className="hidden md:inline-flex h-4 w-px bg-border" />
          <Link href="/login" className="hidden md:inline-flex">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Button onClick={handleRewriteClick}>Rewrite Now</Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </nav>
    </header>
  )
}
