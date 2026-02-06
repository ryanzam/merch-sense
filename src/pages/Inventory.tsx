import { useSearchParams } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import Header from '../components/layout/Header'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { categories, products } from '../lib/mock-data'
import type { FilterMode } from '../types/inventory'
import { checkExpired, checkExpiringSoon, checkLowStock } from '../utils'
import { useMemo, useState } from 'react'
import { Filter } from 'lucide-react'

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";

const filters: { value: FilterMode; label: string; variant: 'default' | 'warning' | 'destructive' | 'success' }[] = [
    { value: 'all', label: 'All', variant: 'default' },
    { value: 'in-stock', label: 'In Stock', variant: 'success' },
    { value: 'low-stock', label: 'Low Stock', variant: 'warning' },
    { value: 'expiring', label: 'Expiring', variant: 'warning' },
    { value: 'expired', label: 'Expired', variant: 'destructive' },
];

const Inventory = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState<string>('all')

    const filterFromUrl = (searchParams.get('filter') as FilterMode) || 'all';

    const handleFilterChange = (filter: FilterMode) => {
        if (filter === 'all') {
            searchParams.delete('filter');
        } else {
            searchParams.set('filter', filter);
        }
        setSearchParams(searchParams);
    };

    const filterCounts = useMemo(() => ({
        all: products.length,
        'low-stock': products.filter(checkLowStock).length,
        expiring: products.filter(p => checkExpiringSoon(p) && !checkExpired(p)).length,
        expired: products.filter(checkExpired).length,
        'in-stock': products.filter(p => !checkLowStock(p) && !checkExpired(p)).length,
    }), [products]);

    return (
        <AppLayout>
            <Header
                title='Inventory'
                description={`${products.length} products`}
                showAddButton
                onSearch={undefined}
                onAddClick={undefined}
            />

            <div className="p-6 space-y-6">
                {/* Filters and View Toggle */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                        {filters.map(filter => (
                            <Button
                                key={filter.value}
                                variant={filterFromUrl === filter.value ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => handleFilterChange(filter.value)}
                                className="gap-2"
                            >
                                {filter.label}
                                <Badge
                                    variant={filterFromUrl === filter.value ? 'secondary' : 'ghost'}
                                    className="ml-1"
                                >
                                    {filterCounts[filter.value]}
                                </Badge>
                            </Button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-muted-foreground" />
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger className="w-37.5">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {categories().filter((cat): cat is string => cat !== undefined).map(cat => (
                                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Inventory