import { products } from "../../lib/mock-data";
import { type Product } from "../../types/inventory"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Edit2, Trash2, Plus, Minus } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { cn } from "../../lib/utils"
import { checkLowStock, checkExpired, checkExpiringSoon, getDaysUntilExpiry } from "../../utils/index"
import { format } from 'date-fns'

interface ProductTableProps {
    products: Product[];
    onEdit?: (product: Product) => void;
    onDelete?: (product: Product) => void;
    onQuantityChange?: (product: Product, delta: number) => void;
}

const getStatusBadge = (product: Product) => {
    if (checkExpired(product)) return <Badge variant="destructive">Expired</Badge>;
    if (checkExpiringSoon(product)) {
        const days = getDaysUntilExpiry(product);
        return <Badge variant="secondary">Expires in {days}d</Badge>;
    }
    if (checkLowStock(product)) return <Badge variant="outline">Low Stock</Badge>;
    return <Badge variant="link">In Stock</Badge>;
};

const ProductTable = ({
    products, onEdit, onDelete, onQuantityChange
}: ProductTableProps) => {

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-lg font-medium text-foreground">No products found</p>
                <p className="text-sm text-muted-foreground">Add products to get started</p>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-border overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                        <TableHead className="font-semibold">Product</TableHead>
                        <TableHead className="font-semibold">Barcode</TableHead>
                        <TableHead className="font-semibold">Category</TableHead>
                        <TableHead className="font-semibold text-center">Quantity</TableHead>
                        <TableHead className="font-semibold">Expiry Date</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id} className="group">
                            <TableCell>
                                <div>
                                    <p className="font-medium text-foreground">{product.name}</p>
                                    {product.location && (
                                        <p className="text-xs text-muted-foreground">{product.location}</p>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell>
                                <code className="text-xs bg-muted px-2 py-1 rounded">
                                    {product.barcode}
                                </code>
                            </TableCell>
                            <TableCell>
                                {product.category && (
                                    <Badge variant="ghost">{product.category}</Badge>
                                )}
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center justify-center gap-2">
                                    {onQuantityChange && (
                                        <Button
                                            variant="ghost"
                                            size="icon-sm"
                                            onClick={() => onQuantityChange(product, -1)}
                                            disabled={product.quantity === 0}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Minus className="h-3 w-3" />
                                        </Button>
                                    )}
                                    <span className={cn(
                                        "font-semibold min-w-8 text-center",
                                        checkLowStock(product) && "text-warning"
                                    )}>
                                        {product.quantity}
                                    </span>
                                    {onQuantityChange && (
                                        <Button
                                            variant="ghost"
                                            size="icon-sm"
                                            onClick={() => onQuantityChange(product, 1)}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell>
                                {product.expiryDate ? (
                                    <span className={cn(
                                        checkExpired(product) && "text-destructive",
                                        checkExpiringSoon(product) && !checkExpired(product) && "text-warning"
                                    )}>
                                        {format(new Date(product.expiryDate), 'MMM d, yyyy')}
                                    </span>
                                ) : (
                                    <span className="text-muted-foreground">—</span>
                                )}
                            </TableCell>
                            <TableCell>{getStatusBadge(product)}</TableCell>
                            <TableCell>
                                <div className="flex items-center justify-end gap-1">
                                    {onEdit && (
                                        <Button
                                            variant="ghost"
                                            size="icon-sm"
                                            onClick={() => onEdit(product)}
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                    {onDelete && (
                                        <Button
                                            variant="ghost"
                                            size="icon-sm"
                                            onClick={() => onDelete(product)}
                                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default ProductTable