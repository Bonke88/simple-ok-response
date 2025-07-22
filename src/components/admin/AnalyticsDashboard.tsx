
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Users, Eye, Clock, MousePointer } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  avgSessionDuration: number;
  bounceRate: number;
  conversionRate: number;
  topArticles: Array<{ title: string; views: number; slug: string }>;
  topTools: Array<{ name: string; usage: number; slug: string }>;
  trafficSources: Array<{ source: string; visits: number; percentage: number }>;
  contentPerformance: Array<{ name: string; views: number; conversions: number; date: string }>;
  userJourney: Array<{ stage: string; users: number; conversion: number }>;
}

export const AnalyticsDashboard = () => {
  const [dateRange, setDateRange] = useState('7d');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, [dateRange]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      // Fetch analytics events
      const { data: events, error: eventsError } = await supabase
        .from('analytics_events')
        .select('*')
        .gte('created_at', getDateRangeStart(dateRange))
        .order('created_at', { ascending: false });

      if (eventsError) throw eventsError;

      // Fetch content data
      const { data: contentData, error: contentError } = await supabase
        .from('articles')
        .select('title, slug, view_count, conversion_count')
        .eq('status', 'published')
        .order('view_count', { ascending: false })
        .limit(10);

      if (contentError) throw contentError;

      // Fetch tool usage
      const { data: toolUsage, error: toolError } = await supabase
        .from('tool_usage')
        .select('tool_name')
        .gte('usage_date', getDateRangeStart(dateRange));

      if (toolError) throw toolError;

      // Process and format the data
      const processedData = processAnalyticsData(events || [], contentData || [], toolUsage || []);
      setAnalyticsData(processedData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDateRangeStart = (range: string) => {
    const now = new Date();
    switch (range) {
      case '1d':
        return new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
      case '7d':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      case '30d':
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
      case '90d':
        return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString();
      default:
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    }
  };

  const processAnalyticsData = (events: any[], articles: any[], toolUsage: any[]): AnalyticsData => {
    // Process events for page views and user tracking
    const pageViews = events.filter(e => e.event_type === 'page_view').length;
    const uniqueVisitors = new Set(events.map(e => e.user_identifier)).size;
    
    // Calculate tool usage statistics
    const toolStats = toolUsage.reduce((acc, usage) => {
      acc[usage.tool_name] = (acc[usage.tool_name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topTools = Object.entries(toolStats)
      .map(([name, usage]) => ({ name, usage, slug: name.toLowerCase().replace(/\s+/g, '-') }))
      .sort((a, b) => b.usage - a.usage)
      .slice(0, 5);

    // Mock data for demonstration (replace with real calculations)
    return {
      pageViews,
      uniqueVisitors,
      avgSessionDuration: 180, // 3 minutes
      bounceRate: 45.2,
      conversionRate: 2.8,
      topArticles: articles.slice(0, 5).map(a => ({
        title: a.title,
        views: a.view_count || 0,
        slug: a.slug
      })),
      topTools,
      trafficSources: [
        { source: 'Organic Search', visits: pageViews * 0.6, percentage: 60 },
        { source: 'Direct', visits: pageViews * 0.25, percentage: 25 },
        { source: 'Social Media', visits: pageViews * 0.10, percentage: 10 },
        { source: 'Referral', visits: pageViews * 0.05, percentage: 5 },
      ],
      contentPerformance: generateMockTimeSeriesData(),
      userJourney: [
        { stage: 'Awareness', users: 1000, conversion: 100 },
        { stage: 'Interest', users: 800, conversion: 80 },
        { stage: 'Consideration', users: 400, conversion: 40 },
        { stage: 'Intent', users: 200, conversion: 20 },
        { stage: 'Purchase', users: 50, conversion: 5 },
      ]
    };
  };

  const generateMockTimeSeriesData = () => {
    const days = parseInt(dateRange.replace('d', ''));
    const data = [];
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      data.push({
        name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        views: Math.floor(Math.random() * 1000) + 500,
        conversions: Math.floor(Math.random() * 50) + 10,
        date: date.toISOString().split('T')[0]
      });
    }
    
    return data;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">Loading analytics...</div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-500">No analytics data available</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1d">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Page Views</p>
                <p className="text-2xl font-bold">{formatNumber(analyticsData.pageViews)}</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12.5%
                </p>
              </div>
              <Eye className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unique Visitors</p>
                <p className="text-2xl font-bold">{formatNumber(analyticsData.uniqueVisitors)}</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8.2%
                </p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Session</p>
                <p className="text-2xl font-bold">{Math.floor(analyticsData.avgSessionDuration / 60)}m {analyticsData.avgSessionDuration % 60}s</p>
                <p className="text-xs text-red-600 flex items-center">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  -3.1%
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bounce Rate</p>
                <p className="text-2xl font-bold">{analyticsData.bounceRate}%</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  -2.3%
                </p>
              </div>
              <MousePointer className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold">{analyticsData.conversionRate}%</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +1.2%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content Performance</TabsTrigger>
          <TabsTrigger value="tools">Tool Analytics</TabsTrigger>
          <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData.contentPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="views" stroke="#3B82F6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.userJourney}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="stage" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="users" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.topArticles.map((article, index) => (
                    <div key={article.slug} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{article.title}</p>
                        <p className="text-xs text-gray-500">/{article.slug}</p>
                      </div>
                      <Badge variant="outline">{formatNumber(article.views)} views</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.topTools.map((tool, index) => (
                    <div key={tool.slug} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{tool.name}</p>
                        <p className="text-xs text-gray-500">/tools/{tool.slug}</p>
                      </div>
                      <Badge variant="outline">{tool.usage} uses</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Performance Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={analyticsData.contentPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="views" stroke="#3B82F6" strokeWidth={2} name="Views" />
                  <Line type="monotone" dataKey="conversions" stroke="#10B981" strokeWidth={2} name="Conversions" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tool Usage Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={analyticsData.topTools}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="usage" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.trafficSources}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="visits"
                    >
                      {analyticsData.trafficSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Traffic Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.trafficSources.map((source, index) => (
                    <div key={source.source} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="font-medium">{source.source}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatNumber(source.visits)}</p>
                        <p className="text-sm text-gray-500">{source.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
