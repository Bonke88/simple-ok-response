
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, TrendingUp, Users, Target, Zap } from 'lucide-react';

interface ScorerResult {
  totalScore: number;
  breakdown: {
    marketPotential: number;
    competitionRisk: number;
    acquisitionDifficulty: number;
    founderFit: number;
  };
  insights: string[];
  recommendations: string[];
  redFlags: string[];
}

const ProjectScorerResults = ({ result }: { result: ScorerResult }) => {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 8) return 'Strong Potential';
    if (score >= 6) return 'Moderate Risk';
    return 'High Risk';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl mb-2">
            Your Project Score: <span className={getScoreColor(result.totalScore)}>{result.totalScore}/10</span>
          </CardTitle>
          <p className={`text-lg font-medium ${getScoreColor(result.totalScore)}`}>
            {getScoreLabel(result.totalScore)}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Market Potential</span>
                    <span className="text-sm">{result.breakdown.marketPotential}/3.0</span>
                  </div>
                  <Progress value={(result.breakdown.marketPotential / 3) * 100} className="h-2" />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-green-500" />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Competition Risk</span>
                    <span className="text-sm">{result.breakdown.competitionRisk}/2.5</span>
                  </div>
                  <Progress value={(result.breakdown.competitionRisk / 2.5) * 100} className="h-2" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Target className="h-5 w-5 text-purple-500" />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Acquisition Difficulty</span>
                    <span className="text-sm">{result.breakdown.acquisitionDifficulty}/2.5</span>
                  </div>
                  <Progress value={(result.breakdown.acquisitionDifficulty / 2.5) * 100} className="h-2" />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Zap className="h-5 w-5 text-orange-500" />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Founder Fit</span>
                    <span className="text-sm">{result.breakdown.founderFit}/2.0</span>
                  </div>
                  <Progress value={(result.breakdown.founderFit / 2) * 100} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Key Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.insights.map((insight, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  • {insight}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-500" />
              <span>Recommendations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  • {rec}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {result.redFlags.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span>Red Flags</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.redFlags.map((flag, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    • {flag}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProjectScorerResults;
