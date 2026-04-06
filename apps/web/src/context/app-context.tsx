import { createContext, useContext, useState, type ReactNode } from "react";
import { currentUser, channels, members, messages, servers, type Server, type Channel, type Member, type Message } from "@/data/mock-data";

interface AppState {
  selectedServer: string;
  selectedChannel: string;
  selectedChannelType: "text" | "voice";
  activeCall: { type: "voice" | "video"; serverId: string; channelId: string } | null;
  sidebarCollapsed: boolean;
  memberListVisible: boolean;
  showProfileModal: boolean;
  showSettingsPanel: boolean;
  showUpgradeModal: boolean;
}

interface AppContextType extends AppState {
  serversList: Server[];
  channels: Channel[];
  members: Member[];
  messages: Message[];
  user: typeof currentUser;
  setSelectedServer: (id: string) => void;
  setSelectedChannel: (id: string, type: "text" | "voice") => void;
  setActiveCall: (call: AppState["activeCall"]) => void;
  toggleSidebar: () => void;
  toggleMemberList: () => void;
  setShowProfileModal: (show: boolean) => void;
  setShowSettingsPanel: (show: boolean) => void;
  setShowUpgradeModal: (show: boolean) => void;
  getServerChannels: () => Channel[];
  getServerMembers: () => Member[];
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    selectedServer: "gaming",
    selectedChannel: "general",
    selectedChannelType: "text",
    activeCall: null,
    sidebarCollapsed: false,
    memberListVisible: true,
    showProfileModal: false,
    showSettingsPanel: false,
    showUpgradeModal: false,
  });

  const setSelectedServer = (id: string) => {
    const serverChannels = channels[id] || [];
    const firstTextChannel = serverChannels.find((c) => c.type === "text");
    setState((prev) => ({
      ...prev,
      selectedServer: id,
      selectedChannel: firstTextChannel?.id || "",
      selectedChannelType: "text",
    }));
  };

  const setSelectedChannel = (id: string, type: "text" | "voice") => {
    setState((prev) => ({
      ...prev,
      selectedChannel: id,
      selectedChannelType: type,
    }));
  };

  const setActiveCall = (call: AppState["activeCall"]) => {
    setState((prev) => ({ ...prev, activeCall: call }));
  };

  const toggleSidebar = () => {
    setState((prev) => ({ ...prev, sidebarCollapsed: !prev.sidebarCollapsed }));
  };

  const toggleMemberList = () => {
    setState((prev) => ({ ...prev, memberListVisible: !prev.memberListVisible }));
  };

  const setShowProfileModal = (show: boolean) => {
    setState((prev) => ({ ...prev, showProfileModal: show }));
  };

  const setShowSettingsPanel = (show: boolean) => {
    setState((prev) => ({ ...prev, showSettingsPanel: show }));
  };

  const setShowUpgradeModal = (show: boolean) => {
    setState((prev) => ({ ...prev, showUpgradeModal: show }));
  };

  const getServerChannels = () => {
    return channels[state.selectedServer] || [];
  };

  const getServerMembers = () => {
    return members;
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        serversList: servers,
        channels: getServerChannels(),
        members: getServerMembers(),
        messages,
        user: currentUser,
        setSelectedServer,
        setSelectedChannel,
        setActiveCall,
        toggleSidebar,
        toggleMemberList,
        setShowProfileModal,
        setShowSettingsPanel,
        setShowUpgradeModal,
        getServerChannels,
        getServerMembers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
