import { useState } from "react";
import { ChevronDown, ChevronRight, Hash, Volume2, Plus } from "lucide-react";
import { useApp } from "@/context/app-context";
import { servers } from "@/data/mock-data";
import { cn } from "@my-better-t-app/ui/lib/utils";

export function ChannelList() {
  const {
    selectedServer,
    selectedChannel,
    setSelectedChannel,
    user,
    setShowProfileModal,
  } = useApp();

  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  const currentServer = servers.find((s) => s.id === selectedServer);
  const serverChannels = useApp().getServerChannels();

  const textChannels = serverChannels.filter((c) => c.type === "text" || c.type === "category");
  const voiceChannels = serverChannels.filter((c) => c.type === "voice");

  const toggleCategory = (id: string) => {
    setCollapsedCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-[--discord-green]";
      case "idle": return "bg-[--discord-yellow]";
      case "dnd": return "bg-[--discord-red]";
      default: return "bg-[--muted-foreground]";
    }
  };

  return (
    <div className="flex flex-col h-full bg-[--channels-bg] w-60">
      <div className="flex items-center justify-between px-4 h-12 border-b border-[--border] shadow-sm">
        <h2 className="font-semibold text-sm truncate">
          {currentServer?.name || "Select a server"}
        </h2>
        <button className="p-1 rounded hover:bg-[--hover-bg] transition-colors">
          <ChevronDown className="w-4 h-4 text-[--muted-foreground]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-2 space-y-4">
        <div className="space-y-0.5">
          <div className="flex items-center justify-between px-2 mb-1">
            <span className="text-xs font-semibold uppercase text-[--muted-foreground] tracking-wide">
              Text Channels
            </span>
            <button className="p-0.5 rounded hover:bg-[--hover-bg] transition-colors">
              <Plus className="w-4 h-4 text-[--muted-foreground]" />
            </button>
          </div>
          {textChannels.map((channel) => {
            if (channel.type === "category") {
              const isCollapsed = collapsedCategories[channel.id];
              return (
                <div key={channel.id} className="mt-3 first:mt-0">
                  <button
                    onClick={() => toggleCategory(channel.id)}
                    className="flex items-center gap-1 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-[--muted-foreground] hover:text-[--foreground] transition-colors w-full"
                  >
                    {isCollapsed ? (
                      <ChevronRight className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                    <span className="truncate">{channel.name}</span>
                  </button>
                </div>
              );
            }

            return (
              <button
                key={channel.id}
                onClick={() => setSelectedChannel(channel.id, "text")}
                className={cn(
                  "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-all duration-150",
                  selectedChannel === channel.id
                    ? "bg-[--active-bg] text-[--foreground]"
                    : "text-[--muted-foreground] hover:bg-[--hover-bg] hover:text-[--foreground]"
                )}
              >
                <Hash className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{channel.name}</span>
                {channel.unread && channel.unread > 0 && (
                  <span className="ml-auto text-[10px] font-bold text-[--discord-red]">
                    {channel.unread}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="space-y-0.5">
          <div className="flex items-center justify-between px-2 mb-1">
            <span className="text-xs font-semibold uppercase text-[--muted-foreground] tracking-wide">
              Voice Channels
            </span>
            <button className="p-0.5 rounded hover:bg-[--hover-bg] transition-colors">
              <Plus className="w-4 h-4 text-[--muted-foreground]" />
            </button>
          </div>
          {voiceChannels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => setSelectedChannel(channel.id, "voice")}
              className={cn(
                "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-all duration-150",
                selectedChannel === channel.id
                  ? "bg-[--active-bg] text-[--foreground]"
                  : "text-[--muted-foreground] hover:bg-[--hover-bg] hover:text-[--foreground]"
              )}
            >
              <Volume2 className="w-5 h-5 flex-shrink-0" />
              <span className="truncate">{channel.name}</span>
              {channel.users !== undefined && channel.users > 0 && (
                <span className="ml-auto text-xs text-[--muted-foreground]">
                  {channel.users}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 p-2 bg-[--sidebar-bg] border-t border-[--border]">
        <button
          onClick={() => setShowProfileModal(true)}
          className="relative flex-shrink-0"
        >
          <div className="w-8 h-8 rounded-full bg-[--primary] flex items-center justify-center text-white font-semibold text-sm">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className={cn("absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[--sidebar-bg]", getStatusColor(user.status))} />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{user.name}</p>
          <p className="text-xs text-[--muted-foreground] truncate">#{user.tag}</p>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded hover:bg-[--hover-bg] transition-colors">
            <Mic className="w-4 h-4 text-[--muted-foreground]" />
          </button>
          <button className="p-1.5 rounded hover:bg-[--hover-bg] transition-colors">
            <Headphones className="w-4 h-4 text-[--muted-foreground]" />
          </button>
          <button className="p-1.5 rounded hover:bg-[--hover-bg] transition-colors">
            <Settings className="w-4 h-4 text-[--muted-foreground]" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Mic({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

function Headphones({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

function Settings({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
