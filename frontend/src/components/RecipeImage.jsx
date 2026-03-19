import { cn } from '@/lib/utils'
import { ChefHat } from 'lucide-react'
import { useState } from 'react'

export default function RecipeImage({ src, alt, className, children }) {
  const [broken, setBroken] = useState(false)

  if (!src || broken) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-amber-500',
          className,
        )}
      >
        <ChefHat className="h-12 w-12 text-white/50" />
        {children}
      </div>
    )
  }

  return (
    <div className={className}>
      <img
        src={src}
        alt={alt || 'Recipe'}
        className="h-full w-full object-cover"
        loading="lazy"
        onError={() => setBroken(true)}
      />
      {children}
    </div>
  )
}
