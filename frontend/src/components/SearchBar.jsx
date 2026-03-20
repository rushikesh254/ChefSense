import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  function handleSearch(e) {
    e.preventDefault()
    const query = search.trim()
    if (!query) return
    // navigate(`/recipe?cook=${encodeURIComponent(query)}`)
    navigate(`/recipe/${query}`)
  }

  return (
    <div className="px-4 sm:px-6 -mt-6 sm:-mt-7 relative z-20">
      <form onSubmit={handleSearch} className="mx-auto max-w-3xl">
        <div className="relative">
          <Search className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-stone-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recipes (e.g. Paneer tikka, Dal makhani)"
            className="h-12 sm:h-14 w-full rounded-xl bg-white pl-10 pr-4 text-sm shadow-xl shadow-stone-200 border border-stone-200 placeholder:text-stone-400"
          />
        </div>
      </form>
    </div>
  )
}
