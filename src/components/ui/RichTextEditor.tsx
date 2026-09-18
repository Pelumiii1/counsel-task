import React, { useEffect } from 'react'
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
        openOnClick: false,
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
          'w-full p-4 text-xs sm:text-sm text-gray-700 font-normal leading-relaxed focus:outline-none bg-white prose max-w-none prose-p:my-1 prose-p:min-h-[1.25rem] prose-ul:my-1 prose-ol:my-1',
        style: `min-height: ${minHeight};`,
      },
    },
  })

  // Synchronize incoming value changes if different from current editor content
  useEffect(() => {
    if (!editor) return

    const currentHTML = editor.getHTML()
    const incomingVal = value || ''

    // If incoming is empty and editor is already empty, no-op
    if (!incomingVal && editor.isEmpty) return

    // Only set content if it's genuinely different to avoid cursor reset
    if (incomingVal !== currentHTML) {
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

  const handleToggleLink = () => {
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run()
      return
    }
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('Enter URL:', previousUrl || 'https://')
    if (url === null) return
    if (url.trim() === '') {
      editor.chain().focus().unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url.trim() }).run()
  }

  return (
    <div
      className={`border border-gray-200 rounded-xl overflow-hidden bg-white focus-within:border-[#00726D] focus-within:ring-2 focus-within:ring-[#00726D]/10 transition shadow-2xs ${className}`}
    >
      {/* Toolbar */}
      <div className="p-2.5 bg-[#f9fafb] border-b border-gray-200 flex items-center gap-1 text-gray-600 select-none flex-wrap">
        <button
          type="button"
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
          onClick={handleToggleLink}
          className={`p-1.5 rounded transition cursor-pointer ${
            editor.isActive('link')
              ? 'bg-[#00726D]/15 text-[#00726D]'
              : 'hover:bg-gray-200 text-gray-700'
          }`}
          title={editor.isActive('link') ? 'Remove Link' : 'Insert Link'}
        >
          <Link2 className="w-4 h-4" />
        </button>

        <span className="w-px h-4 bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-1.5 hover:bg-gray-200 disabled:opacity-40 disabled:hover:bg-transparent rounded text-gray-700 transition cursor-pointer"
          title="Undo"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          type="button"
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

      {/* Editor Content Area */}
      <EditorContent editor={editor} />
    </div>
  )
}
