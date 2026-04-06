import { useState } from "react";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { useApp } from "@/context/app-context";
import { cn } from "@my-better-t-app/ui/lib/utils";

export function MemberList() {
  const { members, memberListVisible, toggleMemberList, setShowProfileModal } = useApp();
  const [collapsedOffline, setCollapsedOffline] = useState(false);

  const onlineMembers = members.filter((m) => m.status !== "offline" && !m.isBot);
  const offlineMembers = members.filter((m) => m.status === "offline" && !m.isBot);
  const bots = members.filter((m) => m.isBot);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-[--discord-green]";
      case "idle": return "bg-[--discord-yellow]";
      case "dnd": return "bg-[--discord-red]";
      default: return "bg-[--muted-foreground]";
    }
  };

  if (!memberListVisible) return null;

  return (
    <div className="flex flex-col h-full bg-[--sidebar-bg] w-60 border-l border-[--border]">
      <div className="flex items-center justify-between px-4 h-12 border-b border-[--border]">
        <span className="text-xs font-semibold uppercase text-[--muted-foreground] tracking-wide">
          Members — {members.length}
        </span>
        <button
          onClick={toggleMemberList}
          className="p-1 rounded hover:bg-[--hover-bg] transition-colors"
        >
          <X className="w-4 h-4 text-[--muted-foreground]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-2 space-y-4">
        {onlineMembers.length > 0 && (
          <div className="space-y-0.5">
            <button
              onClick={() => {}}
              className="flex items-center gap-1 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-[--muted-foreground] hover:text-[--foreground] transition-colors w-full"
            >
              <ChevronDown className="w-4 h-4" />
              <span>Online — {onlineMembers.length}</span>
            </button>
            {onlineMembers.map((member) => (
              <MemberItem
                key={member.id}
                member={member}
                getStatusColor={getStatusColor}
                onClick={() => setShowProfileModal(true)}
              />
            ))}
          </div>
        )}

        {bots.length > 0 && (
          <div className="space-y-0.5">
            <button
              onClick={() => {}}
              className="flex items-center gap-1 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-[--muted-foreground] hover:text-[--foreground] transition-colors w-full"
            >
              <ChevronDown className="w-4 h-4" />
              <span>Bots — {bots.length}</span>
            </button>
            {bots.map((member) => (
              <MemberItem
                key={member.id}
                member={member}
                getStatusColor={getStatusColor}
                onClick={() => setShowProfileModal(true)}
              />
            ))}
          </div>
        )}

        <div className="space-y-0.5">
          <button
            onClick={() => setCollapsedOffline(!collapsedOffline)}
            className="flex items-center gap-1 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-[--muted-foreground] hover:text-[--foreground] transition-colors w-full"
          >
            {collapsedOffline ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
            <span>Offline — {offlineMembers.length}</span>
          </button>
          {!collapsedOffline && offlineMembers.map((member) => (
            <MemberItem
              key={member.id}
              member={member}
              getStatusColor={getStatusColor}
              onClick={() => setShowProfileModal(true)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface MemberItemProps {
  member: {
    id: string;
    name: string;
    tag: string;
    avatar?: string;
    status: string;
    role: string;
    roleColor: string;
    isBot?: boolean;
  };
  getStatusColor: (status: string) => string;
  onClick: () => void;
}

function MemberItem({ member, getStatusColor, onClick }: MemberItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-all duration-150 hover:bg-[--hover-bg] group"
    >
      <div className="relative flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-[--muted] flex items-center justify-center text-[--muted-foreground] font-semibold text-xs">
          {member.name.charAt(0).toUpperCase()}
        </div>
        <div className={cn(
          "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[--sidebar-bg]",
          getStatusColor(member.status)
        )} />
      </div>
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center gap-1.5">
          <span className={cn(
            "font-medium truncate",
            member.status === "offline" && "text-[--muted-foreground]"
          )}>
            {member.name}
          </span>
          {member.isBot && (
            <span className="px-1 py-0.5 text-[8px] font-bold uppercase bg-[--muted] text-[--muted-foreground] rounded">
              BOT
            </span>
          )}
        </div>
        <span className="text-xs truncate" style={{ color: member.roleColor }}>
          {member.role}
        </span>
      </div>
    </button>
  );
}
