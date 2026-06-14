interface JsonLdProps {
  data: Record<string, any>
  id: string
}

// Script nativo (no next/script): queda en el HTML estático servido, visible
// para crawlers que no ejecutan JS (GPTBot, PerplexityBot...). Ver D15 en DECISIONS.md.
export default function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
