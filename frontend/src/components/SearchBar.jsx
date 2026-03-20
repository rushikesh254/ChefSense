import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar({
  value,
  onChange,
  className,
  onSubmit,
  noShadow,
  placeholder = 'Search recipes (e.g. Paneer tikka, Dal makhani)',
}) {
  const [internalSearch, setInternalSearch] = useState('')
  const navigate = useNavigate()

  const isControlled = value !== undefined
  const search = isControlled ? value : internalSearch

  function handleSearch(e) {
    if (e) e.preventDefault()
    const query = search.trim()
    if (!query) return

    if (onSubmit) {
      onSubmit(query)
    } else {
      navigate(`/recipe/${query}`)
    }
  }

  const handleChange = (e) => {
    if (isControlled) {
      onChange(e.target.value)
    } else {
      setInternalSearch(e.target.value)
    }
  }

  return (
    <div className={className || 'px-4 sm:px-6 -mt-6 sm:-mt-7 relative z-20'}>
      <form onSubmit={handleSearch} className="mx-auto max-w-3xl">
        <div className="relative group">
          <Search className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-stone-400 group-focus-within:text-brand-500 transition-colors" />
          <Input
            value={search}
            onChange={handleChange}
            placeholder={placeholder}
            className={`h-12 sm:h-14 w-full rounded-xl bg-white pl-10 pr-4 text-sm border border-stone-200 placeholder:text-stone-400 focus-visible:ring-brand-500/20 focus-visible:border-brand-500 transition-all ${
              noShadow ? 'shadow-none' : 'shadow-xl shadow-stone-200'
            }`}
          />
        </div>
      </form>
    </div>
  )
}
