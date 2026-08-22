import { motion, AnimatePresence } from 'framer-motion'
import { desktopIcons } from '../../utils/appRegistry'
import type { AppId } from '../../utils/types'

type Props = {
  open: boolean
  onClose: () => void
  onLaunch: (id: AppId) => void
}

export default function Launcher({ open, onClose, onLaunch }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <div className="fixed inset-0 z-[9998]" onClick={onClose} aria-hidden="true" />
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="fixed top-11 left-3 z-[9999] glass-panel rounded-xl shadow-panel p-3 w-[300px]"
            role="menu"
            aria-label="Application launcher"
          >
            <p className="text-xs text-gray-500 px-1 mb-2 font-mono-term">Applications</p>
            <div className="grid grid-cols-3 gap-1.5">
              {desktopIcons.map((app) => (
                <button
                  key={app.id}
                  role="menuitem"
                  onClick={() => {
                    onLaunch(app.id)
                    onClose()
                  }}
                  className="flex flex-col items-center gap-1.5 p-2.5 rounded-lg hover:bg-white/10 text-gray-200 transition-colors"
                >
                  <span className="text-term-green">{app.icon}</span>
                  <span className="text-[10px] text-center leading-tight">{app.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
