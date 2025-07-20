
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, Target, TrendingUp } from 'lucide-react';

interface DiagnosticResult {
  probability: string;
  percentage: number;
  insights: string[];
  recommendations: string[];
  breakdown: Record<string, number>;
}

const LaunchDiagnosticResults = ({ result }: { result: DiagnosticResult }) => {
  const getPercentageColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    if (percentage >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    if (percentage >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl mb-2">
            Launch Probability: <span className={getPercentageColor(result.percentage)}>{result.probability}</span>
          </CardTitle>
          <div className="max-w-md mx-auto">
            <Progress 
              value={result.percentage} 
              className="h-4"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Based on your responses, you have a {result.percentage}% likelihood of actually launching
            </p>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Key Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {result.insights.map((insight, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{insight}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-500" />
              <span>Action Plan</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {result.percentage < 60 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-orange-700">
              <AlertTriangle className="h-5 w-5" />
              <span>Reality Check</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-orange-700 mb-4">
              Your current situation suggests significant challenges ahead. Consider these fundamental changes:
            </p>
            <ul className="space-y-2 text-sm text-orange-700">
              <li>• Reduce your project scope by 70-80%</li>
              <li>• Set a maximum 2-month timeline for MVP</li>
              <li>• Get external accountability (co-founder, mentor, or public commitment)</li>
              <li>• Focus on one core feature that solves one specific problem</li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LaunchDiagnosticResults;
