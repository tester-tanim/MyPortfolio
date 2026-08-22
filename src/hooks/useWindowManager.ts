import { useCallback, useRef, useState } from 'react'
import type { AppId, WindowState } from '../utils/types'

let idCounter = 0
const nextId = () => `win-${Date.now()}-${idCounter++}`

const DEFAULT_SIZE: Record<AppId, { width: number; height: number }> = {
  filemanager: { width: 720, height: 480 },
  about: { width: 560, height: 480 },
  qaengineer: { width: 640, height: 540 },
  projects: { width: 800, height: 560 },
  skills: { width: 640, height: 520 },
  resume: { width: 760, height: 620 },
  browser: { width: 820, height: 560 },
  terminal: { width: 700, height: 440 },
  contact: { width: 560, height: 480 },
  dashboard: { width: 860, height: 620 },
  experience: { width: 700, height: 560 },
  trash: { width: 420, height: 320 },
}

const APP_TITLES: Record<AppId, string> = {
  filemanager: 'Home',
  about: 'About Me',
  qaengineer: 'QA Engineer',
  projects: 'Projects',
  skills: 'Skills & Tools',
  resume: 'Resume',
  browser: 'Browser',
  terminal: 'Terminal',
  contact: 'Contact',
  dashboard: 'QA Dashboard',
  experience: 'Experience',
  trash: 'Trash',
}

let cascadeOffset = 0

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([])
  const zCounter = useRef(10)

  const focusWindow = useCallback((id: string) => {
    zCounter.current += 1
    const z = zCounter.current
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, zIndex: z, isMinimized: false } : w)))
  }, [])

  const openWindow = useCallback((appId: AppId, titleOverride?: string) => {
    setWindows((ws) => {
      // If an instance of this app already exists (single-instance apps), focus it instead.
      const existing = ws.find((w) => w.appId === appId)
      if (existing) {
        zCounter.current += 1
        return ws.map((w) =>
          w.id === existing.id ? { ...w, isMinimized: false, zIndex: zCounter.current } : w
        )
      }

      const size = DEFAULT_SIZE[appId]
      const isMobile = window.innerWidth < 768
      cascadeOffset = (cascadeOffset + 1) % 6
      const baseX = isMobile ? 0 : Math.min(80 + cascadeOffset * 28, window.innerWidth - size.width - 20)
      const baseY = isMobile ? 0 : Math.min(60 + cascadeOffset * 24, window.innerHeight - size.height - 100)

      zCounter.current += 1
      const win: WindowState = {
        id: nextId(),
        appId,
        title: titleOverride ?? APP_TITLES[appId],
        isMinimized: false,
        isMaximized: isMobile,
        x: Math.max(baseX, 0),
        y: Math.max(baseY, 0),
        width: isMobile ? window.innerWidth : size.width,
        height: isMobile ? window.innerHeight : size.height,
        zIndex: zCounter.current,
      }
      return [...ws, win]
    })
  }, [])

  const closeWindow = useCallback((id: string) => {
    setWindows((ws) => ws.filter((w) => w.id !== id))
  }, [])

  const minimizeWindow = useCallback((id: string) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)))
  }, [])

  const toggleMaximize = useCallback((id: string) => {
    setWindows((ws) =>
      ws.map((w) => {
        if (w.id !== id) return w
        if (w.isMaximized) {
          const prev = w.prevBounds ?? { x: 100, y: 80, width: 700, height: 500 }
          return { ...w, isMaximized: false, ...prev }
        } else {
          return {
            ...w,
            isMaximized: true,
            prevBounds: { x: w.x, y: w.y, width: w.width, height: w.height },
          }
        }
      })
    )
  }, [])

  const updateWindowPosition = useCallback((id: string, x: number, y: number) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, x, y } : w)))
  }, [])

  const updateWindowSize = useCallback(
    (id: string, width: number, height: number, x?: number, y?: number) => {
      setWindows((ws) =>
        ws.map((w) =>
          w.id === id
            ? { ...w, width, height, x: x ?? w.x, y: y ?? w.y }
            : w
        )
      )
    },
    []
  )

  const closeAll = useCallback(() => setWindows([]), [])

  return {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    closeAll,
  }
}

export type WindowManager = ReturnType<typeof useWindowManager>
