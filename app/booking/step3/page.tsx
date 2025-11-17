"use client";

import { ArrowLeft, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface BookingData {
  courtName: string;
  courtOrganization: string;
  tariffName: string;
  startTime: string;
  endTime: string;
  duration: number;
  isSubscription: boolean;
  sessions: number;
  sessionPrice: number;
  selectedServices: string[];
  servicesCost: number;
  totalCost: number;
}

export default function BookingStep3Page() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  useEffect(() => {
    // Load booking data from localStorage
    const savedBookingData = localStorage.getItem("bookingData");
    if (savedBookingData) {
      setBookingData(JSON.parse(savedBookingData));
    } else {
      // Redirect back if no booking data
      router.push("/booking/step1");
    }
  }, [router]);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      router.push("/booking/confirmation");
    }, 2000);
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-secondary text-white px-4 py-4 flex items-center gap-3">
        <button onClick={() => router.back()} className="p-1">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold">Бронирование</h1>
      </div>

      {/* Progress Steps */}
      <div className="px-4 py-6 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent/30 text-accent flex items-center justify-center font-semibold">
              ✓
            </div>
            <span className="text-sm text-muted-foreground">Детали</span>
          </div>
          <div className="flex-1 h-0.5 bg-accent mx-2" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent/30 text-accent flex items-center justify-center font-semibold">
              ✓
            </div>
            <span className="text-sm text-muted-foreground">Данные</span>
          </div>
          <div className="flex-1 h-0.5 bg-accent mx-2" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-semibold">
              3
            </div>
            <span className="text-sm font-medium text-foreground">Оплата</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 pb-24 space-y-6">
        {/* Booking Info */}
        <div className="bg-card rounded-xl p-4 border border-border">
          <h3 className="font-semibold text-foreground mb-3">
            Детали бронирования
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Корт:</span>
              <span className="text-foreground font-medium">
                {bookingData.courtName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Тариф:</span>
              <span className="text-foreground font-medium">
                {bookingData.tariffName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Время:</span>
              <span className="text-foreground font-medium">
                {bookingData.startTime} – {bookingData.endTime}
              </span>
            </div>
            {bookingData.isSubscription && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Количество занятий:
                </span>
                <span className="text-foreground font-medium">
                  {bookingData.sessions}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-card rounded-xl p-4 border border-border space-y-3">
          <h3 className="font-semibold text-foreground">Итого к оплате</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Аренда корта{" "}
                {bookingData.isSubscription
                  ? `(${bookingData.sessions} занятий)`
                  : ""}
              </span>
              <span className="text-foreground">
                {(
                  bookingData.sessionPrice * bookingData.sessions
                ).toLocaleString()}{" "}
                ₽
              </span>
            </div>

            {bookingData.selectedServices.length > 0 && (
              <>
                <div className="text-sm font-medium text-muted-foreground mt-2">
                  Дополнительные услуги:
                </div>
                {bookingData.selectedServices.map((service) => (
                  <div
                    key={service}
                    className="flex justify-between text-sm pl-4"
                  >
                    <span className="text-muted-foreground">{service}</span>
                  </div>
                ))}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Услуги (итого)</span>
                  <span className="text-foreground">
                    {bookingData.servicesCost.toLocaleString()} ₽
                  </span>
                </div>
              </>
            )}

            <div className="pt-2 border-t border-border flex justify-between">
              <span className="font-semibold text-foreground">Всего:</span>
              <span className="text-xl font-bold text-accent">
                {bookingData.totalCost.toLocaleString()} ₽
              </span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-card rounded-xl p-4 border border-border">
          <h3 className="font-semibold text-foreground mb-4">Способ оплаты</h3>
          <div className="flex items-center gap-3 p-3 border border-border rounded-xl">
            <CreditCard className="w-6 h-6 text-accent" />
            <div>
              <p className="font-medium text-foreground">Банковская карта</p>
              <p className="text-sm text-muted-foreground">
                Visa, MasterCard, МИР
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full h-12 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? "Обработка..." : "Оплатить и забронировать"}
        </button>
      </div>
    </div>
  );
}
