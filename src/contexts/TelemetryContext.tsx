import { createContext, useState, ReactNode, useCallback } from 'react';
import { TelemetryPoint } from '../services/types';
import { createTelemetryService } from '../services/TelemetryService';

interface TelemetryCacheEntry {
  points: TelemetryPoint[];
  mapDataAvailable: boolean;
}

interface TelemetryCache {
  [lapId: number]: TelemetryCacheEntry;
}

interface TelemetryContextType {
  telemetryCache: TelemetryCache;
  getTelemetryForLap: (sessionId: string, lapId: number) => Promise<TelemetryCacheEntry>;
  clearTelemetry: (lapId: number) => void;
  clearAllTelemetry: () => void;
}

const TelemetryContext = createContext<TelemetryContextType | undefined>(undefined);

export function TelemetryProvider({ children }: { children: ReactNode }) {
  const [telemetryCache, setTelemetryCache] = useState<TelemetryCache>({});

  const getTelemetryForLap = useCallback(async (_sessionId: string, lapId: number) => {
    // Check cache first
    if (telemetryCache[lapId]) {
      return telemetryCache[lapId];
    }

    // If not in cache, fetch it using TelemetryService
    try {
      const telemetryService = createTelemetryService();
      const telemetry = await telemetryService.getLapData(lapId);

      // Cache the result
      setTelemetryCache(prev => ({
        ...prev,
        [lapId]: {
          points: telemetry.points,
          mapDataAvailable: telemetry.mapDataAvailable
        }
      }));

      return {
        points: telemetry.points,
        mapDataAvailable: telemetry.mapDataAvailable
      };
    } catch (error) {
      console.error('Error fetching telemetry:', error);
      throw error;
    }
  }, [telemetryCache]);

  const clearTelemetry = useCallback((lapId: number) => {
    setTelemetryCache(prev => {
      const newCache = { ...prev };
      delete newCache[lapId];
      return newCache;
    });
  }, []);

  const clearAllTelemetry = useCallback(() => {
    setTelemetryCache({});
  }, []);

  return (
    <TelemetryContext.Provider value={{
      telemetryCache,
      getTelemetryForLap,
      clearTelemetry,
      clearAllTelemetry,
    }}>
      {children}
    </TelemetryContext.Provider>
  );
}

export { TelemetryContext };
