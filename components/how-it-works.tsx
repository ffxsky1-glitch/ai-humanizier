import { Upload, Cpu, CheckCircle } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "Upload or Paste Text",
      description:
        "Enter your AI-generated text directly or upload .txt and .md files for quick processing.",
    },
    {
      icon: Cpu,
      title: "Rewritify Processing",
      description: "Rewritify rewrites your draft with human flow while keeping meaning intact.",
    },
    {
      icon: CheckCircle,
      title: "Get Safer, Human Output",
      description: "Get AI humanizer output designed to reduce detection risk and sound natural.",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">How Rewritify Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to rewrite AI text fast, safely, and with better flow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <step.icon className="h-8 w-8" />
                </div>
                <div
                  className="absolute top-8 left-1/2 w-full h-0.5 bg-border hidden md:block"
                  style={{ display: index === 2 ? "none" : "block" }}
                />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {index + 1}. {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
