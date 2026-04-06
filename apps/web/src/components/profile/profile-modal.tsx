import { useState } from "react";
import { X, Camera, Edit3, Star } from "lucide-react";
import { useApp } from "@/context/app-context";
import { cn } from "@my-better-t-app/ui/lib/utils";
import { ProBadge } from "@/components/premium/pro-badge";

interface StatusOption {
  value: "online" | "idle" | "dnd" | "invisible";
  label: string;
  color: string;
}

const statusOptions: StatusOption[] = [
  { value: "online", label: "Online", color: "#23a559" },
  { value: "idle", label: "Idle", color: "#fee75c" },
  { value: "dnd", label: "Do Not Disturb", color: "#ed4245" },
  { value: "invisible", label: "Invisible", color: "#747f8d" },
];

export function ProfileModal() {
  const { showProfileModal, setShowProfileModal, user, setShowUpgradeModal } = useApp();
  const [selectedStatus, setSelectedStatus] = useState<StatusOption>(
    statusOptions.find((s) => s.value === user.status) || statusOptions[0]
  );
  const [isEditing, setIsEditing] = useState(false);

  if (!showProfileModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setShowProfileModal(false)}
      />

      <div
        className={cn(
          "relative w-full max-w-lg rounded-xl overflow-hidden shadow-2xl",
          "bg-[--popover] border border-[--border]",
          "animate-in zoom-in-95 fade-in duration-200"
        )}
      >
        <div className="h-32 bg-gradient-to-br from-[--discord-blurple] via-[--discord-pink] to-[--discord-red] relative">
          <button
            onClick={() => setShowProfileModal(false)}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <button className="absolute bottom-3 right-3 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors">
            <Camera className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="px-6 pb-6">
          <div className="relative -mt-12 mb-4">
            <div className="w-24 h-24 rounded-full bg-[--primary] flex items-center justify-center text-white text-3xl font-bold border-4 border-[--popover]">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div
              className="absolute bottom-1 right-1 w-7 h-7 rounded-full border-4 border-[--popover]"
              style={{ backgroundColor: selectedStatus.color }}
            />
          </div>

          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">{user.name}</h2>
                {user.isPro && <ProBadge size="sm" />}
              </div>
              <p className="text-sm text-[--muted-foreground]">#{user.tag}</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[--primary] hover:bg-[--primary]/90 text-white text-sm font-medium transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase text-[--muted-foreground] tracking-wide">
                Status
              </label>
              <div className="flex items-center gap-2 mt-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: selectedStatus.color }}
                />
                <select
                  value={selectedStatus.value}
                  onChange={(e) =>
                    setSelectedStatus(
                      statusOptions.find((s) => s.value === e.target.value) || statusOptions[0]
                    )
                  }
                  className="flex-1 bg-[--background] border border-[--border] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[--primary]"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase text-[--muted-foreground] tracking-wide">
                Bio
              </label>
              <p className="mt-2 text-sm text-[--foreground] bg-[--background] rounded-md px-3 py-2 border border-[--border]">
                {user.isPro
                  ? "Premium member enjoying all the perks! 🚀"
                  : "Tap the button below to upgrade your profile!"}
              </p>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-[--muted]">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[--discord-yellow]" />
                <span className="text-sm font-medium">Member since</span>
              </div>
              <span className="text-sm text-[--muted-foreground]">March 2024</span>
            </div>

            {!user.isPro && (
              <button
                onClick={() => {
                  setShowProfileModal(false);
                  setShowUpgradeModal(true);
                }}
                className="w-full py-3 rounded-lg pro-gradient text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Star className="w-5 h-5" />
                Upgrade to Pro
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
