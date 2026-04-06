import { useState } from "react";
import { Plus, Settings, Home } from "lucide-react";
import { useApp } from "@/context/app-context";
import { servers } from "@/data/mock-data";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@my-better-t-app/ui/lib/utils";

export function ServerSidebar() {
  const { selectedServer, setSelectedServer, sidebarCollapsed } = useApp();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleServerClick = (id: string) => {
    if (id === "settings") return;
    setSelectedServer(id);
  };

  return (
    <div
      className={cn(
        "relative flex flex-col h-full bg-[--sidebar-bg] transition-all duration-300",
        sidebarCollapsed ? "w-[72px]" : "w-[72px]"
      )}
    >
      <div className="flex flex-col items-center gap-2 p-2 flex-1 overflow-y-auto scrollbar-thin">
        <div
          className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-200",
            "bg-[--primary] hover:rounded-xl hover:scale-105",
            selectedServer === "home" && "rounded-xl"
          )}
          onClick={() => handleServerClick("home")}
          onMouseEnter={() => setHoveredId("home")}
          onMouseLeave={() => setHoveredId(null)}
        >
          <Home className="w-6 h-6 text-white" />
        </div>

        <div className="w-8 h-0.5 rounded-full bg-[--muted-foreground]/30 my-1" />

        {servers.slice(1).map((server) => (
          <div
            key={server.id}
            className="relative group"
            onMouseEnter={() => setHoveredId(server.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {selectedServer === server.id && (
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-10 bg-white rounded-r-full" />
            )}
            <div
              className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-200",
                "bg-[--muted] hover:rounded-xl hover:scale-105",
                selectedServer === server.id && "rounded-xl bg-[--primary]"
              )}
              onClick={() => handleServerClick(server.id)}
            >
              {server.icon ? (
                <span className="text-xl">{server.icon}</span>
              ) : (
                <span className="text-sm font-semibold text-white uppercase">
                  {server.name.slice(0, 2)}
                </span>
              )}
            </div>

            {(hoveredId === server.id || server.mentions > 0 || server.unread > 0) && (
              <div
                className={cn(
                  "absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap z-50",
                  "bg-[--popover] text-[--popover-foreground] shadow-lg",
                  "animate-in fade-in-0 zoom-in-95 slide-in-from-left-2 duration-200"
                )}
              >
                {server.name}
              </div>
            )}

            {server.mentions > 0 && (
              <div className="absolute -top-1 -right-1 min-w-5 h-5 px-1 flex items-center justify-center rounded-full bg-[--discord-red] text-white text-[10px] font-bold">
                {server.mentions}
              </div>
            )}
          </div>
        ))}

        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-200 bg-[--muted] hover:rounded-xl hover:scale-105 hover:bg-[--discord-green] group"
          onClick={() => {}}
          onMouseEnter={() => setHoveredId("add")}
          onMouseLeave={() => setHoveredId(null)}
        >
          <Plus className="w-6 h-6 text-[--discord-green] group-hover:text-white transition-colors" />
        </div>

        {hoveredId === "add" && (
          <div
            className={cn(
              "absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap z-50",
              "bg-[--popover] text-[--popover-foreground] shadow-lg"
            )}
          >
            Add Server
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-1 p-2 border-t border-[--border]">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[--hover-bg]"
          onClick={() => {}}
          onMouseEnter={() => setHoveredId("settings")}
          onMouseLeave={() => setHoveredId(null)}
        >
          <Settings className="w-5 h-5 text-[--muted-foreground]" />
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
}
