import { type FC, type PropsWithChildren, useState, createContext, useContext } from "react";

interface SidebarContextType {
    isOpen: boolean;
    toggle: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};

export const SidebarProvider: FC<PropsWithChildren> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggle = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <SidebarContext.Provider value={{ isOpen, toggle }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const SidebarTrigger: FC = () => {
    const { toggle } = useSidebar();
    return (
        <button onClick={toggle} className="p-2 border rounded hover:bg-gray-100">
            Toggle Sidebar
        </button>
    );
};

export const Sidebar: FC<PropsWithChildren> = ({ children }) => {
    return (
        <aside className="sidebar">
            {children}
        </aside>
    );
};

export const SidebarContent: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="sidebar-content">
            {children}
        </div>
    );
};

export const SidebarHeader: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="sidebar-header">
            {children}
        </div>
    );
};

export const SidebarFooter: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="sidebar-footer">
            {children}
        </div>
    );
};

export const SidebarGroup: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="sidebar-group">
            {children}
        </div>
    );
};
