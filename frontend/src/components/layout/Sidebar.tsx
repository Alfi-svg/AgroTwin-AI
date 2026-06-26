import { motion } from 'framer-motion';
import { Bell, Bot, Building2, ChartNoAxesCombined, Gauge, Layers3, LineChart, Menu, Settings, ShieldAlert, ThermometerSun, X, type LucideIcon } from 'lucide-react';
import type { PageKey } from '../../types';

const items: { key: PageKey; label: string; icon: LucideIcon }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: Gauge },
  { key: 'monitoring', label: 'Monitoring', icon: ThermometerSun },
  { key: 'digitalTwin', label: 'Digital Twin', icon: Layers3 },
  { key: 'prediction', label: 'AI Prediction', icon: ChartNoAxesCombined },
  { key: 'alerts', label: 'Alerts', icon: ShieldAlert },
  { key: 'analytics', label: 'Analytics', icon: LineChart },
  { key: 'warehouses', label: 'Multi Warehouse', icon: Building2 },
  { key: 'assistant', label: 'AI Assistant', icon: Bot },
  { key: 'settings', label: 'Settings', icon: Settings }
];

export function Sidebar({ currentPage, collapsed, mobileOpen, onCollapse, onNavigate, onCloseMobile }: {
  currentPage: PageKey;
  collapsed: boolean;
  mobileOpen: boolean;
  onCollapse: () => void;
  onNavigate: (page: PageKey) => void;
  onCloseMobile: () => void;
}) {
  const navigate = (page: PageKey) => { onNavigate(page); onCloseMobile(); };
  return (
    <>
      <aside className={`sidebar glass-shell ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="brand-row">
          <button className="brand-mark" onClick={() => navigate('dashboard')} aria-label="Go to dashboard">A</button>
          {!collapsed && <div><strong>AgroTwin AI</strong><small>Agentic Storage OS</small></div>}
          <button className="sidebar-close" onClick={onCloseMobile} aria-label="Close menu"><X size={18} /></button>
        </div>
        <nav className="nav-list" aria-label="Main navigation">
          {items.map(({ key, label, icon: Icon }) => (
            <motion.button key={key} className={currentPage === key ? 'active' : ''} onClick={() => navigate(key)} whileHover={{ x: collapsed ? 0 : 4 }}>
              <span><Icon size={18} /></span>
              {!collapsed && <em>{label}</em>}
            </motion.button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          {!collapsed && <div className="ai-status-card"><Bell size={18} /><div><strong>Agentic AI</strong><small>Monitoring 5 sensor streams</small></div></div>}
          <button className="collapse-btn" onClick={onCollapse}><Menu size={18} />{!collapsed && 'Collapse'}</button>
        </div>
      </aside>
      {mobileOpen && <button className="mobile-scrim" onClick={onCloseMobile} aria-label="Close sidebar" />}
    </>
  );
}
