"use client";

import { X, User, MapPin, Calendar, Phone, Mail } from "lucide-react";
import { useState } from "react";

interface Booking {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  courtName: string;
  courtType: string;
  courtSurface: string;
  sport: string;
  isIndoor: boolean;
  address: string;
  date: string;
  time: string;
  price: number;
  status: "pending" | "confirmed";
  isRecurring: boolean;
  tariffType?: string;
  additionalServices?: {
    name: string;
    price: number;
  }[];
  recurringDetails?: {
    startDate: string;
    endDate: string;
    daysOfWeek: string[];
    totalSessions: number;
    remainingSessions: number;
    totalAmount: number;
  };
}

interface AdminBookingDetailSheetProps {
  booking: Booking;
  onClose: () => void;
  onConfirm: (id: string) => void;
  onReject: (id: string) => void;
}

export function AdminBookingDetailSheet({
  booking,
  onClose,
  onConfirm,
  onReject,
}: AdminBookingDetailSheetProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [actionType, setActionType] = useState<"confirm" | "reject">("confirm");

  // Функция для преобразования дней недели в укороченный вид
  const formatWeekDays = (days: string[]): string => {
    const shortDays: Record<string, string> = {
      Понедельник: "Пн",
      Вторник: "Вт",
      Среда: "Ср",
      Четверг: "Чт",
      Пятница: "Пт",
      Суббота: "Сб",
      Воскресенье: "Вс",
    };
    return days.map((day) => shortDays[day] || day).join(", ");
  };

  const handleAction = () => {
    if (actionType === "confirm") {
      onConfirm(booking.id);
    } else {
      onReject(booking.id);
    }
    setShowConfirmDialog(false);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-card rounded-t-3xl shadow-xl max-h-[80vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-4 py-4 flex items-center justify-between rounded-t-3xl">
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              booking.status === "pending"
                ? "bg-warning/20 text-warning"
                : "bg-success/20 text-success"
            }`}
          >
            {booking.status === "pending"
              ? "Ожидает подтверждения"
              : "Подтверждено"}
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Client Info */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">
              Информация о клиенте
            </h3>
            <div className="space-y-2 bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span>{booking.clientName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <a
                  href={`tel:${booking.clientPhone}`}
                  className="text-primary hover:underline"
                >
                  {booking.clientPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <a
                  href={`mailto:${booking.clientEmail}`}
                  className="text-primary hover:underline"
                >
                  {booking.clientEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Court Info */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">
              Информация о корте
            </h3>
            <div className="space-y-2 bg-muted/50 p-4 rounded-lg">
              <p className="font-semibold">{booking.courtName}</p>
              <p className="text-sm text-muted-foreground">
                {booking.courtSurface} • {booking.courtType} • {booking.sport}
              </p>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{booking.address}</span>
              </div>
            </div>
          </div>

          {/* Booking Info */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">
              Информация о бронировании
            </h3>
            <div className="space-y-2 bg-muted/50 p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Тариф</span>
                <span className="font-medium">
                  {booking.isRecurring
                    ? "абонемент"
                    : booking.tariffType || "разовый"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Цена за 1 занятие</span>
                <span className="font-semibold text-accent">
                  {booking.price} ₽
                </span>
              </div>

              {booking.isRecurring && booking.recurringDetails ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Дата начала</span>
                    <span className="font-medium">
                      {booking.recurringDetails.startDate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Дата окончания
                    </span>
                    <span className="font-medium">
                      {booking.recurringDetails.endDate}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Дата</span>
                    <span className="font-medium">{booking.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Время</span>
                    <span className="font-medium">{booking.time}</span>
                  </div>
                </>
              )}

              {booking.isRecurring && booking.recurringDetails && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Дни недели</span>
                    <span>
                      {formatWeekDays(booking.recurringDetails.daysOfWeek)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Всего занятий</span>
                    <span>{booking.recurringDetails.totalSessions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Осталось занятий
                    </span>
                    <span>{booking.recurringDetails.remainingSessions}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Additional Services */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">
              Доп услуги
            </h3>
            <div className="space-y-2 bg-muted/50 p-4 rounded-lg">
              {booking.additionalServices &&
              booking.additionalServices.length > 0 ? (
                booking.additionalServices.map((service, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-muted-foreground">
                      {service.name}
                    </span>
                    <span className="font-medium">{service.price} ₽</span>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center">
                  Доп услуг нет
                </p>
              )}
            </div>
          </div>

          {/* Total Amount */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Итоговая сумма</span>
              <span className="text-xl font-bold text-accent">
                {booking.isRecurring && booking.recurringDetails
                  ? booking.recurringDetails.totalAmount
                  : booking.price +
                    (booking.additionalServices?.reduce(
                      (sum, service) => sum + service.price,
                      0
                    ) || 0)}{" "}
                ₽
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        {booking.status === "pending" && (
          <div className="sticky bottom-0 bg-card border-t border-border p-4 flex gap-3">
            <button
              onClick={() => {
                setActionType("confirm");
                setShowConfirmDialog(true);
              }}
              className="flex-1 bg-success text-success-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Подтвердить
            </button>
            <button
              onClick={() => {
                setActionType("reject");
                setShowConfirmDialog(true);
              }}
              className="flex-1 bg-destructive text-destructive-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Отклонить
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <>
          <div
            className="fixed inset-0 bg-black/70 z-[60]"
            onClick={() => setShowConfirmDialog(false)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] bg-card rounded-2xl p-6 w-[90%] max-w-sm">
            <h3 className="text-lg font-semibold mb-2">Подтверждение</h3>
            <p className="text-muted-foreground mb-6">
              Вы уверены, что хотите{" "}
              {actionType === "confirm" ? "подтвердить" : "отклонить"} бронь?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="flex-1 bg-muted text-foreground py-2 rounded-lg font-medium hover:bg-muted/80"
              >
                Отмена
              </button>
              <button
                onClick={handleAction}
                className={`flex-1 py-2 rounded-lg font-medium hover:opacity-90 ${
                  actionType === "confirm"
                    ? "bg-success text-success-foreground"
                    : "bg-destructive text-destructive-foreground"
                }`}
              >
                Да, {actionType === "confirm" ? "подтвердить" : "отклонить"}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
