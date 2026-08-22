import { useEffect } from 'react'

type ShortcutHandlers = {
  onOpenTerminal?: () => void
  onOpenLauncher?: () => void
  onEscape?: () => void
}

/**
 * Global keyboard shortcuts, applied additively and narrowly:
 * - Ctrl+Alt+T: open/focus terminal (not a common browser shortcut, safe to capture)
 * - Meta (Super/Windows key): opens app launcher — additive only, never preventDefault
 *   so OS-level Super behavior is not interfered with.
 * - Escape: close active modal/maximized dialog
 *
 * Deliberately does NOT intercept Ctrl+C/V/A, F5, Ctrl+R, or any other
 * browser-critical combination.
 */
export function useKeyboardShortcuts({ onOpenTerminal, onOpenLauncher, onEscape }: ShortcutHandlers) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ctrl+Alt+T -> open terminal
      if (e.ctrlKey && e.altKey && (e.key === 't' || e.key === 'T')) {
        e.preventDefault()
        onOpenTerminal?.()
        return
      }

      // Super/Meta key -> open launcher (additive, no preventDefault)
      if (e.key === 'Meta') {
        onOpenLauncher?.()
        return
      }

      // Escape -> close active modal
      if (e.key === 'Escape') {
        onEscape?.()
        return
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onOpenTerminal, onOpenLauncher, onEscape])
}
