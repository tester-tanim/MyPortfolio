import { useEffect, useRef, useState } from 'react'
import { bootSequence } from '../../data/portfolio'

type Props = {
  onComplete: () => void
}

export default function BootScreen({ onComplete }: Props) {
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const doneRef = useRef(false)

  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    onComplete()
  }

  useEffect(() => {
    if (visibleLines >= bootSequence.length) {
      const t = setTimeout(finish, 500)
      return () => clearTimeout(t)
    }
    const delay = visibleLines === 0 ? 200 : 220 + Math.random() * 180
    const t = setTimeout(() => setVisibleLines((v) => v + 1), delay)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleLines])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') finish()
    }
    const handleClick = () => finish()
    window.addEventListener('keydown', handleKey)
    window.addEventListener('click', handleClick)
    return () => {
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div
      className="fixed inset-0 bg-black text-term-green font-mono-term flex flex-col justify-center px-6 md:px-16 cursor-pointer"
      role="status"
      aria-live="polite"
    >
      <div className="max-w-2xl mx-auto w-full">
        {bootSequence.slice(0, visibleLines).map((line, i) => (
          <p key={i} className="text-sm md:text-base leading-relaxed">
            {line.startsWith('[ OK ]') ? (
              <>
                <span className="text-term-green">[ OK ]</span>
                <span className="text-gray-300">{line.slice(6)}</span>
              </>
            ) : (
              <span className="text-white font-semibold">{line}</span>
            )}
          </p>
        ))}
        {visibleLines < bootSequence.length && <span className="inline-block w-2 h-4 bg-term-green animate-blink" />}
      </div>
      <p className="absolute bottom-6 left-0 right-0 text-center text-xs text-gray-600 font-mono-term">
        Press any key or click to skip
      </p>
    </div>
  )
}
