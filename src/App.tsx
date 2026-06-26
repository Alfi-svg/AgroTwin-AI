import { Suspense, lazy, useState, type ReactNode } from 'react';
import type { PageKey } from './types';
import { Layout } from './components/Layout';

const Dashboard = lazy(() => import('./pages/Dashboard').then((module) => ({ default: module.Dashboard })));
const RealTimeMonitoring = lazy(() => import('./pages/RealTimeMonitoring').then((module) => ({ default: module.RealTimeMonitoring })));
const DigitalTwin = lazy(() => import('./pages/DigitalTwin').then((module) => ({ default: module.DigitalTwin })));
const AIPrediction = lazy(() => import('./pages/AIPrediction').then((module) => ({ default: module.AIPrediction })));
const AlertsCenter = lazy(() => import('./pages/AlertsCenter').then((module) => ({ default: module.AlertsCenter })));
const Analytics = lazy(() => import('./pages/Analytics').then((module) => ({ default: module.Analytics })));
const MultiWarehouse = lazy(() => import('./pages/MultiWarehouse').then((module) => ({ default: module.MultiWarehouse })));
const Settings = lazy(() => import('./pages/Settings').then((module) => ({ default: module.Settings })));
const AIAssistant = lazy(() => import('./pages/AIAssistant').then((module) => ({ default: module.AIAssistant })));

const pages: Record<PageKey, ReactNode> = {
  dashboard: <Dashboard />,
  monitoring: <RealTimeMonitoring />,
  digitalTwin: <DigitalTwin />,
  prediction: <AIPrediction />,
  alerts: <AlertsCenter />,
  analytics: <Analytics />,
  warehouses: <MultiWarehouse />,
  settings: <Settings />,
  assistant: <AIAssistant />,
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageKey>('dashboard');

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      <Suspense fallback={<div className="glass loading-panel">Loading AgroTwin AI workspace...</div>}>
        {pages[currentPage]}
      </Suspense>
    </Layout>
  );
}
