import { motion } from 'framer-motion';
import { AnimatedCounter } from './AnimatedCounter';

interface Props {
  title: string;
  value: number;
  suffix?: string;
  icon: string;
  tone?: 'green' | 'yellow' | 'red' | 'blue';
  decimals?: number;
  description: string;
}

export function MetricCard({ title, value, suffix, icon, tone = 'green', decimals = 0, description }: Props) {
  return (
    <motion.article className={`metric-card glass-card ${tone}`} whileHover={{ y: -5, scale: 1.012 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
      <div className="metric-top">
        <span className="metric-icon">{icon}</span>
        <span className="metric-live"><i /> Live</span>
      </div>
      <h3>{title}</h3>
      <div className="metric-value"><AnimatedCounter value={value} suffix={suffix} decimals={decimals} /></div>
      <p>{description}</p>
    </motion.article>
  );
}
