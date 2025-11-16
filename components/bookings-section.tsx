'use client'

import { useState } from 'react'
import { BookingCard } from './booking-card'
import { BookingDetailSheet } from './booking-detail-sheet'

export type BookingStatus =
  | 'pending_payment'
  | 'awaiting_confirmation'
  | 'confirmed'
  | 'cancelled_refund'
  | 'cancelled_no_refund'
  | 'rejected_refund'
  | 'rejected_no_refund'

export interface Booking {
  id: string
  courtName: string
  organization: string
  address: string
  date: string
  time: string
  price: number
  status: BookingStatus
  courtType: string
  surface: string
  phone: string
  email?: string
  canCancel: boolean
  refundPolicy?: string
}

const mockBookings: Booking[] = [
  {
    id: '1',
    courtName: 'Корт №1',
    organization: 'Теннисный клуб «Премьер»',
    address: 'ул. Спортивная, 12',
    date: '2025-11-20',
    time: '10:00-11:00',
    price: 2000,
    status: 'confirmed',
    courtType: 'Открытый',
    surface: 'Хард',
    phone: '+7 (912) 345-67-89',
    email: 'info@premier-tennis.ru',
    canCancel: true,
    refundPolicy: 'средства возвращаются за 24 часов до начала',
  },
  {
    id: '2',
    courtName: 'Корт №3',
    organization: 'Спортивный центр «Арена»',
    address: 'пр. Ленина, 45',
    date: '2025-11-22',
    time: '15:00-16:00',
    price: 2500,
    status: 'awaiting_confirmation',
    courtType: 'Закрытый',
    surface: 'Грунт',
    phone: '+7 (912) 456-78-90',
    canCancel: true,
    refundPolicy: 'средства возвращаются за 12 часов до начала',
  },
  {
    id: '3',
    courtName: 'Корт №5',
    organization: 'Клуб «Зеленая лужайка»',
    address: 'ул. Парковая, 8',
    date: '2025-11-18',
    time: '12:00-13:00',
    price: 1800,
    status: 'pending_payment',
    courtType: 'Открытый',
    surface: 'Трава',
    phone: '+7 (912) 567-89-01',
    canCancel: false,
  },
  {
    id: '4',
    courtName: 'Корт №2',
    organization: 'Теннисный клуб «Премьер»',
    address: 'ул. Спортивная, 12',
    date: '2025-11-10',
    time: '14:00-15:00',
    price: 2200,
    status: 'cancelled_refund',
    courtType: 'Открытый',
    surface: 'Хард',
    phone: '+7 (912) 345-67-89',
    canCancel: false,
  },
  {
    id: '5',
    courtName: 'Корт №7',
    organization: 'Спортивный центр «Арена»',
    address: 'пр. Ленина, 45',
    date: '2025-11-05',
    time: '18:00-19:00',
    price: 3000,
    status: 'rejected_no_refund',
    courtType: 'Закрытый',
    surface: 'Хард',
    phone: '+7 (912) 456-78-90',
    canCancel: false,
  },
]

export function BookingsSection() {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  const activeBookings = mockBookings.filter(
    (b) => b.status === 'pending_payment' || b.status === 'awaiting_confirmation' || b.status === 'confirmed'
  )

  const historyBookings = mockBookings.filter(
    (b) =>
      b.status === 'cancelled_refund' ||
      b.status === 'cancelled_no_refund' ||
      b.status === 'rejected_refund' ||
      b.status === 'rejected_no_refund'
  )

  const displayedBookings = activeTab === 'active' ? activeBookings : historyBookings

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Tabs */}
      <div className="flex gap-2 px-4 py-3 bg-white border-b border-gray-200">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
            activeTab === 'active'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Активные
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
            activeTab === 'history'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          История
        </button>
      </div>

      {/* Booking Cards */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
        {displayedBookings.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <p>
              {activeTab === 'active'
                ? 'У вас пока нет активных бронирований'
                : 'История бронирований пуста'}
            </p>
          </div>
        ) : (
          displayedBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onClick={() => setSelectedBooking(booking)}
            />
          ))
        )}
      </div>

      {/* Detail Sheet */}
      <BookingDetailSheet
        booking={selectedBooking}
        open={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </div>
  )
}
