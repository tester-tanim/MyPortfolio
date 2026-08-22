import { ArrowLeft, ArrowRight, ExternalLink, Github, Linkedin, RotateCw, Shield } from 'lucide-react'
import { contact, projects } from '../../data/portfolio'

type LinkItem = { label: string; url: string; icon: React.ReactNode; note?: string }

export default function Browser() {
  const links: LinkItem[] = [
    { label: 'GitHub Profile', url: contact.github, icon: <Github size={16} /> },
    {
      label: 'LinkedIn Profile',
      url: contact.linkedin,
      icon: <Linkedin size={16} />,
      note: contact.linkedinIsPlaceholder ? 'placeholder URL' : undefined,
    },
    ...projects.map((p) => ({
      label: p.name,
      url: p.github,
      icon: <Github size={16} />,
    })),
  ]

  return (
    <div className="h-full flex flex-col bg-[#15181d]">
      {/* Fake browser chrome */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5 shrink-0">
        <div className="flex gap-1.5 opacity-40">
          <ArrowLeft size={14} />
          <ArrowRight size={14} />
          <RotateCw size={13} />
        </div>
        <div className="flex-1 flex items-center gap-1.5 bg-white/5 rounded-md px-3 py-1.5 text-xs text-gray-400">
          <Shield size={12} className="text-term-green" />
          <span className="truncate">tanim-linux://links/quick-access</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollable p-5">
        <p className="text-xs text-gray-500 mb-4">
          This is a themed launcher, not a real embedded browser — links open in a new tab. Most sites block being
          embedded in an iframe anyway.
        </p>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] hover:border-term-green/30 hover:bg-white/[0.06] px-4 py-3 transition-colors group"
            >
              <span className="text-term-green">{l.icon}</span>
              <span className="flex-1 min-w-0">
                <span className="block text-sm text-gray-200 truncate">{l.label}</span>
                {l.note && <span className="block text-[10px] text-yellow-500/80">{l.note}</span>}
              </span>
              <ExternalLink size={13} className="text-gray-600 group-hover:text-gray-400 shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
