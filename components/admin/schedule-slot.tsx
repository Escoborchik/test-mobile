interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  status: "available" | "booked" | "pending" | "awaiting-payment";
  clientName?: string;
}

interface ScheduleSlotProps {
  slot: TimeSlot;
  onClick: () => void;
}

export function ScheduleSlot({ slot, onClick }: ScheduleSlotProps) {
  const statusConfig = {
    available: {
      bg: "bg-card",
      border: "border-border",
      badgeBg: "bg-muted",
      badgeText: "text-muted-foreground",
      label: "Свободно",
    },
    booked: {
      bg: "bg-green-50",
      border: "border-green-200",
      badgeBg: "bg-green-100",
      badgeText: "text-green-700",
      label: "Занято",
    },
    pending: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      badgeBg: "bg-amber-100",
      badgeText: "text-amber-700",
      label: "Ожидание",
    },
    "awaiting-payment": {
      bg: "bg-orange-50",
      border: "border-orange-200",
      badgeBg: "bg-orange-100",
      badgeText: "text-orange-700",
      label: "Ожидает оплаты",
    },
  };

  const config = statusConfig[slot.status];
  const isOccupied = slot.status !== "available";

  return (
    <button
      onClick={onClick}
      className={`w-full rounded-lg border ${config.bg} ${
        config.border
      } text-left cursor-pointer hover:shadow-md transition-shadow ${
        isOccupied ? "h-[90px]" : "h-[56px]"
      }`}
    >
      {/* Зона 1: Время и Статус */}
      <div className="flex items-center justify-between px-4 py-3">
        <span className="font-semibold text-base w-[120px]">
          {slot.startTime}–{slot.endTime}
        </span>
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${config.badgeBg} ${config.badgeText}`}
        >
          {config.label}
        </span>
      </div>

      {/* Зона 2: Имя клиента (только для занятых) */}
      {isOccupied && slot.clientName && (
        <div className="px-4 pb-3">
          <p className="text-sm font-medium text-foreground">
            {slot.clientName}
          </p>
        </div>
      )}
    </button>
  );
}
