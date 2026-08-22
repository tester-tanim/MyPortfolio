import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { personal } from '../../data/portfolio'
import { runCommand, type CommandOutput } from './commands'

type HistoryEntry = {
  id: number
  command: string
  output: CommandOutput
}

let entryId = 0

const PROMPT = `${personal.username}@${personal.hostname}`

export default function Terminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setHistory([
      {
        id: entryId++,
        command: '',
        output: (
          <div className="text-gray-400">
            Welcome to Tanim Linux terminal. Type <span className="text-term-green">help</span> to get started.
          </div>
        ),
      },
    ])
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [history])

  const focusInput = () => inputRef.current?.focus()

  const execute = (cmd: string) => {
    const result = runCommand(cmd)
    if (!result) return

    if (result.clear) {
      setHistory([])
      return
    }

    setHistory((h) => [...h, { id: entryId++, command: cmd, output: result.output }])
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = input
      if (cmd.trim() !== '') {
        setCmdHistory((h) => [...h, cmd])
      }
      setHistoryIndex(null)
      setInput('')
      execute(cmd)
      return
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdHistory.length === 0) return
      setHistoryIndex((idx) => {
        const newIdx = idx === null ? cmdHistory.length - 1 : Math.max(0, idx - 1)
        setInput(cmdHistory[newIdx] ?? '')
        return newIdx
      })
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (cmdHistory.length === 0) return
      setHistoryIndex((idx) => {
        if (idx === null) return null
        const newIdx = idx + 1
        if (newIdx >= cmdHistory.length) {
          setInput('')
          return null
        }
        setInput(cmdHistory[newIdx] ?? '')
        return newIdx
      })
      return
    }

    // Ctrl+L clears terminal when terminal is focused
    if (e.ctrlKey && (e.key === 'l' || e.key === 'L')) {
      e.preventDefault()
      setHistory([])
      return
    }
  }

  return (
    <div
      ref={containerRef}
      className="h-full w-full bg-[#0b0e12] font-mono-term text-sm p-3 overflow-y-auto scrollable terminal-selectable"
      onClick={focusInput}
    >
      {history.map((entry) => (
        <div key={entry.id} className="mb-2">
          {entry.command !== '' && (
            <div className="flex gap-2 text-gray-200">
              <span className="text-term-green">{PROMPT}</span>
              <span className="text-gray-500">$</span>
              <span>{entry.command}</span>
            </div>
          )}
          {entry.output && <div className="mt-0.5">{entry.output}</div>}
        </div>
      ))}

      <div className="flex gap-2 items-center text-gray-200">
        <span className="text-term-green shrink-0">{PROMPT}</span>
        <span className="text-gray-500 shrink-0">$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          aria-label="Terminal command input"
          className="flex-1 bg-transparent outline-none text-white caret-term-green min-w-0"
        />
      </div>
      <div ref={bottomRef} />
    </div>
  )
}
