import { Hash, Search, Pin, Bell, HelpCircle, Phone, Video, MoreHorizontal, Users } from "lucide-react";
import { useApp } from "@/context/app-context";
import { MessageList } from "@/components/chat/message-list";
import { MessageInput } from "@/components/chat/message-input";

export function ChatArea() {
  const {
    selectedServer,
    selectedChannel,
    selectedChannelType,
    memberListVisible,
    toggleMemberList,
    setActiveCall,
  } = useApp();

  const serverChannels = useApp().getServerChannels();
  const currentChannelData = serverChannels.find((c) => c.id === selectedChannel);
  const channelName = currentChannelData?.name || "general";

  const handleStartCall = (type: "voice" | "video") => {
    setActiveCall({
      type,
      serverId: selectedServer,
      channelId: selectedChannel,
    });
  };

  return (
    <div className="flex flex-col flex-1 h-full bg-[--chat-bg] min-w-0">
      <div className="flex items-center justify-between h-12 px-4 border-b border-[--border]">
        <div className="flex items-center gap-2 min-w-0">
          <Hash className="w-6 h-6 text-[--muted-foreground] flex-shrink-0" />
          <span className="font-semibold text-sm truncate">{channelName}</span>
          <div className="w-px h-4 bg-[--border] mx-1" />
          <button className="p-1 rounded hover:bg-[--hover-bg] transition-colors flex-shrink-0">
            <ChevronDown className="w-4 h-4 text-[--muted-foreground]" />
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-2 rounded hover:bg-[--hover-bg] transition-colors">
            <Search className="w-5 h-5 text-[--muted-foreground]" />
          </button>
          <button className="p-2 rounded hover:bg-[--hover-bg] transition-colors">
            <Pin className="w-5 h-5 text-[--muted-foreground]" />
          </button>
          <button className="p-2 rounded hover:bg-[--hover-bg] transition-colors">
            <Bell className="w-5 h-5 text-[--muted-foreground]" />
          </button>

          {selectedChannelType === "voice" && (
            <>
              <button
                onClick={() => handleStartCall("voice")}
                className="p-2 rounded hover:bg-[--hover-bg] transition-colors"
              >
                <Phone className="w-5 h-5 text-[--discord-green]" />
              </button>
              <button
                onClick={() => handleStartCall("video")}
                className="p-2 rounded hover:bg-[--hover-bg] transition-colors"
              >
                <Video className="w-5 h-5 text-[--discord-green]" />
              </button>
            </>
          )}

          <button
            onClick={toggleMemberList}
            className={`p-2 rounded hover:bg-[--hover-bg] transition-colors ${
              memberListVisible ? "bg-[--active-bg]" : ""
            }`}
          >
            <Users className="w-5 h-5 text-[--muted-foreground]" />
          </button>

          <div className="relative ml-1">
            <input
              type="text"
              placeholder="Search"
              className="w-32 h-7 px-2 text-sm bg-[--background] border border-[--border] rounded-md focus:outline-none focus:border-[--primary] transition-colors placeholder:text-[--muted-foreground]"
            />
          </div>

          <button className="p-2 rounded hover:bg-[--hover-bg] transition-colors">
            <MoreHorizontal className="w-5 h-5 text-[--muted-foreground]" />
          </button>

          <button className="p-2 rounded hover:bg-[--hover-bg] transition-colors">
            <HelpCircle className="w-5 h-5 text-[--muted-foreground]" />
          </button>
        </div>
      </div>

      <MessageList />

      <MessageInput channelName={channelName} />
    </div>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
