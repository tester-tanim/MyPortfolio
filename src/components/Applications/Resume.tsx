import { useState } from 'react'
import { Download, FileText, LayoutList } from 'lucide-react'
import { personal, bio, experience, skillCategories, projects, contact } from '../../data/portfolio'

export default function Resume() {
  const [view, setView] = useState<'pdf' | 'text'>('pdf')
  const resumeUrl = `${import.meta.env.BASE_URL}${personal.resumeFile}`

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between gap-2 p-3 border-b border-white/5 shrink-0 flex-wrap">
        <div className="flex gap-1.5">
          <button
            onClick={() => setView('pdf')}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md transition-colors ${
              view === 'pdf' ? 'bg-term-green/15 text-term-green' : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <FileText size={13} /> PDF View
          </button>
          <button
            onClick={() => setView('text')}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md transition-colors ${
              view === 'text' ? 'bg-term-green/15 text-term-green' : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <LayoutList size={13} /> Text Summary
          </button>
        </div>
        <a
          href={resumeUrl}
          download={personal.resumeDownloadName}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-term-green/90 hover:bg-term-green text-black font-medium transition-colors"
        >
          <Download size={13} /> Download Resume
        </a>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto scrollable">
        {view === 'pdf' ? (
          <object data={resumeUrl} type="application/pdf" className="w-full h-full" aria-label="Resume PDF preview">
            <div className="p-6 text-sm text-gray-400">
              PDF preview isn't supported on this device.{' '}
              <a href={resumeUrl} download={personal.resumeDownloadName} className="text-term-green underline">
                Download the resume
              </a>{' '}
              or switch to Text Summary.
            </div>
          </object>
        ) : (
          <div className="p-6 text-gray-200 text-sm space-y-5 max-w-2xl">
            <div>
              <h2 className="text-lg font-semibold text-white">{personal.name}</h2>
              <p className="text-term-green text-xs font-mono-term">{personal.role}</p>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Profile</h3>
              <p className="text-gray-300 leading-relaxed">{bio.paragraphs[0]}</p>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Experience</h3>
              <div className="space-y-2">
                {experience.filter((e) => e.type === 'work').map((e) => (
                  <div key={e.id}>
                    <p className="text-white font-medium">
                      {e.title} <span className="text-gray-500 font-normal">— {e.date}</span>
                    </p>
                    <p className="text-gray-400 text-xs">{e.organization}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Skills & Tools</h3>
              <div className="space-y-1.5">
                {skillCategories.map((sc) => (
                  <p key={sc.category} className="text-gray-300">
                    <span className="text-gray-500">{sc.category}: </span>
                    {sc.items.join(', ')}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Projects</h3>
              <div className="space-y-1">
                {projects.map((p) => (
                  <p key={p.id} className="text-gray-300">
                    {p.name}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Education</h3>
              {experience
                .filter((e) => e.type === 'education')
                .map((e) => (
                  <p key={e.id} className="text-gray-300">
                    {e.title} — {e.organization} ({e.date})
                  </p>
                ))}
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Contact</h3>
              <p className="text-gray-300">{contact.email}</p>
              <p className="text-gray-300">{contact.githubHandle}</p>
              <p className="text-gray-300">{contact.location}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
