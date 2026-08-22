# MyPortfolio — Tanim Linux

A personal portfolio for **Ishtiaque Ahmed Tanim**, Software QA Engineer, built as a simulated Linux desktop environment.

Boot animation → login screen → full desktop with draggable/resizable windows, a working terminal, a file manager, a QA dashboard, and more — all content driven from a single data file.

Built with **Vite + React + TypeScript + Tailwind CSS + Framer Motion**.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

## Build

```bash
npm run build
```

Outputs a production build to `dist/`. Preview it locally with:

```bash
npm run preview
```

## Editing content

All portfolio content (bio, experience, skills, projects, dashboard stats, contact info, resume/social links, terminal command data) lives in a single file:

```
src/data/portfolio.ts
```

Edit that file to update the whole site — every app (About, QA Engineer, Experience, Projects, Resume, Contact, Terminal, QA Dashboard, File Manager) reads from it.

## Deployment (Vercel)

This project deploys to **Vercel**, served from the root domain. The Vite `base` path is set to `/` in `vite.config.ts` accordingly, and `vercel.json` adds an SPA rewrite so any deep link falls back to `index.html`.

To deploy (one-time setup):
1. Go to [vercel.com](https://vercel.com) and sign in (GitHub login works).
2. **Add New → Project**, then import the `tester-tanim/MyPortfolio` GitHub repo.
3. Vercel auto-detects the Vite framework preset (build command `npm run build` / `vite build`, output directory `dist`) — leave the defaults and click **Deploy**.
4. Every future push to `main` auto-deploys; pull requests get their own preview URL.

## Project structure

```
src/
├── components/
│   ├── Boot/            # Boot sequence + desktop-loading transition
│   ├── Login/            # Login screen
│   ├── Desktop/           # Desktop shell, icons, mobile views
│   ├── Taskbar/           # Top bar, app launcher, dock
│   ├── Window/            # Draggable/resizable window chrome
│   ├── Terminal/          # Interactive terminal + command parser
│   ├── FileManager/       # Simulated file manager
│   └── Applications/      # About, QA Engineer, Experience, Projects, Resume, Browser, Dashboard, Contact, Trash
├── data/
│   └── portfolio.ts       # single source of truth for all content
├── hooks/                 # useWindowManager, useKeyboardShortcuts
├── utils/                 # shared types, app registry
├── App.tsx
└── main.tsx
```

## Keyboard shortcuts (once logged in)

- `Ctrl+Alt+T` — open/focus the terminal
- `Super` (Windows key) — open the app launcher
- `Esc` — close the app launcher / restore a maximized window
- Inside the terminal: `Ctrl+L` clears the screen, `↑`/`↓` cycles command history

## License / assets

Résumé (`public/resume.pdf`) and profile photo (`public/avatar.png`) belong to Ishtiaque Ahmed Tanim.
