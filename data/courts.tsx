interface Court {
  id: string;
  image: string;
  name: string;
  description: string;
  organization: string;
  address: string;
  characteristics: string[];
  priceRange: string;
  amenities: { type: string; label: string }[];
  schedule?: {
    workingHours: string;
    tariffs: {
      id: number;
      name: string;
      badgeColor?: string;
      icon: string;
      timeSlots: {
        time: string;
        days: string;
        price: number;
      }[];
    }[];
    services: {
      name: string;
      price: number;
    }[];
  };
  contacts?: {
    phone: string;
    email: string;
  };
  slots?: {
    time: string;
    price: number;
    available: boolean;
  }[];
}

export const courts: Court[] = [
  {
    id: "1",
    image: "/outdoor-tennis-court.png",
    name: "Корт №1",
    description:
      "Профессиональный теннисный корт с покрытием хард. Идеально подходит для тренировок и турниров любого уровня. Корт оборудован современным освещением для игры в вечернее время.",
    organization: "Теннисные корты на Сибирском тракте",
    address: "Сибирский тракт, 34Б",
    characteristics: ["Хард", "Закрытый", "Теннис"],
    priceRange: "1500–2100 ₽ / час",
    amenities: [
      { type: "wifi", label: "Wi-Fi" },
      { type: "shower", label: "Душ" },
      { type: "parking", label: "Парковка" },
    ],
    schedule: {
      workingHours: "Пн-Вс: 09:00–23:00",
      tariffs: [
        {
          id: 1,
          name: "Абонемент",
          badgeColor: "bg-emerald-100 text-emerald-700",
          icon: "📄",
          timeSlots: [
            { time: "08:00–16:00", days: "пн–пт", price: 1700 },
            { time: "16:00–21:00", days: "пн–пт", price: 2000 },
            { time: "21:00–23:00", days: "пн–пт", price: 1700 },
            { time: "08:00–23:00", days: "сб–вс", price: 1700 },
          ],
        },
        {
          id: 2,
          name: "Разовое посещение",
          badgeColor: "bg-teal-100 text-teal-700",
          icon: "🎯",
          timeSlots: [
            { time: "08:00–16:00", days: "пн–пт", price: 1800 },
            { time: "16:00–21:00", days: "пн–пт", price: 2100 },
            { time: "08:00–23:00", days: "сб–вс", price: 1800 },
          ],
        },
        {
          id: 3,
          name: "Студенческий",
          icon: "🎓",
          timeSlots: [{ time: "08:00–23:00", days: "пн–вс", price: 1500 }],
        },
      ],
      services: [
        { name: "Аренда ракеток", price: 300 },
        { name: "Аренда мячей", price: 150 },
      ],
    },
    contacts: {
      phone: "+7 912 204-02-02",
      email: "tennisluna66@gmail.com",
    },
    slots: [
      { time: "08:00–10:00", price: 1500, available: true },
      { time: "10:00–12:00", price: 1500, available: true },
      { time: "12:00–14:00", price: 2000, available: false },
      { time: "14:00–16:00", price: 2000, available: true },
      { time: "16:00–18:00", price: 2000, available: true },
      { time: "18:00–20:00", price: 2500, available: true },
      { time: "20:00–22:00", price: 2500, available: false },
    ],
  },
  {
    id: "2",
    image: "/indoor-tennis-court.png",
    name: "Корт №2",
    description:
      "Профессиональный теннисный корт с покрытием хард. Идеально подходит для тренировок и турниров любого уровня. Корт оборудован современным освещением для игры в вечернее время.",
    organization: "Теннисные корты на Сибирском тракте",
    address: "Сибирский тракт, 34Б",
    characteristics: ["Хард", "Закрытый", "Теннис"],
    priceRange: "1500–2100 ₽ / час",
    amenities: [
      { type: "wifi", label: "Wi-Fi" },
      { type: "shower", label: "Душ" },
      { type: "locker", label: "Раздевалка" },
    ],
    schedule: {
      workingHours: "Пн-Вс: 09:00–23:00",
      tariffs: [
        {
          id: 1,
          name: "Абонемент",
          badgeColor: "bg-emerald-100 text-emerald-700",
          icon: "📄",
          timeSlots: [
            { time: "08:00–16:00", days: "пн–пт", price: 1700 },
            { time: "16:00–21:00", days: "пн–пт", price: 2000 },
            { time: "21:00–23:00", days: "пн–пт", price: 1700 },
            { time: "08:00–23:00", days: "сб–вс", price: 1700 },
          ],
        },
        {
          id: 2,
          name: "Разовое посещение",
          badgeColor: "bg-teal-100 text-teal-700",
          icon: "🎯",
          timeSlots: [
            { time: "08:00–16:00", days: "пн–пт", price: 1800 },
            { time: "16:00–21:00", days: "пн–пт", price: 2100 },
            { time: "08:00–23:00", days: "сб–вс", price: 1800 },
          ],
        },
        {
          id: 3,
          name: "Студенческий",
          icon: "🎓",
          timeSlots: [{ time: "08:00–23:00", days: "пн–вс", price: 1500 }],
        },
      ],
      services: [
        { name: "Аренда ракеток", price: 300 },
        { name: "Аренда мячей", price: 150 },
      ],
    },
    contacts: {
      phone: "+7 912 204-02-02",
      email: "tennisluna66@gmail.com",
    },
    slots: [
      { time: "08:00–10:00", price: 1500, available: true },
      { time: "10:00–12:00", price: 1500, available: true },
      { time: "12:00–14:00", price: 2000, available: false },
      { time: "14:00–16:00", price: 2000, available: true },
      { time: "16:00–18:00", price: 2000, available: true },
      { time: "18:00–20:00", price: 2500, available: true },
      { time: "20:00–22:00", price: 2500, available: false },
    ],
  },
  {
    id: "3",
    image: "/tennis-court-grass.jpg",
    name: "Корт №3",
    description:
      "Профессиональный теннисный корт с покрытием хард. Идеально подходит для тренировок и турниров любого уровня. Корт оборудован современным освещением для игры в вечернее время.",
    organization: "Теннисные корты на Сибирском тракте",
    address: "Сибирский тракт, 34Б",
    characteristics: ["Хард", "Закрытый", "Теннис"],
    priceRange: "1500–2100 ₽ / час",
    amenities: [
      { type: "cafe", label: "Кафе" },
      { type: "parking", label: "Парковка" },
      { type: "shower", label: "Душ" },
    ],
    schedule: {
      workingHours: "Пн-Вс: 09:00–23:00",
      tariffs: [
        {
          id: 1,
          name: "Абонемент",
          badgeColor: "bg-emerald-100 text-emerald-700",
          icon: "📄",
          timeSlots: [
            { time: "08:00–16:00", days: "пн–пт", price: 1700 },
            { time: "16:00–21:00", days: "пн–пт", price: 2000 },
            { time: "21:00–23:00", days: "пн–пт", price: 1700 },
            { time: "08:00–23:00", days: "сб–вс", price: 1700 },
          ],
        },
        {
          id: 2,
          name: "Разовое посещение",
          badgeColor: "bg-teal-100 text-teal-700",
          icon: "🎯",
          timeSlots: [
            { time: "08:00–16:00", days: "пн–пт", price: 1800 },
            { time: "16:00–21:00", days: "пн–пт", price: 2100 },
            { time: "08:00–23:00", days: "сб–вс", price: 1800 },
          ],
        },
        {
          id: 3,
          name: "Студенческий",
          icon: "🎓",
          timeSlots: [{ time: "08:00–23:00", days: "пн–вс", price: 1500 }],
        },
      ],
      services: [
        { name: "Аренда ракеток", price: 300 },
        { name: "Аренда мячей", price: 150 },
      ],
    },
    contacts: {
      phone: "+7 912 204-02-02",
      email: "tennisluna66@gmail.com",
    },
    slots: [
      { time: "08:00–10:00", price: 1500, available: true },
      { time: "10:00–12:00", price: 1500, available: true },
      { time: "12:00–14:00", price: 2000, available: false },
      { time: "14:00–16:00", price: 2000, available: true },
      { time: "16:00–18:00", price: 2000, available: true },
      { time: "18:00–20:00", price: 2500, available: true },
      { time: "20:00–22:00", price: 2500, available: false },
    ],
  },
];
