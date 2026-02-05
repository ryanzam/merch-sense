import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Bell, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '../ui/badge'

interface HeaderProps {
    title: string;
    description?: string;
    onSearch?: (query: string) => void;
    showAddButton?: boolean;
    onAddClick?: () => void;
}

const Header = ({
    title, description, onSearch, showAddButton, onAddClick
}: HeaderProps) => {
    return (
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-xl">
            <div>
                <h1 className="text-lg font-semibold text-foreground">{title}</h1>
                {description && (
                    <p className="text-sm text-muted-foreground">{description}</p>
                )}
            </div>

            <div className="flex items-center gap-4">
                {onSearch && (
                    <div className="relative">
{/*                         <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
 */}                        <Input
                            placeholder="Search products..."
                            className="w-64 bg-secondary/50 pl-9"
                            onChange={(e) => onSearch(e.target.value)}
                        />
                    </div>
                )}

                {showAddButton && (
                    <Button onClick={onAddClick} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Product
                    </Button>
                )}

                <Link to="/alerts" className="relative">
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                        {/* {unacknowledgedCount > 0 && (
                            <Badge
                                variant="destructive"
                                className="absolute -right-1 -top-1 h-5 w-5 items-center justify-center p-0 text-[10px]"
                            >
                                {unacknowledgedCount > 9 ? '9+' : unacknowledgedCount}
                            </Badge>
                        )} */}
                    </Button>
                </Link>
            </div>
        </header>
    )
}

export default Header