import { Bell, Menu, Moon, Search, Sun, UserRound } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useWarehouse } from '../../contexts/WarehouseContext';
import { useAuth } from '../../contexts/AuthContext';

export function Topbar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const { warehouses, selectedWarehouseId, setSelectedWarehouseId } = useWarehouse();
  const { user } = useAuth();
  return (
    <header className="topbar glass-shell">
      <button className="menu-btn" onClick={onOpenSidebar} aria-label="Open sidebar"><Menu size={20} /></button>
      <div className="search-box"><Search size={18} /><input placeholder="Search sensors, alerts, warehouses, actions..." /></div>
      <div className="topbar-actions">
        <select value={selectedWarehouseId} onChange={(event) => setSelectedWarehouseId(event.target.value)} aria-label="Warehouse selector">
          {warehouses.map((warehouse) => <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>)}
        </select>
        <button className="icon-btn" aria-label="Notifications"><Bell size={18} /><i /></button>
        <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">{theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}</button>
        <div className="profile-chip"><UserRound size={18} /><span>{user?.name || 'Demo User'}</span></div>
      </div>
    </header>
  );
}
