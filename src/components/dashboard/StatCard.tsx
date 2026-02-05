import { Card, CardContent } from "../ui/card";
import { cn } from "../../lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: number | string;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    variant?: 'default' | 'warning' | 'danger' | 'success';
}

const variantStyles = {
    default: {
        icon: 'bg-primary/10 text-primary',
        border: 'border-border',
    },
    warning: {
        icon: 'bg-yellow-100 text-yellow-700',
        border: 'border-warning/20',
    },
    danger: {
        icon: 'bg-destructive/10 text-destructive',
        border: 'border-destructive/20',
    },
    success: {
        icon: 'bg-green-100 text-green-700',
        border: 'border-success/20',
    },
};

const StatCard = ({ title, value, icon: Icon, trend, variant = "default" }: StatCardProps) => {

    const styles = variantStyles[variant];

    return (
        <Card className={cn("animate-fade-in", styles.border)}>
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">{title}</p>
                        <p className="text-3xl font-bold text-foreground">{value}</p>
                        {trend && (
                            <p className={cn(
                                "text-xs font-medium",
                                trend.isPositive ? "text-success" : "text-destructive"
                            )}>
                                {trend.isPositive ? '+' : ''}{trend.value}% from last week
                            </p>
                        )}
                    </div>
                    <div className={cn("rounded-xl p-3", styles.icon)}>
                        <Icon className="h-6 w-6" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default StatCard