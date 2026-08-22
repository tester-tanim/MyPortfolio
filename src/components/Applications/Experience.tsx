import { experience } from '../../data/portfolio'

const statusColor: Record<string, string> = {
  PASS: 'bg-term-green/15 text-term-green border-term-green/30',
  EDU: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  MILESTONE: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
}

export default function Experience() {
  return (
    <div className="h-full overflow-y-auto scrollable p-6 text-gray-200">
      <h2 className="text-lg font-semibold text-white mb-1">Experience</h2>
      <p className="text-sm text-gray-400 mb-5">Work history and education timeline.</p>

      <div className="relative pl-6 border-l border-white/10 space-y-6">
        {experience.map((e) => (
          <div key={e.id} className="relative">
            <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-term-green shadow-[0_0_8px_rgba(61,220,132,0.6)]" />
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`text-[10px] font-mono-term px-1.5 py-0.5 rounded border ${statusColor[e.status]}`}>
                {e.status}
              </span>
              <h3 className="text-sm font-semibold text-white">{e.title}</h3>
              <span className="text-xs text-gray-500">{e.date}</span>
            </div>
            <p className="text-xs text-gray-400 mb-1.5">{e.organization}</p>
            <p className="text-sm text-gray-300 leading-relaxed">{e.description}</p>
            {e.highlights && (
              <ul className="mt-2 space-y-1">
                {e.highlights.map((h, i) => (
                  <li key={i} className="text-xs text-gray-400 flex gap-1.5">
                    <span className="text-term-green">▸</span>
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
