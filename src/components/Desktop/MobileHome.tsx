import { desktopIcons } from '../../utils/appRegistry'
import type { AppId } from '../../utils/types'

type Props = {
  onOpen: (id: AppId) => void
}

export default function MobileHome({ onOpen }: Props) {
  return (
    <div className="absolute inset-0 wallpaper pt-14 px-4 overflow-y-auto scrollable">
      <div className="grid grid-cols-3 gap-3 pb-8">
        {desktopIcons.map((app) => (
          <button
            key={app.id}
            onClick={() => onOpen(app.id)}
            aria-label={`Open ${app.label}`}
            className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 active:bg-white/10 text-white/90 min-h-[84px] justify-center"
          >
            <span className="text-term-green">{app.icon}</span>
            <span className="text-[11px] text-center leading-tight">{app.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
