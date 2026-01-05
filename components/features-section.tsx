import { FileText, Zap, Shield, Globe, Sparkles, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function FeaturesSection() {
  const features = [
    {
      icon: FileText,
      title: "Clean Inputs, Clean Outputs",
      description: "Upload TXT or Markdown files for consistent Rewritify AI humanizer output.",
    },
    {
      icon: Zap,
      title: "Faster Than Traditional Rewriters",
      description: "Rewritify delivers fast AI rewriting in seconds, not minutes.",
    },
    {
      icon: Shield,
      title: "Lower Detection Risk",
      description: "Designed to reduce AI detection flags on tools like Turnitin and GPTZero.",
    },
    {
      icon: Sparkles,
      title: "Natural Human Writing",
      description: "Rewritify turns AI text into human-sounding writing with better flow.",
    },
    {
      icon: Globe,
      title: "Multiple Writing Styles",
      description: "Academic, business, blog, and casual styles are easy to match.",
    },
    {
      icon: TrendingUp,
      title: "SEO Ready",
      description: "Keeps keywords while making content clearer for readers and search engines.",
    },
  ]

  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Why Choose Rewritify?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Rewritify is the AI rewriter built for speed, privacy, and safer humanized results.
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
