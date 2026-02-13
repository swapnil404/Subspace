import type { FC, PropsWithChildren } from "react";

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
