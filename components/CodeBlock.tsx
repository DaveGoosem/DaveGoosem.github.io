'use client'

import { ComponentPropsWithoutRef, useRef, useState } from 'react'

const LANGUAGE_LABELS: Record<string, string> = {
  js: 'JavaScript',
  jsx: 'JSX',
  ts: 'TypeScript',
  tsx: 'TSX',
  json: 'JSON',
  bash: 'Bash',
  shell: 'Shell',
  sh: 'Shell',
  powershell: 'PowerShell',
  ps1: 'PowerShell',
  xml: 'XML',
  html: 'HTML',
  css: 'CSS',
  csharp: 'C#',
  cs: 'C#',
  yaml: 'YAML',
  yml: 'YAML',
  graphql: 'GraphQL',
  sql: 'SQL',
  md: 'Markdown',
  mdx: 'MDX',
}

/** Code block with an always-visible copy button (works on touch) and a language label. */
export default function CodeBlock({
  children,
  className,
  ...rest
}: ComponentPropsWithoutRef<'pre'>) {
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)
  const lang = /language-([\w-]+)/.exec(className ?? '')?.[1]
  const label =
    lang && !['text', 'plaintext', 'txt'].includes(lang)
      ? (LANGUAGE_LABELS[lang] ?? lang)
      : undefined

  const onCopy = async () => {
    const text = preRef.current?.textContent ?? ''
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard can be unavailable (e.g. insecure context); fail quietly.
    }
  }

  return (
    <div className="group/code relative">
      <div className="absolute right-2 top-2 z-10 flex items-center gap-2">
        {label && (
          <span className="hidden select-none font-mono text-[11px] font-medium uppercase tracking-wider text-gray-500 sm:inline">
            {label}
          </span>
        )}
        <button
          type="button"
          onClick={onCopy}
          aria-label={copied ? 'Copied' : 'Copy code'}
          className={`rounded-md border px-2 py-1 text-xs font-medium backdrop-blur transition ${
            copied
              ? 'border-green-500/50 bg-green-500/10 text-green-400'
              : 'border-gray-600/60 bg-gray-800/80 text-gray-300 hover:border-gray-400 hover:text-white'
          }`}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre ref={preRef} className={className} {...rest}>
        {children}
      </pre>
    </div>
  )
}
