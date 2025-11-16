'use client'

import { useState } from 'react'
import { X, Calendar, Clock } from 'lucide-react'
import { DatePickerModal } from '@/components/date-picker-modal'

interface AddBookingSheetProps {
  onClose: () => void
  defaultCourt: string
  defaultDate: Date
}

export function AddBookingSheet({ onClose, defaultCourt, defaultDate }: AddBookingSheetProps) {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [court, setCourt] = useState(defaultCourt)
  const [date, setDate] = useState(defaultDate)
  const [startTime, setStartTime] = useState('10:00')
  const [endTime, setEndTime] = useState('11:00')
  const [isRecurring, setIsRecurring] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)

  const courts = ['Корт №1', 'Корт №2', 'Корт №3']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] Adding booking:', { fullName, phone, court, date, startTime, endTime, isRecurring })
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-card rounded-t-3xl shadow-xl max-h-[70vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-4 py-4 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-lg font-bold">Добавить бронь</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">ФИО клиента</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Иванов Иван Иванович"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Телефон</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="+7 (900) 123-45-67"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Корт</label>
            <select
              value={court}
              onChange={(e) => setCourt(e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {courts.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Дата</label>
            <button
              type="button"
              onClick={() => setShowDatePicker(true)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-left flex items-center gap-2"
            >
              <Calendar className="w-5 h-5 text-muted-foreground" />
              {date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Время начала</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Время конца</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="recurring"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="recurring" className="text-sm">
              Повторяющееся бронирование
            </label>
          </div>

          {isRecurring && (
            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Дата начала</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Дата конца</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Дни недели</label>
                <div className="flex flex-wrap gap-2">
                  {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
                    <button
                      key={day}
                      type="button"
                      className="px-3 py-1 bg-background border border-border rounded-lg text-sm hover:bg-primary hover:text-white transition-colors"
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Сохранить
          </button>
        </form>

        {/* Date Picker Modal */}
        <DatePickerModal
          open={showDatePicker}
          onClose={() => setShowDatePicker(false)}
          selectedDate={date}
          onSelectDate={(newDate) => {
            setDate(newDate)
            setShowDatePicker(false)
          }}
        />
      </div>
    </>
  )
}
