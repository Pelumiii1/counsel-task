import React from 'react'

export interface RichTextContentProps {
  content?: string | null
  className?: string
  fallback?: React.ReactNode
}

/**
 * Renders rich text safely, supporting both HTML produced by RichTextEditor
 * and legacy plain text with double newlines / spacing.
 */
export function RichTextContent({
  content,
  className = '',
  fallback = null,
}: RichTextContentProps) {
  if (!content || !content.trim()) {
    return <>{fallback}</>
  }

  // Check if string contains HTML tags
  const isHTML = /<\/?[a-z][\s\S]*>/i.test(content)

  if (isHTML) {
    return (
      <div
        className={`rich-text-rendered prose max-w-none text-inherit prose-p:my-2 prose-p:min-h-5 prose-p:leading-relaxed prose-strong:font-semibold prose-strong:text-inherit prose-em:italic prose-ul:my-2 prose-ul:list-disc prose-ul:pl-5 prose-ol:my-2 prose-ol:list-decimal prose-ol:pl-5 prose-li:my-0.5 prose-a:text-[#00726D] prose-a:underline hover:prose-a:text-[#005c58] ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  }

  // Plain text: preserve whitespace, newlines, and double enters
  return (
    <div className={`whitespace-pre-wrap leading-relaxed ${className}`}>
      {content}
    </div>
  )
}
