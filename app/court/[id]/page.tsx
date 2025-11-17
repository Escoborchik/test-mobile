"use client";

import { useState, use, useEffect } from "react";
import {
  ArrowLeft,
  Heart,
  Wifi,
  Droplets,
  Coffee,
  Car,
  Lock,
  Phone,
  Mail,
  MapPin,
  Clock,
  Tag,
  CalendarDays,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { DatePickerModal } from "@/components/date-picker-modal";

import { courts } from "@/data/courts";

interface CourtDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CourtDetailPage({ params }: CourtDetailsProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get("tab") as "info" | "schedule" | null;

  const courtData = courts.find((court) => court.id === resolvedParams.id);

  if (!courtData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Корт не найден</p>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState<"info" | "schedule">(
    tabFromUrl || "info"
  );
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Update tab when URL changes
  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  const getAmenityIcon = (type: string) => {
    switch (type) {
      case "wifi":
        return <Wifi className="w-5 h-5" />;
      case "shower":
        return <Droplets className="w-5 h-5" />;
      case "cafe":
        return <Coffee className="w-5 h-5" />;
      case "parking":
        return <Car className="w-5 h-5" />;
      case "locker":
        return <Lock className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);

    if (compareDate.getTime() === today.getTime()) {
      return "Сегодня";
    }

    return date.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
  };

  const handleBooking = () => {
    if (selectedSlot) {
      router.push(
        `/booking/step1?court=${
          resolvedParams.id
        }&slot=${selectedSlot}&date=${selectedDate.toISOString()}`
      );
    }
  };

  const availableSlots =
    courtData.slots?.filter((slot) => slot.available) || [];

  const groupedSlots = availableSlots.reduce((acc, slot) => {
    if (acc.length === 0) {
      return [
        {
          startTime: slot.time.split("–")[0],
          endTime: slot.time.split("–")[1],
          price: slot.price,
          timeRange: slot.time,
        },
      ];
    }

    const lastGroup = acc[acc.length - 1];
    const currentStart = slot.time.split("–")[0];
    const currentEnd = slot.time.split("–")[1];

    // Check if current slot is consecutive and has same price
    if (lastGroup.endTime === currentStart && lastGroup.price === slot.price) {
      lastGroup.endTime = currentEnd;
      lastGroup.timeRange = `${lastGroup.startTime}–${currentEnd}`;
    } else {
      acc.push({
        startTime: currentStart,
        endTime: currentEnd,
        price: slot.price,
        timeRange: slot.time,
      });
    }

    return acc;
  }, [] as Array<{ startTime: string; endTime: string; price: number; timeRange: string }>);

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header Image */}
      <div className="relative h-64">
        <img
          src={courtData.image || "/placeholder.svg"}
          alt={courtData.name}
          className="w-full h-full object-cover"
        />

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-900" />
        </button>

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>
      </div>

      {/* Court Name */}
      <div className="px-4 py-4 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">{courtData.name}</h1>
        <p className="text-muted-foreground">{courtData.organization}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-4 py-3 bg-gray-50">
        <button
          onClick={() => setActiveTab("info")}
          className={`flex-1 py-3 rounded-xl text-center font-semibold transition-all duration-200 ${
            activeTab === "info"
              ? "bg-white text-emerald-700 shadow-md scale-105"
              : "text-gray-600 hover:bg-white/50"
          }`}
        >
          Информация
        </button>
        <button
          onClick={() => setActiveTab("schedule")}
          className={`flex-1 py-3 rounded-xl text-center font-semibold transition-all duration-200 ${
            activeTab === "schedule"
              ? "bg-white text-emerald-700 shadow-md scale-105"
              : "text-gray-600 hover:bg-white/50"
          }`}
        >
          Расписание
        </button>
      </div>

      {/* Tab Content */}
      <div className="px-4 py-6">
        {activeTab === "info" && (
          <div className="space-y-6">
            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Описание
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {courtData.description}
              </p>
            </div>

            {/* Characteristics */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                Характеристики
              </h2>
              <div className="space-y-2">
                <p className="text-sm leading-relaxed">
                  <span className="text-gray-500 font-medium">Покрытие: </span>
                  <span className="text-foreground font-medium">
                    {courtData.characteristics[0]}
                  </span>
                </p>
                <p className="text-sm leading-relaxed">
                  <span className="text-gray-500 font-medium">
                    Тип площадки:{" "}
                  </span>
                  <span className="text-foreground font-medium">
                    {courtData.characteristics[1]}
                  </span>
                </p>
                <p className="text-sm leading-relaxed">
                  <span className="text-gray-500 font-medium">
                    Вид спорта:{" "}
                  </span>
                  <span className="text-foreground font-medium">
                    {courtData.characteristics[2]}
                  </span>
                </p>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                Удобства
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {courtData.amenities.map((amenity) => (
                  <div
                    key={amenity.type}
                    className="flex items-center gap-2 text-foreground"
                  >
                    <div className="text-accent">
                      {getAmenityIcon(amenity.type)}
                    </div>
                    <span>{amenity.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule and Rates */}
            {courtData.schedule && (
              <>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">
                    Расписание работы
                  </h2>
                  <div className="flex items-start gap-2 mb-2">
                    <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <p className="text-foreground">
                      {courtData.schedule.workingHours}
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">
                    Тарифы
                  </h2>
                  <div className="space-y-4">
                    {courtData.schedule.tariffs.map((tariff) => (
                      <div
                        key={tariff.id}
                        className="bg-card border border-border rounded-2xl p-4"
                      >
                        {/* Tariff Header */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-xl">
                            {tariff.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">
                              {tariff.name}
                            </h3>
                          </div>
                        </div>

                        {/* Time Slots */}
                        <div className="space-y-3">
                          {tariff.timeSlots.map((slot, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-4"
                            >
                              {/* Time */}
                              <div className="flex items-center gap-2 flex-1">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <div>
                                  <p className={`font-medium text-foreground`}>
                                    {slot.time}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {slot.days}
                                  </p>
                                </div>
                              </div>

                              {/* Price */}
                              <div className="flex items-center gap-2">
                                <Tag className="w-4 h-4 text-muted-foreground" />
                                <p className={`font-semibold text-foreground`}>
                                  {slot.price} ₽ / час
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">
                    Услуги
                  </h2>
                  <div className="space-y-2">
                    {courtData.schedule.services.map((service, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-2"
                      >
                        <span className="text-foreground">{service.name}</span>
                        <span className="font-semibold text-foreground">
                          {service.price} ₽ / час
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Contacts */}
            {courtData.contacts && (
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  Контакты
                </h2>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-foreground">
                    <Phone className="w-5 h-5 text-accent" />
                    <a
                      href={`tel:${courtData.contacts.phone}`}
                      className="hover:text-accent"
                    >
                      {courtData.contacts.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <Mail className="w-5 h-5 text-accent" />
                    <a
                      href={`mailto:${courtData.contacts.email}`}
                      className="hover:text-accent"
                    >
                      {courtData.contacts.email}
                    </a>
                  </div>
                  <div className="flex items-start gap-2 text-foreground">
                    <MapPin className="w-5 h-5 text-accent mt-0.5" />
                    <p>{courtData.address}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "schedule" && (
          <div className="space-y-4">
            {/* Date Filter */}
            <div>
              <button
                onClick={() => setShowDatePicker(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-700 text-white text-sm font-semibold whitespace-nowrap hover:bg-emerald-800 hover:shadow-lg transition-all duration-200 shadow-md"
              >
                <CalendarDays className="w-4 h-4" />
                <span>{formatDate(selectedDate)}</span>
              </button>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                Доступное время
              </h2>
              {groupedSlots.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Доступных слотов нет</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {groupedSlots.map((slot) => (
                    <button
                      key={slot.timeRange}
                      onClick={() => setSelectedSlot(slot.timeRange)}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                        selectedSlot === slot.timeRange
                          ? "bg-emerald-100 border-emerald-600 text-emerald-900 scale-[1.02]"
                          : "bg-emerald-50 border-emerald-200 text-foreground hover:border-emerald-400 hover:bg-emerald-100"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{slot.timeRange}</span>
                        <span className="font-bold">{slot.price} ₽/час</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Booking Rules */}
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <p className="text-xs font-semibold text-gray-700 mb-2">
                Правила бронирования:
              </p>
              <ul className="text-xs text-gray-600 space-y-1.5 list-disc list-inside">
                <li>Минимальное время бронирования — 60 минут</li>
                <li>Можно выбирать время с шагом 30 минут</li>
              </ul>
            </div>

            {/* Book Button - Always visible */}
            <button
              onClick={handleBooking}
              disabled={!selectedSlot}
              className={`w-full h-12 rounded-xl font-semibold transition-all duration-200 ${
                selectedSlot
                  ? "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {selectedSlot ? "Забронировать" : "Выберите время"}
            </button>
          </div>
        )}
      </div>

      {/* Date Picker Modal */}
      <DatePickerModal
        open={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        selectedDate={selectedDate}
        onSelectDate={(date) => {
          setSelectedDate(date);
          setShowDatePicker(false);
        }}
      />
    </div>
  );
}
