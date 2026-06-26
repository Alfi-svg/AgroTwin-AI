import { BrainCircuit, CheckCircle2, ShieldCheck } from 'lucide-react';
import { AreaTrend, TrendLine } from '../components/charts/Charts';
import { PageHeader } from '../components/shared/PageHeader';
import { aiRecommendations, forecast } from '../data/mockData';

export function AIPrediction() {
  const risk = forecast[forecast.length - 1].spoilage;
  const factors = [
    { label: 'Humidity drift', value: 41 },
    { label: 'Ethylene gas velocity', value: 26 },
    { label: 'Cooling failover risk', value: 19 },
    { label: 'Moisture variance', value: 14 }
  ];
  return (
    <div className="page-stack">
      <PageHeader eyebrow="AI Prediction" title="Spoilage Intelligence Engine" description="Agentic forecasting explains risk percentage, risk factors, recommended actions and a 24-hour operational forecast." action={<button className="primary-btn"><BrainCircuit size={16} /> Run Prediction</button>} />
      <section className="prediction-grid"><article className="glass-card risk-hero"><span className="eyebrow">Spoilage Percentage</span><strong>{risk.toFixed(1)}%</strong><p>Predicted maximum risk within next 24 hours if no intervention is applied.</p><div className="risk-meter"><i style={{ width: `${risk}%` }} /></div></article><article className="glass-card"><div className="card-head"><div><h2>Risk Factors</h2><p>Contribution from each condition.</p></div></div><div className="factor-list">{factors.map((factor) => <div key={factor.label}><span>{factor.label}</span><strong>{factor.value}%</strong><progress value={factor.value} max={100} /></div>)}</div></article><article className="glass-card"><div className="card-head"><div><h2>Recommended Actions</h2><p>Agentic action plan.</p></div><ShieldCheck size={20} /></div><div className="feature-list">{aiRecommendations.map((item) => <span key={item}><CheckCircle2 size={16} /> {item}</span>)}</div></article></section>
      <section className="analytics-grid"><article className="glass-card span-2"><div className="card-head"><div><h2>24-Hour Spoilage Forecast</h2><p>Projected risk curve.</p></div></div><AreaTrend dataKey="spoilage" height={300} /></article><article className="glass-card"><div className="card-head"><div><h2>AI Explanation Panel</h2><p>Why the model recommends intervention.</p></div></div><p className="explanation">The risk engine detected rising humidity after hour 14 combined with gas acceleration in rack B1. Ventilation and produce separation are expected to reduce spoilage probability by approximately 22% before the next temperature cycle.</p></article><article className="glass-card span-2"><div className="card-head"><div><h2>Prediction Accuracy</h2><p>Demo model confidence trend.</p></div></div><TrendLine dataKey="accuracy" height={260} /></article></section>
    </div>
  );
}
