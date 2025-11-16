"use client";

import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { TimePickerModal } from "@/components/time-picker-modal";
import { DatePickerModal } from "@/components/date-picker-modal";

function BookingStep1Content() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const courtId = searchParams.get("court");
  const slot = searchParams.get("slot");
  const dateStr = searchParams.get("date");
  const initialDate = dateStr ? new Date(dateStr) : new Date();

  const [startTime, setStartTime] = useState<string | null>(
    slot ? slot.split("–")[0] : null
  );
  const [endTime, setEndTime] = useState<string | null>(
    slot ? slot.split("–")[1] : null
  );
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [isSubscription, setIsSubscription] = useState(false);
  const [startDate, setStartDate] = useState(initialDate);
  const [endDate, setEndDate] = useState(
    new Date(initialDate.getTime() + 30 * 24 * 60 * 60 * 1000)
  ); // +30 days
  const [selectedWeekdays, setSelectedWeekdays] = useState<number[]>([1, 3, 5]); // Пн, Ср, Пт
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatShortDate = (date: Date) => {
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
    });
  };

  const weekdays = [
    { id: 1, short: "Пн", full: "Понедельник" },
    { id: 2, short: "Вт", full: "Вторник" },
    { id: 3, short: "Ср", full: "Среда" },
    { id: 4, short: "Чт", full: "Четверг" },
    { id: 5, short: "Пт", full: "Пятница" },
    { id: 6, short: "Сб", full: "Суббота" },
    { id: 0, short: "Вс", full: "Воскресенье" },
  ];

  const toggleWeekday = (dayId: number) => {
    setSelectedWeekdays((prev) =>
      prev.includes(dayId) ? prev.filter((d) => d !== dayId) : [...prev, dayId]
    );
  };

  const calculateSessions = () => {
    if (!isSubscription) return 1;

    let count = 0;
    const current = new Date(startDate);
    const end = new Date(endDate);

    while (current <= end) {
      if (selectedWeekdays.includes(current.getDay())) {
        count++;
      }
      current.setDate(current.getDate() + 1);
    }

    return count;
  };

  const calculateTotalCost = () => {
    const sessions = calculateSessions();
    const pricePerSession = 2000;
    return sessions * pricePerSession;
  };

  // Mock court data
  const courtData = {
    name: "Корт №1",
    organization: "Теннисный клуб «Премьер»",
    characteristics: ["Хард", "Открытый", "Теннис"],
    address: "ул. Спортивная, 12",
    image: "/outdoor-tennis-court.png",
  };

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
            <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-semibold">
              1
            </div>
            <span className="text-sm font-medium text-foreground">Детали</span>
          </div>
          <div className="flex-1 h-0.5 bg-border mx-2" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-semibold">
              2
            </div>
            <span className="text-sm text-muted-foreground">Данные</span>
          </div>
          <div className="flex-1 h-0.5 bg-border mx-2" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-semibold">
              3
            </div>
            <span className="text-sm text-muted-foreground">Оплата</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 pb-24 space-y-6">
        {/* Court Info */}
        <div className="bg-card rounded-xl overflow-hidden border border-border">
          <img
            src={courtData.image || "/placeholder.svg"}
            alt={courtData.name}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold text-foreground">
              {courtData.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              {courtData.organization}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {courtData.address}
            </p>
            <p className="text-sm text-foreground mt-2">
              {courtData.characteristics.join(" • ")}
            </p>
          </div>
        </div>

        {/* Subscription Toggle */}
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">Абонемент</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Забронировать на несколько дней
              </p>
            </div>
            <button
              onClick={() => setIsSubscription(!isSubscription)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-200 ${
                isSubscription ? "bg-emerald-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-200 ${
                  isSubscription ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Booking Details */}
        <div className="bg-card rounded-xl p-4 border border-border space-y-4">
          <h3 className="font-semibold text-foreground">Детали бронирования</h3>

          {/* Single booking */}
          {!isSubscription && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Дата:</span>
                <span className="text-foreground font-medium">
                  {formatDate(initialDate)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Время начала:</span>
                <button
                  onClick={() => setShowStartTimePicker(true)}
                  className="flex items-center justify-center gap-2 w-[110px] px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Clock className="w-4 h-4 text-gray-600" />
                  <span className="text-foreground font-medium">
                    {startTime || "Выбрать"}
                  </span>
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Время конца:</span>
                <button
                  onClick={() => setShowEndTimePicker(true)}
                  className="flex items-center justify-center gap-2 w-[110px] px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Clock className="w-4 h-4 text-gray-600" />
                  <span className="text-foreground font-medium">
                    {endTime || "Выбрать"}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Subscription booking */}
          {isSubscription && (
            <div className="space-y-4">
              {/* Date range */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Дата начала:</span>
                  <button
                    onClick={() => setShowStartDatePicker(true)}
                    className="flex items-center justify-center gap-2 w-[110px] px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <CalendarDays className="w-4 h-4 text-gray-600" />
                    <span className="text-foreground font-medium">
                      {formatShortDate(startDate)}
                    </span>
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Дата конца:</span>
                  <button
                    onClick={() => setShowEndDatePicker(true)}
                    className="flex items-center justify-center gap-2 w-[110px] px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <CalendarDays className="w-4 h-4 text-gray-600" />
                    <span className="text-foreground font-medium">
                      {formatShortDate(endDate)}
                    </span>
                  </button>
                </div>
              </div>

              {/* Time */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Время начала:</span>
                  <button
                    onClick={() => setShowStartTimePicker(true)}
                    className="flex items-center justify-center gap-2 w-[110px] px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="text-foreground font-medium">
                      {startTime || "Выбрать"}
                    </span>
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Время конца:</span>
                  <button
                    onClick={() => setShowEndTimePicker(true)}
                    className="flex items-center justify-center gap-2 w-[110px] px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="text-foreground font-medium">
                      {endTime || "Выбрать"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Weekdays */}
              <div>
                <p className="text-muted-foreground mb-2">Дни недели:</p>
                <div className="flex gap-1.5">
                  {weekdays.map((day) => (
                    <button
                      key={day.id}
                      onClick={() => toggleWeekday(day.id)}
                      className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                        selectedWeekdays.includes(day.id)
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {day.short}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Summary */}
          <div className="pt-3 border-t border-border space-y-2">
            {isSubscription && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Количество занятий:
                </span>
                <span className="text-foreground font-semibold">
                  {calculateSessions()}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Итого:</span>
              <span className="text-xl font-bold text-emerald-600">
                {calculateTotalCost().toLocaleString()} ₽
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <button
          onClick={() => router.push("/booking/step2")}
          disabled={!startTime || !endTime}
          className={`w-full h-12 rounded-xl font-semibold transition-all ${
            startTime && endTime
              ? "bg-emerald-600 text-white hover:bg-emerald-700"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Продолжить
        </button>
      </div>

      {/* Time Picker Modals */}
      <TimePickerModal
        open={showStartTimePicker}
        onClose={() => setShowStartTimePicker(false)}
        selectedTime={startTime}
        onSelectTime={(time) => {
          setStartTime(time);
          setShowStartTimePicker(false);
        }}
      />
      <TimePickerModal
        open={showEndTimePicker}
        onClose={() => setShowEndTimePicker(false)}
        selectedTime={endTime}
        onSelectTime={(time) => {
          setEndTime(time);
          setShowEndTimePicker(false);
        }}
      />

      {/* Date Pickers */}
      <DatePickerModal
        open={showStartDatePicker}
        onClose={() => setShowStartDatePicker(false)}
        selectedDate={startDate}
        onSelectDate={(date) => {
          setStartDate(date);
          setShowStartDatePicker(false);
        }}
      />
      <DatePickerModal
        open={showEndDatePicker}
        onClose={() => setShowEndDatePicker(false)}
        selectedDate={endDate}
        onSelectDate={(date) => {
          setEndDate(date);
          setShowEndDatePicker(false);
        }}
      />
    </div>
  );
}

export default function BookingStep1Page() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <BookingStep1Content />
    </Suspense>
  );
}
