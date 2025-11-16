import { Calendar, Clock, MapPin } from 'lucide-react'
import { Booking, BookingStatus } from './bookings-section'

interface BookingCardProps {
  booking: Booking
  onClick: () => void
}

interface StatusInfo {
  label: string
  color: string
}

// Функция для получения статусов оплаты и подтверждения
const getPaymentAndConfirmationStatus = (status: BookingStatus): { payment: StatusInfo; confirmation: StatusInfo } => {
  const statusMap: Record<BookingStatus, { payment: StatusInfo; confirmation: StatusInfo }> = {
    pending_payment: {
      payment: { label: 'Ожидает оплаты', color: 'bg-amber-50 text-amber-700 border-amber-200' },
      confirmation: { label: '—', color: 'bg-gray-50 text-gray-400 border-gray-200' },
    },
    awaiting_confirmation: {
      payment: { label: 'Оплачено', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
      confirmation: { label: 'Ожидает подтверждения', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    },
    confirmed: {
      payment: { label: 'Оплачено', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
      confirmation: { label: 'Подтверждено', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    },
    cancelled_refund: {
      payment: { label: 'Возврат оформлен', color: 'bg-blue-50 text-blue-700 border-blue-200' },
      confirmation: { label: 'Отменено', color: 'bg-gray-50 text-gray-600 border-gray-200' },
    },
    cancelled_no_refund: {
      payment: { label: 'Оплачено', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
      confirmation: { label: 'Отменено', color: 'bg-gray-50 text-gray-600 border-gray-200' },
    },
    rejected_refund: {
      payment: { label: 'Возврат оформлен', color: 'bg-blue-50 text-blue-700 border-blue-200' },
      confirmation: { label: 'Отклонено', color: 'bg-red-50 text-red-700 border-red-200' },
    },
    rejected_no_refund: {
      payment: { label: 'Оплачено', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
      confirmation: { label: 'Отклонено', color: 'bg-red-50 text-red-700 border-red-200' },
    },
  }

  return statusMap[status]
}

export function BookingCard({ booking, onClick }: BookingCardProps) {
  const formattedDate = new Date(booking.date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const { payment, confirmation } = getPaymentAndConfirmationStatus(booking.status)

  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg hover:border-gray-300 transition-all duration-200"
    >
      {/* Header Section */}
      <div className="px-4 pt-4 pb-3 border-b border-gray-100">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base text-gray-900 mb-1 truncate">
              {booking.courtName}
            </h3>
            <p className="text-sm text-gray-600 truncate">{booking.organization}</p>
          </div>
          <div className="flex flex-col gap-1.5 items-end">
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${payment.color}`}
            >
              {payment.label}
            </span>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${confirmation.color}`}
            >
              {confirmation.label}
            </span>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="px-4 py-3 space-y-2.5">
        {/* Address */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="truncate">{booking.address}</span>
        </div>

        {/* Date & Time */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-900">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{formattedDate} г.</span>
          </div>
          <div className="flex items-center gap-2 text-gray-900">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{booking.time}</span>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="px-4 py-3 bg-white border-t border-gray-100">
        <div className="flex items-center justify-between gap-3">
          <span className="font-semibold text-base text-gray-900">{booking.price} ₽</span>

          {booking.canCancel && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onClick()
              }}
              className="px-4 py-1.5 rounded-lg bg-red-50 text-red-600 text-sm font-semibold border border-red-200 hover:bg-red-100 hover:border-red-300 active:scale-95 transition-all duration-150"
            >
              Отменить
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
