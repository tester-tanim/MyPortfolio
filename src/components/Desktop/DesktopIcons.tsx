import { desktopIcons } from '../../utils/appRegistry'
import type { AppId } from '../../utils/types'

type Props = {
  onOpen: (id: AppId) => void
}

export default function DesktopIcons({ onOpen }: Props) {
  return (
    <div className="absolute top-14 left-2 sm:left-4 grid grid-cols-2 sm:grid-cols-1 gap-1 sm:gap-2 content-start w-[168px] sm:w-24">
      {desktopIcons.map((app) => (
        <button
          key={app.id}
          onClick={() => onOpen(app.id)}
          aria-label={`Open ${app.label}`}
          className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 focus-visible:bg-white/10 text-white/90 transition-colors w-full"
        >
          <span className="text-term-green drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">{app.icon}</span>
          <span className="text-[11px] text-center leading-tight text-shadow-glow drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            {app.label}
          </span>
        </button>
      ))}
    </div>
  )
}
