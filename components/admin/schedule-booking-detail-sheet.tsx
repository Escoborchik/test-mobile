"use client";

import { X, User, MapPin, Phone, Mail } from "lucide-react";
import { useState } from "react";

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  status: string;
  clientName?: string;
  clientPhone?: string;
  clientEmail?: string;
  price?: number;
  isRecurring?: boolean;
  recurringDetails?: {
    startDate: string;
    endDate: string;
    daysOfWeek: string[];
    totalSessions: number;
    remainingSessions: number;
    totalAmount: number;
  };
}

interface ScheduleBookingDetailSheetProps {
  slot: TimeSlot;
  courtName: string;
  courtInfo: {
    type: string;
    surface: string;
    sport: string;
    address: string;
  };
  onClose: () => void;
}

export function ScheduleBookingDetailSheet({
  slot,
  courtName,
  courtInfo,
  onClose,
}: ScheduleBookingDetailSheetProps) {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancelType, setCancelType] = useState<"current" | "all">("current");

  const handleCancel = () => {
    console.log("[v0] Cancelling booking:", cancelType);
    setShowCancelDialog(false);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />

      {/* Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-card rounded-t-3xl shadow-xl max-h-[70vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-4 py-4 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-lg font-bold">Детали бронирования</h2>
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
                <span>{slot.clientName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <a
                  href={`tel:${slot.clientPhone}`}
                  className="text-primary hover:underline"
                >
                  {slot.clientPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <a
                  href={`mailto:${slot.clientEmail}`}
                  className="text-primary hover:underline"
                >
                  {slot.clientEmail}
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
              <p className="font-semibold">{courtName}</p>
              <p className="text-sm text-muted-foreground">
                {courtInfo.surface} • {courtInfo.type} • {courtInfo.sport}
              </p>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{courtInfo.address}</span>
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
                <span className="text-muted-foreground">Время</span>
                <span className="font-medium">
                  {slot.startTime}–{slot.endTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Цена</span>
                <span className="font-semibold text-accent">
                  {slot.price} ₽
                </span>
              </div>

              {slot.isRecurring && slot.recurringDetails && (
                <>
                  <div className="border-t border-border my-2 pt-2">
                    <p className="text-sm font-medium mb-2">Абонемент</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Период</span>
                    <span>
                      {slot.recurringDetails.startDate} –{" "}
                      {slot.recurringDetails.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Дни недели</span>
                    <span>{slot.recurringDetails.daysOfWeek.join(", ")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Всего занятий</span>
                    <span>{slot.recurringDetails.totalSessions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Осталось занятий
                    </span>
                    <span>{slot.recurringDetails.remainingSessions}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Итоговая сумма</span>
                    <span className="text-accent">
                      {slot.recurringDetails.totalAmount} ₽
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 bg-card border-t border-border p-4 space-y-2">
          <button
            onClick={() => {
              setCancelType("current");
              setShowCancelDialog(true);
            }}
            className="w-full bg-destructive text-destructive-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Отменить текущее
          </button>
          {slot.isRecurring && (
            <button
              onClick={() => {
                setCancelType("all");
                setShowCancelDialog(true);
              }}
              className="w-full bg-destructive/80 text-destructive-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Отменить все повторения
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showCancelDialog && (
        <>
          <div
            className="fixed inset-0 bg-black/70 z-[60]"
            onClick={() => setShowCancelDialog(false)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] bg-card rounded-2xl p-6 w-[90%] max-w-sm">
            <h3 className="text-lg font-semibold mb-2">Подтверждение отмены</h3>
            <p className="text-muted-foreground mb-6">
              Вы уверены, что хотите отменить{" "}
              {cancelType === "current"
                ? "текущее бронирование"
                : "все повторения"}
              ?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelDialog(false)}
                className="flex-1 bg-muted text-foreground py-2 rounded-lg font-medium hover:bg-muted/80"
              >
                Отмена
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-destructive text-destructive-foreground py-2 rounded-lg font-medium hover:opacity-90"
              >
                Да, отменить
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
