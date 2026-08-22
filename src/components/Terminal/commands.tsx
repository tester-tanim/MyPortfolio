import type { ReactNode } from 'react'
import {
  personal,
  bio,
  contact,
  experience,
  skillCategories,
  projects,
  neofetchInfo,
} from '../../data/portfolio'

export type CommandOutput = ReactNode

const Line = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`leading-relaxed ${className}`}>{children}</div>
)

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="mt-2 mb-1">
    <div className="text-term-green font-semibold">{title}</div>
    <div className="pl-2 text-gray-300">{children}</div>
  </div>
)

function helpOutput(): CommandOutput {
  const cmds: [string, string][] = [
    ['help', 'Show this list of commands'],
    ['clear', 'Clear the terminal screen'],
    ['about', 'Print a short bio'],
    ['whoami', 'Print name, role, and specialties'],
    ['skills', 'List skills grouped by category'],
    ['experience', 'Show work & education history'],
    ['projects', 'List QA/automation projects'],
    ['qa', 'QA engineering skill breakdown'],
    ['automation', 'Automation tooling details'],
    ['api-testing', 'API testing tooling details'],
    ['performance', 'Performance testing tooling details'],
    ['resume', 'Get resume download info'],
    ['github', 'Open GitHub profile'],
    ['linkedin', 'Open LinkedIn profile (placeholder)'],
    ['contact', 'Show contact information'],
    ['neofetch', 'System info, the fun way'],
  ]
  return (
    <div>
      <Line className="text-gray-400 mb-1">Available commands:</Line>
      {cmds.map(([c, d]) => (
        <div key={c} className="grid grid-cols-[140px_1fr] gap-2">
          <span className="text-term-green">{c}</span>
          <span className="text-gray-400">{d}</span>
        </div>
      ))}
    </div>
  )
}

function aboutOutput(): CommandOutput {
  return (
    <div>
      {bio.paragraphs.map((p, i) => (
        <Line key={i} className="text-gray-300 mb-2">
          {p}
        </Line>
      ))}
    </div>
  )
}

function whoamiOutput(): CommandOutput {
  return (
    <div>
      <Line>
        <span className="text-term-green">name</span>
        <span className="text-gray-400">: </span>
        {personal.name}
      </Line>
      <Line>
        <span className="text-term-green">role</span>
        <span className="text-gray-400">: </span>
        {personal.role} @ {personal.company}
      </Line>
      <Line>
        <span className="text-term-green">specialties</span>
        <span className="text-gray-400">: </span>
        {personal.specialties.join(', ')}
      </Line>
      <Line className="text-gray-400 mt-1">{personal.tagline}</Line>
    </div>
  )
}

function skillsOutput(): CommandOutput {
  return (
    <div>
      {skillCategories.map((sc) => (
        <Section key={sc.category} title={sc.category}>
          {sc.items.join(', ')}
        </Section>
      ))}
    </div>
  )
}

function experienceOutput(): CommandOutput {
  return (
    <div>
      {experience.map((e) => (
        <div key={e.id} className="mb-2">
          <div>
            <span className="text-term-green">[{e.status}]</span>{' '}
            <span className="text-white font-medium">{e.title}</span>{' '}
            <span className="text-gray-500">— {e.date}</span>
          </div>
          <div className="text-gray-400 pl-2">{e.organization}</div>
          <div className="text-gray-300 pl-2">{e.description}</div>
        </div>
      ))}
    </div>
  )
}

function projectsOutput(): CommandOutput {
  return (
    <div>
      {projects.map((p) => (
        <div key={p.id} className="mb-2">
          <div className="text-white font-medium">
            {p.name} <span className="text-gray-500 text-xs">[{p.category}]</span>
          </div>
          <div className="text-gray-400 pl-2">{p.description}</div>
          <div className="pl-2 text-term-dim">{p.github}</div>
        </div>
      ))}
    </div>
  )
}

function qaOutput(): CommandOutput {
  return (
    <Section title="QA Engineering Skill Breakdown">
      Manual: Functional, Regression, Smoke, Sanity, Integration, System, Exploratory, UI/UX,
      Cross-browser, Database Testing.
      <br />
      Automation: Playwright, Selenium, Appium, Maestro.
      <br />
      API: Postman, Newman, REST API testing, validation, auth & negative testing.
      <br />
      Performance: Apache JMeter, Locust, k6.
    </Section>
  )
}

function automationOutput(): CommandOutput {
  return (
    <Section title="Automation Tooling">
      Frameworks: Playwright, Selenium (Page Object Model)
      <br />
      Mobile: Appium, Maestro
      <br />
      CI/CD: GitHub Actions
    </Section>
  )
}

function apiTestingOutput(): CommandOutput {
  return (
    <Section title="API Testing Tooling">
      Postman collections, Newman CLI runs & HTML reporting, REST API validation,
      authentication testing, negative-path testing.
    </Section>
  )
}

function performanceOutput(): CommandOutput {
  return (
    <Section title="Performance Testing Tooling">
      Apache JMeter (thread groups, CLI non-GUI mode), Locust, k6 — load testing to validate
      product behavior under real traffic.
    </Section>
  )
}

function resumeOutput(): CommandOutput {
  return (
    <div>
      <Line className="text-gray-300">Resume available as PDF.</Line>
      <Line>
        <a
          href={`${import.meta.env.BASE_URL}${personal.resumeFile}`}
          download={personal.resumeDownloadName}
          className="text-term-green underline hover:text-white"
        >
          Click here to download →
        </a>
      </Line>
      <Line className="text-gray-500 text-xs mt-1">Or open the Resume app from the desktop.</Line>
    </div>
  )
}

function githubOutput(): CommandOutput {
  return (
    <Line>
      <a
        href={contact.github}
        target="_blank"
        rel="noopener noreferrer"
        className="text-term-green underline hover:text-white"
      >
        {contact.githubHandle} →
      </a>
    </Line>
  )
}

function linkedinOutput(): CommandOutput {
  return (
    <div>
      <Line>
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-term-green underline hover:text-white"
        >
          Open LinkedIn profile →
        </a>
      </Line>
      {contact.linkedinIsPlaceholder && (
        <Line className="text-yellow-500/80 text-xs mt-1">(placeholder URL — update in src/data/portfolio.ts)</Line>
      )}
    </div>
  )
}

function contactOutput(): CommandOutput {
  return (
    <div>
      <Line>
        <span className="text-term-green">email</span>
        <span className="text-gray-400">: </span>
        <a href={`mailto:${contact.email}`} className="text-term-dim underline hover:text-white">
          {contact.email}
        </a>
      </Line>
      <Line>
        <span className="text-term-green">github</span>
        <span className="text-gray-400">: </span>
        {contact.githubHandle}
      </Line>
      <Line>
        <span className="text-term-green">location</span>
        <span className="text-gray-400">: </span>
        {contact.location}
      </Line>
    </div>
  )
}

function neofetchOutput(): CommandOutput {
  const art = [
    '     .--.',
    '    |o_o |',
    '    |:_/ |',
    '   //   \\ \\',
    '  (|     | )',
    ' /\'\\_   _/`\\',
    ' \\___)=(___/',
  ]
  const info: [string, string][] = [
    ['OS', neofetchInfo.os],
    ['Host', neofetchInfo.host],
    ['Kernel', neofetchInfo.kernel],
    ['Uptime', neofetchInfo.uptime],
    ['Role', neofetchInfo.role],
    ['Testing', neofetchInfo.testing],
    ['Automation', neofetchInfo.automationTools],
    ['API', neofetchInfo.apiTools],
    ['Performance', neofetchInfo.performanceTools],
    ['Shell', neofetchInfo.shell],
    ['CPU', neofetchInfo.cpu],
    ['Memory', neofetchInfo.memory],
  ]
  return (
    <div className="flex gap-4 flex-wrap">
      <pre className="text-term-green text-xs leading-tight shrink-0">{art.join('\n')}</pre>
      <div className="text-xs">
        {info.map(([k, v]) => (
          <div key={k}>
            <span className="text-term-green font-semibold">{k}</span>
            <span className="text-gray-500">: </span>
            <span className="text-gray-300">{v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function hireOutput(): CommandOutput {
  return (
    <div>
      <Line className="text-gray-300">Checking candidate...</Line>
      <Line className="text-term-green">✓ QA skills</Line>
      <Line className="text-term-green">✓ Automation</Line>
      <Line className="text-term-green">✓ API Testing</Line>
      <Line className="text-term-green">✓ Performance Testing</Line>
      <Line className="text-term-green">✓ Bug hunting</Line>
      <Line className="text-white font-semibold mt-1">Result: Tanim looks like a good hire. 🚀</Line>
    </div>
  )
}

function bugFoundOutput(): CommandOutput {
  return (
    <div>
      <Line className="text-red-400 font-semibold">Bug detected!</Line>
      <Line>
        <span className="text-gray-400">Severity: </span>
        <span className="text-yellow-400">Critical</span>
      </Line>
      <Line>
        <span className="text-gray-400">Status: </span>
        <span className="text-term-green">Found by Tanim 😎</span>
      </Line>
    </div>
  )
}

function destructiveBlockedOutput(): CommandOutput {
  return <Line className="text-yellow-400">Nice try 😄 This portfolio does not allow destructive commands.</Line>
}

function coffeeOutput(): CommandOutput {
  return (
    <div>
      <Line className="text-gray-300">Brewing coffee...</Line>
      <Line className="text-term-green">[████████████████████] 100%</Line>
      <Line className="text-white">☕ Coffee is ready. Productivity +100%.</Line>
    </div>
  )
}

function notFoundOutput(cmd: string): CommandOutput {
  return (
    <Line className="text-red-400">
      command not found: {cmd} — try <span className="text-term-green">help</span>
    </Line>
  )
}

const DESTRUCTIVE_PATTERNS = [
  /^rm\s+-rf/i,
  /^sudo\s+rm/i,
  /^format\b/i,
  /^del\s+\/f/i,
  /^:\(\)\{/,
  /^mkfs/i,
  /^dd\s+if=/i,
]

export function runCommand(raw: string): { output: CommandOutput; clear?: boolean } | null {
  const trimmed = raw.trim()
  if (trimmed === '') return { output: null }

  const lower = trimmed.toLowerCase()

  // Destructive command guard (checked first, before normal parsing)
  if (DESTRUCTIVE_PATTERNS.some((re) => re.test(trimmed))) {
    return { output: destructiveBlockedOutput() }
  }

  switch (lower) {
    case 'help':
      return { output: helpOutput() }
    case 'clear':
      return { output: null, clear: true }
    case 'about':
      return { output: aboutOutput() }
    case 'whoami':
      return { output: whoamiOutput() }
    case 'skills':
      return { output: skillsOutput() }
    case 'experience':
      return { output: experienceOutput() }
    case 'projects':
      return { output: projectsOutput() }
    case 'qa':
      return { output: qaOutput() }
    case 'automation':
      return { output: automationOutput() }
    case 'api-testing':
      return { output: apiTestingOutput() }
    case 'performance':
      return { output: performanceOutput() }
    case 'resume':
      return { output: resumeOutput() }
    case 'github':
      return { output: githubOutput() }
    case 'linkedin':
      return { output: linkedinOutput() }
    case 'contact':
      return { output: contactOutput() }
    case 'neofetch':
      return { output: neofetchOutput() }
    case 'sudo hire tanim':
      return { output: hireOutput() }
    case 'bug found':
      return { output: bugFoundOutput() }
    case 'sudo make-coffee':
      return { output: coffeeOutput() }
    default:
      return { output: notFoundOutput(trimmed) }
  }
}
