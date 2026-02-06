export interface Product {
    id: string;
    barcode: string;
    name: string;
    description?: string;
    quantity: number;
    lowStockThreshold: number;
    expiryDate?: Date;
    expiryWarningDays: number;
    category?: string;
    location?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface InventoryAlert {
    id: string;
    productId: string;
    productName: string;
    type: 'low_stock' | 'expiring_soon' | 'expired';
    message: string;
    severity: 'warning' | 'critical';
    createdAt: Date;
    acknowledged: boolean;
}

export interface ScanResult {
    barcode: string;
    found: boolean;
    product?: Product;
}

export interface DashboardStats {
    totalProducts: number;
    lowStockCount: number;
    expiringCount: number;
    expiredCount: number;
    totalValue?: number;
}

export type ViewMode = 'grid' | 'table';
export type FilterMode = 'all' | 'low-stock' | 'expiring' | 'expired' | 'in-stock';