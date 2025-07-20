
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';

interface FormData {
  progress: string;
  timeAvailable: string;
  motivation: string;
  obstacles: string;
  experience: string;
  deadline: string;
  support: string;
}

interface LaunchDiagnosticFormProps {
  onComplete: (result: any) => void;
}

const LaunchDiagnosticForm = ({ onComplete }: LaunchDiagnosticFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    progress: '',
    timeAvailable: '',
    motivation: '',
    obstacles: '',
    experience: '',
    deadline: '',
    support: ''
  });

  const totalSteps = 7;

  const questions = [
    {
      id: 'progress',
      title: 'How much of your project is complete?',
      options: [
        { value: 'idea', label: 'Just an idea (0-10%)', score: 1 },
        { value: 'started', label: 'Started building (10-30%)', score: 3 },
        { value: 'mvp', label: 'Working MVP (30-70%)', score: 6 },
        { value: 'polishing', label: 'Polishing for launch (70-90%)', score: 8 },
        { value: 'ready', label: 'Ready to launch (90%+)', score: 10 }
      ]
    },
    {
      id: 'timeAvailable',
      title: 'How much time can you realistically dedicate weekly?',
      options: [
        { value: 'minimal', label: '1-3 hours', score: 2 },
        { value: 'some', label: '4-8 hours', score: 5 },
        { value: 'significant', label: '9-15 hours', score: 7 },
        { value: 'substantial', label: '16+ hours', score: 9 }
      ]
    },
    {
      id: 'motivation',
      title: 'What\'s your primary motivation?',
      options: [
        { value: 'learning', label: 'Learning and fun', score: 3 },
        { value: 'side-income', label: 'Extra income', score: 6 },
        { value: 'career-change', label: 'Career change', score: 8 },
        { value: 'financial-freedom', label: 'Financial independence', score: 9 }
      ]
    },
    {
      id: 'obstacles',
      title: 'What\'s your biggest obstacle?',
      options: [
        { value: 'time', label: 'Not enough time', score: 3 },
        { value: 'technical', label: 'Technical challenges', score: 5 },
        { value: 'marketing', label: 'Marketing/customer acquisition', score: 6 },
        { value: 'motivation', label: 'Staying motivated', score: 4 },
        { value: 'perfectionism', label: 'Perfectionism/over-engineering', score: 2 }
      ]
    },
    {
      id: 'experience',
      title: 'Previous side project experience?',
      options: [
        { value: 'none', label: 'This is my first', score: 3 },
        { value: 'abandoned', label: 'Started but never finished projects', score: 2 },
        { value: 'launched', label: 'Launched but failed projects', score: 6 },
        { value: 'successful', label: 'Had some successful projects', score: 9 }
      ]
    },
    {
      id: 'deadline',
      title: 'Do you have a launch deadline?',
      options: [
        { value: 'none', label: 'No specific deadline', score: 3 },
        { value: 'flexible', label: 'Flexible goal (6+ months)', score: 5 },
        { value: 'firm', label: 'Firm deadline (3-6 months)', score: 7 },
        { value: 'urgent', label: 'Urgent deadline (<3 months)', score: 8 }
      ]
    },
    {
      id: 'support',
      title: 'What support do you have?',
      options: [
        { value: 'none', label: 'Working completely alone', score: 3 },
        { value: 'online', label: 'Online communities/mentors', score: 5 },
        { value: 'friends', label: 'Friends/family encouragement', score: 6 },
        { value: 'cofounder', label: 'Co-founder or team', score: 8 }
      ]
    }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateResult = () => {
    const scores = questions.map(q => {
      const selectedOption = q.options.find(opt => opt.value === formData[q.id as keyof FormData]);
      return selectedOption?.score || 0;
    });

    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    const maxScore = questions.reduce((sum, q) => sum + Math.max(...q.options.map(opt => opt.score)), 0);
    const percentage = Math.round((totalScore / maxScore) * 100);

    let probability, insights, recommendations;

    if (percentage >= 80) {
      probability = 'Very High (80-95%)';
      insights = [
        'You have strong fundamentals in place',
        'Your motivation and experience align well',
        'You have realistic time commitments'
      ];
      recommendations = [
        'Set a firm launch date within 2-3 months',
        'Focus on marketing and customer validation',
        'Join accountability groups or find a launch buddy'
      ];
    } else if (percentage >= 60) {
      probability = 'Good (60-80%)';
      insights = [
        'You have solid potential but some risk factors',
        'Time management or motivation may be challenges',
        'Previous experience is helping you'
      ];
      recommendations = [
        'Address your biggest obstacle first',
        'Set smaller, weekly milestones',
        'Consider finding a co-founder or accountability partner'
      ];
    } else if (percentage >= 40) {
      probability = 'Moderate (40-60%)';
      insights = [
        'Significant challenges that need addressing',
        'Time or motivation constraints are limiting you',
        'You may be underestimating the work required'
      ];
      recommendations = [
        'Reduce scope to absolute minimum viable product',
        'Focus on building consistent work habits first',
        'Get external accountability and support'
      ];
    } else {
      probability = 'Low (20-40%)';
      insights = [
        'Multiple risk factors are working against you',
        'Current approach needs significant changes',
        'Time or commitment constraints are severe'
      ];
      recommendations = [
        'Consider pausing to address fundamental obstacles',
        'Start with much smaller projects to build confidence',
        'Focus on learning and skill building first'
      ];
    }

    const result = {
      probability,
      percentage,
      insights,
      recommendations,
      breakdown: Object.fromEntries(
        questions.map((q, index) => [q.id, scores[index]])
      )
    };

    onComplete(result);
  };

  const currentQuestion = questions[currentStep - 1];
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Will I Ever Launch? Diagnostic</h1>
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
              {currentStep === totalSteps ? 'Get My Results' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LaunchDiagnosticForm;
