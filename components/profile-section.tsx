"use client";

import { useState, useRef } from "react";
import { ChevronRight, User, Lock, Bell, Camera, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function ProfileSection() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = document.createElement("img");
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Compress to 200x200
        canvas.width = 200;
        canvas.height = 200;

        ctx?.drawImage(img, 0, 0, 200, 200);
        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.9);
        setProfileImage(compressedDataUrl);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="px-4 py-6">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-8">
        <div
          className="relative w-24 h-24 rounded-full mb-3 cursor-pointer group"
          onClick={() => fileInputRef.current?.click()}
        >
          {profileImage ? (
            <Image
              src={profileImage || "/placeholder.svg"}
              alt="Profile"
              width={96}
              height={96}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center border-2 border-primary/30">
              <User className="w-12 h-12 text-primary" />
            </div>
          )}
          {/* Camera overlay on hover */}
          <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-8 h-8 text-white" />
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          className="hidden"
          onChange={handlePhotoUpload}
        />
        <h2 className="text-xl font-semibold">Иван Иванов</h2>
        <p className="text-sm text-muted-foreground">ivan@example.com</p>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-3">
        <Link href="/profile/personal-data">
          <div className="flex items-center justify-between p-2 bg-card rounded-xl border border-border hover:border-primary/30 hover:bg-surface-tint transition-all shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium">Персональные данные</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </Link>

        <Link href="/profile/change-password">
          <div className="flex items-center justify-between p-2 bg-card rounded-xl border border-border hover:border-primary/30 hover:bg-surface-tint transition-all shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-medium">Смена пароля</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </Link>

        <Link href="/profile/notifications">
          <div className="flex items-center justify-between p-2 bg-card rounded-xl border border-border hover:border-primary/30 hover:bg-surface-tint transition-all shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium">Настройки уведомлений</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </Link>

        {/* Logout button */}
        <button
          onClick={() => {
            // Handle logout logic here
            console.log("Logout clicked");
          }}
          className="w-full flex items-center justify-between p-2 bg-card rounded-xl border border-border hover:border-red-500/30 hover:bg-red-50/50 transition-all shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
              <LogOut className="w-5 h-5 text-red-500" />
            </div>
            <span className="font-medium text-red-500">Выход</span>
          </div>
        </button>
      </div>
    </div>
  );
}
