import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function AuthShell({ children, mode }: { children: ReactNode; mode: string }) {
  return (
    <main className="auth-page">
      <section className="auth-hero glass-shell">
        <motion.div className="hero-orb" animate={{ scale: [1, 1.08, 1], rotate: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 8 }} />
        <span className="eyebrow">Agentic AI + Digital Twin</span>
        <h1>AgroTwin AI</h1>
        <p>Investor-ready smart agricultural storage management with real-time IoT, predictive spoilage intelligence, and a live 3D warehouse twin.</p>
        <div className="auth-proof-grid">
          <div><strong>94%</strong><small>Storage health</small></div>
          <div><strong>18%</strong><small>Spoilage risk</small></div>
          <div><strong>24h</strong><small>AI forecast</small></div>
        </div>
      </section>
      <motion.section className="auth-card glass-shell" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
        <span className="eyebrow">{mode}</span>
        {children}
      </motion.section>
    </main>
  );
}
