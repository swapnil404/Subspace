import { useState, useRef, useEffect } from "react";
import { useApp } from "@/context/app-context";
import { cn } from "@my-better-t-app/ui/lib/utils";
import { Smile, Reply, Bookmark } from "lucide-react";

export function MessageList() {
  const { messages, selectedServer } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredMessage, setHoveredMessage] = useState<string | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const groupedMessages: { date: string; messages: typeof messages }[] = [];
  let currentDate = "";

  messages.forEach((msg) => {
    const msgDate = msg.timestamp.toDateString();
    if (msgDate !== currentDate) {
      currentDate = msgDate;
      groupedMessages.push({ date: formatDate(msg.timestamp), messages: [msg] });
    } else {
      groupedMessages[groupedMessages.length - 1].messages.push(msg);
    }
  });

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
      <div className="flex items-center gap-4 py-4">
        <div className="flex-1 h-px bg-[--border]" />
        <span className="text-xs text-[--muted-foreground] font-medium">
          Welcome to {selectedServer}! 👋
        </span>
        <div className="flex-1 h-px bg-[--border]" />
      </div>

      {groupedMessages.map((group) => (
        <div key={group.date}>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 h-px bg-[--border]" />
            <span className="text-xs text-[--muted-foreground] font-medium">
              {group.date}
            </span>
            <div className="flex-1 h-px bg-[--border]" />
          </div>

          <div className="space-y-1">
            {group.messages.map((message) => (
              <div
                key={message.id}
                className="group relative flex gap-4 px-2 py-1 rounded-md hover:bg-[--hover-bg]/50 transition-colors"
                onMouseEnter={() => setHoveredMessage(message.id)}
                onMouseLeave={() => setHoveredMessage(null)}
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[--muted] flex items-center justify-center text-[--muted-foreground] font-semibold">
                    {message.author.name.charAt(0).toUpperCase()}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-medium text-sm text-[--foreground]">
                      {message.author.name}
                    </span>
                    {message.author.isBot && (
                      <span className="px-1 py-0.5 text-[10px] font-bold uppercase bg-[--discord-blurple] text-white rounded">
                        BOT
                      </span>
                    )}
                    <span className="text-xs text-[--muted-foreground]">
                      {formatTime(message.timestamp)}
                    </span>
                    {message.edited && (
                      <span className="text-xs text-[--muted-foreground] italic">
                        (edited)
                      </span>
                    )}
                  </div>

                  <p className="text-sm mt-0.5 break-words">{message.content}</p>

                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {message.attachments.map((att, i) => (
                        <div
                          key={i}
                          className="max-w-md p-3 bg-[--muted] rounded-md border border-[--border]"
                        >
                          <span className="text-sm text-[--foreground]">{att.name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {message.reactions && message.reactions.length > 0 && (
                    <div className="flex items-center gap-1 mt-2 flex-wrap">
                      {message.reactions.map((reaction, i) => (
                        <button
                          key={i}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-[--muted] hover:bg-[--active-bg] rounded-full text-xs transition-colors border border-transparent hover:border-[--primary]"
                        >
                          <span>{reaction.emoji}</span>
                          <span className="text-[--muted-foreground]">{reaction.count}</span>
                        </button>
                      ))}
                      <button className="inline-flex items-center justify-center w-6 h-6 bg-[--muted] hover:bg-[--active-bg] rounded-full transition-colors">
                        <Smile className="w-3.5 h-3.5 text-[--muted-foreground]" />
                      </button>
                    </div>
                  )}

                  {message.thread && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-[--discord-blurple] cursor-pointer hover:underline">
                      <Reply className="w-3.5 h-3.5" />
                      <span>{message.thread.count} replies</span>
                      <span className="text-[--muted-foreground]">
                        Last reply today at {formatTime(message.thread.lastReply)}
                      </span>
                    </div>
                  )}
                </div>

                {hoveredMessage === message.id && (
                  <div className={cn(
                    "absolute top-0 right-2 flex items-center gap-0.5 p-1",
                    "bg-[--background] rounded-md border border-[--border] shadow-md",
                    "animate-in fade-in-0 zoom-in-95 duration-150"
                  )}>
                    <button className="p-1.5 rounded hover:bg-[--hover-bg] transition-colors group/btn">
                      <Smile className="w-4 h-4 text-[--muted-foreground] group-hover/btn:text-[--foreground]" />
                    </button>
                    <button className="p-1.5 rounded hover:bg-[--hover-bg] transition-colors group/btn">
                      <Reply className="w-4 h-4 text-[--muted-foreground] group-hover/btn:text-[--foreground]" />
                    </button>
                    <button className="p-1.5 rounded hover:bg-[--hover-bg] transition-colors group/btn">
                      <ReactionIcon className="w-4 h-4 text-[--muted-foreground] group-hover/btn:text-[--foreground]" />
                    </button>
                    <button className="p-1.5 rounded hover:bg-[--hover-bg] transition-colors group/btn">
                      <Bookmark className="w-4 h-4 text-[--muted-foreground] group-hover/btn:text-[--foreground]" />
                    </button>
                    <button className="p-1.5 rounded hover:bg-[--hover-bg] transition-colors group/btn">
                      <MoreHorizontal className="w-4 h-4 text-[--muted-foreground] group-hover/btn:text-[--foreground]" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="h-2" />
    </div>
  );
}

function ReactionIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  );
}

function MoreHorizontal({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}
