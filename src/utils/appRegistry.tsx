import { lazy } from 'react'
import {
  User, Terminal as TerminalIcon, Folder, Wrench, FileText, Globe, Mail, LayoutDashboard,
  FolderKanban, Briefcase, ShieldCheck, Trash2,
} from 'lucide-react'
import type { AppId } from './types'

// Lazy-loaded app components so the boot screen / first paint stays fast.
export const AppComponents: Record<AppId, React.LazyExoticComponent<React.ComponentType<any>>> = {
  filemanager: lazy(() => import('../components/FileManager/FileManager')),
  about: lazy(() => import('../components/Applications/About')),
  qaengineer: lazy(() => import('../components/Applications/QAEngineer')),
  projects: lazy(() => import('../components/Applications/Projects')),
  skills: lazy(() => import('../components/Applications/Skills')),
  resume: lazy(() => import('../components/Applications/Resume')),
  browser: lazy(() => import('../components/Applications/Browser')),
  terminal: lazy(() => import('../components/Terminal/Terminal')),
  contact: lazy(() => import('../components/Applications/Contact')),
  dashboard: lazy(() => import('../components/Applications/Dashboard')),
  experience: lazy(() => import('../components/Applications/Experience')),
  trash: lazy(() => import('../components/Applications/Trash')),
}

export type DesktopIconDef = {
  id: AppId
  label: string
  icon: React.ReactNode
}

export const desktopIcons: DesktopIconDef[] = [
  { id: 'filemanager', label: 'Home', icon: <Folder size={28} /> },
  { id: 'about', label: 'About Me', icon: <User size={28} /> },
  { id: 'qaengineer', label: 'QA Engineer', icon: <ShieldCheck size={28} /> },
  { id: 'experience', label: 'Experience', icon: <Briefcase size={28} /> },
  { id: 'projects', label: 'Projects', icon: <FolderKanban size={28} /> },
  { id: 'skills', label: 'Skills & Tools', icon: <Wrench size={28} /> },
  { id: 'dashboard', label: 'QA Dashboard', icon: <LayoutDashboard size={28} /> },
  { id: 'resume', label: 'Resume', icon: <FileText size={28} /> },
  { id: 'browser', label: 'Browser', icon: <Globe size={28} /> },
  { id: 'terminal', label: 'Terminal', icon: <TerminalIcon size={28} /> },
  { id: 'contact', label: 'Contact', icon: <Mail size={28} /> },
  { id: 'trash', label: 'Trash', icon: <Trash2 size={28} /> },
]
