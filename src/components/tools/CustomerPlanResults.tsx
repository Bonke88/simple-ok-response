
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Target, Lightbulb } from 'lucide-react';

interface WeeklyPlan {
  focus: string;
  tasks: string[];
  reasoning: string;
}

interface PlanResult {
  weeklyPlan: WeeklyPlan;
  stageTips: string[];
  customization: {
    projectStage: string;
    timeAvailable: string;
    energyLevel: string;
    challenge: string;
  };
  nextWeekPrep: string[];
}

const CustomerPlanResults = ({ result }: { result: PlanResult }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl mb-2">
            This Week\'s Focus: <span className="text-blue-600">{result.weeklyPlan.focus}</span>
          </CardTitle>
          <p className="text-muted-foreground">
            {result.weeklyPlan.reasoning}
          </p>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>Your 3 Priority Tasks</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {result.weeklyPlan.tasks.map((task, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <p className="text-sm flex-1">{task}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {result.stageTips.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-purple-500" />
                <span>Stage-Specific Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.stageTips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <span>Next Week Prep</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.nextWeekPrep.map((prep, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{prep}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-700">
            <Lightbulb className="h-5 w-5" />
            <span>Success Tips</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-blue-700">
            <p>• <strong>Time block</strong> each task in your calendar this week</p>
            <p>• <strong>Track results</strong> - how many people respond to your outreach?</p>
            <p>• <strong>Focus on learning</strong> - what language do customers use to describe problems?</p>
            <p>• <strong>Be consistent</strong> - small daily actions beat sporadic big pushes</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerPlanResults;
