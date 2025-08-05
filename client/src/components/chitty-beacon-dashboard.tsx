import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChittyBeaconCore, { BeaconMetrics, BeaconAlert } from '@/lib/chitty-beacon-core';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Cpu, 
  Database, 
  Monitor,
  Network,
  Server,
  XCircle,
  Zap
} from 'lucide-react';

interface ChittyBeaconDashboardProps {
  isVisible: boolean;
  onToggle: () => void;
}

export function ChittyBeaconDashboard({ isVisible, onToggle }: ChittyBeaconDashboardProps) {
  // Completely disable in non-development environments
  const isDevelopment = import.meta.env.DEV;
  if (!isDevelopment) {
    return null;
  }

  const [beacon] = useState(() => new ChittyBeaconCore({
    enabled: true,
    environment: 'development',
    reportingInterval: 5000,
    alertThresholds: {
      errorRate: 5,
      responseTime: 2000,
      memoryUsage: 80,
      cpuUsage: 85
    },
    endpoints: {
      metrics: '/api/beacon/metrics',
      alerts: '/api/beacon/alerts',
      health: '/api/beacon/health'
    }
  }));

  const [metrics, setMetrics] = useState<BeaconMetrics[]>([]);
  const [alerts, setAlerts] = useState<BeaconAlert[]>([]);
  const [health, setHealth] = useState(beacon.getHealth());

  useEffect(() => {
    beacon.start();
    
    const interval = setInterval(() => {
      setMetrics(beacon.getMetrics());
      setAlerts(beacon.getAlerts());
      setHealth(beacon.getHealth());
    }, 1000);

    return () => {
      clearInterval(interval);
      beacon.stop();
    };
  }, [beacon]);

  const latestMetrics = beacon.getLatestMetrics();
  const activeAlerts = alerts.filter(a => !a.resolved);
  const criticalAlerts = activeAlerts.filter(a => a.level === 'critical' || a.level === 'error');

  const getAlertIcon = (level: string) => {
    switch (level) {
      case 'critical':
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  const getAlertBadgeVariant = (level: string) => {
    switch (level) {
      case 'critical':
      case 'error':
        return 'destructive';
      case 'warning':
        return 'secondary';
      default:
        return 'default';
    }
  };

  if (!isVisible) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onToggle}
        className="fixed bottom-4 left-4 z-50 bg-white dark:bg-gray-900 shadow-lg"
        data-testid="button-toggle-chitty-beacon"
      >
        <Activity className="h-4 w-4 mr-2" />
        ChittyBeacon
        {health.status === 'healthy' && (
          <div className="ml-2 h-2 w-2 bg-green-500 rounded-full animate-pulse" />
        )}
        {criticalAlerts.length > 0 && (
          <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
            {criticalAlerts.length}
          </Badge>
        )}
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 w-[600px] h-[500px]">
      <Card className="bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-700 h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              ChittyBeacon Core
              <Badge variant={health.status === 'healthy' ? 'default' : 'destructive'}>
                {health.status}
              </Badge>
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onToggle} data-testid="button-close-chitty-beacon">
              ×
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="h-[calc(100%-5rem)] overflow-hidden">
          <Tabs defaultValue="overview" className="h-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
              <TabsTrigger value="alerts">
                Alerts
                {activeAlerts.length > 0 && (
                  <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 text-xs">
                    {activeAlerts.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="h-[calc(100%-3rem)] space-y-4">
              {/* System Status Cards */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Cpu className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">CPU Usage</span>
                    </div>
                    <Progress value={latestMetrics?.cpu || 0} className="mb-1" />
                    <span className="text-xs text-gray-500">
                      {latestMetrics?.cpu.toFixed(1) || 0}%
                    </span>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Monitor className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Memory Usage</span>
                    </div>
                    <Progress value={latestMetrics?.memory || 0} className="mb-1" />
                    <span className="text-xs text-gray-500">
                      {latestMetrics?.memory.toFixed(1) || 0}%
                    </span>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Network className="h-4 w-4 text-purple-500" />
                      <span className="text-sm font-medium">Connections</span>
                    </div>
                    <div className="text-lg font-mono">
                      {latestMetrics?.activeConnections || 0}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium">Response Time</span>
                    </div>
                    <div className="text-lg font-mono">
                      {latestMetrics?.responseTime.toFixed(0) || 0}ms
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-500 dark:text-gray-400">Error Rate</div>
                  <div className="font-mono text-lg" data-testid="text-error-rate">
                    {latestMetrics?.errorRate.toFixed(2) || 0}%
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 dark:text-gray-400">Req/sec</div>
                  <div className="font-mono text-lg">
                    {latestMetrics?.requestsPerSecond.toFixed(1) || 0}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 dark:text-gray-400">Uptime</div>
                  <div className="font-mono text-lg">
                    {Math.floor(health.uptime / 1000)}s
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="metrics" className="h-[calc(100%-3rem)]">
              <ScrollArea className="h-full">
                <div className="space-y-2">
                  {metrics.slice(-20).reverse().map((metric, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 rounded-md bg-gray-50 dark:bg-gray-800"
                    >
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-500">
                          {new Date(metric.timestamp).toLocaleTimeString()}
                        </span>
                        <span>CPU: {metric.cpu.toFixed(1)}%</span>
                        <span>Mem: {metric.memory.toFixed(1)}%</span>
                        <span>RT: {metric.responseTime.toFixed(0)}ms</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Server className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {metric.activeConnections} conn
                        </span>
                      </div>
                    </div>
                  ))}
                  {metrics.length === 0 && (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                      No metrics data yet
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="alerts" className="h-[calc(100%-3rem)]">
              <ScrollArea className="h-full">
                <div className="space-y-2">
                  {alerts.slice(0, 20).map((alert) => (
                    <div 
                      key={alert.id}
                      className={`p-3 rounded-md border-l-4 ${
                        alert.level === 'critical' || alert.level === 'error'
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                          : alert.level === 'warning'
                          ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                          : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      } ${alert.resolved ? 'opacity-50' : ''}`}
                      data-testid={`alert-${alert.level}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getAlertIcon(alert.level)}
                          <Badge variant={getAlertBadgeVariant(alert.level)}>
                            {alert.level}
                          </Badge>
                          <span className="font-medium text-sm">{alert.title}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {alert.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                        {alert.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Source: {alert.source}
                        </span>
                        {!alert.resolved && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => beacon.resolveAlert(alert.id)}
                            className="text-xs"
                          >
                            Resolve
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  {alerts.length === 0 && (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                      <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                      No alerts - System operating normally
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}