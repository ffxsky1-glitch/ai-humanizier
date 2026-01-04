import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  const faqs = [
    {
      question: "Who can benefit from Humanize AI Text?",
      answer:
        "AI Humanizer caters to students, marketers, SEO specialists, writers, bloggers, journalists, and researchers. It's ideal for anyone who wants to avoid AI detection issues while using AI-assisted content creation.",
    },
    {
      question: "What file formats are supported?",
      answer:
        "AI Humanizer supports multiple formats including plain text, DOC, DOCX, PDF, Markdown files, and scanned images (PNG, JPG, JPEG). Our OCR technology can extract text from scanned documents and images.",
    },
    {
      question: "Can Humanize AI effectively convert AI to human content?",
      answer:
        "Yes, our AI Humanizer excels at transforming AI-generated text into smooth, human-like content. It effortlessly evades AI detection while ensuring the rewritten text maintains natural flow and coherence.",
    },
    {
      question: "Which AI detectors does it bypass?",
      answer:
        "AI Humanizer is designed to bypass major AI detection platforms including Turnitin, ZeroGPT, GPTZero, Copyleak, Originality.ai, Writer, Sapling, and Quillbot. Our algorithms are regularly updated to stay ahead of detection advancements.",
    },
    {
      question: "How does the AI Humanizer work?",
      answer:
        'Simply paste your AI-generated text or upload a file, click "Humanize AI Text", and our advanced algorithm processes your content using NLP and machine learning to transform it into natural, human-like writing that bypasses AI detection.',
    },
    {
      question: "Is the humanized content SEO-friendly?",
      answer:
        "Yes! Our AI Humanizer maintains keyword relevance while improving readability and engagement, making it perfect for SEO-optimized content that ranks well and resonates with human readers.",
    },
  ]

  return (
    <section id="faq" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">Everything you need to know about AI Humanizer</p>
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
