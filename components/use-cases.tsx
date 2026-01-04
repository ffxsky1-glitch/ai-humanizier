import { GraduationCap, Briefcase, PenTool } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function UseCases() {
  const cases = [
    {
      icon: GraduationCap,
      title: "Students",
      description:
        "Ensure your assignments remain AI-free and original. Our AI Humanizer guarantees your work is indistinguishable from human-written content.",
      color: "bg-blue-500",
    },
    {
      icon: Briefcase,
      title: "Professionals",
      description:
        "Create professional documents that bypass AI detection effortlessly. Humanize AI Text Tool refines your text to maintain professionalism and originality.",
      color: "bg-green-500",
    },
    {
      icon: PenTool,
      title: "Writers & Bloggers",
      description:
        "Transform AI drafts into engaging human content. Boost SEO rankings and reader engagement with more relatable and natural content.",
      color: "bg-purple-500",
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Who Needs AI Humanizer?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Perfect for anyone who wants to create authentic, undetectable content
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
