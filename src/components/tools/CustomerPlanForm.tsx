
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';

interface FormData {
  projectStage: string;
  timeAvailable: string;
  energyLevel: string;
  currentCustomers: string;
  biggestChallenge: string;
  projectDescription: string;
}

interface CustomerPlanFormProps {
  onComplete: (result: any) => void;
}

const CustomerPlanForm = ({ onComplete }: CustomerPlanFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    projectStage: '',
    timeAvailable: '',
    energyLevel: '',
    currentCustomers: '',
    biggestChallenge: '',
    projectDescription: ''
  });

  const totalSteps = 6;

  const questions = [
    {
      id: 'projectStage',
      title: 'What stage is your project in?',
      type: 'radio',
      options: [
        { value: 'idea', label: 'Still validating the idea' },
        { value: 'building', label: 'Building MVP' },
        { value: 'ready', label: 'Ready to launch' },
        { value: 'launched', label: 'Launched but no customers' },
        { value: 'some-customers', label: 'Have some customers' }
      ]
    },
    {
      id: 'timeAvailable',
      title: 'How much time do you have this week?',
      type: 'radio',
      options: [
        { value: 'minimal', label: '1-3 hours total' },
        { value: 'limited', label: '4-8 hours total' },
        { value: 'moderate', label: '9-15 hours total' },
        { value: 'substantial', label: '16+ hours total' }
      ]
    },
    {
      id: 'energyLevel',
      title: 'What\'s your current energy level?',
      type: 'radio',
      options: [
        { value: 'low', label: 'Low - Overwhelmed with day job' },
        { value: 'moderate', label: 'Moderate - Some motivation' },
        { value: 'high', label: 'High - Excited and motivated' },
        { value: 'urgent', label: 'Urgent - Need to make progress now' }
      ]
    },
    {
      id: 'currentCustomers',
      title: 'Current customer situation?',
      type: 'radio',
      options: [
        { value: 'none', label: 'No customers yet' },
        { value: 'few', label: '1-5 customers' },
        { value: 'growing', label: '6-20 customers' },
        { value: 'established', label: '20+ customers' }
      ]
    },
    {
      id: 'biggestChallenge',
      title: 'Biggest customer acquisition challenge?',
      type: 'radio',
      options: [
        { value: 'finding', label: 'Finding where customers hang out' },
        { value: 'messaging', label: 'Crafting the right message' },
        { value: 'confidence', label: 'Confidence to reach out' },
        { value: 'converting', label: 'Converting interest to sales' },
        { value: 'scaling', label: 'Scaling what works' }
      ]
    },
    {
      id: 'projectDescription',
      title: 'Briefly describe your project and target customer',
      type: 'textarea',
      placeholder: 'e.g., "A time tracking tool for freelance designers who struggle with accurate billing..."'
    }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      generatePlan();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generatePlan = () => {
    const plans = {
      // Different plans based on time/energy combinations
      'minimal-low': {
        focus: 'Research & Validation',
        tasks: [
          'Spend 1 hour researching where your target customers discuss their problems online',
          'Find 3 online communities (Reddit, Discord, Facebook groups) where they hang out',
          'Lurk and observe: what language do they use? What problems do they complain about?'
        ],
        reasoning: 'With limited time and energy, focus on low-effort research that builds understanding.'
      },
      'minimal-moderate': {
        focus: 'Strategic Outreach',
        tasks: [
          'Join 2-3 relevant online communities where your customers hang out',
          'Make 1 helpful comment or answer per community (no pitching)',
          'Send 5 personalized cold emails to potential customers asking about their problems'
        ],
        reasoning: 'Limited time but decent energy means focused, high-impact activities.'
      },
      'limited-high': {
        focus: 'Active Engagement',
        tasks: [
          'Write 1 helpful blog post or LinkedIn article about your customers\' main problem',
          'Reach out to 10-15 potential customers for problem validation interviews',
          'Create a simple landing page to test demand (if you don\'t have one)'
        ],
        reasoning: 'Good energy with moderate time allows for content creation and direct outreach.'
      },
      'substantial-high': {
        focus: 'Full Customer Acquisition Push',
        tasks: [
          'Launch a 7-day social media campaign sharing insights about your customers\' problems',
          'Conduct 5-10 customer interviews and document findings',
          'Start a cold email campaign to 50+ prospects with personalized messages'
        ],
        reasoning: 'High time and energy allows for comprehensive customer acquisition activities.'
      }
    };

    // Generate plan key based on time and energy
    const timeKey = formData.timeAvailable;
    const energyKey = formData.energyLevel === 'urgent' ? 'high' : formData.energyLevel;
    const planKey = `${timeKey}-${energyKey}` as keyof typeof plans;
    
    // Fallback to a reasonable default
    const selectedPlan = plans[planKey] || plans['limited-high'];

    // Customize based on project stage
    let stageTips = [];
    switch (formData.projectStage) {
      case 'idea':
        stageTips = [
          'Focus on problem validation before building',
          'Talk to 10+ potential customers before writing code'
        ];
        break;
      case 'building':
        stageTips = [
          'Get feedback on your MVP from target customers',
          'Consider soft-launching to a small group'
        ];
        break;
      case 'ready':
        stageTips = [
          'Line up your first 10 customers before public launch',
          'Prepare your launch sequence and marketing materials'
        ];
        break;
      case 'launched':
        stageTips = [
          'Focus entirely on customer acquisition',
          'Double down on channels that have shown any traction'
        ];
        break;
    }

    const result = {
      weeklyPlan: selectedPlan,
      stageTips,
      customization: {
        projectStage: formData.projectStage,
        timeAvailable: formData.timeAvailable,
        energyLevel: formData.energyLevel,
        challenge: formData.biggestChallenge
      },
      nextWeekPrep: [
        'Schedule specific times in your calendar for each task',
        'Set up tracking to measure results from this week\'s efforts',
        'Prepare templates or scripts if doing outreach'
      ]
    };

    onComplete(result);
  };

  const currentQuestion = questions[currentStep - 1];
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">This Week\'s Customer Plan</h1>
          <span className="text-sm text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{currentQuestion.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {currentQuestion.type === 'radio' && currentQuestion.options ? (
            <RadioGroup
              value={formData[currentQuestion.id as keyof FormData]}
              onValueChange={(value) => 
                setFormData({ ...formData, [currentQuestion.id]: value })
              }
              className="space-y-4"
            >
              {currentQuestion.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <div>
              <Label htmlFor={currentQuestion.id} className="mb-2 block">
                {currentQuestion.title}
              </Label>
              <Textarea
                id={currentQuestion.id}
                placeholder={currentQuestion.placeholder}
                value={formData[currentQuestion.id as keyof FormData]}
                onChange={(e) => 
                  setFormData({ ...formData, [currentQuestion.id]: e.target.value })
                }
                className="min-h-[100px]"
              />
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!formData[currentQuestion.id as keyof FormData]}
              className="gtm-button-primary"
            >
              {currentStep === totalSteps ? 'Generate My Plan' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerPlanForm;
