import { skillCategories } from '../../data/portfolio'

export default function QAEngineer() {
  return (
    <div className="h-full overflow-y-auto scrollable p-6 text-gray-200">
      <h2 className="text-lg font-semibold text-white mb-1">QA Engineer</h2>
      <p className="text-sm text-gray-400 mb-5">Testing disciplines, tooling, and categorized skill set.</p>

      <div className="space-y-5">
        {skillCategories.map((sc) => (
          <div key={sc.category}>
            <h3 className="text-sm font-semibold text-term-green mb-2 font-mono-term">{sc.category}</h3>
            <div className="flex flex-wrap gap-2">
              {sc.items.map((item) => (
                <span
                  key={item}
                  className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-200"
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
