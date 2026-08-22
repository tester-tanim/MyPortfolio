import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import { personal } from '../../data/portfolio'

type Props = {
  onLogin: () => void
}

export default function LoginScreen({ onLogin }: Props) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const attemptLogin = (e: FormEvent) => {
    e.preventDefault()
    if (password.trim().toLowerCase() === 'tanim') {
      onLogin()
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div className="fixed inset-0 wallpaper flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1, x: shake ? [0, -10, 10, -8, 8, 0] : 0 }}
        transition={{ duration: shake ? 0.4 : 0.4 }}
        className="glass-panel rounded-2xl shadow-panel p-8 w-full max-w-sm flex flex-col items-center"
      >
        <img
          src={`${import.meta.env.BASE_URL}${personal.avatar}`}
          alt={`${personal.name} avatar`}
          className="w-24 h-24 rounded-full object-cover border-2 border-term-green/50 shadow-lg mb-4"
        />
        <h1 className="text-xl font-semibold text-white">{personal.name}</h1>
        <p className="text-sm text-term-dim font-mono-term mb-6">{personal.shortRole}</p>

        <form onSubmit={attemptLogin} className="w-full flex flex-col gap-3">
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(false)
              }}
              placeholder="Password: tanim"
              aria-label="Password"
              className={`w-full bg-white/5 border ${
                error ? 'border-red-500' : 'border-white/10'
              } rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-term-green/60 transition-colors`}
              autoFocus
            />
          </div>
          {error && <p className="text-xs text-red-400 -mt-1">Incorrect password. Try "tanim".</p>}
          <button
            type="submit"
            className="w-full bg-term-green/90 hover:bg-term-green text-black font-medium text-sm rounded-lg py-2.5 transition-colors"
          >
            Log In
          </button>
        </form>

        <p className="text-[11px] text-gray-500 mt-5 text-center leading-relaxed">
          This is a demo login for a portfolio site — not real authentication.
          <br />
          No account data is collected or stored.
        </p>
      </motion.div>
    </div>
  )
}
