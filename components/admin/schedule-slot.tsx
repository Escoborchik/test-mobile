interface TimeSlot {
  id: string
  startTime: string
  endTime: string
  status: 'available' | 'booked' | 'pending' | 'awaiting-payment'
  clientName?: string
}

interface ScheduleSlotProps {
  slot: TimeSlot
  onClick: () => void
}

export function ScheduleSlot({ slot, onClick }: ScheduleSlotProps) {
  const statusConfig = {
    available: {
      bg: 'bg-card',
      border: 'border-border',
      text: 'text-muted-foreground',
      label: 'Свободно',
    },
    booked: {
      bg: 'bg-success/20',
      border: 'border-success',
      text: 'text-success-foreground',
      label: 'Занято',
    },
    pending: {
      bg: 'bg-warning/20',
      border: 'border-warning',
      text: 'text-warning-foreground',
      label: 'Ожидает подтверждения',
    },
    'awaiting-payment': {
      bg: 'bg-muted',
      border: 'border-border',
      text: 'text-muted-foreground',
      label: 'Ожидает оплаты',
    },
  }

  const config = statusConfig[slot.status]

  return (
    <button
      onClick={onClick}
      disabled={slot.status === 'available'}
      className={`w-full p-4 rounded-lg border ${config.bg} ${config.border} text-left ${
        slot.status !== 'available' ? 'cursor-pointer hover:opacity-80' : 'cursor-default'
      } transition-opacity`}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="font-semibold">
          {slot.startTime}–{slot.endTime}
        </span>
        <span className={`text-sm ${config.text}`}>{config.label}</span>
      </div>
      {slot.clientName && (
        <p className="text-sm font-medium mt-2">{slot.clientName}</p>
      )}
    </button>
  )
}
