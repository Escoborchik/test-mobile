export interface Booking {
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
  recurringDetails?: {
    startDate: string;
    endDate: string;
    daysOfWeek: string[];
    totalSessions: number;
    remainingSessions: number;
    totalAmount: number;
  };
}

export const bookings: Booking[] = [
  {
    id: "1",
    clientName: "Иван Иванов",
    clientPhone: "+7 (900) 123-45-67",
    clientEmail: "ivan@example.com",
    courtName: "Корт №1",
    courtType: "Закрытый",
    courtSurface: "Хард",
    sport: "Теннис",
    isIndoor: false,
    address: "Сибирский тракт, 34Б",
    date: "15 янв 2026",
    time: "10:00–11:00",
    price: 2000,
    status: "pending",
    isRecurring: false,
  },
  {
    id: "2",
    clientName: "Мария Петрова",
    clientPhone: "+7 (900) 234-56-78",
    clientEmail: "maria@example.com",
    courtName: "Корт №2",
    courtType: "Закрытый",
    courtSurface: "Хард",
    sport: "Теннис",
    isIndoor: true,
    address: "Сибирский тракт, 34Б",
    date: "16 янв 2025",
    time: "14:00–15:00",
    price: 2500,
    status: "pending",
    isRecurring: true,
    recurringDetails: {
      startDate: "16 янв 2026",
      endDate: "16 фев 2026",
      daysOfWeek: ["Понедельник", "Среда", "Пятница"],
      totalSessions: 12,
      remainingSessions: 12,
      totalAmount: 30000,
    },
  },
  {
    id: "3",
    clientName: "Алексей Сидоров",
    clientPhone: "+7 (900) 345-67-89",
    clientEmail: "alex@example.com",
    courtName: "Корт №1",
    courtType: "Закрытый",
    courtSurface: "Хард",
    sport: "Теннис",
    isIndoor: false,
    address: "Сибирский тракт, 34Б",
    date: "17 янв 2026",
    time: "18:00–19:00",
    price: 2200,
    status: "confirmed",
    isRecurring: false,
  },
];
