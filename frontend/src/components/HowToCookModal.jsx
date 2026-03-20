import SearchBar from '@/components/SearchBar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ChefHat } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const EXAMPLES = ['Paneer butter masala', 'Veg fried rice', 'Chocolate cake']

export default function HowToCookModal() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleGenerate(val) {
    const value = typeof val === 'string' ? val : query
    const trimmed = value.trim()

    if (!trimmed) {
      toast.error('Enter a recipe name')
      return
    }

    setOpen(false)
    setQuery('')
    navigate(`/recipe?cook=${encodeURIComponent(trimmed)}`)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full px-5 bg-stone-50 hover:bg-stone-100"
        >
          <ChefHat className="mr-2 h-4 w-4" />
          How to cook?
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl">
        <div className="bg-brand-50/50 px-6 pt-8 pb-6 border-b border-brand-100/50">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 border">
              <img src="/orange-logo.png" alt="" className="w-16" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-black tracking-tight text-stone-900">
                Generate Recipe
              </DialogTitle>
              <DialogDescription className="text-stone-500 text-sm font-medium">
                AI-powered cooking steps for any dish.
              </DialogDescription>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-stone-400 px-1">
              What are you craving?
            </p>
            <SearchBar
              value={query}
              onChange={setQuery}
              onSubmit={handleGenerate}
              noShadow
              placeholder="e.g. Butter Chicken, Sushi, Tacos..."
              className="relative z-20"
            />
          </div>

          <div className="space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-stone-400 px-1">
              Popular right now
            </p>
            <div className="flex flex-wrap gap-2 px-1">
              {EXAMPLES.map((example) => (
                <button
                  type="button"
                  key={example}
                  onClick={() => setQuery(example)}
                  className="rounded-xl border border-stone-200 bg-stone-50/50 px-3.5 py-1.5 text-xs font-semibold text-stone-600 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-500"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              onClick={() => handleGenerate(query)}
              className="w-full h-12 rounded-4xl shadow-lg"
            >
              Generate Instant Recipe
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
