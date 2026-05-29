'use client'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Props {
  content: string
}

export default function MarkdownContent({ content }: Props) {
  return (
    <div className="prose prose-lg prose-vidaia max-w-none
      [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-6
      [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-6
      [&_li]:my-2 [&_li]:pl-2 [&_li::marker]:text-vidaia-primary
      prose-h2:text-4xl prose-h2:font-bold prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-vidaia-light
      prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-10 prose-h3:mb-4
      prose-p:mb-6 prose-p:leading-relaxed prose-p:text-base [&_p+p]:mt-6">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
