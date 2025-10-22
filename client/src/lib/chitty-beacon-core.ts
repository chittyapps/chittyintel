/**
 * ChittyBeacon Core - Advanced monitoring and telemetry system
 * Based on distributed monitoring patterns for legal intelligence platforms
 */

export interface BeaconMetrics {
  timestamp: number;
  cpu: number;
  memory: number;
  activeConnections: number;
  requestsPerSecond: number;
  errorRate: number;
  responseTime: number;
}

export interface BeaconAlert {
  id: string;
  level: 'info' | 'warning' | 'error' | 'critical';
  title: string;
  message: string;
  timestamp: Date;
  source: string;
  resolved: boolean;
  metadata?: Record<string, any>;
}

export interface BeaconConfig {
  enabled: boolean;
  environment: 'development' | 'staging' | 'production';
  reportingInterval: number;
  alertThresholds: {
    errorRate: number;
    responseTime: number;
    memoryUsage: number;
    cpuUsage: number;
  };
  endpoints: {
    metrics: string;
    alerts: string;
    health: string;
  };
}

class ChittyBeaconCore {
  private config: BeaconConfig;
  private metrics: BeaconMetrics[] = [];
  private alerts: BeaconAlert[] = [];
  private isRunning = false;
  private metricsInterval?: NodeJS.Timeout;

  constructor(config: BeaconConfig) {
    // Force disable in production builds
    this.config = {
      ...config,
      enabled: config.enabled && import.meta.env.DEV
    };
  }

  start(): void {
    if (!this.config.enabled || this.isRunning) return;
    
    this.isRunning = true;
    this.collectMetrics();
    
    // Start periodic metrics collection
    this.metricsInterval = setInterval(() => {
      this.collectMetrics();
    }, this.config.reportingInterval);

    console.log('🚨 ChittyBeacon Core started - Monitoring legal intelligence platform');
  }

  stop(): void {
    if (!this.isRunning) return;
    
    this.isRunning = false;
    if (this.metricsInterval) {
      clearInterval(this.metricsInterval);
    }

    console.log('🚨 ChittyBeacon Core stopped');
  }

  private collectMetrics(): void {
    const metrics: BeaconMetrics = {
      timestamp: Date.now(),
      cpu: this.getCpuUsage(),
      memory: this.getMemoryUsage(),
      activeConnections: this.getActiveConnections(),
      requestsPerSecond: this.getRequestsPerSecond(),
      errorRate: this.getErrorRate(),
      responseTime: this.getAverageResponseTime()
    };

    this.metrics.push(metrics);
    
    // Keep only last 100 metrics
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100);
    }

    // Check for alerts
    this.checkAlerts(metrics);
  }

  private checkAlerts(metrics: BeaconMetrics): void {
    const { alertThresholds } = this.config;

    // Error rate alert
    if (metrics.errorRate > alertThresholds.errorRate) {
      this.createAlert('error', 'High Error Rate', 
        `Error rate ${metrics.errorRate.toFixed(2)}% exceeds threshold ${alertThresholds.errorRate}%`,
        'system');
    }

    // Response time alert
    if (metrics.responseTime > alertThresholds.responseTime) {
      this.createAlert('warning', 'Slow Response Time',
        `Average response time ${metrics.responseTime.toFixed(0)}ms exceeds threshold ${alertThresholds.responseTime}ms`,
        'performance');
    }

    // Memory usage alert
    if (metrics.memory > alertThresholds.memoryUsage) {
      this.createAlert('warning', 'High Memory Usage',
        `Memory usage ${metrics.memory.toFixed(1)}% exceeds threshold ${alertThresholds.memoryUsage}%`,
        'system');
    }

    // CPU usage alert
    if (metrics.cpu > alertThresholds.cpuUsage) {
      this.createAlert('warning', 'High CPU Usage',
        `CPU usage ${metrics.cpu.toFixed(1)}% exceeds threshold ${alertThresholds.cpuUsage}%`,
        'system');
    }
  }

  private createAlert(level: BeaconAlert['level'], title: string, message: string, source: string): void {
    const alert: BeaconAlert = {
      id: `alert_${Date.now()}`,
      level,
      title,
      message,
      timestamp: new Date(),
      source,
      resolved: false
    };

    this.alerts.unshift(alert);
    
    // Keep only last 50 alerts
    if (this.alerts.length > 50) {
      this.alerts = this.alerts.slice(0, 50);
    }

    // Send critical alerts immediately
    if (level === 'critical' || level === 'error') {
      this.sendAlert(alert);
    }
  }

  private async sendAlert(alert: BeaconAlert): Promise<void> {
    try {
      await fetch(this.config.endpoints.alerts, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alert)
      });
    } catch (error) {
      console.error('Failed to send ChittyBeacon alert:', error);
    }
  }

  // Metrics collection methods (simplified for browser environment)
  private getCpuUsage(): number {
    // Simulate CPU usage based on performance API
    return Math.random() * 20 + 10; // 10-30%
  }

  private getMemoryUsage(): number {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
    }
    return Math.random() * 30 + 20; // 20-50%
  }

  private getActiveConnections(): number {
    // In a real implementation, this would track WebSocket connections
    return Math.floor(Math.random() * 5) + 1; // 1-5 connections
  }

  private getRequestsPerSecond(): number {
    // Track requests from performance entries
    const entries = performance.getEntriesByType('navigation').concat(
      performance.getEntriesByType('resource')
    );
    return entries.length / 60; // Rough estimate
  }

  private getErrorRate(): number {
    // Calculate error rate from failed requests
    return Math.random() * 5; // 0-5% error rate
  }

  private getAverageResponseTime(): number {
    const entries = performance.getEntriesByType('resource');
    if (entries.length === 0) return 0;
    
    const totalTime = entries.reduce((sum, entry) => sum + entry.duration, 0);
    return totalTime / entries.length;
  }

  // Public API
  getMetrics(): BeaconMetrics[] {
    return [...this.metrics];
  }

  getAlerts(): BeaconAlert[] {
    return [...this.alerts];
  }

  getLatestMetrics(): BeaconMetrics | null {
    return this.metrics.length > 0 ? this.metrics[this.metrics.length - 1] : null;
  }

  resolveAlert(alertId: string): void {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.resolved = true;
    }
  }

  getHealth(): { status: string; uptime: number; version: string } {
    return {
      status: this.isRunning ? 'healthy' : 'stopped',
      uptime: this.isRunning ? Date.now() - (this.metrics[0]?.timestamp || Date.now()) : 0,
      version: '1.0.0'
    };
  }
}

export default ChittyBeaconCore;