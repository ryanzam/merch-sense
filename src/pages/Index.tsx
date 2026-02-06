import { AlertTriangleIcon, ArrowRight, Clock, Package2Icon, TrendingDownIcon } from 'lucide-react'
import StatCard from '../components/dashboard/StatCard'
import AppLayout from '../components/layout/AppLayout'
import Header from '../components/layout/Header'
import { alerts, products } from '../lib/mock-data'
import AlertList from '../components/dashboard/AlertList'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { getExpiredStocks, getExpiringStocks, getLowStocks } from '../utils'

const Index = () => {

    const lowStocks = getLowStocks(products)
    const expiringStocks = getExpiringStocks(products)
    const expiredStocks = getExpiredStocks(products)

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

                <div className='grid gap-6 mt-5'>
                    <div>
                        <AlertList
                            alerts={alerts}
                            onAlertAcknowledged={undefined}
                            limit={5}
                            showViewAll
                        />
                    </div>

                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Link to="/scan" className="block">
                                    <Button variant="default" className="w-full justify-between">
                                        Scan Barcode
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link to="/inventory" className="block">
                                    <Button variant="outline" className="w-full justify-between">
                                        View All Inventory
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link to="/inventory?filter=low-stock" className="block">
                                    <Button variant="outline" className="w-full justify-between">
                                        Restock Low Items
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Index