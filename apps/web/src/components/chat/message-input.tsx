import { useState, useRef, useEffect } from "react";
import { Smile, Gift, Send, Sticker, MessageSquare } from "lucide-react";
import { cn } from "@my-better-t-app/ui/lib/utils";

interface MessageInputProps {
  channelName: string;
}

export function MessageInput({ channelName }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        console.log("Sending message:", message);
        setMessage("");
      }
    }
  };

  return (
    <div className="px-4 pb-4">
      <div
        className={cn(
          "relative flex items-end gap-2 p-2 rounded-lg transition-colors",
          isFocused
            ? "bg-[--primary]/10 ring-1 ring-[--primary]"
            : "bg-[--background] ring-1 ring-[--border]"
        )}
      >
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-full hover:bg-[--hover-bg] transition-colors group">
            <Plus className="w-5 h-5 text-[--muted-foreground] group-hover:text-[--foreground]" />
          </button>
        </div>

        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={`Message #${channelName}`}
            rows={1}
            className="w-full bg-transparent text-sm resize-none outline-none placeholder:text-[--muted-foreground] min-h-[24px] max-h-[200px]"
            style={{ fieldSizing: "content" } as React.CSSProperties}
          />
        </div>

        <div className="flex items-center gap-1">
          <button className="p-2 rounded-full hover:bg-[--hover-bg] transition-colors group">
            <Gift className="w-5 h-5 text-[--muted-foreground] group-hover:text-[--discord-pink]" />
          </button>
          <button className="p-2 rounded-full hover:bg-[--hover-bg] transition-colors group">
            <GifIcon className="w-5 h-5 text-[--muted-foreground] group-hover:text-[--foreground]" />
          </button>
          <button className="p-2 rounded-full hover:bg-[--hover-bg] transition-colors group">
            <Sticker className="w-5 h-5 text-[--muted-foreground] group-hover:text-[--foreground]" />
          </button>
          <button className="p-2 rounded-full hover:bg-[--hover-bg] transition-colors group">
            <Smile className="w-5 h-5 text-[--muted-foreground] group-hover:text-[--discord-yellow]" />
          </button>

          <div className="w-px h-6 bg-[--border] mx-1" />

          <button className="p-2 rounded-full hover:bg-[--hover-bg] transition-colors group">
            <Mention className="w-5 h-5 text-[--muted-foreground] group-hover:text-[--discord-blurple]" />
          </button>

          {message.trim() ? (
            <button
              onClick={() => {
                if (message.trim()) {
                  console.log("Sending message:", message);
                  setMessage("");
                }
              }}
              className="p-2 rounded-full bg-[--primary] hover:bg-[--primary]/90 transition-colors"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          ) : (
            <button className="p-2 rounded-full hover:bg-[--hover-bg] transition-colors group">
              <MessageSquare className="w-5 h-5 text-[--muted-foreground] group-hover:text-[--foreground]" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-2 px-1">
        <div className="flex items-center gap-2 text-xs text-[--muted-foreground]">
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 rounded bg-[--discord-blurple] flex items-center justify-center text-white font-bold text-[10px]">
              !
            </span>
            Mentions
          </span>
          <span>|</span>
          <span>Reply preview</span>
          <span>|</span>
          <span>Typing indicator</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-[--muted-foreground]">
          <span>0</span>
          <span>/</span>
          <span>2000</span>
        </div>
      </div>
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function GifIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M10 9v6" />
      <path d="M14 9v6" />
      <path d="M7 9h4" />
      <path d="M13 15h4" />
    </svg>
  );
}

function Mention({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
    </svg>
  );
}
