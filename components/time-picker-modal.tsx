"use client";

import { useState, useEffect, useRef } from "react";

interface TimePickerModalProps {
  open: boolean;
  onClose: () => void;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

export function TimePickerModal({
  open,
  onClose,
  selectedTime,
  onSelectTime,
}: TimePickerModalProps) {
  const defaultHour = selectedTime
    ? selectedTime.split(":")[0]
    : String(new Date().getHours()).padStart(2, "0");
  const defaultMinute = selectedTime ? selectedTime.split(":")[1] : "00";

  const [tempHour, setTempHour] = useState(defaultHour);
  const [tempMinute, setTempMinute] = useState(defaultMinute);

  const hourRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const minuteRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  // Block body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  useEffect(() => {
    if (open && hourRefs.current[tempHour]) {
      hourRefs.current[tempHour]?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  }, [open, tempHour]);

  useEffect(() => {
    if (open && minuteRefs.current[tempMinute]) {
      minuteRefs.current[tempMinute]?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  }, [open, tempMinute]);

  if (!open) return null;

  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0")
  );
  const minutes = ["00", "30"];

  const handleConfirm = () => {
    onSelectTime(`${tempHour}:${tempMinute}`);
  };

  const handleReset = () => {
    onSelectTime("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-3xl w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div className="flex justify-center py-3">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Title & Reset */}
        <div className="px-6 pb-6 flex items-center justify-between">
          <h2 className="text-gray-900 text-xl font-bold">Выберите время</h2>
          <button
            onClick={handleReset}
            className="text-emerald-600 text-sm font-semibold hover:text-emerald-700 hover:underline transition-colors"
          >
            Сбросить
          </button>
        </div>

        {/* Time Picker */}
        <div className="px-6 pb-6 flex items-center justify-center gap-4">
          {/* Hours */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-48 overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="py-20">
                {hours.map((hour) => (
                  <button
                    key={hour}
                    ref={(el) => {
                      hourRefs.current[hour] = el;
                    }}
                    onClick={() => setTempHour(hour)}
                    className={`w-full py-3 text-center text-xl font-bold rounded-xl transition-all duration-200 ${
                      tempHour === hour
                        ? "bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-lg scale-105"
                        : "text-gray-700 hover:bg-gray-100 hover:scale-105"
                    }`}
                  >
                    {hour}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Separator */}
          <span className="text-gray-900 text-2xl font-bold">:</span>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-48 overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="py-20">
                {minutes.map((minute) => (
                  <button
                    key={minute}
                    ref={(el) => {
                      minuteRefs.current[minute] = el;
                    }}
                    onClick={() => setTempMinute(minute)}
                    className={`w-full py-3 text-center text-xl font-bold rounded-xl transition-all duration-200 ${
                      tempMinute === minute
                        ? "bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-lg scale-105"
                        : "text-gray-700 hover:bg-gray-100 hover:scale-105"
                    }`}
                  >
                    {minute}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="px-6 pb-8">
          <button
            onClick={handleConfirm}
            className="w-full h-14 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-base font-bold hover:shadow-xl hover:shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  );
}
