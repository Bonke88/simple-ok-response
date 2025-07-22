
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Zap, Clock, AlertTriangle, CheckCircle, RefreshCw, TrendingUp } from 'lucide-react';

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  target: number;
}

interface PagePerformance {
  url: string;
  loadTime: number;
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  cls: number; // Cumulative Layout Shift
  fid: number; // First Input Delay
  score: number;
}

export const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [pagePerformance, setPagePerformance] = useState<PagePerformance[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    fetchPerformanceData();
  }, []);

  const fetchPerformanceData = async () => {
    setIsRefreshing(true);
    
    // Simulate fetching real performance data
    // In a real implementation, this would connect to your performance monitoring service
    setTimeout(() => {
      setMetrics([
        {
          name: 'Page Load Time',
          value: 1.2,
          unit: 's',
          status: 'good',
          trend: 'down',
          target: 2.0
        },
        {
          name: 'First Contentful Paint',
          value: 0.8,
          unit: 's',
          status: 'good',
          trend: 'stable',
          target: 1.5
        },
        {
          name: 'Largest Contentful Paint',
          value: 2.1,
          unit: 's',
          status: 'warning',
          trend: 'up',
          target: 2.5
        },
        {
          name: 'Cumulative Layout Shift',
          value: 0.05,
          unit: '',
          status: 'good',
          trend: 'down',
          target: 0.1
        },
        {
          name: 'First Input Delay',
          value: 15,
          unit: 'ms',
          status: 'good',
          trend: 'stable',
          target: 100
        },
        {
          name: 'Time to Interactive',
          value: 2.8,
          unit: 's',
          status: 'warning',
          trend: 'up',
          target: 3.8
        }
      ]);

      setPagePerformance([
        {
          url: '/',
          loadTime: 1.1,
          fcp: 0.7,
          lcp: 1.8,
          cls: 0.03,
          fid: 12,
          score: 95
        },
        {
          url: '/articles',
          loadTime: 1.3,
          fcp: 0.9,
          lcp: 2.1,
          cls: 0.08,
          fid: 18,
          score: 87
        },
        {
          url: '/tools',
          loadTime: 1.5,
          fcp: 1.1,
          lcp: 2.4,
          cls: 0.05,
          fid: 22,
          score: 82
        },
        {
          url: '/about',
          loadTime: 0.9,
          fcp: 0.6,
          lcp: 1.5,
          cls: 0.02,
          fid: 8,
          score: 98
        }
      ]);

      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-red-500" />;
      case 'down':
        return <TrendingUp className="w-3 h-3 text-green-500 rotate-180" />;
      default:
        return <div className="w-3 h-3 rounded-full bg-gray-400" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const generateTimeSeriesData = () => {
    const data = [];
    for (let i = 23; i >= 0; i--) {
      const time = new Date();
      time.setHours(time.getHours() - i);
      data.push({
        time: time.getHours() + ':00',
        loadTime: 1.0 + Math.random() * 0.5,
        errors: Math.floor(Math.random() * 10),
        requests: 100 + Math.floor(Math.random() * 50)
      });
    }
    return data;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Performance Monitor</h1>
          <p className="text-gray-600">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <Button onClick={fetchPerformanceData} disabled={isRefreshing}>
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Core Web Vitals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">{metric.name}</h3>
                <div className="flex items-center space-x-1">
                  {getTrendIcon(metric.trend)}
                  {getStatusIcon(metric.status)}
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {metric.value}{metric.unit}
                  </p>
                  <p className="text-xs text-gray-500">
                    Target: {metric.target}{metric.unit}
                  </p>
                </div>
                <Badge className={getStatusColor(metric.status)}>
                  {metric.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trends (24h)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={generateTimeSeriesData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="loadTime" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Load Time (s)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Page Performance Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Page Performance Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pagePerformance.map((page) => (
              <div key={page.url} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">{page.url}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Performance Score:</span>
                    <span className={`font-bold ${getScoreColor(page.score)}`}>
                      {page.score}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Load Time</p>
                    <p className="font-medium">{page.loadTime}s</p>
                  </div>
                  <div>
                    <p className="text-gray-500">FCP</p>
                    <p className="font-medium">{page.fcp}s</p>
                  </div>
                  <div>
                    <p className="text-gray-500">LCP</p>
                    <p className="font-medium">{page.lcp}s</p>
                  </div>
                  <div>
                    <p className="text-gray-500">CLS</p>
                    <p className="font-medium">{page.cls}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">FID</p>
                    <p className="font-medium">{page.fid}ms</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Performance Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>LCP Warning:</strong> Consider optimizing images and reducing server response times to improve Largest Contentful Paint.
              </AlertDescription>
            </Alert>
            
            <Alert>
              <Clock className="h-4 w-4" />
              <AlertDescription>
                <strong>TTI Optimization:</strong> Reduce JavaScript execution time and eliminate render-blocking resources.
              </AlertDescription>
            </Alert>
            
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Good Performance:</strong> Your Core Web Vitals are within acceptable ranges for most pages.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
