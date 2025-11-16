'use client'

import { Clock, MapPin, Repeat } from 'lucide-react'

interface Booking {
  id: string
  clientName: string
  courtName: string
  date: string
  time: string
  price: number
  isRecurring: boolean
}

interface AdminBookingCardProps {
  booking: Booking
  onConfirm: (id: string) => void
  onReject: (id: string) => void
  onClick: () => void
}

export function AdminBookingCard({ booking, onConfirm, onReject, onClick }: AdminBookingCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-card rounded-lg border border-border p-4 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-lg">{booking.clientName}</h3>
          <p className="text-sm text-muted-foreground">{booking.courtName}</p>
        </div>
        {booking.isRecurring && (
          <div className="flex items-center gap-1 px-2 py-1 bg-secondary/20 text-secondary rounded-full text-xs">
            <Repeat className="w-3 h-3" />
            Повторяющееся
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{booking.date} • {booking.time}</span>
        </div>
        <span className="font-semibold text-accent">{booking.price} ₽</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onConfirm(booking.id)
          }}
          className="flex-1 bg-success text-success-foreground py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Подтвердить
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onReject(booking.id)
          }}
          className="flex-1 bg-destructive text-destructive-foreground py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Отклонить
        </button>
      </div>
    </div>
  )
}
