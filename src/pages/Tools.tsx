
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calculator,
  CheckSquare,
  Calendar,
  Zap,
  Search,
  Shield
} from 'lucide-react';

const Tools = () => {
  const tools = [
    {
      slug: 'project-scorer',
      icon: <Calculator className="h-8 w-8" />,
      name: "Project Viability Scorer",
      description: "Get an honest assessment of your side project idea's market potential",
      details: "Analyzes market size, competition, and your unique advantages to give you a viability score.",
      timeToComplete: "5 min"
    },
    {
      slug: 'launch-diagnostic',
      icon: <CheckSquare className="h-8 w-8" />,
      name: "Will I Ever Launch? Diagnostic",
      description: "Brutally honest assessment of your actual launch probability",
      details: "Based on your current progress and available time, calculates your real chances of shipping.",
      timeToComplete: "3 min"
    },
    {
      slug: 'customer-plan',
      icon: <Calendar className="h-8 w-8" />,
      name: "This Week's Customer Plan",
      description: "Get 3 prioritized customer acquisition tasks for your available time",
      details: "Matches marketing tactics to your energy level and schedule constraints.",
      timeToComplete: "2 min"
    },
    {
      slug: 'energy-scheduler',
      icon: <Zap className="h-8 w-8" />,
      name: "Energy-Reality Scheduler",
      description: "Match your side project tasks to your energy patterns",
      details: "Optimizes your productivity by aligning high-energy tasks with your peak hours.",
      timeToComplete: "4 min"
    },
    {
      slug: 'customer-finder',
      icon: <Search className="h-8 w-8" />,
      name: "First Customer Finder",
      description: "Discover where your ideal early customers hang out online",
      details: "Identifies online communities, forums, and platforms where you can find paying customers.",
      timeToComplete: "3 min"
    },
    {
      slug: 'anonymous-launch',
      icon: <Shield className="h-8 w-8" />,
      name: "Anonymous Launch Checklist",
      description: "Launch safely without corporate conflicts of interest",
      details: "Legal and practical guidance for launching while employed at a large corporation.",
      timeToComplete: "6 min"
    }
  ];

  return (
    <div className="py-16">
      <div className="content-container">
        <div className="text-center mb-16">
          <h1 className="mb-6">Tools That Save Your Weekends</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Quick assessments and planning tools designed for engineers with limited time. 
            Get actionable insights in minutes, not hours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <Link key={tool.slug} to={`/tools/${tool.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-3 bg-accent/10 rounded-lg text-accent">
                      {tool.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{tool.description}</p>
                  <p className="text-sm text-muted-foreground mb-4">{tool.details}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-accent">⏱️ {tool.timeToComplete}</span>
                    <span className="text-sm text-accent font-medium">Try it →</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16 p-8 bg-muted/30 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Get Personalized Results</h2>
          <p className="text-muted-foreground mb-6">
            All tools provide detailed, personalized reports via email. 
            No spam, just actionable insights for your specific situation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tools;
