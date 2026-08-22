import { useMemo, useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import { projects, type Project } from '../../data/portfolio'

const categories = ['All', 'Web Automation', 'API Testing', 'Performance Testing', 'Test Cases & Bug Reports'] as const

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4 flex flex-col gap-2.5 hover:border-term-green/30 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-white">{project.name}</h3>
        <span className="text-[10px] shrink-0 px-2 py-0.5 rounded-full bg-term-green/10 text-term-green border border-term-green/20">
          {project.result}
        </span>
      </div>
      <p className="text-xs text-gray-400 leading-relaxed">{project.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {project.technologies.map((t) => (
          <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">
            {t}
          </span>
        ))}
      </div>

      <div className="text-xs text-gray-400 space-y-1 mt-1">
        <p>
          <span className="text-gray-500">Tested: </span>
          {project.whatWasTested}
        </p>
        <p>
          <span className="text-gray-500">Contribution: </span>
          {project.contribution}
        </p>
      </div>

      <div className="flex gap-2 mt-2">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15 text-gray-200 transition-colors"
        >
          <Github size={13} /> GitHub
        </a>
        {project.liveDemo ? (
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-term-green/15 hover:bg-term-green/25 text-term-green transition-colors"
          >
            <ExternalLink size={13} /> Live Demo
          </a>
        ) : (
          <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-white/5 text-gray-500 cursor-default">
            <ExternalLink size={13} /> Coming soon
          </span>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState<(typeof categories)[number]>('All')

  const filtered = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  )

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-white/5 shrink-0">
        <h2 className="text-lg font-semibold text-white mb-3">Projects</h2>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                filter === c
                  ? 'bg-term-green/15 text-term-green border-term-green/30'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollable p-4 grid sm:grid-cols-2 gap-3">
        {filtered.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  )
}
