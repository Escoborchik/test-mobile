'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface DatePickerModalProps {
  open: boolean
  onClose: () => void
  selectedDate: Date
  onSelectDate: (date: Date) => void
}

export function DatePickerModal({ open, onClose, selectedDate, onSelectDate }: DatePickerModalProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate))
  const [tempSelectedDate, setTempSelectedDate] = useState(selectedDate)

  if (!open) return null

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ]

  const weekDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    
    // Get the day of week (0 = Sunday, adjust to Monday = 0)
    let firstDayOfWeek = firstDay.getDay() - 1
    if (firstDayOfWeek === -1) firstDayOfWeek = 6
    
    const days: (Date | null)[] = []
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }

  const days = getDaysInMonth(currentMonth)

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const isSameDay = (date1: Date | null, date2: Date) => {
    if (!date1) return false
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

  const handleConfirm = () => {
    onSelectDate(tempSelectedDate)
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-3xl w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div className="flex justify-center py-2.5">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Title */}
        <div className="px-5 pb-3 pt-1">
          <h2 className="text-gray-900 text-lg font-bold">Выберите дату</h2>
        </div>

        {/* Month Navigation */}
        <div className="px-5 pb-4 flex items-center justify-between">
          <button
            onClick={previousMonth}
            className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="text-gray-900 text-base font-semibold">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}г.
          </h3>
          <button
            onClick={nextMonth}
            className="w-9 h-9 rounded-full hover:bg-emerald-50 flex items-center justify-center text-emerald-600 hover:text-emerald-700 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="px-5 pb-4">
          {/* Week day headers */}
          <div className="grid grid-cols-7 gap-1.5 mb-2">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-gray-600 text-xs font-semibold">
                {day}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {days.map((day, index) => (
              <button
                key={index}
                onClick={() => day && setTempSelectedDate(day)}
                disabled={!day}
                className={`
                  aspect-square rounded-lg flex items-center justify-center text-sm font-semibold
                  transition-all duration-200
                  ${!day ? 'invisible' : ''}
                  ${
                    day && isSameDay(day, tempSelectedDate)
                      ? 'bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-lg scale-105'
                      : 'text-gray-700 hover:bg-gray-100 hover:scale-105'
                  }
                `}
              >
                {day?.getDate()}
              </button>
            ))}
          </div>
        </div>

        {/* Confirm Button */}
        <div className="px-5 pb-6 pt-2">
          <button
            onClick={handleConfirm}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-base font-bold hover:shadow-xl hover:shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  )
}
