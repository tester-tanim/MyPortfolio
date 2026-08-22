import { dashboardStats, dashboardCharts } from '../../data/portfolio'

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4 flex flex-col gap-1">
      <span className="text-2xl font-bold text-term-green font-mono-term">{value}</span>
      <span className="text-xs text-gray-400">{label}</span>
    </div>
  )
}

function BarRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="mb-2.5">
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-term-green/60 to-term-green"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

function Donut({ value, label, color }: { value: number; label: string; color: string }) {
  const r = 34
  const c = 2 * Math.PI * r
  const offset = c - (value / 100) * c
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="90" height="90" viewBox="0 0 90 90">
        <circle cx="45" cy="45" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
        <circle
          cx="45"
          cy="45"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="9"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 45 45)"
        />
        <text x="45" y="50" textAnchor="middle" fontSize="16" fill="#e6edf3" fontWeight="600">
          {value}%
        </text>
      </svg>
      <span className="text-xs text-gray-400 text-center">{label}</span>
    </div>
  )
}

export default function Dashboard() {
  const stats: [string, string][] = [
    ['Test Cases', dashboardStats.testCases],
    ['Automation', dashboardStats.automation],
    ['API Testing', dashboardStats.apiTesting],
    ['Bug Reports', dashboardStats.bugReports],
    ['Projects', dashboardStats.projects],
    ['Tools', dashboardStats.tools],
  ]

  return (
    <div className="h-full overflow-y-auto scrollable p-5 text-gray-200">
      <h2 className="text-lg font-semibold text-white mb-4">QA Dashboard</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {stats.map(([label, value]) => (
          <StatCard key={label} label={label} value={value} />
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-5">
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <h3 className="text-sm font-semibold text-white mb-3">Testing Expertise</h3>
          {dashboardCharts.testingExpertise.map((d) => (
            <BarRow key={d.label} label={d.label} value={d.value} />
          ))}
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <h3 className="text-sm font-semibold text-white mb-3">Tools Breakdown</h3>
          {dashboardCharts.toolsBreakdown.map((d) => (
            <BarRow key={d.label} label={d.label} value={d.value} />
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
        <h3 className="text-sm font-semibold text-white mb-3">Coverage Overview</h3>
        <div className="flex flex-wrap gap-6 justify-around">
          <Donut value={dashboardCharts.automationCoverage} label="Automation Coverage" color="#3ddc84" />
          <Donut value={dashboardCharts.apiTestingCoverage} label="API Testing Coverage" color="#5a8cff" />
          <Donut value={dashboardCharts.performanceCoverage} label="Performance Coverage" color="#f5a623" />
        </div>
      </div>
    </div>
  )
}
