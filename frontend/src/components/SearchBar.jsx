import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// vvarient deafult for dashboard
// variant compact , smaller for header
export default function SearchBar({
  value,
  onChange,
  onSubmit,
  variant = 'default',
}) {
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    const query = value?.trim()
    if (!query) return
    onSubmit
      ? onSubmit(query)
      : navigate(`/recipe/${encodeURIComponent(query)}`)
  }

  const isCompact = variant === 'compact'

  return (
    <form
      onSubmit={handleSubmit}
      className={isCompact ? 'w-56' : 'w-full max-w-2xl mx-auto'}
    >
      <div className="relative">
        <Search
          className={`absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 ${isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4'}`}
        />
        <Input
          value={value ?? ''}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="Search recipes..."
          className={`
            w-full bg-white border-stone-200 placeholder:text-stone-400 text-black
            focus-visible:ring-1 focus-visible:ring-brand-400 focus-visible:border-brand-400
            ${
              isCompact
                ? 'h-9 rounded-full pl-8 pr-3 text-xs'
                : 'h-12 rounded-2xl pl-10 pr-4 text-sm shadow-sm'
            }
          `}
        />
      </div>
    </form>
  )
}
