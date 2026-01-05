import { GraduationCap, Briefcase, PenTool } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function UseCases() {
  const cases = [
    {
      icon: GraduationCap,
      title: "Students",
      description:
        "Rewrite homework, essays, and slides fast. Rewritify helps reduce AI detector concerns before submission.",
      color: "bg-blue-500",
    },
    {
      icon: Briefcase,
      title: "Professionals",
      description:
        "Polish reports and client emails without sounding robotic. Rewritify keeps your voice while boosting clarity.",
      color: "bg-green-500",
    },
    {
      icon: PenTool,
      title: "Writers & Bloggers",
      description:
        "Turn AI drafts into readable posts with strong SEO flow. Rewritify is an AI rewriter built for creators.",
      color: "bg-purple-500",
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Who Uses Rewritify?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, fast, and private for anyone who needs an AI rewriter they can trust.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((useCase, index) => (
            <Card key={index} className="border-border hover:border-primary/50 transition-all hover:shadow-lg">
              <CardContent className="p-8">
                <div
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-lg ${useCase.color} text-white mb-6`}
                >
                  <useCase.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{useCase.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{useCase.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
