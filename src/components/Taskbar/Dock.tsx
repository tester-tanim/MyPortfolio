import { desktopIcons } from '../../utils/appRegistry'
import type { WindowState } from '../../utils/types'

type Props = {
  windows: WindowState[]
  onSelect: (id: string) => void
}

export default function Dock({ windows, onSelect }: Props) {
  if (windows.length === 0) return null

  return (
    <div
      className="fixed bottom-2 left-1/2 -translate-x-1/2 z-[9997] flex items-end gap-1.5 glass-panel rounded-2xl px-2.5 py-2 shadow-panel"
      role="toolbar"
      aria-label="Open windows"
    >
      {windows.map((w) => {
        const def = desktopIcons.find((d) => d.id === w.appId)
        return (
          <button
            key={w.id}
            onClick={() => onSelect(w.id)}
            aria-label={`${w.isMinimized ? 'Restore' : 'Focus'} ${w.title}`}
            title={w.title}
            className={`relative flex flex-col items-center justify-center w-11 h-11 rounded-xl transition-colors ${
              w.isMinimized ? 'bg-white/5 text-gray-400' : 'bg-white/10 text-term-green'
            } hover:bg-white/15`}
          >
            {def?.icon ?? <span className="text-xs">{w.title[0]}</span>}
            <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-term-green" />
          </button>
        )
      })}
    </div>
  )
}
