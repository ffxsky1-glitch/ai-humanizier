export function DetectorLogos() {
  const detectors = ["Turnitin", "GPTZero", "Copyleak", "ZeroGPT", "Quillbot", "Writer", "Sapling", "Originality.ai"]

  return (
    <section className="py-12 border-y border-border bg-muted/30">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-sm font-medium text-muted-foreground mb-8">
          AI Humanizer bypasses these AI detectors
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-items-center">
          {detectors.map((detector) => (
            <div
              key={detector}
              className="text-center px-4 py-3 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <span className="text-sm font-medium text-foreground">{detector}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
