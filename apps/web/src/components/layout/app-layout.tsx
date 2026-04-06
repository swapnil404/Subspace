import { useState, useEffect } from "react";
import { AppProvider } from "@/context/app-context";
import { ServerSidebar } from "@/components/layout/server-sidebar";
import { ChannelList } from "@/components/layout/channel-list";
import { ChatArea } from "@/components/layout/chat-area";
import { MemberList } from "@/components/layout/member-list";
import { CallOverlay } from "@/components/call/call-overlay";
import { ProfileModal } from "@/components/profile/profile-modal";
import { SettingsPanel } from "@/components/settings/settings-panel";
import { UpgradeModal } from "@/components/premium/upgrade-modal";

function ThemeInitializer({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = localStorage.getItem("theme") === "dark" || 
                   (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  if (!mounted) {
    return <div className="flex h-screen bg-[--background]" />;
  }

  return <>{children}</>;
}

export function AppLayout() {
  return (
    <ThemeInitializer>
      <AppProvider>
        <div className="flex h-screen bg-[--background] text-[--foreground] overflow-hidden">
          <ServerSidebar />
          <ChannelList />
          <ChatArea />
          <MemberList />

          <CallOverlay />
          <ProfileModal />
          <SettingsPanel />
          <UpgradeModal />
        </div>
      </AppProvider>
    </ThemeInitializer>
  );
}
