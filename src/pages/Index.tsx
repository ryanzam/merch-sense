import { AlertTriangleIcon, Clock, Package2Icon, TrendingDownIcon } from 'lucide-react'
import StatCard from '../components/dashboard/StatCard'
import AppLayout from '../components/layout/AppLayout'
import Header from '../components/layout/Header'
import { products } from '../lib/mock-data'
import type { Product } from '../types/inventory'

const Index = () => {

    const lowStocks = products.filter(p => p.quantity < p.lowStockThreshold).length
    const expiringStocks = products.filter((p: Product) => p?.expiryDate && p.expiryDate > new Date()).length
    const expiredStocks = products.filter((p: Product) => p?.expiryDate && p.expiryDate < new Date()).length

    return (
        <AppLayout>
            <Header title='Dashboard' description='Monitor your inventory' />

            <div className="p-6">
                <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                    <StatCard
                        title='Total Products'
                        value={products.length}
                        icon={Package2Icon}
                    />
                    <StatCard
                        title='Low Stock Items'
                        value={lowStocks}
                        icon={TrendingDownIcon}
                        variant={lowStocks > 2 ? "warning" : "default"}
                    />
                    <StatCard
                        title='Expiring Soon'
                        value={expiringStocks}
                        icon={Clock}
                        variant={expiringStocks > 3 ? "warning" : "default"}
                    />
                    <StatCard
                        title='Expired'
                        value={expiredStocks}
                        icon={AlertTriangleIcon}
                        variant={expiredStocks > 0 ? "danger" : "default"}
                    />
                </div>
            </div>
        </AppLayout>
    )
}

export default Index