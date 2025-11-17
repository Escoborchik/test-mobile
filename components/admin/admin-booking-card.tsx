"use client";

interface Booking {
  id: string;
  clientName: string;
  courtName: string;
  date: string;
  time: string;
  price: number;
  status: "pending" | "confirmed";
  isRecurring: boolean;
  tariff?: string;
  weekDays?: string; // Дни недели в укороченном виде, например "Пн, Ср, Пт"
}

interface AdminBookingCardProps {
  booking: Booking;
  onConfirm: (id: string) => void;
  onReject: (id: string) => void;
  onClick: () => void;
}

export function AdminBookingCard({
  booking,
  onConfirm,
  onReject,
  onClick,
}: AdminBookingCardProps) {
  // Определяем тариф
  const tariffName = booking.isRecurring
    ? "Абонемент"
    : booking.tariff || "Разовое занятие";

  return (
    <div
      onClick={onClick}
      className="bg-card rounded-lg border border-border p-4 cursor-pointer hover:shadow-md transition-shadow"
    >
      {/* Верхняя часть: ФИ и Тариф/Цена */}
      <div className="flex items-start justify-between mb-1">
        {/* ФИ */}
        <h3 className="font-semibold text-lg">{booking.clientName}</h3>

        {/* Тариф и Цена (правый верхний угол) */}
        <div className="flex flex-col items-end">
          <span className="font-semibold text-accent text-lg">
            {booking.price} ₽
          </span>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>{tariffName}</span>
          </div>
        </div>
      </div>

      {/* Корт */}
      <p className="text-sm text-muted-foreground mb-2">
        Корт: {booking.courtName}
      </p>

      {booking.isRecurring ? (
        /* Для абонемента - дни недели и время */
        <>
          <p className="text-sm text-muted-foreground mb-1">
            Дни недели: {booking.weekDays}
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Время: {booking.time}
          </p>
        </>
      ) : (
        /* Для разового - дата и время */
        <>
          <p className="text-sm text-muted-foreground mb-1">
            Дата: {booking.date}
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Время: {booking.time}
          </p>
        </>
      )}

      {/* Кнопки */}
      {booking.status === "pending" ? (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onConfirm(booking.id);
            }}
            className="flex-1 bg-success text-success-foreground py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Подтвердить
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onReject(booking.id);
            }}
            className="flex-1 bg-destructive text-destructive-foreground py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Отклонить
          </button>
        </div>
      ) : (
        <div className="flex justify-end">
          <span className="px-2 py-0.5 bg-success/20 text-success text-xs font-medium rounded-full">
            Подтверждено
          </span>
        </div>
      )}
    </div>
  );
}
