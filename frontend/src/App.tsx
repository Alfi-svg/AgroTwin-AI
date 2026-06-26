import { Suspense, lazy, useState } from 'react';
import { Layout } from './components/layout/Layout';
import { SkeletonGrid } from './components/shared/Skeleton';
import { AuthPages } from './components/auth/AuthPages';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { WarehouseProvider } from './contexts/WarehouseContext';
import type { PageKey } from './types';

const Dashboard = lazy(() => import('./pages/Dashboard').then((m) => ({ default: m.Dashboard })));
const RealTimeMonitoring = lazy(() => import('./pages/RealTimeMonitoring').then((m) => ({ default: m.RealTimeMonitoring })));
const DigitalTwin = lazy(() => import('./pages/DigitalTwin').then((m) => ({ default: m.DigitalTwin })));
const AIPrediction = lazy(() => import('./pages/AIPrediction').then((m) => ({ default: m.AIPrediction })));
const AlertsCenter = lazy(() => import('./pages/AlertsCenter').then((m) => ({ default: m.AlertsCenter })));
const Analytics = lazy(() => import('./pages/Analytics').then((m) => ({ default: m.Analytics })));
const MultiWarehouse = lazy(() => import('./pages/MultiWarehouse').then((m) => ({ default: m.MultiWarehouse })));
const AIAssistant = lazy(() => import('./pages/AIAssistant').then((m) => ({ default: m.AIAssistant })));
const Settings = lazy(() => import('./pages/Settings').then((m) => ({ default: m.Settings })));

function Workspace() {
  const { user } = useAuth();
  const [page, setPage] = useState<PageKey>('dashboard');
  const pages: Record<PageKey, JSX.Element> = {
    dashboard: <Dashboard />,
    monitoring: <RealTimeMonitoring />,
    digitalTwin: <DigitalTwin />,
    prediction: <AIPrediction />,
    alerts: <AlertsCenter />,
    analytics: <Analytics />,
    warehouses: <MultiWarehouse />,
    assistant: <AIAssistant />,
    settings: <Settings />
  };
  if (!user) return <AuthPages />;
  return <Layout currentPage={page} onNavigate={setPage}><Suspense fallback={<SkeletonGrid />}>{pages[page]}</Suspense></Layout>;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WarehouseProvider>
          <Workspace />
        </WarehouseProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
