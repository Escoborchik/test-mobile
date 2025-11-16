"use client";

import { Heart, Wifi, Droplets, Coffee, Car, Lock } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Amenity {
  type: string;
  label: string;
}

interface CourtCardProps {
  id: string;
  image: string;
  name: string;
  organization: string;
  address: string;
  characteristics: string[];
  priceRange: string;
  amenities: Amenity[];
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export function CourtCard({
  id,
  image,
  name,
  organization,
  address,
  characteristics,
  priceRange,
  amenities,
  isFavorite = false,
  onToggleFavorite,
}: CourtCardProps) {
  const router = useRouter();

  const getAmenityIcon = (type: string) => {
    switch (type) {
      case "wifi":
        return <Wifi className="w-4 h-4" />;
      case "shower":
        return <Droplets className="w-4 h-4" />;
      case "cafe":
        return <Coffee className="w-4 h-4" />;
      case "parking":
        return <Car className="w-4 h-4" />;
      case "locker":
        return <Lock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleCardClick = () => {
    router.push(`/court/${id}`);
  };

  const handleBookingClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/court/${id}?tab=schedule`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-border/50"
    >
      <div className="relative h-36 group">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.(id);
          }}
          className="absolute top-2 right-2 w-9 h-9 rounded-full bg-white/95 flex items-center justify-center backdrop-blur-md hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg"
        >
          <Heart
            className={`w-4 h-4 transition-all ${
              isFavorite
                ? "fill-red-500 text-red-500 scale-110"
                : "text-gray-600"
            }`}
          />
        </button>
      </div>

      <div className="p-4 bg-white">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h3 className="text-base font-bold text-foreground leading-tight">
            {name}
          </h3>
          <p className="text-base font-bold text-accent whitespace-nowrap">
            {priceRange}
          </p>
        </div>

        <div className="space-y-1.5 mb-3">
          <p className="text-xs leading-relaxed">
            <span className="text-gray-500 font-medium">Организация: </span>
            <span className="text-gray-900 font-medium">{organization}</span>
          </p>
          <p className="text-xs leading-relaxed">
            <span className="text-gray-500 font-medium">Адрес: </span>
            <span className="text-gray-900">{address}</span>
          </p>
          <p className="text-xs leading-relaxed">
            <span className="text-gray-500 font-medium">Тип: </span>
            <span className="text-gray-900">{characteristics.join(" • ")}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
          {amenities.slice(0, 3).map((amenity) => (
            <div
              key={amenity.type}
              className="flex items-center gap-1 group/amenity"
            >
              <div className="text-primary/70 group-hover/amenity:text-primary group-hover/amenity:scale-110 transition-all">
                {getAmenityIcon(amenity.type)}
              </div>
              <span className="text-xs font-medium">{amenity.label}</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleBookingClick}
          className="w-full h-10 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          Забронировать
        </button>
      </div>
    </div>
  );
}
