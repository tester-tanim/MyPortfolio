import { useState } from 'react'
import {
  User, Briefcase, FolderKanban, Wrench, FileText, CheckSquare, Bug, Plug, Gauge, Bot, Folder,
} from 'lucide-react'
import { fileSystem, experience, skillCategories, projects, personal } from '../../data/portfolio'

const iconMap: Record<string, React.ReactNode> = {
  user: <User size={16} />,
  briefcase: <Briefcase size={16} />,
  'folder-kanban': <FolderKanban size={16} />,
  wrench: <Wrench size={16} />,
  'file-text': <FileText size={16} />,
  'check-square': <CheckSquare size={16} />,
  bug: <Bug size={16} />,
  plug: <Plug size={16} />,
  gauge: <Gauge size={16} />,
  bot: <Bot size={16} />,
}

function FolderContent({ name }: { name: string }) {
  switch (name) {
    case 'About':
      return (
        <div className="text-sm text-gray-300 space-y-2">
          <p className="text-white font-medium">{personal.name}</p>
          <p className="text-term-green text-xs">{personal.role}</p>
          <p>{personal.tagline}</p>
        </div>
      )
    case 'Experience':
      return (
        <div className="space-y-3">
          {experience.map((e) => (
            <div key={e.id} className="text-sm">
              <p className="text-white font-medium">
                {e.title} <span className="text-gray-500 font-normal text-xs">— {e.date}</span>
              </p>
              <p className="text-gray-400 text-xs">{e.organization}</p>
            </div>
          ))}
        </div>
      )
    case 'Projects':
      return (
        <div className="space-y-2">
          {projects.map((p) => (
            <div key={p.id} className="text-sm">
              <p className="text-white font-medium">{p.name}</p>
              <p className="text-gray-400 text-xs">{p.description}</p>
            </div>
          ))}
        </div>
      )
    case 'Skills':
      return (
        <div className="space-y-2">
          {skillCategories.map((sc) => (
            <p key={sc.category} className="text-sm text-gray-300">
              <span className="text-term-green">{sc.category}:</span> {sc.items.join(', ')}
            </p>
          ))}
        </div>
      )
    case 'Resume':
      return (
        <a
          href={`${import.meta.env.BASE_URL}${personal.resumeFile}`}
          download={personal.resumeDownloadName}
          className="text-sm text-term-green underline"
        >
          resume.pdf — click to download
        </a>
      )
    case 'Test-Cases':
      return (
        <p className="text-sm text-gray-300">
          Structured manual test cases — see{' '}
          <span className="text-white">{projects.find((p) => p.category === 'Test Cases & Bug Reports')?.name}</span>.
        </p>
      )
    case 'Bug-Reports':
      return <p className="text-sm text-gray-300">Severity-classified defect reports filed in Jira across QA cycles.</p>
    case 'API-Testing':
      return (
        <p className="text-sm text-gray-300">
          {projects.find((p) => p.category === 'API Testing')?.description}
        </p>
      )
    case 'Performance-Testing':
      return (
        <p className="text-sm text-gray-300">
          {projects.find((p) => p.category === 'Performance Testing')?.description}
        </p>
      )
    case 'Automation':
      return (
        <p className="text-sm text-gray-300">
          {projects.find((p) => p.category === 'Web Automation')?.description}
        </p>
      )
    default:
      return <p className="text-sm text-gray-500">Empty.</p>
  }
}

export default function FileManager() {
  const [selected, setSelected] = useState<string | null>(null)
  const active = fileSystem.folders.find((f) => f.name === selected)

  return (
    <div className="h-full flex">
      {/* Sidebar tree */}
      <div className="w-44 sm:w-52 border-r border-white/5 shrink-0 overflow-y-auto scrollable p-2">
        <p className="text-[11px] text-gray-500 px-2 py-1.5 font-mono-term truncate">{fileSystem.root}</p>
        {fileSystem.folders.map((f) => (
          <button
            key={f.name}
            onClick={() => setSelected(f.name)}
            className={`w-full flex items-center gap-2 text-left px-2 py-1.5 rounded-md text-sm transition-colors ${
              selected === f.name ? 'bg-term-green/15 text-term-green' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <span className="shrink-0">{iconMap[f.icon] ?? <Folder size={16} />}</span>
            <span className="truncate">{f.name}</span>
          </button>
        ))}
      </div>

      {/* Content panel */}
      <div className="flex-1 overflow-y-auto scrollable p-5">
        {active ? (
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">{active.name}</h3>
            <p className="text-xs text-gray-500 mb-4">{active.description}</p>
            <FolderContent name={active.name} />
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 text-sm gap-2">
            <Folder size={32} className="opacity-40" />
            Select a folder to view its contents
          </div>
        )}
      </div>
    </div>
  )
}
