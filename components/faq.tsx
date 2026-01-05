import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  const faqs = [
    {
      question: "Who should use Rewritify?",
      answer:
        "Rewritify is for students, professionals, marketers, and creators who want an AI rewriter that is fast, private, and easy to use.",
    },
    {
      question: "What file formats does Rewritify support?",
      answer:
        "Rewritify supports plain text and Markdown files. Upload .txt or .md files for the best AI humanizer results.",
    },
    {
      question: "Can Rewritify reduce AI detection risk?",
      answer:
        "Rewritify is designed to reduce AI detection flags by improving flow, sentence variety, and natural phrasing.",
    },
    {
      question: "Which AI detectors does it bypass?",
      answer:
        "Rewritify is built to lower detection risk on tools like Turnitin, GPTZero, and Copyleak while preserving meaning. Results vary by input and detector updates.",
    },
    {
      question: "How does Rewritify work?",
      answer:
        'Paste your text, click "Rewrite Now", and Rewritify rephrases it into cleaner, human-sounding writing.',
    },
    {
      question: "Is Rewritify output SEO-friendly?",
      answer:
        "Yes. Rewritify keeps keywords while improving readability so content performs better in search.",
    },
    {
      question: "Is Rewritify free and no-login?",
      answer:
        "Yes. Rewritify offers core features for free without requiring an account, and paid models are optional.",
    },
  ]

  return (
    <section id="faq" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">Everything you need to know about Rewritify</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
