import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { PageKey } from '../../types';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function Layout({ currentPage, onNavigate, children }: { currentPage: PageKey; onNavigate: (page: PageKey) => void; children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className={`app-shell ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar currentPage={currentPage} collapsed={collapsed} mobileOpen={mobileOpen} onCollapse={() => setCollapsed((value) => !value)} onNavigate={onNavigate} onCloseMobile={() => setMobileOpen(false)} />
      <main className="main-content">
        <Topbar onOpenSidebar={() => setMobileOpen(true)} />
        <AnimatePresence mode="wait">
          <motion.section key={currentPage} initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -8, filter: 'blur(8px)' }} transition={{ duration: 0.28, ease: 'easeOut' }}>
            {children}
          </motion.section>
        </AnimatePresence>
      </main>
    </div>
  );
}
