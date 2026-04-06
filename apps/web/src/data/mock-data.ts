export interface Server {
  id: string;
  name: string;
  icon: string;
  unread: number;
  mentions: number;
  hasActiveCall?: boolean;
}

export interface Channel {
  id: string;
  type: "category" | "text" | "voice";
  name: string;
  unread?: number;
  users?: number;
  collapsed?: boolean;
}

export interface Member {
  id: string;
  name: string;
  tag: string;
  avatar?: string;
  status: "online" | "idle" | "dnd" | "offline";
  role: string;
  roleColor: string;
  isBot?: boolean;
}

export interface Message {
  id: string;
  author: {
    id: string;
    name: string;
    tag: string;
    avatar?: string;
    isBot?: boolean;
  };
  content: string;
  timestamp: Date;
  edited?: boolean;
  reactions?: { emoji: string; count: number; users: string[] }[];
  attachments?: { name: string; url: string; type: "image" | "file" }[];
  thread?: { count: number; lastReply: Date };
  replyTo?: string;
}

export const servers: Server[] = [
  { id: "home", name: "Home", icon: "🏠", unread: 0, mentions: 0 },
  { id: "gaming", name: "Gaming Hub", icon: "🎮", unread: 5, mentions: 2 },
  { id: "music", name: "Music Lovers", icon: "🎵", unread: 0, mentions: 0 },
  { id: "tech", name: "Tech Community", icon: "💻", unread: 12, mentions: 0 },
  { id: "art", name: "Art & Design", icon: "🎨", unread: 0, mentions: 1 },
  { id: "anime", name: "Anime Club", icon: "🌸", unread: 3, mentions: 0 },
  { id: "movies", name: "Movie Buffs", icon: "🎬", unread: 0, mentions: 0 },
];

export const channels: Record<string, Channel[]> = {
  gaming: [
    { id: "cat1", type: "category", name: "Text Channels", collapsed: false },
    { id: "gen", type: "text", name: "general", unread: 2 },
    { id: "random", type: "text", name: "random", unread: 3 },
    { id: "lfg", type: "text", name: "looking-for-group" },
    { id: "cat2", type: "category", name: "Voice Channels", collapsed: false },
    { id: "voice1", type: "voice", name: "General Voice", users: 5 },
    { id: "voice2", type: "voice", name: "LFG Voice", users: 2 },
    { id: "voice3", type: "voice", name: "Streaming", users: 0 },
  ],
  music: [
    { id: "cat1", type: "category", name: "Text Channels", collapsed: false },
    { id: "general", type: "text", name: "general" },
    { id: "recommendations", type: "text", name: "recommendations" },
    { id: "cat2", type: "category", name: "Voice Channels", collapsed: false },
    { id: "listening", type: "voice", name: "Listening Party", users: 8 },
  ],
  tech: [
    { id: "cat1", type: "category", name: "Text Channels", collapsed: false },
    { id: "general", type: "text", name: "general", unread: 8 },
    { id: "programming", type: "text", name: "programming" },
    { id: "hardware", type: "text", name: "hardware" },
    { id: "cat2", type: "category", name: "Voice Channels", collapsed: false },
    { id: "dev-chat", type: "voice", name: "Dev Chat", users: 3 },
  ],
  art: [
    { id: "cat1", type: "category", name: "Text Channels", collapsed: false },
    { id: "general", type: "text", name: "general" },
    { id: "showcase", type: "text", name: "showcase", unread: 1 },
    { id: "critique", type: "text", name: "critique" },
  ],
  anime: [
    { id: "cat1", type: "category", name: "Text Channels", collapsed: false },
    { id: "general", type: "text", name: "general", unread: 3 },
    { id: "watch-party", type: "text", name: "watch-party" },
  ],
  movies: [
    { id: "cat1", type: "category", name: "Text Channels", collapsed: false },
    { id: "general", type: "text", name: "general" },
    { id: "reviews", type: "text", name: "reviews" },
  ],
};

export const members: Member[] = [
  { id: "1", name: "Alex Chen", tag: "1234", status: "online", role: "Admin", roleColor: "#ed4245", isBot: false },
  { id: "2", name: "Sarah Miller", tag: "5678", status: "idle", role: "Moderator", roleColor: "#fee75c", isBot: false },
  { id: "3", name: "Mike Johnson", tag: "9012", status: "dnd", role: "Moderator", roleColor: "#fee75c", isBot: false },
  { id: "4", name: "Emma Wilson", tag: "3456", status: "online", role: "Member", roleColor: "#5865f2", isBot: false },
  { id: "5", name: "David Brown", tag: "7890", status: "online", role: "Member", roleColor: "#5865f2", isBot: false },
  { id: "6", name: "Lisa Garcia", tag: "2345", status: "offline", role: "Member", roleColor: "#5865f2", isBot: false },
  { id: "7", name: "James Lee", tag: "6789", status: "online", role: "VIP", roleColor: "#eb459e", isBot: false },
  { id: "8", name: "Bot Assistant", tag: "0001", status: "online", role: "Bot", roleColor: "#23a559", isBot: true },
];

export const messages: Message[] = [
  {
    id: "1",
    author: { id: "1", name: "Alex Chen", tag: "1234", isBot: false },
    content: "Hey everyone! Welcome to the server! 🎉",
    timestamp: new Date(Date.now() - 3600000 * 2),
    reactions: [
      { emoji: "🎉", count: 5, users: ["2", "3", "4", "5", "6"] },
      { emoji: "❤️", count: 3, users: ["2", "4", "7"] },
    ],
  },
  {
    id: "2",
    author: { id: "2", name: "Sarah Miller", tag: "5678", isBot: false },
    content: "Thanks for having us! This looks amazing!",
    timestamp: new Date(Date.now() - 3600000 * 1.5),
  },
  {
    id: "3",
    author: { id: "8", name: "Bot Assistant", tag: "0001", isBot: true },
    content: "Welcome to the server! Use /help to see available commands.",
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: "4",
    author: { id: "3", name: "Mike Johnson", tag: "9012", isBot: false },
    content: "Just set up the new channels. Let me know if you need anything else!",
    timestamp: new Date(Date.now() - 1800000),
    reactions: [
      { emoji: "👍", count: 2, users: ["1", "2"] },
    ],
  },
  {
    id: "5",
    author: { id: "4", name: "Emma Wilson", tag: "3456", isBot: false },
    content: "The dark mode looks so clean! Great job on the design 👏",
    timestamp: new Date(Date.now() - 900000),
  },
  {
    id: "6",
    author: { id: "7", name: "James Lee", tag: "6789", isBot: false },
    content: "Anyone up for a game later tonight?",
    timestamp: new Date(Date.now() - 600000),
    reactions: [
      { emoji: "🎮", count: 4, users: ["1", "2", "3", "5"] },
    ],
  },
  {
    id: "7",
    author: { id: "1", name: "Alex Chen", tag: "1234", isBot: false },
    content: "Count me in! I'll be on around 8pm EST",
    timestamp: new Date(Date.now() - 300000),
  },
  {
    id: "8",
    author: { id: "5", name: "David Brown", tag: "7890", isBot: false },
    content: "Same here! Looking forward to it 🚀",
    timestamp: new Date(Date.now() - 120000),
  },
];

export const currentUser = {
  id: "current",
  name: "Kalpraj",
  tag: "0001",
  avatar: undefined,
  status: "online" as const,
  isPro: true,
};
