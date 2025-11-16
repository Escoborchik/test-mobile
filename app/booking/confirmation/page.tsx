'use client'

import { CheckCircle2, Calendar, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function BookingConfirmationPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        {/* Success Icon */}
        <div className="flex justify-center">
          <CheckCircle2 className="w-20 h-20 text-green-500" />
        </div>

        {/* Success Message */}
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Бронирование подтверждено!</h1>
          <p className="text-muted-foreground">
            Спасибо за бронирование. Детали отправлены на вашу почту.
          </p>
        </div>

        {/* Booking Details */}
        <div className="bg-card rounded-xl p-6 border border-border space-y-4">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-accent mt-1" />
            <div className="text-left">
              <p className="text-sm text-muted-foreground">Дата</p>
              <p className="font-medium text-foreground">16 ноября 2025</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-accent mt-1" />
            <div className="text-left">
              <p className="text-sm text-muted-foreground">Время</p>
              <p className="font-medium text-foreground">18:00–20:00</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => router.push('/')}
            className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Вернуться на главную
          </button>
          <button
            onClick={() => router.push('/?tab=bookings')}
            className="w-full h-12 rounded-xl border border-border text-foreground font-semibold hover:bg-muted transition-colors"
          >
            Мои бронирования
          </button>
        </div>
      </div>
    </div>
  )
}
