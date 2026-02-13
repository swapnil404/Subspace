import type { FC, PropsWithChildren } from "hono/jsx";

export const Sidebar: FC<PropsWithChildren> = ({ children }) => {
    return (
        <aside class="sidebar">
            {children}
        </aside>
    );
};

export const SidebarContent: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div class="sidebar-content">
            {children}
        </div>
    );
};

export const SidebarHeader: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div class="sidebar-header">
            {children}
        </div>
    );
};

export const SidebarFooter: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div class="sidebar-footer">
            {children}
        </div>
    );
};

export const SidebarGroup: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div class="sidebar-group">
            {children}
        </div>
    );
};
