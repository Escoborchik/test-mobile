"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Calendar, MapPin, Heart, User } from "lucide-react";
import { DatePickerModal } from "@/components/date-picker-modal";
import { CourtCard } from "@/components/court-card";
import { HorizontalFilters } from "@/components/horizontal-filters";
import { TimePickerModal } from "@/components/time-picker-modal";
import { BookingsSection } from "@/components/bookings-section";
import { FavoritesSection } from "@/components/favorites-section";
import { ProfileSection } from "@/components/profile-section";

import { courts } from "@/data/courts";

function HomePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get("tab") as
    | "search"
    | "bookings"
    | "favorites"
    | "profile"
    | null;

  const [activeTab, setActiveTab] = useState<
    "search" | "bookings" | "favorites" | "profile"
  >(tabFromUrl || "search");

  // Update tab when URL changes
  useEffect(() => {
    setActiveTab(tabFromUrl || "search");
  }, [tabFromUrl]);

  const handleTabChange = (
    tab: "search" | "bookings" | "favorites" | "profile"
  ) => {
    if (tab === "search") {
      router.push("/client");
    } else {
      router.push(`/client?tab=${tab}`);
    }
  };

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (courtId: string) => {
    setFavorites((prev) =>
      prev.includes(courtId)
        ? prev.filter((id) => id !== courtId)
        : [...prev, courtId]
    );
  };

  const favoriteCourts = courts.filter((court) => favorites.includes(court.id));

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Fixed */}
      <header className="fixed top-0 left-0 right-0 z-20 bg-secondary text-white px-4 h-14 flex items-center"></header>

      {/* Main Content */}
      <main className="pt-14 pb-16">
        {activeTab === "search" && (
          <div>
            {/* Horizontal Filters - Fixed */}
            <div className="fixed top-14 left-0 right-0 z-10 bg-background">
              <HorizontalFilters
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onDateClick={() => setShowDatePicker(true)}
                onTimeClick={() => setShowTimePicker(true)}
              />
            </div>

            {/* Court Cards */}
            <div className="px-4 space-y-3 pb-4 pt-[100px]">
              {courts.map((court) => (
                <CourtCard
                  key={court.id}
                  id={court.id}
                  image={court.image}
                  name={court.name}
                  organization={court.organization}
                  address={court.address}
                  characteristics={court.characteristics}
                  priceRange={court.priceRange}
                  amenities={court.amenities}
                  isFavorite={favorites.includes(court.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === "bookings" && <BookingsSection />}

        {activeTab === "favorites" && (
          <FavoritesSection
            courts={favoriteCourts}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {activeTab === "profile" && <ProfileSection />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border h-16 flex items-center justify-around">
        <button
          onClick={() => handleTabChange("search")}
          className={`flex flex-col items-center gap-1 ${
            activeTab === "search" ? "text-accent" : "text-muted-foreground"
          }`}
        >
          <Search className="w-6 h-6" />
          <span className="text-xs">Поиск</span>
        </button>
        <button
          onClick={() => handleTabChange("bookings")}
          className={`flex flex-col items-center gap-1 ${
            activeTab === "bookings" ? "text-accent" : "text-muted-foreground"
          }`}
        >
          <Calendar className="w-6 h-6" />
          <span className="text-xs">Бронирования</span>
        </button>
        <button
          onClick={() => handleTabChange("favorites")}
          className={`flex flex-col items-center gap-1 ${
            activeTab === "favorites" ? "text-accent" : "text-muted-foreground"
          }`}
        >
          <Heart className="w-6 h-6" />
          <span className="text-xs">Избранное</span>
        </button>
        <button
          onClick={() => handleTabChange("profile")}
          className={`flex flex-col items-center gap-1 ${
            activeTab === "profile" ? "text-accent" : "text-muted-foreground"
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs">Профиль</span>
        </button>
      </nav>

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

      {/* Time Picker Modal */}
      <TimePickerModal
        open={showTimePicker}
        onClose={() => setShowTimePicker(false)}
        selectedTime={selectedTime}
        onSelectTime={(time) => {
          setSelectedTime(time);
          setShowTimePicker(false);
        }}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
