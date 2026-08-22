// ============================================================================
// src/data/portfolio.ts
// SINGLE SOURCE OF TRUTH for all portfolio content.
// Every app/component (About, QA Engineer, Experience, Projects, Resume,
// Contact, Terminal commands, QA Dashboard, File Manager) reads from here.
// Edit this file to update the whole portfolio.
// ============================================================================

export const personal = {
  name: 'Ishtiaque Ahmed Tanim',
  username: 'ishtiaque',
  hostname: 'tanim-linux',
  role: 'Software Quality Assurance Engineer',
  shortRole: 'Junior SQA Engineer',
  company: 'AKIJ iBOS Limited',
  location: 'Mohammadpur, Dhaka, Bangladesh',
  avatar: 'avatar.png',
  resumeFile: 'resume.pdf',
  resumeDownloadName: 'Ishtiaque Ahmed Tanim - Jr. SQA Resume.pdf',
  tagline: 'I validate multi-tenant cloud SaaS products end-to-end — designing test strategy, automating regression suites, verifying APIs, and load-testing for scale before anything reaches production.',
  specialties: ['Manual Testing', 'Test Automation', 'API Testing', 'Performance Testing', 'Bug Hunting'],
}

export const bio = {
  paragraphs: [
    `I'm a Junior SQA Engineer at AKIJ iBOS Limited, where I work on multi-tenant SaaS products — HRMS, ERP, and AI-powered portal platforms used by real organizations in production.`,
    `I believe in shift-left quality: writing test cases while requirements are still being discussed, not after a build lands. That means fewer surprises late in the cycle and clearer signal for the team earlier.`,
    `My day-to-day spans the full test pyramid — manual functional/regression/exploratory testing, Playwright and Selenium automation suites built on the Page Object Model, Postman/Newman API contract testing, and JMeter/k6 performance testing to confirm a product holds up under real traffic, not just clicks.`,
    `When I find a bug, I report it clearly: reproducible steps, severity classification, and enough context that a developer can act on it immediately — no back-and-forth required.`,
  ],
}

export const contact = {
  email: 'ishtiaqueahmed1998@gmail.com',
  whatsapp: '+8801557272482',
  location: 'Mohammadpur, Dhaka',
  github: 'https://github.com/tester-tanim',
  githubHandle: 'github.com/tester-tanim',
  linkedin: 'https://www.linkedin.com/in/ishtiaque2/',
  linkedinIsPlaceholder: false,
}

export type ExperienceEntry = {
  id: string
  type: 'work' | 'education' | 'milestone'
  title: string
  organization: string
  date: string
  status: 'PASS' | 'EDU' | 'MILESTONE'
  description: string
  highlights?: string[]
}

export const experience: ExperienceEntry[] = [
  {
    id: 'jr-sqa',
    type: 'work',
    title: 'Junior SQA Engineer',
    organization: 'AKIJ iBOS Limited, Dhaka',
    date: 'Jan 2025 — Present',
    status: 'PASS',
    description:
      'Promoted after a successful internship. Own end-to-end QA across multiple multi-tenant SaaS products — manual testing, automation, API testing, and performance testing — collaborating closely with developers and BAs.',
    highlights: [
      'Built and maintain Playwright/Selenium POM automation suites for regression coverage',
      'Run Postman/Newman API test collections with authentication and negative-path validation',
      'Load/performance test with JMeter & k6 to validate product behavior under real traffic',
      'Design test cases & test scenarios, execute regression cycles, and file severity-classified defects',
      'Test coverage on: PeopleDesk HRMS, POS Managerium, Performance Management System, Training & Development, NextJobz AI Portal',
    ],
  },
  {
    id: 'sqa-intern',
    type: 'work',
    title: 'SQA Intern',
    organization: 'AKIJ iBOS Limited, Dhaka',
    date: 'Oct 2024 — Dec 2024',
    status: 'PASS',
    description:
      'Hands-on internship across the full Software Testing Life Cycle. Designed and executed manual test cases on web and mobile, tracked 100+ bugs in Jira with severity classification, and supported API testing with Postman.',
    highlights: [
      'Manual functional, regression, and exploratory testing on web & mobile',
      'Logged and triaged 100+ defects in Jira with clear severity/priority',
      'Assisted with early Postman-based API testing',
    ],
  },
  {
    id: 'education',
    type: 'education',
    title: 'B.Sc. in Computer Science & Engineering',
    organization: 'State University of Bangladesh (SUB)',
    date: 'Graduated 2024',
    status: 'EDU',
    description:
      'Built a strong foundation in SDLC/STLC, OOP principles, and Agile workflows. Developed graphical Java Swing applications and studied digital electronics fundamentals.',
  },
  {
    id: 'cert-sqa',
    type: 'milestone',
    title: 'Advanced SQA & Cybersecurity Training',
    organization: 'IT Training BD',
    date: 'Feb 2024 — Jul 2024',
    status: 'MILESTONE',
    description:
      'Specialized training in end-to-end automation structures, multi-tenant SaaS testing logic, performance loading setups, and penetration security protocols. Certificate ID: ITB-B23-4314.',
  },
]

export type SkillCategory = {
  category: string
  items: string[]
}

export const skills = {
  manualTesting: [
    'Functional', 'Regression', 'Smoke', 'Sanity', 'Integration',
    'System', 'Exploratory', 'UI/UX', 'Cross-browser', 'Database Testing',
  ],
  automation: ['Playwright', 'Selenium', 'Appium', 'Maestro'],
  apiTesting: [
    'Postman', 'Newman', 'REST API Testing', 'API Validation',
    'Authentication Testing', 'Negative Testing',
  ],
  performanceTesting: ['Apache JMeter', 'Locust', 'k6'],
  tools: ['Jira', 'Git', 'GitHub', 'Allure', 'XMind', 'ClickUp'],
  languages: ['JavaScript', 'Python'],
}

export const skillCategories: SkillCategory[] = [
  { category: 'Manual Testing', items: skills.manualTesting },
  { category: 'Automation', items: skills.automation },
  { category: 'API Testing', items: skills.apiTesting },
  { category: 'Performance Testing', items: skills.performanceTesting },
  { category: 'Tools', items: skills.tools },
]

export type Project = {
  id: string
  name: string
  category: 'Web Automation' | 'API Testing' | 'Performance Testing' | 'Test Cases & Bug Reports'
  description: string
  technologies: string[]
  whatWasTested: string
  contribution: string
  github: string
  liveDemo?: string
  result: string
}

export const projects: Project[] = [
  {
    id: 'saucedemo-playwright-pom',
    name: 'SauceDemo — Playwright POM Suite',
    category: 'Web Automation',
    description:
      'End-to-end suite covering login, inventory, cart, and checkout. Page Object Model pattern, custom fixtures for authenticated contexts, and GitHub Actions CI/CD.',
    technologies: ['Playwright', 'TypeScript', 'Page Object Model', 'GitHub Actions CI/CD'],
    whatWasTested: 'Login flows, product inventory, cart operations, and full checkout journey on the SauceDemo e-commerce site.',
    contribution: 'Designed the POM architecture, built reusable fixtures for authenticated sessions, and wired the suite into CI/CD for automated regression on every push.',
    github: 'https://github.com/tester-tanim/saucedemo-playwright-pom',
    result: '31 / 31 passed',
  },
  {
    id: 'api-testing',
    name: 'REST API Testing Suite',
    category: 'API Testing',
    description:
      'API framework for thetestingworldapi.com covering student CRUD, skills, and address management. Dynamic pre-request scripts and Newman HTML reporting.',
    technologies: ['Postman', 'Newman', 'REST API'],
    whatWasTested: 'CRUD operations for student records, skills endpoints, and address management, including auth and negative-path scenarios.',
    contribution: 'Authored the Postman collection with dynamic pre-request scripting, environment variables, and automated Newman HTML reporting for CI runs.',
    github: 'https://github.com/tester-tanim/API-Testing',
    result: '22 / 22 assertions',
  },
  {
    id: 'performance-testing',
    name: 'JMeter Performance Testing',
    category: 'Performance Testing',
    description:
      'Load testing suite against thetestingworldapi.com. Thread groups run via CLI non-GUI mode, with BlazeMeter JMX recordings producing detailed HTML performance reports.',
    technologies: ['Apache JMeter', 'Load Testing', 'BlazeMeter'],
    whatWasTested: 'API response times and stability under 1–6 concurrent virtual users, identifying latency trends as load increased.',
    contribution: 'Built thread group plans, ran non-GUI CLI load tests, and produced HTML performance dashboards from BlazeMeter JMX recordings.',
    github: 'https://github.com/tester-tanim/Performance_Testing',
    result: '1–6 concurrent users',
  },
  {
    id: 'mahfil-app',
    name: 'Mahfil App — Test Cases & Bug Report',
    category: 'Test Cases & Bug Reports',
    description:
      'Manual test documentation for the Mahfil mobile app covering Sign In, Sign Up, and search. Structured test cases plus severity-classified bug reports.',
    technologies: ['Manual Testing', 'Bug Reports', 'Mobile'],
    whatWasTested: 'Sign In, Sign Up, and search flows on the Mahfil mobile app, including edge cases and negative inputs.',
    contribution: 'Wrote structured test cases from scratch and produced clear, severity-classified bug reports for the development team.',
    github: 'https://github.com/tester-tanim/Mahfil-App-Test-Case-and-Bug-Report',
    result: 'Manual · Exploratory',
  },
  {
    id: 'uiautomator3',
    name: 'UIAutomator 3.0 — Android Automation Framework',
    category: 'Web Automation',
    description:
      'Next-generation Android UI automation framework driving devices via plain adb, with scored multi-strategy locators (text, resource-id, OCR, computer vision) and opt-in self-healing element recovery.',
    technologies: ['Python', 'ADB', 'FastAPI', 'OCR', 'Computer Vision'],
    whatWasTested: 'Android UI element identification and interaction reliability — locator confidence scoring, self-healing recovery on UI changes, and OCR/vision fallback locators for hard-to-target elements.',
    contribution: 'Built the unified scored locator model and self-healing recovery logic, plus session recording with code generation and a built-in web inspector for debugging automation runs.',
    github: 'https://github.com/tester-tanim/uiautomator3',
    result: 'Framework · Python',
  },
]

export const dashboardStats = {
  testCases: '250+',
  automation: '100+',
  apiTesting: '50+',
  bugReports: '100+',
  projects: '10+',
  tools: '15+',
}

export const dashboardCharts = {
  testingExpertise: [
    { label: 'Manual Testing', value: 90 },
    { label: 'Automation', value: 80 },
    { label: 'API Testing', value: 75 },
    { label: 'Performance Testing', value: 65 },
  ],
  toolsBreakdown: [
    { label: 'Playwright', value: 30 },
    { label: 'Postman', value: 25 },
    { label: 'JMeter', value: 20 },
    { label: 'Selenium', value: 15 },
    { label: 'Jira', value: 10 },
  ],
  automationCoverage: 78,
  apiTestingCoverage: 82,
  performanceCoverage: 60,
}

export const fileSystem = {
  root: '/home/ishtiaque',
  folders: [
    { name: 'About', icon: 'user', description: 'Bio and professional summary.' },
    { name: 'Experience', icon: 'briefcase', description: 'Work history and education timeline.' },
    { name: 'Projects', icon: 'folder-kanban', description: 'QA and automation project repositories.' },
    { name: 'Skills', icon: 'wrench', description: 'Testing skills, tools, and technologies.' },
    { name: 'Resume', icon: 'file-text', description: 'Downloadable resume (PDF).' },
    { name: 'Test-Cases', icon: 'check-square', description: 'Manual test case documentation.' },
    { name: 'Bug-Reports', icon: 'bug', description: 'Severity-classified defect reports.' },
    { name: 'API-Testing', icon: 'plug', description: 'Postman/Newman API test collections.' },
    { name: 'Performance-Testing', icon: 'gauge', description: 'JMeter/k6 load testing suites.' },
    { name: 'Automation', icon: 'bot', description: 'Playwright/Selenium automation frameworks.' },
  ],
}

export const bootSequence = [
  '[ OK ] Starting Tanim Linux kernel...',
  '[ OK ] Mounting /home/ishtiaque',
  '[ OK ] Loading QA Engine',
  '[ OK ] Loading Automation Framework',
  '[ OK ] Loading API Testing Module',
  '[ OK ] Loading Performance Testing Module',
  '[ OK ] Loading Bug Detection System',
  '[ OK ] Initializing Window Manager',
  '[ OK ] Starting Network Services',
  '[ OK ] All systems verified. 0 critical defects found.',
  'System ready. Welcome to Tanim Linux.',
]

export const neofetchInfo = {
  os: 'Tanim Linux x86_64',
  host: 'AKIJ iBOS Limited',
  kernel: '6.1.0-qa-engineer',
  uptime: '1 yr, 8 mo',
  role: 'Junior SQA Engineer',
  testing: 'Manual / Automation',
  automationTools: 'Playwright, Selenium, Appium, Maestro',
  apiTools: 'Postman / Newman',
  performanceTools: 'JMeter / Locust / k6',
  shell: 'zsh',
  terminal: 'tanim-term',
  cpu: 'Quality Assurance (12) @ 4.2GHz',
  memory: '250+ Test Cases / 100+ Bugs Found',
}
