
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';

interface ProjectScorerData {
  projectDescription: string;
  targetMarket: string;
  marketSize: string;
  competitionLevel: string;
  acquisitionStrategy: string;
  uniqueAdvantage: string;
  timeCommitment: string;
  technicalComplexity: string;
}

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

const ProjectScorerForm = ({ onComplete }: { onComplete: (result: ScorerResult) => void }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ProjectScorerData>({
    projectDescription: '',
    targetMarket: '',
    marketSize: '',
    competitionLevel: '',
    acquisitionStrategy: '',
    uniqueAdvantage: '',
    timeCommitment: '',
    technicalComplexity: ''
  });

  const calculateScore = (): ScorerResult => {
    // Market Potential (30% weight)
    let marketScore = 0;
    if (data.marketSize === 'large') marketScore = 10;
    else if (data.marketSize === 'medium') marketScore = 7;
    else if (data.marketSize === 'small') marketScore = 4;
    else marketScore = 2;

    // Competition Risk (25% weight) - inverse scoring
    let competitionScore = 0;
    if (data.competitionLevel === 'none') competitionScore = 10;
    else if (data.competitionLevel === 'few') competitionScore = 8;
    else if (data.competitionLevel === 'many') competitionScore = 5;
    else competitionScore = 2;

    // Acquisition Difficulty (25% weight) - inverse scoring
    let acquisitionScore = 0;
    if (data.acquisitionStrategy === 'clear') acquisitionScore = 10;
    else if (data.acquisitionStrategy === 'somewhat') acquisitionScore = 7;
    else if (data.acquisitionStrategy === 'unclear') acquisitionScore = 4;
    else acquisitionScore = 2;

    // Founder Fit (20% weight)
    let founderScore = 0;
    const hasUniqueAdvantage = data.uniqueAdvantage.length > 50;
    const hasRealisticTime = data.timeCommitment === 'adequate' || data.timeCommitment === 'plenty';
    const managedComplexity = data.technicalComplexity === 'low' || data.technicalComplexity === 'medium';
    
    if (hasUniqueAdvantage && hasRealisticTime && managedComplexity) founderScore = 10;
    else if ((hasUniqueAdvantage && hasRealisticTime) || (hasUniqueAdvantage && managedComplexity)) founderScore = 7;
    else if (hasUniqueAdvantage || hasRealisticTime || managedComplexity) founderScore = 4;
    else founderScore = 2;

    const breakdown = {
      marketPotential: Math.round(marketScore * 0.3 * 10) / 10,
      competitionRisk: Math.round(competitionScore * 0.25 * 10) / 10,
      acquisitionDifficulty: Math.round(acquisitionScore * 0.25 * 10) / 10,
      founderFit: Math.round(founderScore * 0.2 * 10) / 10
    };

    const totalScore = Math.round((breakdown.marketPotential + breakdown.competitionRisk + breakdown.acquisitionDifficulty + breakdown.founderFit) * 10) / 10;

    // Generate insights and recommendations
    const insights = [];
    const recommendations = [];
    const redFlags = [];

    if (marketScore <= 4) {
      redFlags.push("Small or unclear market size may limit growth potential");
      recommendations.push("Research market size more thoroughly before investing significant time");
    }

    if (competitionScore <= 5) {
      redFlags.push("High competition will make customer acquisition expensive and difficult");
      recommendations.push("Find a specific niche or unique angle to differentiate from competitors");
    }

    if (acquisitionScore <= 4) {
      redFlags.push("Unclear customer acquisition strategy is a major risk factor");
      recommendations.push("Validate your customer acquisition channels before building the product");
    }

    if (founderScore <= 4) {
      redFlags.push("Limited time or unclear unique advantage may hinder success");
      recommendations.push("Focus on projects that leverage your specific expertise and skills");
    }

    if (totalScore >= 8) {
      insights.push("Strong project with good market potential and manageable risks");
      insights.push("This project aligns well with successful side project patterns");
    } else if (totalScore >= 6) {
      insights.push("Decent project but with some areas that need attention");
      insights.push("Address the identified risks before investing significant time");
    } else {
      insights.push("High-risk project that may struggle to generate revenue");
      insights.push("Consider pivoting or finding a different project idea");
    }

    return {
      totalScore,
      breakdown,
      insights,
      recommendations,
      redFlags
    };
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else {
      const result = calculateScore();
      onComplete(result);
    }
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return data.projectDescription.length > 20 && data.targetMarket.length > 10;
      case 2:
        return data.marketSize && data.competitionLevel;
      case 3:
        return data.acquisitionStrategy && data.uniqueAdvantage.length > 20;
      case 4:
        return data.timeCommitment && data.technicalComplexity;
      default:
        return false;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <CardTitle>Project Viability Assessment</CardTitle>
          <span className="text-sm text-muted-foreground">Step {step} of 4</span>
        </div>
        <Progress value={(step / 4) * 100} className="mb-4" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tell us about your project</h3>
            <div>
              <Label htmlFor="description">Project Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your side project idea in detail..."
                value={data.projectDescription}
                onChange={(e) => setData({ ...data, projectDescription: e.target.value })}
                className="mt-2"
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="target">Target Market</Label>
              <Input
                id="target"
                placeholder="Who are your target customers?"
                value={data.targetMarket}
                onChange={(e) => setData({ ...data, targetMarket: e.target.value })}
                className="mt-2"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Market Analysis</h3>
            <div>
              <Label className="text-base font-medium">How large is your target market?</Label>
              <RadioGroup
                value={data.marketSize}
                onValueChange={(value) => setData({ ...data, marketSize: value })}
                className="mt-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="large" id="large" />
                  <Label htmlFor="large">Large (millions of potential customers)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">Medium (hundreds of thousands)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="small" id="small" />
                  <Label htmlFor="small">Small (tens of thousands)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="niche" id="niche" />
                  <Label htmlFor="niche">Very niche (thousands or less)</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-medium">How much competition exists?</Label>
              <RadioGroup
                value={data.competitionLevel}
                onValueChange={(value) => setData({ ...data, competitionLevel: value })}
                className="mt-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="none" />
                  <Label htmlFor="none">No direct competitors</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="few" id="few" />
                  <Label htmlFor="few">A few competitors</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="many" id="many" />
                  <Label htmlFor="many">Many competitors</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="saturated" id="saturated" />
                  <Label htmlFor="saturated">Market is saturated</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Customer Acquisition</h3>
            <div>
              <Label className="text-base font-medium">How clear is your customer acquisition strategy?</Label>
              <RadioGroup
                value={data.acquisitionStrategy}
                onValueChange={(value) => setData({ ...data, acquisitionStrategy: value })}
                className="mt-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="clear" id="clear" />
                  <Label htmlFor="clear">Very clear - I know exactly where to find customers</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="somewhat" id="somewhat" />
                  <Label htmlFor="somewhat">Somewhat clear - I have some ideas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unclear" id="unclear" />
                  <Label htmlFor="unclear">Unclear - I need to figure this out</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="none-strategy" />
                  <Label htmlFor="none-strategy">No strategy yet</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="advantage">What's your unique advantage or expertise?</Label>
              <Textarea
                id="advantage"
                placeholder="What makes you uniquely qualified to solve this problem?"
                value={data.uniqueAdvantage}
                onChange={(e) => setData({ ...data, uniqueAdvantage: e.target.value })}
                className="mt-2"
                rows={3}
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Reality Check</h3>
            <div>
              <Label className="text-base font-medium">How much time can you realistically commit per week?</Label>
              <RadioGroup
                value={data.timeCommitment}
                onValueChange={(value) => setData({ ...data, timeCommitment: value })}
                className="mt-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="plenty" id="plenty" />
                  <Label htmlFor="plenty">15+ hours per week</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="adequate" id="adequate" />
                  <Label htmlFor="adequate">10-15 hours per week</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="limited" id="limited" />
                  <Label htmlFor="limited">5-10 hours per week</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="minimal" id="minimal" />
                  <Label htmlFor="minimal">Less than 5 hours per week</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-medium">Technical complexity of your project?</Label>
              <RadioGroup
                value={data.technicalComplexity}
                onValueChange={(value) => setData({ ...data, technicalComplexity: value })}
                className="mt-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low">Low - Simple web app or tool</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">Medium - Standard SaaS application</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high">High - Complex algorithms or integrations</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="very-high" id="very-high" />
                  <Label htmlFor="very-high">Very high - Requires significant R&D</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-6">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={step === 1}
          >
            Previous
          </Button>
          <Button 
            onClick={handleNext}
            disabled={!isStepValid()}
            className="gtm-button-primary"
          >
            {step === 4 ? 'Get My Score' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectScorerForm;
