"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function BookingStep2Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load user profile data
  useEffect(() => {
    // Try to get data from localStorage
    const savedProfile = localStorage.getItem("userProfile");

    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setFormData({
        name: profile.name || "",
        phone: profile.phone || "",
        email: profile.email || "",
      });
    } else {
      // Mock profile data (replace with actual API call)
      const mockProfile = {
        name: "Иван Иванов",
        phone: "+7 (912) 345-67-89",
        email: "ivan@example.com",
      };
      setFormData(mockProfile);
      // Optionally save to localStorage
      localStorage.setItem("userProfile", JSON.stringify(mockProfile));
    }

    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save updated profile data
    localStorage.setItem("userProfile", JSON.stringify(formData));
    router.push("/booking/step3");
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
            <div className="w-8 h-8 rounded-full bg-accent/30 text-accent flex items-center justify-center font-semibold">
              ✓
            </div>
            <span className="text-sm text-muted-foreground">Детали</span>
          </div>
          <div className="flex-1 h-0.5 bg-accent mx-2" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-semibold">
              2
            </div>
            <span className="text-sm font-medium text-foreground">Данные</span>
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

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-4 py-6 pb-24 space-y-4">
        {/* Info message */}
        {!isLoading && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-4">
            <p className="text-sm text-emerald-800">
              ✓ Данные загружены из вашего профиля. Вы можете их
              отредактировать.
            </p>
          </div>
        )}

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Имя и фамилия
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Иван Иванов"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Телефон
          </label>
          <input
            type="tel"
            id="phone"
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="+7 (912) 345-67-89"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="ivan@example.com"
          />
        </div>

        {/* Continue Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Загрузка..." : "Продолжить"}
          </button>
        </div>
      </form>
    </div>
  );
}
