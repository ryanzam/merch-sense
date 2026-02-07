import { Package, Clock, AlertTriangle } from "lucide-react"
import type { InventoryAlert, Product } from "../types/inventory"

export const getAlertIcon = (type: InventoryAlert["type"]) => {
    switch (type) {
        case "low_stock":
            return Package
        case "expiring_soon":
            return Clock
        case "expired":
            return AlertTriangle
    }
}

export function getProductStatus(product: Product): 'ok' | 'warning' | 'critical' {
    if (checkExpired(product)) return 'critical';
    if (checkLowStock(product) || checkExpiringSoon(product)) return 'warning';
    return 'ok';
}

export const getDaysUntilExpiry = (product: Product) => {
    if (!product.expiryDate) return null
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    const expiry = new Date(product.expiryDate)
    expiry.setHours(0, 0, 0, 0)
    return Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

export const checkLowStock = (product: Product) => product.quantity <= product.lowStockThreshold

export const checkExpiringSoon = (product: Product) => {
    const daysUntil = getDaysUntilExpiry(product)
    if (daysUntil === null) return false
    return daysUntil > 0 && daysUntil <= product.expiryWarningDays
}

export const checkExpired = (product: Product) => {
    const daysUntil = getDaysUntilExpiry(product)
    if (daysUntil === null) return false
    return daysUntil <= 0
}

export const getLowStocks = (products: Product[]) => products.filter(p => p.quantity < p.lowStockThreshold).length

export const getExpiringStocks = (products: Product[]) => products.filter((p: Product) => p?.expiryDate && p.expiryDate > new Date()).length

export const getExpiredStocks = (products: Product[]) => products.filter((p: Product) => p?.expiryDate && p.expiryDate < new Date()).length