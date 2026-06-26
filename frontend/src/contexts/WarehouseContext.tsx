import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { warehouses } from '../data/mockData';

interface WarehouseContextValue {
  selectedWarehouseId: string;
  setSelectedWarehouseId: (id: string) => void;
  selectedWarehouse: typeof warehouses[number];
  warehouses: typeof warehouses;
}
const WarehouseContext = createContext<WarehouseContextValue | undefined>(undefined);

export function WarehouseProvider({ children }: { children: ReactNode }) {
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(warehouses[0].id);
  const selectedWarehouse = warehouses.find((item) => item.id === selectedWarehouseId) || warehouses[0];
  const value = useMemo(() => ({ selectedWarehouseId, setSelectedWarehouseId, selectedWarehouse, warehouses }), [selectedWarehouseId, selectedWarehouse]);
  return <WarehouseContext.Provider value={value}>{children}</WarehouseContext.Provider>;
}

export function useWarehouse() {
  const context = useContext(WarehouseContext);
  if (!context) throw new Error('useWarehouse must be used inside WarehouseProvider');
  return context;
}
