import { personal, bio } from '../../data/portfolio'

export default function About() {
  return (
    <div className="h-full overflow-y-auto scrollable p-6 text-gray-200">
      <div className="flex items-center gap-4 mb-5">
        <img
          src={`${import.meta.env.BASE_URL}${personal.avatar}`}
          alt={`${personal.name} avatar`}
          className="w-16 h-16 rounded-full object-cover border border-white/10"
        />
        <div>
          <h2 className="text-lg font-semibold text-white">{personal.name}</h2>
          <p className="text-term-green text-sm font-mono-term">{personal.role}</p>
        </div>
      </div>
      <div className="space-y-3 text-sm leading-relaxed text-gray-300">
        {bio.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {personal.specialties.map((s) => (
          <span
            key={s}
            className="text-xs px-2.5 py-1 rounded-full bg-term-green/10 text-term-green border border-term-green/20"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}
