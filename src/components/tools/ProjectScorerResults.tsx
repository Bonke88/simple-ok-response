
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, TrendingUp, Users, Target, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ScorerResult {
  customerAcquisitionDifficulty: number;
  weeklyHoursViability: number;
  marketingChannels: string[];
  timeToFirstCustomer: string;
  verdict: 'Build this' | 'Pivot the idea' | 'Run away';
  verdictReason: string;
  redFlags: string[];
  greenFlags: string[];
}

const ProjectScorerResults = ({ result }: { result: ScorerResult }) => {
  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'Build this': return 'text-green-600 bg-green-50 border-green-200';
      case 'Pivot the idea': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Run away': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'Build this': return <CheckCircle className="h-6 w-6" />;
      case 'Pivot the idea': return <Target className="h-6 w-6" />;
      case 'Run away': return <AlertTriangle className="h-6 w-6" />;
      default: return null;
    }
  };

  // Sample comparison data
  const comparisonData = [
    { idea: "Slack for developers", verdict: "Build this", score: 8.5 },
    { idea: "Another todo app", verdict: "Run away", score: 2.1 },
    { idea: "Code snippet manager", verdict: "Build this", score: 7.8 },
    { idea: "AI for everyone", verdict: "Run away", score: 1.9 },
    { idea: "Invoice tracker for freelancers", verdict: "Build this", score: 8.2 },
    { idea: "Social media scheduler", verdict: "Pivot the idea", score: 5.4 },
    { idea: "Expense tracker for small teams", verdict: "Build this", score: 7.6 },
    { idea: "Universal API platform", verdict: "Run away", score: 2.8 },
    { idea: "Meeting notes automation", verdict: "Build this", score: 8.1 },
    { idea: "Blockchain for pets", verdict: "Run away", score: 1.2 },
    { idea: "Time tracking for consultants", verdict: "Build this", score: 7.9 },
    { idea: "Calendar app for busy people", verdict: "Pivot the idea", score: 4.7 }
  ];

  const currentScore = (10 - result.customerAcquisitionDifficulty + result.weeklyHoursViability) / 2;

  return (
    <div className="space-y-6">
      {/* Main Verdict */}
      <Card className={`border-2 ${getVerdictColor(result.verdict)}`}>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-3 text-2xl">
            {getVerdictIcon(result.verdict)}
            <span>The Verdict: {result.verdict}</span>
          </CardTitle>
          <p className="text-lg">{result.verdictReason}</p>
        </CardHeader>
      </Card>

      {/* Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Users className="h-5 w-5 text-red-500" />
              <span>Customer Acquisition Difficulty</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 mb-2">
              {result.customerAcquisitionDifficulty}/10
            </div>
            <Progress 
              value={(result.customerAcquisitionDifficulty / 10) * 100} 
              className="h-2"
            />
            <p className="text-sm text-muted-foreground mt-2">
              {result.customerAcquisitionDifficulty <= 3 ? 'Easy to reach customers' :
               result.customerAcquisitionDifficulty <= 6 ? 'Moderate effort required' :
               'Very difficult to acquire customers'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Clock className="h-5 w-5 text-blue-500" />
              <span>10 hrs/week Viability</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {result.weeklyHoursViability}/10
            </div>
            <Progress 
              value={(result.weeklyHoursViability / 10) * 100} 
              className="h-2"
            />
            <p className="text-sm text-muted-foreground mt-2">
              {result.weeklyHoursViability >= 7 ? 'Great side project fit' :
               result.weeklyHoursViability >= 5 ? 'Manageable with discipline' :
               'May require full-time focus'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              <span>Time to First Customer</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {result.timeToFirstCustomer}
            </div>
            <p className="text-sm text-muted-foreground">
              Based on typical side project timelines
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Flags */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {result.greenFlags.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span>Green Flags</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.greenFlags.map((flag, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">{flag}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {result.redFlags.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                <span>Red Flags</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.redFlags.map((flag, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">{flag}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Marketing Channels */}
      {result.marketingChannels.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-orange-500" />
              <span>Required Marketing Channels</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {result.marketingChannels.map((channel, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                >
                  {channel}
                </span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              These are the channels you'll likely need to master for customer acquisition
            </p>
          </CardContent>
        </Card>
      )}

      {/* Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>See How 12 Other Ideas Scored</CardTitle>
          <p className="text-muted-foreground">Your idea vs. other side project assessments</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {comparisonData.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-32 text-sm truncate">{item.idea}</div>
                <div className="flex-1">
                  <Progress value={(item.score / 10) * 100} className="h-2" />
                </div>
                <div className="w-16 text-sm font-medium">{item.score}/10</div>
                <div className={`w-20 text-xs px-2 py-1 rounded ${
                  item.verdict === 'Build this' ? 'bg-green-100 text-green-700' :
                  item.verdict === 'Pivot the idea' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {item.verdict === 'Build this' ? 'Build' : 
                   item.verdict === 'Pivot the idea' ? 'Pivot' : 'Run'}
                </div>
              </div>
            ))}
            
            {/* User's score highlighted */}
            <div className="flex items-center space-x-3 border-t pt-3 bg-blue-50 -mx-6 px-6 py-3">
              <div className="w-32 text-sm font-bold">Your idea</div>
              <div className="flex-1">
                <Progress value={(currentScore / 10) * 100} className="h-2" />
              </div>
              <div className="w-16 text-sm font-bold">{currentScore.toFixed(1)}/10</div>
              <div className={`w-20 text-xs px-2 py-1 rounded font-bold ${getVerdictColor(result.verdict)}`}>
                {result.verdict === 'Build this' ? 'Build' : 
                 result.verdict === 'Pivot the idea' ? 'Pivot' : 'Run'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Want the Full Analysis?</h3>
            <p className="text-muted-foreground mb-4">
              Get detailed breakdown + 50 similar ideas that actually worked
            </p>
            <Button className="gtm-button-primary">
              Join the GTM Cookbook →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectScorerResults;
