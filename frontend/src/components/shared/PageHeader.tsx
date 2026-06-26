import { motion } from 'framer-motion';

export function PageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return (
    <motion.div className="page-header" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action && <div className="page-action">{action}</div>}
    </motion.div>
  );
}
