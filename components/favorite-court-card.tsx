'use client'

import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface FavoriteCourtCardProps {
  id: string
  image: string
  name: string
  address: string
  onToggleFavorite: (id: string) => void
}

export function FavoriteCourtCard({
  id,
  image,
  name,
  address,
  onToggleFavorite,
}: FavoriteCourtCardProps) {
  const router = useRouter()

  const handleBookClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/court/${id}`)
  }

  const handleCardClick = () => {
    router.push(`/court/${id}`)
  }

  return (
    <div
      onClick={handleCardClick}
      className="bg-card rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-4 cursor-pointer transform hover:-translate-y-1 border border-border/50"
    >
      <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden shadow-md group">
        <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite(id)
          }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/95 flex items-center justify-center backdrop-blur-md hover:scale-110 transition-all duration-200 shadow-lg"
        >
          <Heart className="w-4 h-4 fill-red-500 text-red-500" />
        </button>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-foreground text-base mb-2 truncate">{name}</h3>
        <p className="text-sm text-muted-foreground truncate flex items-center gap-1">
          <span className="text-primary">📍</span>
          {address}
        </p>
      </div>

      <button
        onClick={handleBookClick}
        className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
      >
        Забронировать
      </button>
    </div>
  )
}
