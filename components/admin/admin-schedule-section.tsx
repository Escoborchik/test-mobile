'use client'

import { useState } from 'react'
import { ChevronDown, Plus } from 'lucide-react'
import { DatePickerModal } from '@/components/date-picker-modal'
import { ScheduleSlot } from './schedule-slot'
import { AddBookingSheet } from './add-booking-sheet'
import { ScheduleBookingDetailSheet } from './schedule-booking-detail-sheet'

interface TimeSlot {
  id: string
  startTime: string
  endTime: string
  status: 'available' | 'booked' | 'pending' | 'awaiting-payment'
  clientName?: string
  clientPhone?: string
  clientEmail?: string
  price?: number
  isRecurring?: boolean
  recurringDetails?: {
    startDate: string
    endDate: string
    daysOfWeek: string[]
    totalSessions: number
    remainingSessions: number
    totalAmount: number
  }
}

export function AdminScheduleSection() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedCourt, setSelectedCourt] = useState('Корт №1')
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showCourtFilter, setShowCourtFilter] = useState(false)
  const [showAddBooking, setShowAddBooking] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)

  const courts = [
    { name: 'Корт №1', type: 'Открытый', surface: 'Хард', address: 'ул. Спортивная, 12', sport: 'Теннис' },
    { name: 'Корт №2', type: 'Закрытый', surface: 'Грунт', address: 'пр. Ленина, 45', sport: 'Теннис' },
    { name: 'Корт №3', type: 'Открытый', surface: 'Трава', address: 'ул. Парковая, 8', sport: 'Падел' },
  ]

  const currentCourt = courts.find((c) => c.name === selectedCourt) || courts[0]

  const timeSlots: TimeSlot[] = [
    { id: '1', startTime: '08:00', endTime: '10:00', status: 'available' },
    {
      id: '2',
      startTime: '10:00',
      endTime: '12:00',
      status: 'booked',
      clientName: 'Иванов Иван Иванович',
      clientPhone: '+7 (900) 123-45-67',
      clientEmail: 'ivan@example.com',
      price: 2000,
    },
    { id: '3', startTime: '12:00', endTime: '14:00', status: 'available' },
    {
      id: '4',
      startTime: '14:00',
      endTime: '16:00',
      status: 'pending',
      clientName: 'Петрова Мария Сергеевна',
      clientPhone: '+7 (900) 234-56-78',
      clientEmail: 'maria@example.com',
      price: 2200,
    },
    { id: '5', startTime: '16:00', endTime: '18:00', status: 'available' },
    {
      id: '6',
      startTime: '18:00',
      endTime: '23:00',
      status: 'booked',
      clientName: 'Сидоров Алексей Петрович',
      clientPhone: '+7 (900) 345-67-89',
      clientEmail: 'alex@example.com',
      price: 5000,
      isRecurring: true,
      recurringDetails: {
        startDate: '15 янв 2025',
        endDate: '15 фев 2025',
        daysOfWeek: ['Понедельник', 'Среда', 'Пятница'],
        totalSessions: 12,
        remainingSessions: 10,
        totalAmount: 60000,
      },
    },
  ]

  // Group consecutive slots with the same status
  const groupedSlots: TimeSlot[] = []
  for (let i = 0; i < timeSlots.length; i++) {
    const currentSlot = timeSlots[i]
    
    if (currentSlot.status === 'available') {
      // Look ahead for consecutive available slots
      let endIndex = i
      while (
        endIndex + 1 < timeSlots.length &&
        timeSlots[endIndex + 1].status === 'available'
      ) {
        endIndex++
      }
      
      groupedSlots.push({
        ...currentSlot,
        endTime: timeSlots[endIndex].endTime,
      })
      
      i = endIndex
    } else {
      groupedSlots.push(currentSlot)
    }
  }

  return (
    <div className="pb-4">
      {/* Filters */}
      <div className="px-4 py-4 space-y-3 bg-muted/50">
        <div className="flex gap-2">
          <button
            onClick={() => setShowDatePicker(true)}
            className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-border"
          >
            <span className="text-sm">
              {selectedDate.toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
            <ChevronDown className="w-4 h-4" />
          </button>

          <div className="relative flex-1">
            <button
              onClick={() => setShowCourtFilter(!showCourtFilter)}
              className="w-full flex items-center justify-between gap-2 px-4 py-2 bg-card rounded-lg border border-border"
            >
              <span className="text-sm">{selectedCourt}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showCourtFilter && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-lg shadow-lg border border-border z-10 max-h-64 overflow-y-auto">
                {courts.map((court) => (
                  <button
                    key={court.name}
                    onClick={() => {
                      setSelectedCourt(court.name)
                      setShowCourtFilter(false)
                    }}
                    className="block w-full text-left px-4 py-3 hover:bg-muted border-b border-border last:border-0"
                  >
                    <p className="font-medium">{court.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {court.type} • {court.surface} • {court.address}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Court Info */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-3 rounded-lg">
          <p className="text-sm font-medium">{currentCourt.name}</p>
          <p className="text-xs text-muted-foreground">
            {currentCourt.type} • {currentCourt.surface} • {currentCourt.sport} • {currentCourt.address}
          </p>
        </div>
      </div>

      {/* Schedule Slots */}
      <div className="px-4 space-y-2 mt-4">
        {groupedSlots.map((slot) => (
          <ScheduleSlot
            key={slot.id}
            slot={slot}
            onClick={() => {
              if (slot.status !== 'available') {
                setSelectedSlot(slot)
              }
            }}
          />
        ))}
      </div>

      {/* Add Booking Button */}
      <button
        onClick={() => setShowAddBooking(true)}
        className="fixed bottom-20 right-4 bg-gradient-to-r from-primary to-secondary text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity"
      >
        <Plus className="w-6 h-6" />
      </button>

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

      {/* Add Booking Sheet */}
      {showAddBooking && (
        <AddBookingSheet
          onClose={() => setShowAddBooking(false)}
          defaultCourt={selectedCourt}
          defaultDate={selectedDate}
        />
      )}

      {/* Booking Detail Sheet */}
      {selectedSlot && (
        <ScheduleBookingDetailSheet
          slot={selectedSlot}
          courtName={selectedCourt}
          courtInfo={currentCourt}
          onClose={() => setSelectedSlot(null)}
        />
      )}
    </div>
  )
}
