import { PageHeader } from '../components/PageHeader';
import { TrendChart } from '../components/Charts';
import { predictionForecast, recommendations } from '../data/demoData';

export function AIPrediction() {
  const currentRisk = predictionForecast[0].risk;
  const peakRisk = Math.max(...predictionForecast.map((item) => item.risk));

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="AI Prediction"
        title="Spoilage prediction engine"
        description="Forecast spoilage risk, confidence, and recommended corrective actions for the next 24 hours."
        action={<button className="primary-button">Run prediction</button>}
      />

      <section className="prediction-hero glass">
        <div>
          <span className="eyebrow">Current Spoilage Risk</span>
          <h2>{currentRisk}%</h2>
          <p>Risk is currently controlled, but humidity and gas concentration may push Zone B into warning level within 8–12 hours.</p>
        </div>
        <div className="risk-ring" style={{ ['--risk' as string]: `${peakRisk}%` }}>
          <strong>{peakRisk}%</strong>
          <span>Peak 24h risk</span>
        </div>
      </section>

      <section className="dashboard-grid">
        <TrendChart data={predictionForecast.map((item) => ({ ...item, time: item.hour, spoilage: item.risk }))} metric="spoilage" title="24-hour spoilage forecast" suffix="%" variant="area" />
        <div className="glass panel-card">
          <div className="section-head">
            <div>
              <span className="eyebrow">Recommended Actions</span>
              <h3>AI mitigation plan</h3>
            </div>
          </div>
          <div className="action-list">
            {recommendations.map((item, index) => (
              <article key={item}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="forecast-grid">
        {predictionForecast.map((item) => (
          <article className="glass forecast-card" key={item.hour}>
            <span>{item.hour}</span>
            <strong>{item.risk}%</strong>
            <small>{item.action}</small>
            <em>{item.confidence}% confidence</em>
          </article>
        ))}
      </section>
    </div>
  );
}
