"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Upload, Sparkles, Copy, Trash2, FileText, ImageIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function HeroSection() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const requestIdRef = useRef(0)
  const { toast } = useToast()

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const isTextFile =
      file.type === "text/plain" ||
      file.type === "text/markdown" ||
      file.name.toLowerCase().endsWith(".txt") ||
      file.name.toLowerCase().endsWith(".md")

    if (!isTextFile) {
      toast({
        title: "Invalid file type",
        description: "Please upload a .txt or .md file.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    const reader = new FileReader()
    reader.onload = () => {
      setInputText(typeof reader.result === "string" ? reader.result : "")
      setIsProcessing(false)
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been processed.`,
      })
    }
    reader.onerror = () => {
      setIsProcessing(false)
      toast({
        title: "Upload failed",
        description: "Could not read the file. Please try again.",
        variant: "destructive",
      })
    }
    reader.readAsText(file)
  }

  const handleHumanize = async () => {
    if (!inputText.trim()) {
      toast({
        title: "No text to rewrite",
        description: "Please enter some text or upload a file first.",
        variant: "destructive",
      })
      return
    }

    const requestId = requestIdRef.current + 1
    requestIdRef.current = requestId
    setIsProcessing(true)
    setOutputText("")

    try {
      const response = await fetch("/api/humanize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      })

      if (!response.ok) {
        const errorPayload = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(errorPayload?.error || "Rewrite request failed.")
      }

      const data = (await response.json()) as { output?: string }
      if (requestIdRef.current !== requestId) return
      setOutputText(data.output?.trim() || "")
      toast({
        title: "Text rewritten successfully",
        description: "Your content now reads more human.",
      })
    } catch (error) {
      if (requestIdRef.current !== requestId) return
      const message = error instanceof Error ? error.message : "Something went wrong."
      toast({
        title: "Rewrite failed",
        description: message,
        variant: "destructive",
      })
    } finally {
      if (requestIdRef.current === requestId) {
        setIsProcessing(false)
      }
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "Text has been copied successfully.",
    })
  }

  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary mb-6">
            Faster than traditional rewriters. Turnitin-aware (results vary). Inspired by aihumanize.io.
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Rewritify is the fast
            <span className="text-primary"> AI Rewriter & AI Humanizer</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Avoid getting flagged for AI text in homework, essays, PPTs, or reports. Rewritify rewrites fast, preserves
            meaning, and is engineered to reduce AI detection risk while protecting privacy. Core features are free, no
            login is required, and it is easy for students, professionals, and creators to use.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Input Section */}
          <Card className="p-6 bg-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Input Text</h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => setInputText("")} disabled={!inputText}>
                  <Trash2 className="h-4 w-4" />
                </Button>
                <label htmlFor="file-upload">
                  <Button variant="ghost" size="icon" asChild>
                    <span>
                      <Upload className="h-4 w-4" />
                    </span>
                  </Button>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept=".txt,.md"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
            </div>
            <Textarea
              placeholder="Paste your AI-generated text here, or upload a file (TXT or Markdown)..."
              className="min-h-[300px] resize-none bg-background"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{inputText.length} characters</span>
              <div className="flex gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground text-xs">Supports .txt & .md</span>
              </div>
            </div>
          </Card>

          {/* Output Section */}
          <Card className="p-6 bg-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Rewritify Output</h3>
              <Button variant="ghost" size="icon" onClick={() => handleCopy(outputText)} disabled={!outputText}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <Textarea
              placeholder="Your rewritten text will appear here..."
              className="min-h-[300px] resize-none bg-background"
              value={outputText}
              readOnly
            />
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{outputText.length} characters</span>
              {outputText && <span className="text-green-600 dark:text-green-400 font-medium">100% Human-like</span>}
            </div>
          </Card>
        </div>

        <div className="text-center">
          <Button size="lg" className="px-8" onClick={handleHumanize} disabled={isProcessing || !inputText}>
            {isProcessing ? (
              <>Processing...</>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Rewrite AI Text
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  )
}
