import SupplierLayout from '@/layouts/role/SupplierLayout';
import { Package, AlertTriangle, TrendingDown, Plus, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const INVENTORY = [
  { id: 'i1', name: 'Natural Cotton Rope 3mm', sku: 'ROPE-NAT-3', stock: 240, min: 50, max: 300, reorderPoint: 60, category: 'Fiber' },
  { id: 'i2', name: 'Beeswax Premium Blocks', sku: 'WAX-BEE-500', stock: 85, min: 20, max: 200, reorderPoint: 30, category: 'Wax' },
  { id: 'i3', name: 'Sterling Silver Wire 24G', sku: 'SIL-WIR-24', stock: 12, min: 20, max: 100, reorderPoint: 20, category: 'Metal' },
  { id: 'i4', name: 'Merino Wool Roving', sku: 'WOL-MER-250', stock: 60, min: 15, max: 150, reorderPoint: 25, category: 'Fiber' },
  { id: 'i5', name: 'Polymer Clay Set 12 Colors', sku: 'CLY-POL-12C', stock: 0, min: 10, max: 80, reorderPoint: 15, category: 'Clay' },
];

export default function SupplierInventory() {
  return (
    <SupplierLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">Inventory</h1>
          <p className="text-muted-foreground text-sm mt-1">Stock management and reorder alerts</p>
        </div>
        <Button className="btn-primary rounded-xl gap-2" onClick={() => toast.info('Bulk reorder coming soon')}>
          <Plus className="w-4 h-4" /> Reorder Stock
        </Button>
      </div>

      {/* Alerts */}
      {INVENTORY.filter(i => i.stock <= i.reorderPoint).length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0" />
          <p className="text-sm text-yellow-800">
            <strong>{INVENTORY.filter(i => i.stock <= i.reorderPoint).length} items</strong> need reordering. Check items below the reorder point.
          </p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total SKUs', value: INVENTORY.length, color: 'text-primary' },
          { label: 'Low Stock', value: INVENTORY.filter(i => i.stock > 0 && i.stock <= i.reorderPoint).length, color: 'text-yellow-600' },
          { label: 'Out of Stock', value: INVENTORY.filter(i => i.stock === 0).length, color: 'text-red-600' },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-5 text-center">
            <div className={`font-display font-bold text-3xl ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {INVENTORY.map(item => {
          const fillPct = (item.stock / item.max) * 100;
          const isLow = item.stock > 0 && item.stock <= item.reorderPoint;
          const isOut = item.stock === 0;
          return (
            <div key={item.id} className="bg-card rounded-2xl border border-border p-5 hover:shadow-craft transition-all">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isOut ? 'bg-red-100' : isLow ? 'bg-yellow-100' : 'bg-primary/10'}`}>
                  <Package className={`w-5 h-5 ${isOut ? 'text-red-600' : isLow ? 'text-yellow-600' : 'text-primary'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <div>
                      <h3 className="font-semibold text-sm">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">SKU: {item.sku} · {item.category}</p>
                    </div>
                    <Badge className={isOut ? 'bg-red-100 text-red-800 text-[10px]' : isLow ? 'bg-yellow-100 text-yellow-800 text-[10px]' : 'bg-green-100 text-green-800 text-[10px]'}>
                      {isOut ? 'Out of Stock' : isLow ? 'Low Stock' : 'In Stock'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${isOut ? 'bg-red-400' : isLow ? 'bg-yellow-400' : 'bg-secondary'}`}
                        style={{ width: `${fillPct}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{item.stock}/{item.max}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Reorder at: {item.reorderPoint}</span>
                    <span>Min: {item.min}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="rounded-xl h-8 text-xs shrink-0" onClick={() => toast.info('Update stock coming soon')}>
                  <Edit2 className="w-3 h-3 mr-1" /> Update
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </SupplierLayout>
  );
}
