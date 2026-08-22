import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type Props = {
  onComplete: () => void
}

export default function DesktopLoading({ onComplete }: Props) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const duration = 1100
    let raf: number
    const tick = () => {
      const elapsed = Date.now() - start
      const pct = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(pct)
      if (pct < 100) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(onComplete, 150)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="fixed inset-0 wallpaper flex flex-col items-center justify-center gap-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-12 h-12 border-2 border-term-green/30 border-t-term-green rounded-full animate-spin"
      />
      <p className="text-term-dim text-sm font-mono-term">Loading desktop… {progress}%</p>
    </div>
  )
}
