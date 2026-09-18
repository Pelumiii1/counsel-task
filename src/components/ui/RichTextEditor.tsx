import React, { useState, useEffect, useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link2,
  RotateCcw,
  RotateCw,
  Check,
  X,
  Unlink,
} from 'lucide-react'

export interface RichTextEditorProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  minHeight?: string
  className?: string
  disabled?: boolean
  rightExtra?: React.ReactNode
}

export function RichTextEditor({
  value = '',
  onChange,
  placeholder = 'Write here...',
  minHeight = '120px',
  className = '',
  disabled = false,
  rightExtra,
}: RichTextEditorProps) {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [linkText, setLinkText] = useState('')
  const [savedRange, setSavedRange] = useState<{ from: number; to: number } | null>(null)
  const linkInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: 'https',
        HTMLAttributes: {
          class: 'text-[#00726D] underline hover:text-[#005c58] cursor-pointer',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: value || '',
    editable: !disabled,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      // If editor is empty paragraph, send empty string
      if (editor.isEmpty) {
        onChange?.('')
      } else {
        onChange?.(html)
      }
    },
    editorProps: {
      attributes: {
        class:
          'w-full p-4 text-xs sm:text-sm text-gray-700 font-normal leading-relaxed focus:outline-none bg-white prose max-w-none prose-p:my-1.5 prose-p:min-h-[1.25rem] prose-ul:my-1.5 prose-ol:my-1.5',
        style: `min-height: ${minHeight};`,
      },
    },
  })

  // Synchronize incoming value changes if different from current editor content
  useEffect(() => {
    if (!editor) return

    // If the user is actively typing in the editor, do not overwrite content
    if (editor.isFocused) return

    const currentHTML = editor.getHTML()
    const incomingVal = value || ''

    // If incoming is empty and editor is already empty, no-op
    if (!incomingVal && editor.isEmpty) return

    // Only set content if genuinely different to avoid cursor reset
    if (incomingVal !== currentHTML && incomingVal !== editor.getText()) {
      editor.commands.setContent(incomingVal)
    }
  }, [value, editor])

  useEffect(() => {
    if (editor) {
      editor.setEditable(!disabled)
    }
  }, [disabled, editor])

  if (!editor) {
    return (
      <div
        className={`border border-gray-200 rounded-xl overflow-hidden bg-white ${className}`}
        style={{ minHeight }}
      />
    )
  }

  const handleOpenLinkModal = () => {
    if (!editor) return

    const { from, to, empty } = editor.state.selection
    setSavedRange({ from, to })

    const existingHref = editor.getAttributes('link').href || ''
    setLinkUrl(existingHref)

    if (empty) {
      setLinkText('')
    } else {
      const selected = editor.state.doc.textBetween(from, to, ' ')
      setLinkText(selected)
    }

    setIsLinkModalOpen(true)
    setTimeout(() => {
      linkInputRef.current?.focus()
      linkInputRef.current?.select()
    }, 50)
  }

  const handleApplyLink = () => {
    if (!editor) return

    const trimmedUrl = linkUrl.trim()
    if (!trimmedUrl) {
      // Empty URL = remove link
      if (savedRange && savedRange.from !== savedRange.to) {
        editor.chain().focus().setTextSelection(savedRange).unsetLink().run()
      } else {
        editor.chain().focus().unsetLink().run()
      }
      setIsLinkModalOpen(false)
      return
    }

    const normalizedUrl = /^https?:\/\//i.test(trimmedUrl) || /^mailto:/i.test(trimmedUrl) || /^tel:/i.test(trimmedUrl)
      ? trimmedUrl
      : `https://${trimmedUrl}`

    if (savedRange && savedRange.from !== savedRange.to) {
      // Apply to existing selected range
      editor
        .chain()
        .focus()
        .setTextSelection(savedRange)
        .extendMarkRange('link')
        .setLink({ href: normalizedUrl })
        .run()
    } else {
      // No text was selected: insert linked text or URL
      const textToDisplay = linkText.trim() || normalizedUrl
      editor
        .chain()
        .focus()
        .insertContent(`<a href="${normalizedUrl}">${textToDisplay}</a> `)
        .run()
    }

    setIsLinkModalOpen(false)
  }

  const handleRemoveLink = () => {
    if (!editor) return
    if (savedRange && savedRange.from !== savedRange.to) {
      editor.chain().focus().setTextSelection(savedRange).unsetLink().run()
    } else {
      editor.chain().focus().unsetLink().run()
    }
    setIsLinkModalOpen(false)
  }

  return (
    <div
      className={`border border-gray-200 rounded-xl overflow-hidden bg-white focus-within:border-[#00726D] focus-within:ring-2 focus-within:ring-[#00726D]/10 transition shadow-2xs ${className}`}
    >
      {/* Toolbar */}
      <div className="p-2.5 bg-[#f9fafb] border-b border-gray-200 flex items-center gap-1 text-gray-600 select-none flex-wrap">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded transition cursor-pointer ${
            editor.isActive('bold')
              ? 'bg-[#00726D]/15 text-[#00726D] font-bold'
              : 'hover:bg-gray-200 text-gray-700'
          }`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded transition cursor-pointer ${
            editor.isActive('italic')
              ? 'bg-[#00726D]/15 text-[#00726D]'
              : 'hover:bg-gray-200 text-gray-700'
          }`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        <span className="w-px h-4 bg-gray-300 mx-1" />

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded transition cursor-pointer ${
            editor.isActive('bulletList')
              ? 'bg-[#00726D]/15 text-[#00726D]'
              : 'hover:bg-gray-200 text-gray-700'
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded transition cursor-pointer ${
            editor.isActive('orderedList')
              ? 'bg-[#00726D]/15 text-[#00726D]'
              : 'hover:bg-gray-200 text-gray-700'
          }`}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <span className="w-px h-4 bg-gray-300 mx-1" />

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleOpenLinkModal}
          className={`p-1.5 rounded transition cursor-pointer ${
            editor.isActive('link') || isLinkModalOpen
              ? 'bg-[#00726D]/15 text-[#00726D]'
              : 'hover:bg-gray-200 text-gray-700'
          }`}
          title={editor.isActive('link') ? 'Edit or remove link' : 'Insert Link'}
        >
          <Link2 className="w-4 h-4" />
        </button>

        <span className="w-px h-4 bg-gray-300 mx-1" />

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-1.5 hover:bg-gray-200 disabled:opacity-40 disabled:hover:bg-transparent rounded text-gray-700 transition cursor-pointer"
          title="Undo"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-1.5 hover:bg-gray-200 disabled:opacity-40 disabled:hover:bg-transparent rounded text-gray-700 transition cursor-pointer"
          title="Redo"
        >
          <RotateCw className="w-4 h-4" />
        </button>

        {rightExtra && (
          <div className="ml-auto flex items-center">{rightExtra}</div>
        )}
      </div>

      {/* Inline Link Toolbar Bar */}
      {isLinkModalOpen && (
        <div className="p-2.5 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center gap-2 text-xs shadow-2xs">
          <div className="flex items-center gap-1.5 flex-1 min-w-[200px]">
            <span className="text-gray-500 font-medium select-none">URL:</span>
            <input
              ref={linkInputRef}
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleApplyLink()
                } else if (e.key === 'Escape') {
                  setIsLinkModalOpen(false)
                }
              }}
              placeholder="https://example.com"
              className="flex-1 h-8 px-2.5 text-xs rounded-lg border border-gray-200 bg-white text-gray-800 focus:border-[#00726D] focus:ring-1 focus:ring-[#00726D]/20 focus:outline-none transition"
            />
          </div>

          {savedRange && savedRange.from === savedRange.to && (
            <div className="flex items-center gap-1.5 min-w-[140px]">
              <span className="text-gray-500 font-medium select-none">Text:</span>
              <input
                type="text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleApplyLink()
                  } else if (e.key === 'Escape') {
                    setIsLinkModalOpen(false)
                  }
                }}
                placeholder="Link text (optional)"
                className="w-32 h-8 px-2.5 text-xs rounded-lg border border-gray-200 bg-white text-gray-800 focus:border-[#00726D] focus:ring-1 focus:ring-[#00726D]/20 focus:outline-none transition"
              />
            </div>
          )}

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleApplyLink}
              className="h-8 px-3 rounded-lg bg-[#00726D] hover:bg-[#005c58] text-white font-medium text-xs transition cursor-pointer flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Apply</span>
            </button>

            {editor.isActive('link') && (
              <button
                type="button"
                onClick={handleRemoveLink}
                className="h-8 px-2.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 font-medium text-xs transition cursor-pointer flex items-center gap-1"
                title="Remove Link"
              >
                <Unlink className="w-3.5 h-3.5" />
                <span>Unlink</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsLinkModalOpen(false)}
              className="h-8 w-8 rounded-lg hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition cursor-pointer flex items-center justify-center"
              title="Cancel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Editor Content Area */}
      <EditorContent editor={editor} />
    </div>
  )
}
