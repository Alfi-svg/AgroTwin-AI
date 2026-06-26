import { useEffect, useState } from 'react';
import { sensors as baseSensors } from '../data/mockData';
import type { SensorReading } from '../types';
import { clamp } from '../lib/status';

export function useLiveSensors(interval = 2400) {
  const [readings, setReadings] = useState<SensorReading[]>(baseSensors);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setReadings((current) => current.map((sensor, index) => {
        const wobble = Math.sin(Date.now() / 1500 + index) * ((sensor.max - sensor.min) * 0.012);
        const value = Number(clamp(sensor.value + wobble, sensor.min, sensor.max).toFixed(sensor.unit === 'ppm' || sensor.unit === 'AQI' ? 0 : 1));
        const series = [...sensor.series.slice(1), value];
        const status = sensor.label === 'Humidity' && value > 70 ? 'critical' : sensor.label === 'Humidity' && value > 64 ? 'warning' : sensor.status;
        return { ...sensor, value, status, series, trend: value > sensor.value ? '+live' : '-live' };
      }));
      setLastUpdated(new Date());
    }, interval);
    return () => window.clearInterval(timer);
  }, [interval]);

  return { readings, lastUpdated };
}
