import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import BootScreen from './components/Boot/BootScreen'
import DesktopLoading from './components/Boot/DesktopLoading'
import LoginScreen from './components/Login/LoginScreen'
import TopBar from './components/Taskbar/TopBar'
import Launcher from './components/Taskbar/Launcher'
import Dock from './components/Taskbar/Dock'
import Desktop from './components/Desktop/Desktop'
import MobileHome from './components/Desktop/MobileHome'
import MobileAppView from './components/Desktop/MobileAppView'
import { useWindowManager } from './hooks/useWindowManager'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import type { AppId } from './utils/types'

type Stage = 'boot' | 'login' | 'loading' | 'desktop'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return isMobile
}

export default function App() {
  const [stage, setStage] = useState<Stage>('boot')
  const [launcherOpen, setLauncherOpen] = useState(false)
  const [mobileApp, setMobileApp] = useState<AppId | null>(null)
  const isMobile = useIsMobile()
  const wm = useWindowManager()

  const handleBootComplete = useCallback(() => setStage('login'), [])
  const handleLogin = useCallback(() => setStage('loading'), [])
  const handleDesktopReady = useCallback(() => setStage('desktop'), [])
  const handleLogout = useCallback(() => {
    wm.closeAll()
    setMobileApp(null)
    setLauncherOpen(false)
    setStage('login')
  }, [wm])

  const handleOpenApp = useCallback(
    (id: AppId) => {
      if (isMobile) {
        setMobileApp(id)
      } else {
        wm.openWindow(id)
      }
    },
    [isMobile, wm]
  )

  const handleOpenTerminal = useCallback(() => {
    if (stage !== 'desktop') return
    handleOpenApp('terminal')
  }, [stage, handleOpenApp])

  const handleOpenLauncher = useCallback(() => {
    if (stage !== 'desktop' || isMobile) return
    setLauncherOpen(true)
  }, [stage, isMobile])

  const handleEscape = useCallback(() => {
    if (launcherOpen) {
      setLauncherOpen(false)
      return
    }
    if (isMobile && mobileApp) {
      setMobileApp(null)
      return
    }
    // Close/restore a maximized focused window
    const top = wm.windows.reduce<null | (typeof wm.windows)[number]>((acc, w) => {
      if (w.isMinimized) return acc
      if (!acc || w.zIndex > acc.zIndex) return w
      return acc
    }, null)
    if (top?.isMaximized) {
      wm.toggleMaximize(top.id)
    }
  }, [launcherOpen, isMobile, mobileApp, wm])

  useKeyboardShortcuts({
    onOpenTerminal: handleOpenTerminal,
    onOpenLauncher: handleOpenLauncher,
    onEscape: handleEscape,
  })

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-black">
      <AnimatePresence mode="wait">
        {stage === 'boot' && <BootScreen key="boot" onComplete={handleBootComplete} />}
        {stage === 'login' && <LoginScreen key="login" onLogin={handleLogin} />}
        {stage === 'loading' && <DesktopLoading key="loading" onComplete={handleDesktopReady} />}
      </AnimatePresence>

      {stage === 'desktop' && (
        <>
          <TopBar
            onToggleLauncher={() => (isMobile ? setMobileApp(null) : setLauncherOpen((v) => !v))}
            launcherOpen={launcherOpen}
            onLogout={handleLogout}
          />

          {isMobile ? (
            <>
              {!mobileApp && <MobileHome onOpen={handleOpenApp} />}
              <AnimatePresence>
                {mobileApp && <MobileAppView key={mobileApp} appId={mobileApp} onBack={() => setMobileApp(null)} />}
              </AnimatePresence>
            </>
          ) : (
            <>
              <Desktop wm={wm} isMobile={isMobile} />
              <Launcher open={launcherOpen} onClose={() => setLauncherOpen(false)} onLaunch={handleOpenApp} />
              <Dock windows={wm.windows} onSelect={(id) => wm.focusWindow(id)} />
            </>
          )}
        </>
      )}
    </div>
  )
}
