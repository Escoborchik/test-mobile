'use client'

import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function NotificationsPage() {
  const router = useRouter()
  const [settings, setSettings] = useState({
    bookingConfirmation: { email: true, push: true },
    bookingChanges: { email: true, push: false },
    discountsNews: { email: false, push: true },
  })

  const handleToggle = (category: keyof typeof settings, type: 'email' | 'push') => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: !prev[category][type],
      },
    }))
  }

  const handleSave = () => {
    // Save notification settings
    console.log('Saving notification settings:', settings)
    router.back()
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-secondary text-white px-4 py-4 flex items-center gap-3">
        <button onClick={handleBack} className="hover:opacity-70">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">Настройки уведомлений</h1>
      </header>

      {/* Content */}
      <div className="px-4 py-6">
        <p className="text-sm text-muted-foreground mb-6">
          Выберите, как вы хотите получать уведомления
        </p>

        <div className="space-y-6">
          {/* Booking Confirmation */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-medium mb-3">Подтверждение бронирования</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm">Email</span>
                <input
                  type="checkbox"
                  checked={settings.bookingConfirmation.email}
                  onChange={() => handleToggle('bookingConfirmation', 'email')}
                  className="w-5 h-5 rounded border-border accent-accent"
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm">Push-уведомления</span>
                <input
                  type="checkbox"
                  checked={settings.bookingConfirmation.push}
                  onChange={() => handleToggle('bookingConfirmation', 'push')}
                  className="w-5 h-5 rounded border-border accent-accent"
                />
              </label>
            </div>
          </div>

          {/* Booking Changes */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-medium mb-3">Изменение / отмена бронирования</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm">Email</span>
                <input
                  type="checkbox"
                  checked={settings.bookingChanges.email}
                  onChange={() => handleToggle('bookingChanges', 'email')}
                  className="w-5 h-5 rounded border-border accent-accent"
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm">Push-уведомления</span>
                <input
                  type="checkbox"
                  checked={settings.bookingChanges.push}
                  onChange={() => handleToggle('bookingChanges', 'push')}
                  className="w-5 h-5 rounded border-border accent-accent"
                />
              </label>
            </div>
          </div>

          {/* Discounts and News */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-medium mb-3">Скидки и новости</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm">Email</span>
                <input
                  type="checkbox"
                  checked={settings.discountsNews.email}
                  onChange={() => handleToggle('discountsNews', 'email')}
                  className="w-5 h-5 rounded border-border accent-accent"
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm">Push-уведомления</span>
                <input
                  type="checkbox"
                  checked={settings.discountsNews.push}
                  onChange={() => handleToggle('discountsNews', 'push')}
                  className="w-5 h-5 rounded border-border accent-accent"
                />
              </label>
            </div>
          </div>
        </div>

        <Button onClick={handleSave} className="w-full mt-6 bg-accent text-white hover:bg-accent/90">
          Сохранить настройки
        </Button>
      </div>
    </div>
  )
}
