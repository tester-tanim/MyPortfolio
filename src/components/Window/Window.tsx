import { useCallback, useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Minus, Square, X, Copy } from 'lucide-react'
import type { WindowState } from '../../utils/types'

type Props = {
  win: WindowState
  isFocused: boolean
  isMobile: boolean
  onClose: () => void
  onMinimize: () => void
  onToggleMaximize: () => void
  onFocus: () => void
  onMove: (x: number, y: number) => void
  onResize: (width: number, height: number, x?: number, y?: number) => void
  children: ReactNode
}

const MIN_W = 320
const MIN_H = 220
const TOPBAR_H = 36

export default function Window({
  win,
  isFocused,
  isMobile,
  onClose,
  onMinimize,
  onToggleMaximize,
  onFocus,
  onMove,
  onResize,
  children,
}: Props) {
  const dragRef = useRef<{ startX: number; startY: number; winX: number; winY: number } | null>(null)
  const resizeRef = useRef<{
    startX: number
    startY: number
    width: number
    height: number
    x: number
    y: number
    dir: string
  } | null>(null)
  const [isInteracting, setIsInteracting] = useState(false)

  const handleTitleBarPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (win.isMaximized || isMobile) return
      onFocus()
      const target = e.target as HTMLElement
      if (target.closest('button')) return
      dragRef.current = { startX: e.clientX, startY: e.clientY, winX: win.x, winY: win.y }
      setIsInteracting(true)
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    },
    [win.isMaximized, win.x, win.y, isMobile, onFocus]
  )

  const handleTitleBarPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current) return
      const dx = e.clientX - dragRef.current.startX
      const dy = e.clientY - dragRef.current.startY
      const newX = Math.max(0, Math.min(dragRef.current.winX + dx, window.innerWidth - 80))
      const newY = Math.max(0, Math.min(dragRef.current.winY + dy, window.innerHeight - 40))
      onMove(newX, newY)
    },
    [onMove]
  )

  const endDrag = useCallback(() => {
    dragRef.current = null
    setIsInteracting(false)
  }, [])

  const handleResizePointerDown = useCallback(
    (dir: string) => (e: React.PointerEvent) => {
      if (win.isMaximized) return
      e.stopPropagation()
      onFocus()
      resizeRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        width: win.width,
        height: win.height,
        x: win.x,
        y: win.y,
        dir,
      }
      setIsInteracting(true)
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    },
    [win.isMaximized, win.width, win.height, win.x, win.y, onFocus]
  )

  const handleResizePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!resizeRef.current) return
      const { startX, startY, width, height, x, y, dir } = resizeRef.current
      const dx = e.clientX - startX
      const dy = e.clientY - startY

      let newW = width
      let newH = height
      let newX = x
      let newY = y

      if (dir.includes('e')) newW = Math.max(MIN_W, width + dx)
      if (dir.includes('s')) newH = Math.max(MIN_H, height + dy)
      if (dir.includes('w')) {
        newW = Math.max(MIN_W, width - dx)
        newX = x + (width - newW)
      }
      if (dir.includes('n')) {
        newH = Math.max(MIN_H, height - dy)
        newY = y + (height - newH)
      }

      onResize(newW, newH, newX, newY)
    },
    [onResize]
  )

  const endResize = useCallback(() => {
    resizeRef.current = null
    setIsInteracting(false)
  }, [])

  const style = win.isMaximized || isMobile
    ? { left: 0, top: TOPBAR_H, width: '100%', height: `calc(100% - ${TOPBAR_H}px)` }
    : { left: win.x, top: win.y, width: win.width, height: win.height }

  const resizeHandles = win.isMaximized || isMobile
    ? []
    : [
        { dir: 'n', cls: 'top-0 left-2 right-2 h-1 cursor-ns-resize' },
        { dir: 's', cls: 'bottom-0 left-2 right-2 h-1 cursor-ns-resize' },
        { dir: 'e', cls: 'right-0 top-2 bottom-2 w-1 cursor-ew-resize' },
        { dir: 'w', cls: 'left-0 top-2 bottom-2 w-1 cursor-ew-resize' },
        { dir: 'ne', cls: 'top-0 right-0 w-3 h-3 cursor-nesw-resize' },
        { dir: 'nw', cls: 'top-0 left-0 w-3 h-3 cursor-nwse-resize' },
        { dir: 'se', cls: 'bottom-0 right-0 w-3 h-3 cursor-nwse-resize' },
        { dir: 'sw', cls: 'bottom-0 left-0 w-3 h-3 cursor-nesw-resize' },
      ]

  return (
    <motion.div
      role="dialog"
      aria-label={win.title}
      initial={{ opacity: 0, scale: 0.94, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 8 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className={`absolute flex flex-col rounded-lg overflow-hidden glass-panel shadow-window ${
        isFocused ? 'ring-1 ring-term-green/40' : 'ring-1 ring-white/5'
      } ${isInteracting ? 'select-none' : ''}`}
      style={{ ...style, zIndex: win.zIndex, transition: isInteracting ? 'none' : 'left .15s, top .15s, width .15s, height .15s' }}
      onPointerDown={onFocus}
      onMouseDown={onFocus}
    >
      {/* Title bar */}
      <div
        className={`flex items-center justify-between h-10 px-3 shrink-0 ${
          isFocused ? 'bg-white/[0.06]' : 'bg-white/[0.02]'
        } border-b border-white/5 cursor-default touch-none`}
        onPointerDown={handleTitleBarPointerDown}
        onPointerMove={handleTitleBarPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={() => !isMobile && onToggleMaximize()}
      >
        <span className="text-sm font-medium text-gray-200 truncate select-none">{win.title}</span>
        <div className="flex items-center gap-1.5">
          <button
            aria-label="Minimize window"
            onClick={onMinimize}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/10 text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <Minus size={14} />
          </button>
          {!isMobile && (
            <button
              aria-label={win.isMaximized ? 'Restore window' : 'Maximize window'}
              onClick={onToggleMaximize}
              className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/10 text-gray-400 hover:text-green-400 transition-colors"
            >
              {win.isMaximized ? <Copy size={12} /> : <Square size={11} />}
            </button>
          )}
          <button
            aria-label="Close window"
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-red-500/80 text-gray-400 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-hidden bg-[#0d1117]/70">{children}</div>

      {/* Resize handles */}
      {resizeHandles.map((h) => (
        <div
          key={h.dir}
          className={`absolute z-10 ${h.cls}`}
          onPointerDown={handleResizePointerDown(h.dir)}
          onPointerMove={handleResizePointerMove}
          onPointerUp={endResize}
          onPointerCancel={endResize}
        />
      ))}
    </motion.div>
  )
}
