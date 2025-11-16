'use client'

import { useState } from 'react'
import { ChevronDown, Filter } from 'lucide-react'
import { AdminBookingCard } from './admin-booking-card'
import { AdminBookingDetailSheet } from './admin-booking-detail-sheet'
import { DatePickerModal } from '@/components/date-picker-modal'

interface Booking {
  id: string
  clientName: string
  clientPhone: string
  clientEmail: string
  courtName: string
  courtType: string
  courtSurface: string
  sport: string
  isIndoor: boolean
  address: string
  date: string
  time: string
  price: number
  status: 'pending' | 'confirmed'
  isRecurring: boolean
  recurringDetails?: {
    startDate: string
    endDate: string
    daysOfWeek: string[]
    totalSessions: number
    remainingSessions: number
    totalAmount: number
  }
}

export function AdminBookingsSection() {
  const [activeTab, setActiveTab] = useState<'pending' | 'confirmed'>('pending')
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedCourt, setSelectedCourt] = useState('all')
  const [showCourtFilter, setShowCourtFilter] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  const courts = ['all', 'Корт №1', 'Корт №2', 'Корт №3']

  const bookings: Booking[] = [
    {
      id: '1',
      clientName: 'Иван Иванов',
      clientPhone: '+7 (900) 123-45-67',
      clientEmail: 'ivan@example.com',
      courtName: 'Корт №1',
      courtType: 'Открытый',
      courtSurface: 'Хард',
      sport: 'Теннис',
      isIndoor: false,
      address: 'ул. Спортивная, 12',
      date: '15 янв 2025',
      time: '10:00–11:00',
      price: 2000,
      status: 'pending',
      isRecurring: false,
    },
    {
      id: '2',
      clientName: 'Мария Петрова',
      clientPhone: '+7 (900) 234-56-78',
      clientEmail: 'maria@example.com',
      courtName: 'Корт №2',
      courtType: 'Закрытый',
      courtSurface: 'Грунт',
      sport: 'Теннис',
      isIndoor: true,
      address: 'пр. Ленина, 45',
      date: '16 янв 2025',
      time: '14:00–15:00',
      price: 2500,
      status: 'pending',
      isRecurring: true,
      recurringDetails: {
        startDate: '16 янв 2025',
        endDate: '16 фев 2025',
        daysOfWeek: ['Понедельник', 'Среда', 'Пятница'],
        totalSessions: 12,
        remainingSessions: 12,
        totalAmount: 30000,
      },
    },
    {
      id: '3',
      clientName: 'Алексей Сидоров',
      clientPhone: '+7 (900) 345-67-89',
      clientEmail: 'alex@example.com',
      courtName: 'Корт №1',
      courtType: 'Открытый',
      courtSurface: 'Хард',
      sport: 'Теннис',
      isIndoor: false,
      address: 'ул. Спортивная, 12',
      date: '17 янв 2025',
      time: '18:00–19:00',
      price: 2200,
      status: 'confirmed',
      isRecurring: false,
    },
  ]

  const pendingBookings = bookings.filter((b) => b.status === 'pending')
  const confirmedBookings = bookings.filter((b) => b.status === 'confirmed')
  const displayedBookings = activeTab === 'pending' ? pendingBookings : confirmedBookings

  const handleConfirm = (id: string) => {
    console.log('[v0] Confirming booking:', id)
    // Toast notification would be shown here
  }

  const handleReject = (id: string) => {
    console.log('[v0] Rejecting booking:', id)
    // Toast notification would be shown here
  }

  return (
    <div className="pb-4">
      {/* Tabs */}
      <div className="flex gap-2 px-4 py-4 border-b border-border bg-card">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'pending'
              ? 'bg-warning text-warning-foreground'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          Ожидающие ({pendingBookings.length})
        </button>
        <button
          onClick={() => setActiveTab('confirmed')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'confirmed'
              ? 'bg-success text-success-foreground'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          Подтверждённые
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 px-4 py-4 bg-muted/50">
        <button
          onClick={() => setShowDatePicker(true)}
          className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-border"
        >
          <span className="text-sm">
            {selectedDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
          </span>
          <ChevronDown className="w-4 h-4" />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowCourtFilter(!showCourtFilter)}
            className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-border"
          >
            <span className="text-sm">
              {selectedCourt === 'all' ? 'Все корты' : selectedCourt}
            </span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {showCourtFilter && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-card rounded-lg shadow-lg border border-border z-10">
              {courts.map((court) => (
                <button
                  key={court}
                  onClick={() => {
                    setSelectedCourt(court)
                    setShowCourtFilter(false)
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-muted text-sm"
                >
                  {court === 'all' ? 'Все корты' : court}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bookings List */}
      <div className="px-4 space-y-3">
        {displayedBookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Нет {activeTab === 'pending' ? 'ожидающих' : 'подтверждённых'} бронирований</p>
          </div>
        ) : (
          displayedBookings.map((booking) => (
            <AdminBookingCard
              key={booking.id}
              booking={booking}
              onConfirm={handleConfirm}
              onReject={handleReject}
              onClick={() => setSelectedBooking(booking)}
            />
          ))
        )}
      </div>

      {/* Date Picker Modal */}
      <DatePickerModal
        open={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        selectedDate={selectedDate}
        onSelectDate={(date) => {
          setSelectedDate(date)
          setShowDatePicker(false)
        }}
      />

      {/* Booking Detail Sheet */}
      {selectedBooking && (
        <AdminBookingDetailSheet
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onConfirm={handleConfirm}
          onReject={handleReject}
        />
      )}
    </div>
  )
}
