import React from 'react'
import type { Product } from '../../types/inventory';
import { Card, CardContent } from '../ui/card';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/badge';
import { Calendar, Edit2, MapPin, Minus, Package, Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { checkExpired, checkExpiringSoon, checkLowStock, getDaysUntilExpiry, getProductStatus } from '../../utils';
import { format } from 'date-fns';

interface ProductCardProps {
    product: Product;
    onEdit?: (product: Product) => void;
    onDelete?: (product: Product) => void;
    onQuantityChange?: (product: Product, delta: number) => void;
}

const ProductCard = ({ product, onEdit, onDelete, onQuantityChange }: ProductCardProps) => {

    const status = getProductStatus(product);
    const isLowStock = checkLowStock(product);
    const isExpiringSoon = checkExpiringSoon(product);
    const isExpired = checkExpired(product);
    const daysUntilExpiry = getDaysUntilExpiry(product);

    const statusStyles = {
        ok: 'border-border',
        warning: 'border-warning/30',
        critical: 'border-destructive/30',
    };

    return (
        <Card className={cn(
            "group transition-all duration-200 hover:shadow-lg animate-fade-in",
            statusStyles[status]
        )}>
            <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
                            {product.category && (
                                <Badge variant="ghost" className="text-xs">
                                    {product.category}
                                </Badge>
                            )}
                        </div>

                        <p className="text-xs text-muted-foreground font-mono mb-3">
                            {product.barcode}
                        </p>

                        {product.description && (
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                {product.description}
                            </p>
                        )}

                        <div className="flex flex-wrap gap-2 mb-4">
                            {isExpired && (
                                <Badge variant="destructive">Expired</Badge>
                            )}
                            {isExpiringSoon && !isExpired && (
                                <Badge variant="secondary">
                                    Expires in {daysUntilExpiry} day{daysUntilExpiry === 1 ? '' : 's'}
                                </Badge>
                            )}
                            {isLowStock && (
                                <Badge variant="outline">Low Stock</Badge>
                            )}
                            {!isLowStock && !isExpired && !isExpiringSoon && (
                                <Badge variant="default">In Stock</Badge>
                            )}
                        </div>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            {product.location && (
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {product.location}
                                </div>
                            )}
                            {product.expiryDate && (
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {format(new Date(product.expiryDate), 'MMM d, yyyy')}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                        <div className="text-right">
                            <div className="flex items-center gap-1">
                                <Package className="h-4 w-4 text-muted-foreground" />
                                <span className={cn(
                                    "text-2xl font-bold",
                                    isLowStock ? "text-warning" : "text-foreground"
                                )}>
                                    {product.quantity}
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Threshold: {product.lowStockThreshold}
                            </p>
                        </div>

                        {onQuantityChange && (
                            <div className="flex items-center gap-1">
                                <Button
                                    variant="outline"
                                    size="icon-sm"
                                    onClick={() => onQuantityChange(product, -1)}
                                    disabled={product.quantity === 0}
                                >
                                    <Minus className="h-3 w-3" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon-sm"
                                    onClick={() => onQuantityChange(product, 1)}
                                >
                                    <Plus className="h-3 w-3" />
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border opacity-0 group-hover:opacity-100 transition-opacity">
                    {onEdit && (
                        <Button variant="ghost" size="sm" onClick={() => onEdit(product)} className="flex-1">
                            <Edit2 className="h-4 w-4 mr-2" />
                            Edit
                        </Button>
                    )}
                    {onDelete && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(product)}
                            className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default ProductCard