/**
 * ChittyBeacon Loader - Development-only conditional loading
 * This ensures ChittyBeacon code is completely excluded from production builds
 */

// Type-only imports to avoid including actual code in production builds
import type { BeaconMetrics, BeaconAlert } from './chitty-beacon-core';

interface BeaconAPI {
  trackLegalEvent: (event: string, metadata?: any) => void;
  trackFinancialEvent: (event: string, amount?: number, currency?: string) => void;
  trackUserAction: (action: string, target?: string) => void;
  trackDatabaseStatus: (database: string, status: string, details?: any) => void;
  trackPOVSwitch: (fromPOV: string, toPOV: string) => void;
  logEvent: (type: string, message: string, severity?: string, metadata?: any) => void;
  flushEvents: () => void;
  events: any[];
  isConnected: boolean;
}

// No-op implementation for production
const NoOpBeacon: BeaconAPI = {
  trackLegalEvent: () => {},
  trackFinancialEvent: () => {},
  trackUserAction: () => {},
  trackDatabaseStatus: () => {},
  trackPOVSwitch: () => {},
  logEvent: () => {},
  flushEvents: () => {},
  events: [],
  isConnected: false
};

// Dynamic loader that only includes ChittyBeacon in development
export async function loadChittyBeacon(config?: any): Promise<BeaconAPI> {
  // In production builds, return no-op implementation
  if (!import.meta.env.DEV) {
    return NoOpBeacon;
  }

  try {
    // Dynamic import only happens in development
    const { useChittyBeacon } = await import('../hooks/use-chitty-beacon');
    
    // This would normally be used within a React component
    // For now, return the no-op beacon since we can't use hooks here
    return NoOpBeacon;
  } catch (error) {
    console.warn('ChittyBeacon failed to load:', error);
    return NoOpBeacon;
  }
}

// Environment check utility
export const isBeaconEnabled = (): boolean => {
  return import.meta.env.DEV;
};

// Build-time flag for complete exclusion
export const BEACON_AVAILABLE = import.meta.env.DEV;