"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AdminBookingCard } from "./admin-booking-card";
import { AdminBookingDetailSheet } from "./admin-booking-detail-sheet";

import { Booking, bookings } from "@/data/bookings";

export function AdminBookingsSection() {
  const [activeTab, setActiveTab] = useState<"pending" | "confirmed">(
    "pending"
  );
  const [selectedCourt, setSelectedCourt] = useState("all");
  const [showCourtFilter, setShowCourtFilter] = useState(false);
  const [selectedBookingType, setSelectedBookingType] = useState<
    "all" | "single" | "subscription"
  >("all");
  const [showBookingTypeFilter, setShowBookingTypeFilter] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const courts = ["all", "Корт №1", "Корт №2", "Корт №3"];
  const bookingTypes = [
    { value: "all", label: "Все типы" },
    { value: "single", label: "Разовое" },
    { value: "subscription", label: "Абонемент" },
  ];

  const pendingBookings = bookings.filter((b) => b.status === "pending");
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed");

  let displayedBookings =
    activeTab === "pending" ? pendingBookings : confirmedBookings;

  // Filter by booking type
  if (selectedBookingType !== "all") {
    displayedBookings = displayedBookings.filter((b) => {
      if (selectedBookingType === "single") {
        return !b.isRecurring;
      } else if (selectedBookingType === "subscription") {
        return b.isRecurring;
      }
      return true;
    });
  }

  // Filter by court
  if (selectedCourt !== "all") {
    displayedBookings = displayedBookings.filter(
      (b) => b.courtName === selectedCourt
    );
  }

  const handleConfirm = (id: string) => {
    console.log("[v0] Confirming booking:", id);
    // Toast notification would be shown here
  };

  const handleReject = (id: string) => {
    console.log("[v0] Rejecting booking:", id);
    // Toast notification would be shown here
  };

  return (
    <div className="pb-4">
      {/* Tabs */}
      <div className="flex gap-2 px-4 py-3 bg-white border-b border-gray-200">
        <button
          onClick={() => setActiveTab("pending")}
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
            activeTab === "pending"
              ? "bg-emerald-700 text-white shadow-sm"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Ожидающие ({pendingBookings.length})
        </button>
        <button
          onClick={() => setActiveTab("confirmed")}
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
            activeTab === "confirmed"
              ? "bg-emerald-700 text-white shadow-sm"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Подтверждённые
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 px-4 py-4 bg-muted/50">
        <div className="relative">
          <button
            onClick={() => setShowCourtFilter(!showCourtFilter)}
            className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-border"
          >
            <span className="text-sm">
              {selectedCourt === "all" ? "Все корты" : selectedCourt}
            </span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {showCourtFilter && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-card rounded-lg shadow-lg border border-border z-10">
              {courts.map((court) => (
                <button
                  key={court}
                  onClick={() => {
                    setSelectedCourt(court);
                    setShowCourtFilter(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-muted text-sm"
                >
                  {court === "all" ? "Все корты" : court}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowBookingTypeFilter(!showBookingTypeFilter)}
            className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-border"
          >
            <span className="text-sm">
              {bookingTypes.find((t) => t.value === selectedBookingType)?.label}
            </span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {showBookingTypeFilter && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-card rounded-lg shadow-lg border border-border z-10">
              {bookingTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => {
                    setSelectedBookingType(
                      type.value as "all" | "single" | "subscription"
                    );
                    setShowBookingTypeFilter(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-muted text-sm"
                >
                  {type.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bookings List */}
      <div className="px-4 py-4 space-y-3 bg-gray-50">
        {displayedBookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Нет {activeTab === "pending" ? "ожидающих" : "подтверждённых"}{" "}
              бронирований
            </p>
          </div>
        ) : (
          displayedBookings.map((booking) => (
            <AdminBookingCard
              key={booking.id}
              booking={booking}
              onConfirm={handleConfirm}
              onReject={handleReject}
              onClick={() => setSelectedBooking(booking)}
            />
          ))
        )}
      </div>

      {/* Booking Detail Sheet */}
      {selectedBooking && (
        <AdminBookingDetailSheet
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onConfirm={handleConfirm}
          onReject={handleReject}
        />
      )}
    </div>
  );
}
