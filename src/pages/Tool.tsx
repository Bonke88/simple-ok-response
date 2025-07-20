import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectScorerForm from '@/components/tools/ProjectScorerForm';
import ProjectScorerResults from '@/components/tools/ProjectScorerResults';
import LaunchDiagnosticForm from '@/components/tools/LaunchDiagnosticForm';
import LaunchDiagnosticResults from '@/components/tools/LaunchDiagnosticResults';
import CustomerPlanForm from '@/components/tools/CustomerPlanForm';
import CustomerPlanResults from '@/components/tools/CustomerPlanResults';

const Tool = () => {
  const { toolSlug } = useParams();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [toolStarted, setToolStarted] = useState(false);
  const [toolResult, setToolResult] = useState<any>(null);

  const toolData: Record<string, any> = {
    'project-scorer': {
      title: 'Project Viability Scorer',
      description: 'Get an honest assessment of your side project idea\'s market potential',
      steps: [
        'Describe your project idea and target customer',
        'We analyze market size, competition, and customer acquisition difficulty',
        'Get your viability score and personalized recommendations'
      ],
      hasInteractiveVersion: true
    },
    'launch-diagnostic': {
      title: 'Will I Ever Launch? Diagnostic',
      description: 'Brutally honest assessment of your actual launch probability',
      steps: [
        'Answer questions about your current progress and available time',
        'We calculate your launch probability based on real data',
        'Get a personalized action plan to improve your odds'
      ],
      hasInteractiveVersion: true
    },
    'customer-plan': {
      title: 'This Week\'s Customer Plan',
      description: 'Get 3 prioritized customer acquisition tasks for your available time',
      steps: [
        'Tell us your current situation and available energy',
        'We match tactics to your constraints and energy level',
        'Get 3 specific tasks you can complete this week'
      ],
      hasInteractiveVersion: true
    },
    'energy-scheduler': {
      title: 'Energy-Reality Scheduler',
      description: 'Match your side project tasks to your energy patterns',
      steps: [
        'Map your weekly energy patterns and commitments',
        'We analyze your optimal productivity windows',
        'Get a personalized schedule that works with your life'
      ]
    },
    'customer-finder': {
      title: 'First Customer Finder',
      description: 'Discover where your ideal early customers hang out online',
      steps: [
        'Describe your product and ideal customer profile',
        'We identify relevant communities and platforms',
        'Get outreach templates and conversation starters'
      ]
    },
    'anonymous-launch': {
      title: 'Anonymous Launch Checklist',
      description: 'Launch safely without corporate conflicts of interest',
      steps: [
        'Tell us about your employment situation and risk tolerance',
        'We provide legal guidance and anonymity strategies',
        'Get a step-by-step checklist for safe launching'
      ]
    }
  };

  const currentTool = toolData[toolSlug as string];

  if (!currentTool) {
    return (
      <div className="py-16">
        <div className="content-container text-center">
          <h1>Tool Not Found</h1>
          <p className="text-muted-foreground mb-8">The tool you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/tools">← Back to Tools</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Tool submission:', { tool: toolSlug, email });
    setSubmitted(true);
  };

  const handleToolResult = (result: any) => {
    setToolResult(result);
  };

  if (submitted) {
    return (
      <div className="py-16">
        <div className="content-container">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardContent className="pt-8 pb-8">
                <h2 className="text-2xl font-bold mb-4">Check Your Email!</h2>
                <p className="text-muted-foreground mb-6">
                  We've sent your personalized {currentTool.title.toLowerCase()} results to <strong>{email}</strong>.
                </p>
                <p className="text-sm text-muted-foreground mb-8">
                  Didn't receive it? Check your spam folder or try again.
                </p>
                <div className="space-x-4">
                  <Button onClick={() => setSubmitted(false)} variant="outline">
                    Try Again
                  </Button>
                  <Button asChild>
                    <Link to="/tools">Try Another Tool</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Show results page for interactive tools
  if (toolResult) {
    return (
      <div className="py-16">
        <div className="content-container">
          <div className="mb-8">
            <Button asChild variant="ghost" className="mb-4">
              <Link to="/tools" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Tools</span>
              </Link>
            </Button>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="mb-4">Your {currentTool.title} Results</h1>
              <p className="text-muted-foreground">Based on your responses, here are your personalized insights</p>
            </div>

            {toolSlug === 'project-scorer' && <ProjectScorerResults result={toolResult} />}
            {toolSlug === 'launch-diagnostic' && <LaunchDiagnosticResults result={toolResult} />}
            {toolSlug === 'customer-plan' && <CustomerPlanResults result={toolResult} />}

            <div className="text-center mt-12">
              <Card>
                <CardContent className="pt-8 pb-8">
                  <h3 className="text-xl font-bold mb-4">Want the full detailed report?</h3>
                  <p className="text-muted-foreground mb-6">
                    Get a comprehensive PDF with specific action items, templates, 
                    and a personalized roadmap tailored to your situation.
                  </p>
                  <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="flex space-x-2">
                      <Input
                        type="email"
                        placeholder="your.email@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <Button type="submit" className="gtm-button-primary">
                        Send Report
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show interactive tool if available and started
  if (toolStarted && currentTool.hasInteractiveVersion) {
    return (
      <div className="py-16">
        <div className="content-container">
          <div className="mb-8">
            <Button asChild variant="ghost" className="mb-4">
              <Link to="/tools" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Tools</span>
              </Link>
            </Button>
          </div>

          {toolSlug === 'project-scorer' && <ProjectScorerForm onComplete={handleToolResult} />}
          {toolSlug === 'launch-diagnostic' && <LaunchDiagnosticForm onComplete={handleToolResult} />}
          {toolSlug === 'customer-plan' && <CustomerPlanForm onComplete={handleToolResult} />}
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="content-container">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/tools" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Tools</span>
            </Link>
          </Button>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="mb-4">{currentTool.title}</h1>
            <p className="text-xl text-muted-foreground">{currentTool.description}</p>
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle>How it works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentTool.steps.map((step: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {currentTool.hasInteractiveVersion ? (
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Try Interactive Version</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Get instant results with our interactive assessment tool. 
                    Complete the evaluation and see your results immediately.
                  </p>
                  <Button 
                    onClick={() => setToolStarted(true)}
                    className="gtm-button-primary w-full text-lg py-3"
                  >
                    Start Assessment →
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Get Detailed Email Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-2"
                      />
                    </div>
                    
                    <Button type="submit" className="gtm-button-primary w-full text-lg py-3">
                      Get Detailed Report →
                    </Button>
                    
                    <p className="text-sm text-muted-foreground text-center">
                      Comprehensive analysis with specific action items and templates.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Get Your Personalized Report</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-2"
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="gtm-button-primary w-full text-lg py-3">
                    Get My {currentTool.title} Report →
                  </Button>
                  
                  <p className="text-sm text-muted-foreground text-center">
                    We'll email you personalized results in 2-3 minutes. No spam, unsubscribe anytime.
                  </p>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tool;
