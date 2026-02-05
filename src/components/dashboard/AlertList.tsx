import { AlertTriangle, Clock, Package, X } from "lucide-react";
import type { InventoryAlert } from "../../types/inventory";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";
import { getAlertIcon } from "../../utils";

interface AlertsListProps {
    alerts: InventoryAlert[];
    onAlertAcknowledged?: () => void;
    limit?: number;
    showViewAll?: boolean;
}


const AlertList = ({
    alerts, onAlertAcknowledged, limit, showViewAll
}: AlertsListProps) => {

    const displayedAlerts = limit ? alerts.slice(0, limit) : alerts

    const handleAcknowledge = (alertId: string) => {

    }

    if (alerts.length === 0) {
        return (
            <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                    <div className="rounded-full bg-success/10 p-4 mb-4">
                        <Package className="h-8 w-8 text-success" />
                    </div>
                    <p className="text-lg font-medium text-foreground">All clear!</p>
                    <p className="text-sm text-muted-foreground">No alerts at the moment</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Active Alerts</CardTitle>
                {showViewAll && alerts.length > (limit || 0) && (
                    <Link to="/alerts">
                        <Button variant="ghost" size="sm">View All</Button>
                    </Link>
                )}
            </CardHeader>
            <CardContent className="space-y-3">
                {displayedAlerts.map((alert) => {
                    const Icon = getAlertIcon(alert.type);
                    return (
                        <div
                            key={alert.id}
                            className={cn(
                                "flex items-start gap-4 rounded-lg border p-4 transition-all",
                                alert.severity === 'critical'
                                    ? "border-destructive/30 bg-destructive/5"
                                    : "border-warning/30 bg-warning/5"
                            )}
                        >
                            <div className={cn(
                                "rounded-lg p-2",
                                alert.severity === 'critical'
                                    ? "bg-destructive/10 text-destructive"
                                    : "bg-warning/10 text-warning"
                            )}>
                                <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                    <p className="font-medium text-foreground">{alert.productName}</p>
                                    <Badge variant={alert.type === "expired" ? "destructive" : "secondary"}>
                                        {alert.type.replace('_', ' ')}
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{alert.message}</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon-sm"
                                onClick={() => handleAcknowledge(alert.id)}
                                className="shrink-0"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    )
}

export default AlertList