import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { AppComponents } from '../../utils/appRegistry'
import { desktopIcons } from '../../utils/appRegistry'
import type { AppId } from '../../utils/types'

type Props = {
  appId: AppId
  onBack: () => void
}

export default function MobileAppView({ appId, onBack }: Props) {
  const Comp = AppComponents[appId]
  const def = desktopIcons.find((d) => d.id === appId)

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9990] bg-[#0d1117] flex flex-col pt-9"
    >
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-white/10 glass-panel shrink-0">
        <button
          onClick={onBack}
          aria-label="Back to desktop"
          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/10 text-gray-200"
        >
          <ArrowLeft size={18} />
        </button>
        <span className="text-term-green">{def?.icon}</span>
        <h2 className="text-sm font-medium text-white">{def?.label}</h2>
      </div>
      <div className="flex-1 min-h-0">
        <Suspense
          fallback={
            <div className="h-full flex items-center justify-center text-term-dim text-sm font-mono-term">
              Loading…
            </div>
          }
        >
          <Comp />
        </Suspense>
      </div>
    </motion.div>
  )
}
