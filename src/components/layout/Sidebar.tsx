import { Bell, Box, Calendar, LayoutDashboard, Package, ScanBarcode, Settings, TrendingDown } from 'lucide-react';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';

const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Inventory', href: '/inventory', icon: Package },
    { name: 'Scan', href: '/scan', icon: ScanBarcode },
    { name: 'Alerts', href: '/alerts', icon: Bell },
];

const secondaryNavigation = [
    { name: 'Low Stock', href: '/inventory?filter=low-stock', icon: TrendingDown },
    { name: 'Expiring Soon', href: '/inventory?filter=expiring', icon: Calendar },
];

const Sidebar = () => {

    const location = useLocation()

    return (
        <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar border-r border-sidebar-border">
            {/* Logo */}
            <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
                    <Box className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-sidebar-foreground">InventoryIQ</span>
                    <span className="text-xs text-muted-foreground">Stock Management</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-4">
                <div className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Main
                </div>
                {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                            )}
                        >
                            <item.icon className={cn(
                                "h-5 w-5 transition-colors",
                                isActive ? "text-primary" : "text-muted-foreground"
                            )} />
                            {item.name}
                        </Link>
                    );
                })}

                <div className="my-4 border-t border-sidebar-border" />

                <div className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Quick Filters
                </div>
                {secondaryNavigation.map((item) => {
                    const isActive = location.pathname + location.search === item.href;
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                                isActive
                                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                    : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="border-t border-sidebar-border p-4">
                <Link
                    to="/settings"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
                >
                    <Settings className="h-4 w-4" />
                    Settings
                </Link>
            </div>
        </aside>
    )
}

export default Sidebar