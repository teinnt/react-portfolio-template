import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { CodeComponent } from 'react-markdown/lib/ast-to-react'

interface CodeBlockProps {
  node?: any
  inline?: boolean
  className?: string
  children?: React.ReactNode
}

const CodeBlock: { code: CodeComponent } = {
  code({ node, inline, className, children, ...props }: CodeBlockProps) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <SyntaxHighlighter
        style={dracula}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },
}

interface ContentSectionProps {
  content: string
}

const ContentSection: React.FC<ContentSectionProps> = ({ content }) => {
  return (
    <ReactMarkdown components={CodeBlock} className="markdown-class">
      {content}
    </ReactMarkdown>
  )
}

export default ContentSection
