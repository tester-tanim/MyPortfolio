import { Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import DesktopIcons from './DesktopIcons'
import Window from '../Window/Window'
import { AppComponents } from '../../utils/appRegistry'
import type { WindowManager } from '../../hooks/useWindowManager'
import type { AppId } from '../../utils/types'

type Props = {
  wm: WindowManager
  isMobile: boolean
}

function AppFallback() {
  return (
    <div className="h-full flex items-center justify-center text-term-dim text-sm font-mono-term">
      Loading…
    </div>
  )
}

export default function Desktop({ wm, isMobile }: Props) {
  const { windows, focusWindow, closeWindow, minimizeWindow, toggleMaximize, updateWindowPosition, updateWindowSize, openWindow } =
    wm

  const handleOpen = (id: AppId) => openWindow(id)

  const topZ = windows.reduce((max, w) => Math.max(max, w.zIndex), 0)

  return (
    <div className="absolute inset-0 wallpaper overflow-hidden">
      <DesktopIcons onOpen={handleOpen} />

      <AnimatePresence>
        {windows
          .filter((w) => !w.isMinimized)
          .map((w) => {
            const Comp = AppComponents[w.appId]
            return (
              <Window
                key={w.id}
                win={w}
                isFocused={w.zIndex === topZ}
                isMobile={isMobile}
                onClose={() => closeWindow(w.id)}
                onMinimize={() => minimizeWindow(w.id)}
                onToggleMaximize={() => toggleMaximize(w.id)}
                onFocus={() => focusWindow(w.id)}
                onMove={(x, y) => updateWindowPosition(w.id, x, y)}
                onResize={(width, height, x, y) => updateWindowSize(w.id, width, height, x, y)}
              >
                <Suspense fallback={<AppFallback />}>
                  <Comp />
                </Suspense>
              </Window>
            )
          })}
      </AnimatePresence>
    </div>
  )
}
