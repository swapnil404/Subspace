import { useState } from "react";
import { X, User, Palette, Bell, Shield } from "lucide-react";
import { useApp } from "@/context/app-context";
import { cn } from "@my-better-t-app/ui/lib/utils";

type TabId = "account" | "appearance" | "notifications" | "privacy";

interface Tab {
  id: TabId;
  label: string;
  icon: React.ElementType;
}

const tabs: Tab[] = [
  { id: "account", label: "Account", icon: User },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy & Safety", icon: Shield },
];

export function SettingsPanel() {
  const { showSettingsPanel, setShowSettingsPanel } = useApp();
  const [activeTab, setActiveTab] = useState<TabId>("appearance");
  const [settings, setSettings] = useState({
    theme: "dark",
    fontSize: "medium",
    messageNotifications: "all",
    serverNotifications: "mentions",
    showOnlineStatus: true,
    allowDMs: true,
    allowFriendRequests: true,
  });

  if (!showSettingsPanel) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setShowSettingsPanel(false)}
      />

      <div
        className={cn(
          "relative w-full max-w-3xl h-[80vh] rounded-xl overflow-hidden shadow-2xl flex",
          "bg-[--sidebar-bg] border border-[--border]",
          "animate-in zoom-in-95 fade-in duration-200"
        )}
      >
        <div className="w-56 border-r border-[--border] p-4">
          <h2 className="text-lg font-bold mb-4">Settings</h2>
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                    activeTab === tab.id
                      ? "bg-[--active-bg] text-[--foreground] font-medium"
                      : "text-[--muted-foreground] hover:bg-[--hover-bg] hover:text-[--foreground]"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[--border]">
            <h3 className="text-lg font-semibold capitalize">{activeTab} Settings</h3>
            <button
              onClick={() => setShowSettingsPanel(false)}
              className="p-2 rounded-full hover:bg-[--hover-bg] transition-colors"
            >
              <X className="w-5 h-5 text-[--muted-foreground]" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === "appearance" && (
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium block mb-3">Theme</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSettings({ ...settings, theme: "dark" })}
                      className={cn(
                        "p-4 rounded-lg border-2 transition-all",
                        settings.theme === "dark"
                          ? "border-[--primary] bg-[--primary]/10"
                          : "border-[--border] hover:border-[--primary]/50"
                      )}
                    >
                      <div className="aspect-video rounded bg-[#1e1f22] mb-2" />
                      <span className="text-sm font-medium">Dark</span>
                    </button>
                    <button
                      onClick={() => setSettings({ ...settings, theme: "light" })}
                      className={cn(
                        "p-4 rounded-lg border-2 transition-all",
                        settings.theme === "light"
                          ? "border-[--primary] bg-[--primary]/10"
                          : "border-[--border] hover:border-[--primary]/50"
                      )}
                    >
                      <div className="aspect-video rounded bg-[#f2f3f5] mb-2" />
                      <span className="text-sm font-medium">Light</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-3">Font Size</label>
                  <select
                    value={settings.fontSize}
                    onChange={(e) => setSettings({ ...settings, fontSize: e.target.value })}
                    className="w-full bg-[--background] border border-[--border] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[--primary]"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-3">Sidebar</label>
                  <div className="space-y-3">
                    <ToggleOption
                      label="Compact mode"
                      description="Reduce sidebar width"
                      checked={false}
                      onChange={() => {}}
                    />
                    <ToggleOption
                      label="Hide member list"
                      description="Show member list only when hovered"
                      checked={false}
                      onChange={() => {}}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium block mb-3">Message Notifications</label>
                  <select
                    value={settings.messageNotifications}
                    onChange={(e) => setSettings({ ...settings, messageNotifications: e.target.value })}
                    className="w-full bg-[--background] border border-[--border] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[--primary]"
                  >
                    <option value="all">All Messages</option>
                    <option value="mentions">Mentions Only</option>
                    <option value="none">Nothing</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-3">Server Notifications</label>
                  <select
                    value={settings.serverNotifications}
                    onChange={(e) => setSettings({ ...settings, serverNotifications: e.target.value })}
                    className="w-full bg-[--background] border border-[--border] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[--primary]"
                  >
                    <option value="all">All Messages</option>
                    <option value="mentions">Mentions Only</option>
                    <option value="none">Nothing</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <ToggleOption
                    label="Notification sounds"
                    description="Play sound for notifications"
                    checked={true}
                    onChange={() => {}}
                  />
                  <ToggleOption
                    label="Desktop notifications"
                    description="Show system notifications"
                    checked={true}
                    onChange={() => {}}
                  />
                </div>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <ToggleOption
                    label="Show online status"
                    description="Let others see when you're online"
                    checked={settings.showOnlineStatus}
                    onChange={(checked) => setSettings({ ...settings, showOnlineStatus: checked })}
                  />
                  <ToggleOption
                    label="Allow direct messages"
                    description="Let people send you DMs from servers"
                    checked={settings.allowDMs}
                    onChange={(checked) => setSettings({ ...settings, allowDMs: checked })}
                  />
                  <ToggleOption
                    label="Allow friend requests"
                    description="Let others send you friend requests"
                    checked={settings.allowFriendRequests}
                    onChange={(checked) => setSettings({ ...settings, allowFriendRequests: checked })}
                  />
                </div>

                <div className="pt-4 border-t border-[--border]">
                  <h4 className="text-sm font-medium mb-3">Blocked Users</h4>
                  <p className="text-sm text-[--muted-foreground]">No blocked users</p>
                </div>
              </div>
            )}

            {activeTab === "account" && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-[--muted]">
                  <div className="w-16 h-16 rounded-full bg-[--primary] flex items-center justify-center text-white text-xl font-bold">
                    K
                  </div>
                  <div>
                    <h4 className="font-semibold">Kalpraj</h4>
                    <p className="text-sm text-[--muted-foreground]">#0001</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full bg-[--background] border border-[--border] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[--primary]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium block mb-2">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-[--background] border border-[--border] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[--primary]"
                  />
                </div>

                <button className="px-4 py-2 bg-[--primary] hover:bg-[--primary]/90 text-white rounded-md font-medium transition-colors">
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ToggleOptionProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function ToggleOption({ label, description, checked, onChange }: ToggleOptionProps) {
  return (
    <label className="flex items-center justify-between p-3 rounded-lg bg-[--muted] cursor-pointer hover:bg-[--active-bg] transition-colors">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-[--muted-foreground]">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative w-11 h-6 rounded-full transition-colors",
          checked ? "bg-[--primary]" : "bg-[--muted-foreground]/30"
        )}
      >
        <span
          className={cn(
            "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
            checked ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>
    </label>
  );
}
