"use client";

import { useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { FilterModal } from "@/components/filter-modal";

interface HorizontalFiltersProps {
  selectedDate: Date;
  selectedTime: string | null;
  onDateClick: () => void;
  onTimeClick: () => void;
}

export function HorizontalFilters({
  selectedDate,
  selectedTime,
  onDateClick,
  onTimeClick,
}: HorizontalFiltersProps) {
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [courtType, setCourtType] = useState<string[]>([]);
  const [surface, setSurface] = useState<string[]>([]);
  const [sport, setSport] = useState<string[]>([]);
  const [organizations, setOrganizations] = useState<string[]>([]);
  const [nearestAvailable, setNearestAvailable] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);

  const formatDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    if (date.getTime() === today.getTime()) {
      return "Сегодня";
    }

    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
    };
    return date.toLocaleDateString("ru-RU", options);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (courtType.length > 0) count++;
    if (surface.length > 0) count++;
    if (sport.length > 0) count++;
    if (organizations.length > 0) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <>
      <div className="px-4 py-3 bg-background border-b border-border space-y-2">
        {/* First Row - Quick Filters (always green, smaller) */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setNearestAvailable(!nearestAvailable)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-700 text-white text-xs font-semibold whitespace-nowrap hover:bg-emerald-800 hover:shadow-lg transition-all duration-200 shadow-sm"
          >
            <span>{nearestAvailable && "✓ "}Ближайшие</span>
          </button>

          <button
            onClick={() => setHasSubscription(!hasSubscription)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-700 text-white text-xs font-semibold whitespace-nowrap hover:bg-emerald-800 hover:shadow-lg transition-all duration-200 shadow-sm"
          >
            <span>{hasSubscription && "✓ "}Абонемент</span>
          </button>
        </div>

        {/* Second Row - Date, Time, Filters */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <button
            onClick={onDateClick}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-700 text-white text-sm font-semibold whitespace-nowrap hover:bg-emerald-800 hover:shadow-lg transition-all duration-200 shadow-md"
          >
            <span>{formatDate(selectedDate)}</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          <button
            onClick={onTimeClick}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-700 text-white text-sm font-semibold whitespace-nowrap hover:bg-emerald-800 hover:shadow-lg transition-all duration-200 shadow-md"
          >
            <span>{selectedTime || "Время"}</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowFiltersModal(true)}
            className="relative flex gap-2 px-6 py-3 rounded-full bg-emerald-700 text-white text-sm font-semibold whitespace-nowrap hover:bg-emerald-800 hover:shadow-lg transition-all duration-200 shadow-md flex-row items-center justify-center"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-emerald-700 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <FilterModal
        open={showFiltersModal}
        onClose={() => setShowFiltersModal(false)}
        courtType={courtType}
        surface={surface}
        sport={sport}
        organizations={organizations}
        nearestAvailable={nearestAvailable}
        onCourtTypeChange={setCourtType}
        onSurfaceChange={setSurface}
        onSportChange={setSport}
        onOrganizationsChange={setOrganizations}
      />
    </>
  );
}
