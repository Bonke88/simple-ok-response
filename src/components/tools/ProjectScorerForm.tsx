
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle } from 'lucide-react';

interface ProjectScorerData {
  projectDescription: string;
  targetCustomer: string;
  currentSolution: string;
  currentCost: string;
  reachability: string;
  supportAvailability: string;
}

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

const ProjectScorerForm = ({ onComplete }: { onComplete: (result: ScorerResult) => void }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ProjectScorerData>({
    projectDescription: '',
    targetCustomer: '',
    currentSolution: '',
    currentCost: '',
    reachability: '',
    supportAvailability: ''
  });

  const calculateScore = (): ScorerResult => {
    let acquisitionScore = 5; // Start neutral
    let hoursScore = 5;
    const redFlags: string[] = [];
    const greenFlags: string[] = [];
    const marketingChannels: string[] = [];

    // Analyze target customer
    const customerLower = data.targetCustomer.toLowerCase();
    if (customerLower.includes('everyone') || customerLower.includes('anyone')) {
      redFlags.push("'Everyone' is not a customer - this is a major red flag");
      acquisitionScore -= 3;
    }
    if (customerLower.includes('developers') && customerLower.length < 30) {
      redFlags.push("'Developers' is too broad - which developers doing what specific task?");
      acquisitionScore -= 2;
    }
    if (data.targetCustomer.length > 50 && !customerLower.includes('everyone')) {
      greenFlags.push("Specific target customer identified");
      acquisitionScore += 1;
    }

    // Analyze current solution
    switch (data.currentSolution) {
      case 'nothing':
        redFlags.push("If they're not solving this problem now, they might not pay to solve it");
        acquisitionScore -= 2;
        break;
      case 'spreadsheets':
        greenFlags.push("Spreadsheet users often upgrade to better solutions");
        acquisitionScore += 1;
        marketingChannels.push("Excel/Google Sheets user communities");
        break;
      case 'competitor':
        greenFlags.push("Proven market with existing solutions");
        acquisitionScore += 2;
        marketingChannels.push("Competitor comparison content", "Switch-focused landing pages");
        break;
      case 'duct-tape':
        greenFlags.push("Hacky solutions indicate strong need for better option");
        acquisitionScore += 2;
        marketingChannels.push("Technical forums where they share workarounds");
        break;
    }

    // Analyze cost impact
    if (data.currentCost.includes('hours') || data.currentCost.includes('time')) {
      greenFlags.push("Time-based pain points often drive purchase decisions");
      acquisitionScore += 1;
    }
    if (data.currentCost.includes('$') || data.currentCost.includes('money') || data.currentCost.includes('cost')) {
      greenFlags.push("Financial impact makes ROI calculations easier");
      acquisitionScore += 1;
    }

    // Analyze reachability
    switch (data.reachability) {
      case 'yes':
        greenFlags.push("Clear customer acquisition path identified");
        acquisitionScore += 2;
        hoursScore += 2;
        marketingChannels.push("Direct community engagement");
        break;
      case 'maybe':
        acquisitionScore -= 1;
        marketingChannels.push("Content marketing", "SEO");
        break;
      case 'no-idea':
        redFlags.push("Unknown customer acquisition path - major risk");
        acquisitionScore -= 3;
        hoursScore -= 2;
        break;
    }

    // Analyze support availability
    if (data.supportAvailability === 'no') {
      redFlags.push("Limited support availability may hurt customer satisfaction");
      hoursScore -= 1;
    } else {
      greenFlags.push("Available for customer support during key hours");
      hoursScore += 1;
    }

    // Add general marketing channels based on scores
    if (acquisitionScore >= 6) {
      marketingChannels.push("Word of mouth", "Referral program");
    }
    if (acquisitionScore <= 4) {
      marketingChannels.push("Paid advertising (expensive)", "Cold outreach (time-intensive)");
    }

    // Clamp scores
    acquisitionScore = Math.max(1, Math.min(10, acquisitionScore));
    hoursScore = Math.max(1, Math.min(10, hoursScore));

    // Determine time to first customer
    let timeToFirstCustomer = "12+ months";
    if (acquisitionScore >= 7 && hoursScore >= 6) {
      timeToFirstCustomer = "2-4 months";
    } else if (acquisitionScore >= 5 && hoursScore >= 5) {
      timeToFirstCustomer = "6-8 months";
    } else if (acquisitionScore >= 3) {
      timeToFirstCustomer = "8-12 months";
    }

    // Determine verdict
    let verdict: 'Build this' | 'Pivot the idea' | 'Run away' = 'Run away';
    let verdictReason = '';

    const overallScore = (acquisitionScore + hoursScore) / 2;
    
    if (overallScore >= 7) {
      verdict = 'Build this';
      verdictReason = 'Strong indicators suggest this could work as a side project';
    } else if (overallScore >= 5) {
      verdict = 'Pivot the idea';
      verdictReason = 'The core idea has potential but needs refinement';
    } else {
      verdict = 'Run away';
      verdictReason = 'Too many red flags - consider a different idea';
    }

    return {
      customerAcquisitionDifficulty: 11 - acquisitionScore, // Invert for difficulty
      weeklyHoursViability: hoursScore,
      marketingChannels: [...new Set(marketingChannels)], // Remove duplicates
      timeToFirstCustomer,
      verdict,
      verdictReason,
      redFlags,
      greenFlags
    };
  };

  const handleNext = () => {
    if (step < 6) setStep(step + 1);
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
        return data.projectDescription.length > 10;
      case 2:
        return data.targetCustomer.length > 5;
      case 3:
        return data.currentSolution !== '';
      case 4:
        return data.currentCost.length > 5;
      case 5:
        return data.reachability !== '';
      case 6:
        return data.supportAvailability !== '';
      default:
        return false;
    }
  };

  // Check for red flags in real-time
  const hasRedFlag = () => {
    if (step === 2) {
      const customerLower = data.targetCustomer.toLowerCase();
      return customerLower.includes('everyone') || customerLower.includes('anyone') || 
             (customerLower.includes('developers') && data.targetCustomer.length < 30);
    }
    return false;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Let's See If Anyone Will Actually Pay For This</h1>
        <p className="text-xl text-muted-foreground">5 minutes of brutal honesty. Could save you 5 months of wasted building.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>Brutal Reality Check</CardTitle>
            <span className="text-sm text-muted-foreground">Question {step} of 6</span>
          </div>
          <Progress value={(step / 6) * 100} className="mb-4" />
        </CardHeader>
        
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">What are you building?</h3>
              <Textarea
                placeholder="Describe your side project idea..."
                value={data.projectDescription}
                onChange={(e) => setData({ ...data, projectDescription: e.target.value })}
                rows={4}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Who specifically needs this?</h3>
              <p className="text-sm text-muted-foreground">If you say 'everyone' or just 'developers', that's a red flag</p>
              <Textarea
                placeholder="Be specific: 'Freelance React developers who manage 3+ client projects' not just 'developers'"
                value={data.targetCustomer}
                onChange={(e) => setData({ ...data, targetCustomer: e.target.value })}
                rows={3}
              />
              {hasRedFlag() && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm">Red flag detected: Be more specific about your target customer</span>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">What do they use now instead?</h3>
              <RadioGroup
                value={data.currentSolution}
                onValueChange={(value) => setData({ ...data, currentSolution: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nothing" id="nothing" />
                  <Label htmlFor="nothing">Nothing - they just live with the problem</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="spreadsheets" id="spreadsheets" />
                  <Label htmlFor="spreadsheets">Spreadsheets or manual processes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="competitor" id="competitor" />
                  <Label htmlFor="competitor">An existing competitor or tool</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="duct-tape" id="duct-tape" />
                  <Label htmlFor="duct-tape">A hacky workaround or custom solution</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">How much does their current solution cost them?</h3>
              <p className="text-sm text-muted-foreground">Think time AND money</p>
              <Textarea
                placeholder="e.g., '3 hours per week manually updating spreadsheets' or '$50/month for a tool that doesn't quite fit'"
                value={data.currentCost}
                onChange={(e) => setData({ ...data, currentCost: e.target.value })}
                rows={3}
              />
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Can you reach these people without a sales team?</h3>
              <RadioGroup
                value={data.reachability}
                onValueChange={(value) => setData({ ...data, reachability: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes-reach" />
                  <Label htmlFor="yes-reach">Yes, I know exactly where they hang out online</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="maybe" id="maybe-reach" />
                  <Label htmlFor="maybe-reach">Maybe - I have some ideas but need to test them</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no-idea" id="no-idea" />
                  <Label htmlFor="no-idea">No idea - I'd need to figure this out</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Can you support customers at 10pm after the kids are asleep?</h3>
              <p className="text-sm text-muted-foreground">Side projects often require off-hours support</p>
              <RadioGroup
                value={data.supportAvailability}
                onValueChange={(value) => setData({ ...data, supportAvailability: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes-support" />
                  <Label htmlFor="yes-support">Yes, I can handle support during evenings/weekends</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no-support" />
                  <Label htmlFor="no-support">No, I need strict work-life boundaries</Label>
                </div>
              </RadioGroup>
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
              {step === 6 ? 'Get My Brutal Assessment' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectScorerForm;
