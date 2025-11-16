'use client'

import { Heart } from 'lucide-react'
import { FavoriteCourtCard } from './favorite-court-card'

interface Court {
  id: string
  image: string
  name: string
  organization: string
  address: string
  characteristics: string[]
  priceRange: string
  amenities: { type: string; label: string }[]
}

interface FavoritesSectionProps {
  courts: Court[]
  onToggleFavorite: (id: string) => void
}

export function FavoritesSection({ courts, onToggleFavorite }: FavoritesSectionProps) {
  if (courts.length === 0) {
    return (
      <div className="px-4 py-12 text-center">
        <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
        <p className="text-muted-foreground max-w-xs mx-auto leading-relaxed">
          У вас пока нет избранных кортов. Добавляйте понравившиеся площадки из поиска.
        </p>
      </div>
    )
  }

  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-semibold text-foreground mb-4">
        Избранное ({courts.length})
      </h2>
      <div className="space-y-3">
        {courts.map((court) => (
          <FavoriteCourtCard
            key={court.id}
            id={court.id}
            image={court.image}
            name={court.name}
            address={court.address}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  )
}
