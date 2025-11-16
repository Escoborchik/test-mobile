'use client'

import { useState } from 'react'
import { Calendar, ClipboardList, User } from 'lucide-react'
import { AdminBookingsSection } from '@/components/admin/admin-bookings-section'
import { AdminScheduleSection } from '@/components/admin/admin-schedule-section'
import { ProfileSection } from '@/components/profile-section'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'bookings' | 'schedule' | 'profile'>('bookings')

  return (
    <div className="min-h-screen flex flex-col bg-background pb-16">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-4">
        <h1 className="text-xl font-bold">Админ-панель</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {activeTab === 'bookings' && <AdminBookingsSection />}
        {activeTab === 'schedule' && <AdminScheduleSection />}
        {activeTab === 'profile' && <ProfileSection />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border h-16 flex items-center justify-around">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex flex-col items-center gap-1 ${
            activeTab === 'bookings' ? 'text-accent' : 'text-muted-foreground'
          }`}
        >
          <ClipboardList className="w-6 h-6" />
          <span className="text-xs">Бронирования</span>
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex flex-col items-center gap-1 ${
            activeTab === 'schedule' ? 'text-accent' : 'text-muted-foreground'
          }`}
        >
          <Calendar className="w-6 h-6" />
          <span className="text-xs">Расписание</span>
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 ${
            activeTab === 'profile' ? 'text-accent' : 'text-muted-foreground'
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs">Профиль</span>
        </button>
      </nav>
    </div>
  )
}
