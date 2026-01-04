import { FileText, Zap, Shield, Globe, Sparkles, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function FeaturesSection() {
  const features = [
    {
      icon: FileText,
      title: "Multiple File Format Support",
      description: "Upload DOC, DOCX, PDF, Markdown files, or scanned images with OCR text extraction.",
    },
    {
      icon: Zap,
      title: "Instant Processing",
      description: "Get humanized content in seconds with our advanced AI algorithms.",
    },
    {
      icon: Shield,
      title: "Bypass AI Detection",
      description: "Successfully passes Turnitin, GPTZero, Copyleak, and other major AI detectors.",
    },
    {
      icon: Sparkles,
      title: "Natural Human Writing",
      description: "Transforms AI text into authentic, engaging content that reads naturally.",
    },
    {
      icon: Globe,
      title: "Multiple Writing Styles",
      description: "Supports academic, blog, business, formal, and informal writing styles.",
    },
    {
      icon: TrendingUp,
      title: "SEO Optimized",
      description: "Maintains keyword relevance while improving readability and engagement.",
    },
  ]

  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Why Choose AI Humanizer?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your AI-generated content into authentic human writing with our powerful features
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
