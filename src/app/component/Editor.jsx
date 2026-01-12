'use client'

import React, { useEffect, useRef } from 'react'

export default function Editor({ content, onChange, isReadOnly = false }) {
  const ejInstance = useRef(null)

  useEffect(() => {
    let editor

    const initEditor = async () => {
      if (ejInstance.current) return

      const EditorJS = (await import('@editorjs/editorjs')).default
      const Header = (await import('@editorjs/header')).default
      const List = (await import('@editorjs/list')).default

      editor = new EditorJS({
        holder: 'editorjs',
        data: content || {},
        autofocus: true,
        readOnly: isReadOnly,
        placeholder: 'Write your story...',
        tools: {
          header: Header,
          list: List,
        },
        async onChange(api) {
          const data = await api.saver.save()
          onChange?.(data)
        },
      })

      ejInstance.current = editor
    }

    initEditor()

    return () => {
      if (ejInstance.current?.destroy) {
        ejInstance.current.destroy()
        ejInstance.current = null
      }
    }
  },[isReadOnly])

  return (
    <div
      id="editorjs"
      className="min-h-75 w-full rounded-lg border border-gray-300 px-4 py-2 bg-white"
    />
  )
}
