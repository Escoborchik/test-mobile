"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function NotificationsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    bookingConfirmation: { email: true, push: true },
    bookingChanges: { email: true, push: false },
    discountsNews: { email: false, push: true },
  });

  const handleToggle = (
    category: keyof typeof settings,
    type: "email" | "push"
  ) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: !prev[category][type],
      },
    }));
  };

  const handleSave = () => {
    // Save notification settings
    console.log("Saving notification settings:", settings);
    router.back();
  };

  const handleBack = () => {
    router.back();
  };

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
            <h3 className="font-medium mb-3">Бронирования</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Email</span>
                <Switch
                  checked={settings.bookingConfirmation.email}
                  onCheckedChange={() =>
                    handleToggle("bookingConfirmation", "email")
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Push-уведомления</span>
                <Switch
                  checked={settings.bookingConfirmation.push}
                  onCheckedChange={() =>
                    handleToggle("bookingConfirmation", "push")
                  }
                />
              </div>
            </div>
          </div>

          {/* Discounts and News */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-medium mb-3">Скидки и новости</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Email</span>
                <Switch
                  checked={settings.discountsNews.email}
                  onCheckedChange={() => handleToggle("discountsNews", "email")}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Push-уведомления</span>
                <Switch
                  checked={settings.discountsNews.push}
                  onCheckedChange={() => handleToggle("discountsNews", "push")}
                />
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={handleSave}
          className="w-full mt-6 bg-accent text-white hover:bg-accent/90"
        >
          Сохранить настройки
        </Button>
      </div>
    </div>
  );
}
