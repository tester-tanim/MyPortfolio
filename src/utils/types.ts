export type AppId =
  | 'filemanager'
  | 'about'
  | 'qaengineer'
  | 'projects'
  | 'skills'
  | 'resume'
  | 'browser'
  | 'terminal'
  | 'contact'
  | 'dashboard'
  | 'experience'
  | 'trash'

export type WindowState = {
  id: string
  appId: AppId
  title: string
  isMinimized: boolean
  isMaximized: boolean
  x: number
  y: number
  width: number
  height: number
  zIndex: number
  prevBounds?: { x: number; y: number; width: number; height: number }
}
