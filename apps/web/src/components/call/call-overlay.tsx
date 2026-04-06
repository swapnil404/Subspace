import { useState } from "react";
import { Mic, MicOff, Headphones, HeadphoneOff, Video, VideoOff, PhoneOff, Monitor, Users, Settings, Maximize2, Minimize2 } from "lucide-react";
import { useApp } from "@/context/app-context";
import { cn } from "@my-better-t-app/ui/lib/utils";

export function CallOverlay() {
  const { activeCall, setActiveCall } = useApp();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isScreenSharing] = useState(false);

  if (!activeCall) return null;

  if (isMinimized) {
    return (
      <div
        className={cn(
          "fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3",
          "bg-[--popover] border border-[--border] rounded-lg shadow-xl",
          "animate-in slide-in-from-bottom-4 duration-300"
        )}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[--discord-green] flex items-center justify-center animate-pulse-ring">
            {isMuted ? (
              <MicOff className="w-4 h-4 text-white" />
            ) : (
              <Mic className="w-4 h-4 text-white" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium">In {activeCall.type} call</p>
            <p className="text-xs text-[--muted-foreground]">2 others connected</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={cn(
              "p-2 rounded-md transition-colors",
              isMuted ? "bg-[--discord-red]" : "hover:bg-[--hover-bg]"
            )}
          >
            {isMuted ? (
              <MicOff className="w-4 h-4 text-white" />
            ) : (
              <Mic className="w-4 h-4 text-[--muted-foreground]" />
            )}
          </button>
          <button
            onClick={() => setIsDeafened(!isDeafened)}
            className={cn(
              "p-2 rounded-md transition-colors",
              isDeafened ? "bg-[--discord-red]" : "hover:bg-[--hover-bg]"
            )}
          >
            {isDeafened ? (
              <HeadphoneOff className="w-4 h-4 text-white" />
            ) : (
              <Headphones className="w-4 h-4 text-[--muted-foreground]" />
            )}
          </button>
          <button
            onClick={() => setActiveCall(null)}
            className="p-2 rounded-md bg-[--discord-red] hover:bg-[--discord-red]/90 transition-colors"
          >
            <PhoneOff className="w-4 h-4 text-white" />
          </button>
        </div>

        <button
          onClick={() => setIsMinimized(false)}
          className="p-2 rounded-md hover:bg-[--hover-bg] transition-colors"
        >
          <Maximize2 className="w-4 h-4 text-[--muted-foreground]" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col bg-[--background]/95 backdrop-blur-sm",
        "animate-in fade-in duration-300"
      )}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-[--border]">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">Voice Channel</h2>
          <span className="flex items-center gap-1 px-2 py-1 bg-[--discord-green]/20 text-[--discord-green] rounded-full text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-[--discord-green] animate-pulse" />
            Live
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-md hover:bg-[--hover-bg] transition-colors">
            <Users className="w-5 h-5 text-[--muted-foreground]" />
          </button>
          <button className="p-2 rounded-md hover:bg-[--hover-bg] transition-colors">
            <Settings className="w-5 h-5 text-[--muted-foreground]" />
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            className="p-2 rounded-md hover:bg-[--hover-bg] transition-colors"
          >
            <Minimize2 className="w-5 h-5 text-[--muted-foreground]" />
          </button>
          <button
            onClick={() => setActiveCall(null)}
            className="px-4 py-2 bg-[--discord-red] hover:bg-[--discord-red]/90 text-white rounded-md font-medium transition-colors"
          >
            End Call
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="grid grid-cols-2 gap-6 max-w-4xl w-full">
          <ParticipantTile
            name="You"
            isMuted={isMuted}
            isVideoOn={isVideoOn}
            isSpeaking={true}
          />
          <ParticipantTile
            name="Alex Chen"
            isMuted={false}
            isVideoOn={true}
            isSpeaking={false}
          />
          <ParticipantTile
            name="Sarah Miller"
            isMuted={true}
            isVideoOn={false}
            isSpeaking={false}
          />
          <ParticipantTile
            name="Mike Johnson"
            isMuted={false}
            isVideoOn={true}
            isSpeaking={false}
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 pb-8">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={cn(
            "p-4 rounded-full transition-all duration-200",
            isMuted
              ? "bg-[--discord-red] hover:bg-[--discord-red]/90"
              : "bg-[--muted] hover:bg-[--active-bg]"
          )}
        >
          {isMuted ? (
            <MicOff className="w-6 h-6 text-white" />
          ) : (
            <Mic className="w-6 h-6 text-[--foreground]" />
          )}
        </button>

        <button
          onClick={() => setIsDeafened(!isDeafened)}
          className={cn(
            "p-4 rounded-full transition-all duration-200",
            isDeafened
              ? "bg-[--discord-red] hover:bg-[--discord-red]/90"
              : "bg-[--muted] hover:bg-[--active-bg]"
          )}
        >
          {isDeafened ? (
              <HeadphoneOff className="w-6 h-6 text-white" />
            ) : (
              <Headphones className="w-6 h-6 text-[--foreground]" />
            )}
        </button>

        <button
          onClick={() => setIsVideoOn(!isVideoOn)}
          className={cn(
            "p-4 rounded-full transition-all duration-200",
            !isVideoOn
              ? "bg-[--discord-red] hover:bg-[--discord-red]/90"
              : "bg-[--muted] hover:bg-[--active-bg]"
          )}
        >
          {isVideoOn ? (
            <Video className="w-6 h-6 text-[--foreground]" />
          ) : (
            <VideoOff className="w-6 h-6 text-white" />
          )}
        </button>

        <button
          className={cn(
            "p-4 rounded-full transition-all duration-200",
            isScreenSharing
              ? "bg-[--discord-blurple] hover:bg-[--discord-blurple]/90"
              : "bg-[--muted] hover:bg-[--active-bg]"
          )}
        >
          <Monitor className={cn("w-6 h-6", isScreenSharing ? "text-white" : "text-[--foreground]")} />
        </button>

        <div className="w-px h-10 bg-[--border] mx-2" />

        <button
          onClick={() => setActiveCall(null)}
          className="p-4 rounded-full bg-[--discord-red] hover:bg-[--discord-red]/90 transition-all duration-200"
        >
          <PhoneOff className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}

interface ParticipantTileProps {
  name: string;
  isMuted: boolean;
  isVideoOn: boolean;
  isSpeaking: boolean;
}

function ParticipantTile({ name, isMuted, isSpeaking }: ParticipantTileProps) {
  return (
    <div
      className={cn(
        "relative aspect-video rounded-xl overflow-hidden bg-[--muted] transition-all duration-200",
        isSpeaking && "ring-2 ring-[--discord-green] ring-offset-2 ring-offset-[--background]"
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-[--primary] flex items-center justify-center text-white text-2xl font-semibold">
          {name.charAt(0).toUpperCase()}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white">{name}</span>
          <div className="flex items-center gap-1">
            {isMuted && (
              <div className="p-1 rounded bg-[--discord-red]">
                <MicOff className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
        </div>
      </div>

      {isSpeaking && (
        <div className="absolute inset-0 rounded-xl border-2 border-[--discord-green] animate-pulse opacity-50" />
      )}
    </div>
  );
}
