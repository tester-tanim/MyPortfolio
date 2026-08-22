import { Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { contact } from '../../data/portfolio'

export default function Contact() {
  return (
    <div className="h-full overflow-y-auto scrollable p-6 text-gray-200">
      <h2 className="text-lg font-semibold text-white mb-4">Contact</h2>

      <div className="bg-black/40 rounded-lg border border-white/10 p-4 font-mono-term text-sm mb-5">
        <p className="text-gray-500">
          <span className="text-term-green">$</span> contact
        </p>
        <div className="mt-2 space-y-1">
          <p>
            <span className="text-term-green">Email</span>
            <span className="text-gray-500">: </span>
            <span className="text-gray-300">{contact.email}</span>
          </p>
          <p>
            <span className="text-term-green">GitHub</span>
            <span className="text-gray-500">: </span>
            <span className="text-gray-300">{contact.githubHandle}</span>
          </p>
          <p>
            <span className="text-term-green">LinkedIn</span>
            <span className="text-gray-500">: </span>
            <span className="text-gray-300">
              {contact.linkedin.replace('https://', '')}
              {contact.linkedinIsPlaceholder && <span className="text-yellow-500/80"> (placeholder)</span>}
            </span>
          </p>
          <p>
            <span className="text-term-green">Location</span>
            <span className="text-gray-500">: </span>
            <span className="text-gray-300">{contact.location}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <a
          href={`mailto:${contact.email}`}
          className="flex items-center gap-2.5 text-sm px-4 py-2.5 rounded-md bg-term-green/15 hover:bg-term-green/25 text-term-green transition-colors"
        >
          <Mail size={15} /> Send an email
        </a>
        <a
          href={contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 text-sm px-4 py-2.5 rounded-md bg-white/5 hover:bg-white/10 text-gray-200 transition-colors"
        >
          <Github size={15} /> View GitHub
        </a>
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 text-sm px-4 py-2.5 rounded-md bg-white/5 hover:bg-white/10 text-gray-200 transition-colors"
        >
          <Linkedin size={15} /> View LinkedIn
        </a>
        <div className="flex items-center gap-2.5 text-sm px-4 py-2.5 rounded-md bg-white/[0.02] text-gray-400">
          <MapPin size={15} /> {contact.location}
        </div>
      </div>
    </div>
  )
}
