'use client'

import { X, Phone, Mail, MapPin, Clock, Calendar } from 'lucide-react'
import { Booking, BookingStatus } from './bookings-section'
import { useState } from 'react'

interface BookingDetailSheetProps {
  booking: Booking | null
  open: boolean
  onClose: () => void
}

const statusLabels: Record<BookingStatus, string> = {
  pending_payment: 'Ожидает оплаты',
  awaiting_confirmation: 'Оплачено и ожидает подтверждения',
  confirmed: 'Подтверждено',
  cancelled_refund: 'Отменено (с возвратом)',
  cancelled_no_refund: 'Отменено (без возврата)',
  rejected_refund: 'Отклонено (с возвратом)',
  rejected_no_refund: 'Отклонено (без возврата)',
}

const statusColors: Record<BookingStatus, string> = {
  pending_payment: 'bg-amber-100 text-amber-800',
  awaiting_confirmation: 'bg-blue-100 text-blue-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled_refund: 'bg-gray-100 text-gray-800',
  cancelled_no_refund: 'bg-gray-100 text-gray-800',
  rejected_refund: 'bg-red-100 text-red-800',
  rejected_no_refund: 'bg-red-100 text-red-800',
}

export function BookingDetailSheet({ booking, open, onClose }: BookingDetailSheetProps) {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  if (!open || !booking) return null

  const formattedDate = new Date(booking.date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const handleCancel = () => {
    setShowCancelConfirm(true)
  }

  const confirmCancel = () => {
    // Here would be actual cancellation logic
    console.log('[v0] Booking cancelled:', booking.id)
    setShowCancelConfirm(false)
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 bg-card rounded-t-3xl z-50 animate-slide-up max-h-[70vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-4 py-4 flex justify-between items-center rounded-t-3xl">
          <h2 className="text-lg font-semibold">Детали бронирования</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Court and Organization */}
          <section>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Корт и организация
            </h3>
            <div className="space-y-2">
              <p className="font-semibold text-lg">{booking.courtName}</p>
              <p className="text-muted-foreground">{booking.organization}</p>
              <div className="flex gap-2 text-sm">
                <span className="px-2 py-1 bg-muted rounded">{booking.courtType}</span>
                <span className="px-2 py-1 bg-muted rounded">{booking.surface}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{booking.address}</span>
              </div>
            </div>
          </section>

          {/* Booking Details */}
          <section>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Детали бронирования
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <span>{booking.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Статус:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    statusColors[booking.status]
                  }`}
                >
                  {statusLabels[booking.status]}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="font-medium">Цена:</span>
                <span className="font-bold text-lg text-accent">{booking.price} ₽</span>
              </div>
            </div>
          </section>

          {/* Contact Details */}
          <section>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Контактные данные клуба
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <a href={`tel:${booking.phone}`} className="text-accent hover:underline">
                  {booking.phone}
                </a>
              </div>
              {booking.email && (
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <a
                    href={`mailto:${booking.email}`}
                    className="text-accent hover:underline"
                  >
                    {booking.email}
                  </a>
                </div>
              )}
            </div>
          </section>

          {/* Actions */}
          <section className="space-y-3">
            {booking.canCancel && (
              <button
                onClick={handleCancel}
                className="w-full py-3 bg-destructive text-white rounded-lg font-medium hover:bg-destructive/90 transition-colors"
              >
                Отменить бронь
              </button>
            )}
            <a
              href={`tel:${booking.phone}`}
              className="block w-full py-3 bg-accent text-white rounded-lg font-medium text-center hover:bg-accent/90 transition-colors"
            >
              Позвонить в клуб
            </a>
          </section>
        </div>
      </div>

      {/* Cancel Confirmation Dialog */}
      {showCancelConfirm && (
        <>
          <div
            className="fixed inset-0 bg-black/70 z-50"
            onClick={() => setShowCancelConfirm(false)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card rounded-2xl p-6 z-50 max-w-sm w-[90%]">
            <h3 className="text-lg font-semibold mb-3">Отменить бронирование?</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Вы уверены, что хотите отменить бронирование?
            </p>
            {booking.refundPolicy && (
              <p className="text-sm text-muted-foreground mb-4">
                <span className="font-medium">Политика возврата:</span> {booking.refundPolicy}
              </p>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 py-2 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={confirmCancel}
                className="flex-1 py-2 bg-destructive text-white rounded-lg font-medium hover:bg-destructive/90 transition-colors"
              >
                Да, отменить
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
