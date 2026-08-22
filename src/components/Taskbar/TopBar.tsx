import { useEffect, useRef, useState } from 'react'
import { Battery, Grid3x3, LogOut, Volume2, Wifi } from 'lucide-react'
import { personal } from '../../data/portfolio'

type Props = {
  onToggleLauncher: () => void
  launcherOpen: boolean
  onLogout: () => void
}

export default function TopBar({ onToggleLauncher, launcherOpen, onLogout }: Props) {
  const [now, setNow] = useState(new Date())
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 30)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const dateStr = now.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
  const timeStr = now.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })

  return (
    <div className="fixed top-0 left-0 right-0 h-9 glass-panel border-b border-white/5 flex items-center justify-between px-3 z-[9999] text-xs text-gray-200 select-none">
      <button
        onClick={onToggleLauncher}
        aria-label="Open application launcher"
        aria-expanded={launcherOpen}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
          launcherOpen ? 'bg-term-green/20 text-term-green' : 'hover:bg-white/10'
        }`}
      >
        <Grid3x3 size={14} />
        <span className="hidden sm:inline">Applications</span>
      </button>

      <div className="font-mono-term text-gray-300 tabular-nums">
        {dateStr} &nbsp; {timeStr}
      </div>

      <div className="flex items-center gap-2">
        <Wifi size={14} className="text-gray-400" aria-label="Network connected" />
        <Volume2 size={14} className="text-gray-400" aria-label="Sound on" />
        <Battery size={14} className="text-gray-400" aria-label="Battery level" />

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setUserMenuOpen((v) => !v)}
            aria-label="User menu"
            aria-expanded={userMenuOpen}
            className="flex items-center gap-1.5 pl-1.5 pr-2 py-0.5 rounded-md hover:bg-white/10 transition-colors"
          >
            <img
              src={`${import.meta.env.BASE_URL}${personal.avatar}`}
              alt=""
              className="w-5 h-5 rounded-full object-cover object-top border border-white/20"
            />
            <span className="hidden sm:inline">{personal.username}</span>
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 top-9 w-44 glass-panel rounded-lg shadow-panel py-1.5 border border-white/10">
              <div className="px-3 py-1.5 text-gray-400 border-b border-white/5 mb-1">
                <p className="text-white text-sm">{personal.name}</p>
                <p className="text-[10px]">{personal.shortRole}</p>
              </div>
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-left hover:bg-white/10 text-gray-200"
              >
                <LogOut size={13} /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
