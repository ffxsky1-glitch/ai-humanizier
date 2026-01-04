import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Rachel Anderson",
      role: "Student",
      content:
        "The AI Humanizer is perfect for helping me humanize ChatGPT text while keeping my personal writing style. It's become an essential part of my academic toolkit.",
      rating: 5,
    },
    {
      name: "James Brown",
      role: "SEO Expert",
      content:
        "The Humanize AI Text tool is essential for my content strategy. It transforms AI-generated drafts into engaging, natural content that resonates with our audience.",
      rating: 5,
    },
    {
      name: "Anna Taylor",
      role: "Writer",
      content:
        "Converting AI to human text used to be a headache until I found this tool. Now my writing flows naturally, and my readers can't tell the difference!",
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">User Reviews of AI Humanizer</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our users have to say about their experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
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
