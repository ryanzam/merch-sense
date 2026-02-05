import { Package, Clock, AlertTriangle } from "lucide-react"
import type { InventoryAlert } from "../types/inventory"

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