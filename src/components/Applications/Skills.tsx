import { skillCategories } from '../../data/portfolio'

const categoryColors: Record<string, string> = {
  'Manual Testing': 'text-blue-300 border-blue-500/25 bg-blue-500/10',
  Automation: 'text-term-green border-term-green/25 bg-term-green/10',
  'API Testing': 'text-amber-300 border-amber-500/25 bg-amber-500/10',
  'Performance Testing': 'text-red-300 border-red-500/25 bg-red-500/10',
  Tools: 'text-purple-300 border-purple-500/25 bg-purple-500/10',
}

export default function Skills() {
  return (
    <div className="h-full overflow-y-auto scrollable p-6 text-gray-200">
      <h2 className="text-lg font-semibold text-white mb-1">Skills & Tools</h2>
      <p className="text-sm text-gray-400 mb-5">Everything I use to test software end-to-end.</p>

      <div className="grid sm:grid-cols-2 gap-4">
        {skillCategories.map((sc) => (
          <div key={sc.category} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <h3 className="text-sm font-semibold text-white mb-2.5">{sc.category}</h3>
            <div className="flex flex-wrap gap-1.5">
              {sc.items.map((item) => (
                <span
                  key={item}
                  className={`text-[11px] px-2 py-1 rounded border ${categoryColors[sc.category] ?? 'text-gray-300 border-white/10 bg-white/5'}`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
