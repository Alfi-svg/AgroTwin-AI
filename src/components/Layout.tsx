import type { ReactNode } from 'react';
import type { PageKey } from '../types';

interface NavItem {
  key: PageKey;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: '⌘' },
  { key: 'monitoring', label: 'Real-Time Monitoring', icon: '◉' },
  { key: 'digitalTwin', label: 'Digital Twin', icon: '⬡' },
  { key: 'prediction', label: 'AI Prediction', icon: '✦' },
  { key: 'alerts', label: 'Alerts Center', icon: '!' },
  { key: 'analytics', label: 'Analytics', icon: '↗' },
  { key: 'warehouses', label: 'Multi-Warehouse', icon: '▦' },
  { key: 'settings', label: 'Settings', icon: '⚙' },
  { key: 'assistant', label: 'AI Assistant', icon: 'AI' },
];

interface LayoutProps {
  currentPage: PageKey;
  onNavigate: (page: PageKey) => void;
  children: ReactNode;
}

export function Layout({ currentPage, onNavigate, children }: LayoutProps) {
  return (
    <div className="app-shell">
      <aside className="sidebar glass">
        <button className="brand" onClick={() => onNavigate('dashboard')} aria-label="Go to dashboard">
          <span className="brand-orb">A</span>
          <span>
            <strong>AgroTwin AI</strong>
            <small>Autonomous storage OS</small>
          </span>
        </button>
        <nav className="sidebar-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={currentPage === item.key ? 'active' : ''}
              onClick={() => onNavigate(item.key)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="system-card">
            <span className="pulse-dot" />
            <div>
              <strong>Agentic AI online</strong>
              <small>IoT sync · 98.7%</small>
            </div>
          </div>
        </div>
      </aside>

      <div className="mobile-nav glass">
        {navItems.slice(0, 6).map((item) => (
          <button key={item.key} className={currentPage === item.key ? 'active' : ''} onClick={() => onNavigate(item.key)}>
            <span>{item.icon}</span>
            <small>{item.label.split(' ')[0]}</small>
          </button>
        ))}
      </div>

      <main className="main-content">
        <Topbar />
        {children}
      </main>
    </div>
  );
}

function Topbar() {
  return (
    <header className="topbar glass">
      <div className="search-box">
        <span>⌕</span>
        <input placeholder="Search warehouses, sensors, alerts..." />
      </div>
      <div className="topbar-actions">
        <span className="sync-badge"><i /> Real-time sync</span>
        <button className="icon-button" aria-label="Notifications">●</button>
        <div className="avatar">SR</div>
      </div>
    </header>
  );
}
