import { Trash2 } from 'lucide-react'

export default function Trash() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-3">
      <Trash2 size={40} className="opacity-30" />
      <p className="text-sm">Trash is empty</p>
    </div>
  )
}
