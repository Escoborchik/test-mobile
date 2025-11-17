"use client";

import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { TimePickerModal } from "@/components/time-picker-modal";
import { DatePickerModal } from "@/components/date-picker-modal";
import { courts } from "@/data/courts";
import { weekdays } from "@/data/weekdays";

function BookingStep1Content() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const courtId = searchParams.get("court");
  const slot = searchParams.get("slot");
  const dateStr = searchParams.get("date");
  const initialDate = dateStr ? new Date(dateStr) : new Date();

  // Get court data
  const courtData = courts.find((court) => court.id === courtId);

  if (!courtData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Корт не найден</p>
      </div>
    );
  }

  const [startTime, setStartTime] = useState<string | null>(
    slot ? slot.split("–")[0] : null
  );
  const [endTime, setEndTime] = useState<string | null>(
    slot ? slot.split("–")[1] : null
  );
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState<number | null>(
    courtData.schedule?.tariffs[0]?.id || null
  );
  const [startDate, setStartDate] = useState(initialDate);
  const [endDate, setEndDate] = useState(
    new Date(initialDate.getTime() + 30 * 24 * 60 * 60 * 1000)
  ); // +30 days
  const [selectedWeekdays, setSelectedWeekdays] = useState<number[]>([1, 3, 5]); // Пн, Ср, Пт
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showTariffDropdown, setShowTariffDropdown] = useState(false);

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

  const toggleWeekday = (dayId: number) => {
    setSelectedWeekdays((prev) =>
      prev.includes(dayId) ? prev.filter((d) => d !== dayId) : [...prev, dayId]
    );
  };

  const selectedTariffData = courtData.schedule?.tariffs.find(
    (t) => t.id === selectedTariff
  );
  const isSubscription = selectedTariffData?.name === "Абонемент";

  const toggleService = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((s) => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  const calculateDuration = () => {
    if (!startTime || !endTime) return 0;
    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;
    return (endMinutes - startMinutes) / 60; // hours
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

  const calculateSessionPrice = () => {
    const duration = calculateDuration();
    const pricePerHour = selectedTariffData?.timeSlots[0]?.price || 0;
    return duration * pricePerHour;
  };

  const calculateTotalCost = () => {
    const sessions = calculateSessions();
    const sessionPrice = calculateSessionPrice();

    // Calculate court cost
    const courtCost = sessions * sessionPrice;

    // Calculate services cost
    const servicesCost = selectedServices.reduce((total, serviceName) => {
      const service = courtData.schedule?.services.find(
        (s) => s.name === serviceName
      );
      return total + (service?.price || 0) * sessions * calculateDuration();
    }, 0);

    return courtCost + servicesCost;
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

        {/* Tariff Selection */}
        {courtData.schedule && courtData.schedule.tariffs.length > 0 && (
          <div className="bg-card rounded-xl p-4 border border-border">
            <h3 className="font-semibold text-foreground mb-3">Тариф</h3>
            <div className="relative">
              <button
                onClick={() => setShowTariffDropdown(!showTariffDropdown)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <span className="text-foreground font-medium">
                  {selectedTariffData?.name || "Выберите тариф"}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-600 transition-transform ${
                    showTariffDropdown ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showTariffDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-border z-10">
                  {courtData.schedule.tariffs.map((tariff) => (
                    <button
                      key={tariff.id}
                      onClick={() => {
                        setSelectedTariff(tariff.id);
                        setShowTariffDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      <p className="font-medium text-foreground">
                        {tariff.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        от {tariff.timeSlots[0].price} ₽/час
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

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
            {calculateSessionPrice() > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Цена за занятие:</span>
                <span className="text-foreground font-semibold">
                  {calculateSessionPrice().toLocaleString()} ₽
                </span>
              </div>
            )}
            {calculateDuration() > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Длительность:</span>
                <span className="text-foreground font-semibold">
                  {calculateDuration()}{" "}
                  {calculateDuration() === 1 ? "час" : "часа"}
                </span>
              </div>
            )}
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
          </div>
        </div>

        {/* Services */}
        {courtData.schedule && courtData.schedule.services.length > 0 && (
          <div className="bg-card rounded-xl p-4 border border-border">
            <h3 className="font-semibold text-foreground mb-3">
              Дополнительные услуги
            </h3>
            <div className="space-y-2">
              {courtData.schedule.services.map((service) => (
                <button
                  key={service.name}
                  onClick={() => toggleService(service.name)}
                  className={`w-full p-3 rounded-lg border-2 transition-all ${
                    selectedServices.includes(service.name)
                      ? "border-emerald-600 bg-emerald-50"
                      : "border-gray-200 bg-white hover:border-emerald-300"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-foreground flex-1 text-left">
                      {service.name}
                    </p>
                    <p className="text-sm text-muted-foreground whitespace-nowrap">
                      {service.price} ₽/час
                    </p>
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                        selectedServices.includes(service.name)
                          ? "border-emerald-600 bg-emerald-600"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedServices.includes(service.name) && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Total Cost */}
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-foreground">
              Итого:
            </span>
            <span className="text-2xl font-bold text-emerald-600">
              {calculateTotalCost().toLocaleString()} ₽
            </span>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <button
          onClick={() => {
            // Save booking data to localStorage
            const bookingData = {
              courtId,
              courtName: courtData.name,
              courtOrganization: courtData.organization,
              tariffName: selectedTariffData?.name,
              startTime,
              endTime,
              duration: calculateDuration(),
              isSubscription,
              startDate: startDate.toISOString(),
              endDate: endDate.toISOString(),
              selectedWeekdays,
              sessions: calculateSessions(),
              sessionPrice: calculateSessionPrice(),
              selectedServices,
              servicesCost: selectedServices.reduce((total, serviceName) => {
                const service = courtData.schedule?.services.find(
                  (s) => s.name === serviceName
                );
                return (
                  total +
                  (service?.price || 0) *
                    calculateSessions() *
                    calculateDuration()
                );
              }, 0),
              totalCost: calculateTotalCost(),
            };
            localStorage.setItem("bookingData", JSON.stringify(bookingData));
            router.push("/booking/step2");
          }}
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
