import { BellRing, Cpu, Palette, Settings2, UserCog } from 'lucide-react';
import { PageHeader } from '../components/shared/PageHeader';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const sections = [
  { title: 'Theme Settings', icon: Palette, items: ['Dark futuristic mode', 'Neon green accents', 'Reduce motion option'] },
  { title: 'Notification Settings', icon: BellRing, items: ['Critical alert push', 'Warning digest', 'Email report'] },
  { title: 'Sensor Settings', icon: Cpu, items: ['Temperature threshold', 'Humidity threshold', 'Gas calibration'] },
  { title: 'User Settings', icon: UserCog, items: ['Profile', 'Role permissions', 'Demo workspace'] },
  { title: 'System Settings', icon: Settings2, items: ['API fallback', 'Offline mode', 'Data export'] }
];

export function Settings() {
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="page-stack">
      <PageHeader eyebrow="Settings" title="Workspace Configuration" description="Theme, notifications, sensors, user and system settings for the AgroTwin AI prototype." action={<button className="ghost-btn" onClick={logout}>Logout</button>} />
      <section className="settings-grid">{sections.map(({ title, icon: Icon, items }) => <article key={title} className="glass-card"><div className="card-head"><div><h2>{title}</h2><p>{title === 'User Settings' ? user?.email : 'Investor demo ready controls'}</p></div><Icon size={22} /></div><div className="setting-list">{items.map((item) => <label key={item}><span>{item}</span><input type="checkbox" defaultChecked /></label>)}</div></article>)}</section>
      <section className="glass-card"><div className="card-head"><div><h2>Theme Toggle</h2><p>Current theme: {theme}</p></div><button className="primary-btn" onClick={toggleTheme}>Switch theme</button></div></section>
    </div>
  );
}
