"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  courtType: string[];
  surface: string[];
  sport: string[];
  organizations: string[];
  nearestAvailable: boolean;
  onCourtTypeChange: (value: string[]) => void;
  onSurfaceChange: (value: string[]) => void;
  onSportChange: (value: string[]) => void;
  onOrganizationsChange: (value: string[]) => void;
  onNearestAvailableChange: (value: boolean) => void;
}

export function FilterModal({
  open,
  onClose,
  courtType,
  surface,
  sport,
  organizations,
  nearestAvailable,
  onCourtTypeChange,
  onSurfaceChange,
  onSportChange,
  onOrganizationsChange,
  onNearestAvailableChange,
}: FilterModalProps) {
  const [isOrganizationsExpanded, setIsOrganizationsExpanded] = useState(false);

  if (!open) return null;

  const toggleArrayValue = (
    array: string[],
    value: string,
    setter: (arr: string[]) => void
  ) => {
    if (array.includes(value)) {
      setter(array.filter((item) => item !== value));
    } else {
      setter([...array, value]);
    }
  };

  const handleReset = () => {
    onCourtTypeChange([]);
    onSurfaceChange([]);
    onSportChange([]);
    onOrganizationsChange([]);
    onNearestAvailableChange(false);
    onClose();
  };

  const availableOrganizations = [
    "Теннисный клуб «Премьер»",
    "Спортивный центр «Арена»",
    "Клуб «Зеленая лужайка»",
    "Спорткомплекс «Олимп»",
    "Теннис-центр «Чемпион»",
  ];

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-3xl w-full max-h-[80vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div className="flex justify-center py-3">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-6 pb-4 flex items-center justify-between">
          <h2 className="text-gray-900 text-xl font-bold">Фильтры</h2>
          <button
            onClick={handleReset}
            className="text-emerald-600 text-sm font-semibold hover:text-emerald-700 hover:underline transition-colors"
          >
            Сбросить
          </button>
        </div>

        {/* Filters - Scrollable area */}
        <div className="px-6 space-y-6 pb-6 overflow-y-auto flex-1">
          {/* Court Type */}
          <div>
            <h3 className="text-gray-900 text-base font-bold mb-3">
              Тип корта
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Открытый", "Закрытый"].map((type) => (
                <button
                  key={type}
                  onClick={() =>
                    toggleArrayValue(courtType, type, onCourtTypeChange)
                  }
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    courtType.includes(type)
                      ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Surface */}
          <div>
            <h3 className="text-gray-900 text-base font-bold mb-3">Покрытие</h3>
            <div className="flex flex-wrap gap-2">
              {["Грунт", "Хард", "Трава"].map((surf) => (
                <button
                  key={surf}
                  onClick={() =>
                    toggleArrayValue(surface, surf, onSurfaceChange)
                  }
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    surface.includes(surf)
                      ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                  }`}
                >
                  {surf}
                </button>
              ))}
            </div>
          </div>

          {/* Sport Type */}
          <div>
            <h3 className="text-gray-900 text-base font-bold mb-3">
              Вид спорта
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Теннис", "Падел"].map((sp) => (
                <button
                  key={sp}
                  onClick={() => toggleArrayValue(sport, sp, onSportChange)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    sport.includes(sp)
                      ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                  }`}
                >
                  {sp}
                </button>
              ))}
            </div>
          </div>

          {/* Organizations - Collapsible */}
          <div>
            <button
              onClick={() =>
                setIsOrganizationsExpanded(!isOrganizationsExpanded)
              }
              className="w-full flex items-center justify-between text-gray-900 text-base font-bold mb-3 hover:text-emerald-600 transition-colors"
            >
              <span>Организация</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${
                  isOrganizationsExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`space-y-2 overflow-hidden transition-all duration-300 ${
                isOrganizationsExpanded
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {availableOrganizations.map((org) => (
                <label
                  key={org}
                  className="flex items-center gap-3 cursor-pointer py-2 hover:bg-gray-50 rounded-lg px-2 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={organizations.includes(org)}
                    onChange={() =>
                      toggleArrayValue(
                        organizations,
                        org,
                        onOrganizationsChange
                      )
                    }
                    className="w-5 h-5 rounded border-2 border-gray-300 bg-white checked:bg-emerald-600 checked:border-emerald-600 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0 transition-all"
                  />
                  <span className="text-gray-700 text-sm font-medium">
                    {org}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Nearest Available */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors">
              <input
                type="checkbox"
                checked={nearestAvailable}
                onChange={(e) => onNearestAvailableChange(e.target.checked)}
                className="w-5 h-5 rounded border-2 border-gray-300 bg-white checked:bg-emerald-600 checked:border-emerald-600 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0 transition-all"
              />
              <span className="text-gray-900 text-base font-semibold">
                Ближайшие свободные
              </span>
            </label>
          </div>
        </div>

        {/* Apply Button - Sticky at bottom */}
        <div className="sticky bottom-0 px-6 pb-6 pt-4 bg-white border-t border-gray-100 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
          <button
            onClick={onClose}
            className="w-full h-14 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-base font-bold hover:shadow-xl hover:shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Применить
          </button>
        </div>
      </div>
    </div>
  );
}
