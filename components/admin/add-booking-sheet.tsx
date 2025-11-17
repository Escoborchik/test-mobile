"use client";

import { useState, useEffect } from "react";
import { X, Calendar } from "lucide-react";
import { DatePickerModal } from "@/components/date-picker-modal";
import { TimePickerModal } from "@/components/time-picker-modal";

interface CourtInfo {
  name: string;
  type: string;
  surface: string;
  address: string;
  sport: string;
}

interface AddBookingSheetProps {
  onClose: () => void;
  defaultCourt: string;
  defaultDate: Date;
  courtInfo: CourtInfo;
}

type TariffType = "single" | "subscription" | "student";

export function AddBookingSheet({
  onClose,
  defaultCourt,
  defaultDate,
  courtInfo,
}: AddBookingSheetProps) {
  // Информация о клиенте
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  // Детали бронирования
  const [tariff, setTariff] = useState<TariffType>("single");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("11:00");
  const [date, setDate] = useState(defaultDate);

  // Для абонемента
  const [startDate, setStartDate] = useState(defaultDate);
  const [endDate, setEndDate] = useState(
    new Date(defaultDate.getTime() + 30 * 24 * 60 * 60 * 1000)
  );
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  // Modals
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [showTariffDropdown, setShowTariffDropdown] = useState(false);

  const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  const tariffOptions = [
    { value: "single", label: "Разовый" },
    { value: "subscription", label: "Абонемент" },
    { value: "student", label: "Студенческий" },
  ] as const;

  // Расчет времени окончания (+1 час к началу)
  useEffect(() => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const newHours = (hours + 1) % 24;
    setEndTime(
      `${String(newHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
    );
  }, [startTime]);

  // Закрытие dropdown при клике вне его области
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-tariff-dropdown]")) {
        setShowTariffDropdown(false);
      }
    };

    if (showTariffDropdown) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showTariffDropdown]);

  // Расчет количества занятий и суммы
  const calculateBookingDetails = () => {
    if (tariff === "subscription") {
      const msPerDay = 24 * 60 * 60 * 1000;
      const diffDays =
        Math.ceil((endDate.getTime() - startDate.getTime()) / msPerDay) + 1;
      const weeks = Math.ceil(diffDays / 7);
      const sessions = weeks * selectedDays.length;
      const pricePerSession = 1000;
      return { sessions, total: sessions * pricePerSession };
    } else {
      const pricePerSession = tariff === "student" ? 800 : 1000;
      return { sessions: 1, total: pricePerSession };
    }
  };

  const { sessions, total } = calculateBookingDetails();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding booking:", {
      fullName,
      phone,
      tariff,
      startTime,
      endTime,
      date:
        tariff === "subscription" ? { startDate, endDate, selectedDays } : date,
      sessions,
      total,
    });
    onClose();
  };

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-card rounded-t-3xl shadow-xl max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-4 py-4 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-lg font-bold">Добавить бронь</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* 3. Информация о корте */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">
              Информация о корте
            </h3>
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Название:</span>
                <span className="text-sm font-medium">{courtInfo.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Адрес:</span>
                <span className="text-sm font-medium">{courtInfo.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Тип:</span>
                <span className="text-sm font-medium">{courtInfo.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Покрытие:</span>
                <span className="text-sm font-medium">{courtInfo.surface}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Вид спорта:
                </span>
                <span className="text-sm font-medium">{courtInfo.sport}</span>
              </div>
            </div>
          </div>

          {/* 1. Информация о клиенте */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">
              Информация о клиенте
            </h3>
            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
              <div>
                <label className="block text-sm font-medium mb-2">
                  ФИ клиента
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Иван Иванов"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Телефон
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="+7 (900) 123-45-67"
                  required
                />
              </div>
            </div>
          </div>

          {/* 2. Детали бронирования */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">
              Детали бронирования
            </h3>
            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
              {/* Тариф */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Тариф бронирования
                </label>
                <div data-tariff-dropdown>
                  <button
                    type="button"
                    onClick={() => setShowTariffDropdown(!showTariffDropdown)}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-left flex items-center justify-between hover:border-primary/50 transition-colors"
                  >
                    <p className="font-medium">
                      {tariffOptions.find((t) => t.value === tariff)?.label}
                    </p>
                    <svg
                      className={`w-5 h-5 text-muted-foreground transition-transform ${
                        showTariffDropdown ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
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
                    <div className="mt-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
                      {tariffOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setTariff(option.value);
                            setShowTariffDropdown(false);
                          }}
                          className={`w-full px-4 py-2 text-left hover:bg-muted transition-colors border-b border-border last:border-0 ${
                            tariff === option.value ? "bg-primary/5" : ""
                          }`}
                        >
                          <p className="font-medium">{option.label}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Время бронирования */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Время начала
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowStartTimePicker(true)}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-left font-medium"
                  >
                    {startTime}
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Время конца
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowEndTimePicker(true)}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-left font-medium"
                  >
                    {endTime}
                  </button>
                </div>
              </div>

              {/* День бронирования */}
              {tariff === "subscription" ? (
                /* Абонемент */
                <div className="space-y-3 p-4 bg-background rounded-lg border border-border">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Дата начала
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowStartDatePicker(true)}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-left flex items-center gap-2 text-sm"
                      >
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {startDate.toLocaleDateString("ru-RU", {
                          day: "numeric",
                          month: "short",
                        })}
                      </button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Дата конца
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowEndDatePicker(true)}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-left flex items-center gap-2 text-sm"
                      >
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {endDate.toLocaleDateString("ru-RU", {
                          day: "numeric",
                          month: "short",
                        })}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Дни недели
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {weekDays.map((day) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleDay(day)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            selectedDays.includes(day)
                              ? "bg-primary text-white"
                              : "bg-background border border-border hover:bg-muted"
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Разовый/Студенческий */
                <div>
                  <label className="block text-sm font-medium mb-2">
                    День бронирования
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowDatePicker(true)}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-left flex items-center gap-2"
                  >
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    {date.toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 4. Итого */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                Количество занятий:
              </span>
              <span className="font-semibold text-lg">{sessions}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Итоговая сумма:
              </span>
              <span className="font-bold text-xl text-accent">{total} ₽</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Сохранить
          </button>
        </form>

        {/* Modals */}
        <DatePickerModal
          open={showDatePicker}
          onClose={() => setShowDatePicker(false)}
          selectedDate={date}
          onSelectDate={(newDate) => {
            setDate(newDate);
            setShowDatePicker(false);
          }}
        />

        <DatePickerModal
          open={showStartDatePicker}
          onClose={() => setShowStartDatePicker(false)}
          selectedDate={startDate}
          onSelectDate={(newDate) => {
            setStartDate(newDate);
            setShowStartDatePicker(false);
          }}
        />

        <DatePickerModal
          open={showEndDatePicker}
          onClose={() => setShowEndDatePicker(false)}
          selectedDate={endDate}
          onSelectDate={(newDate) => {
            setEndDate(newDate);
            setShowEndDatePicker(false);
          }}
        />

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
      </div>
    </>
  );
}
