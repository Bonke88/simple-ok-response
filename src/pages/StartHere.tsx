
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Rocket, Users, BarChart3, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const StartHere = () => {
  const learningPath = [
    {
      step: 1,
      title: "Pick Winners, Not Just Cool Tech",
      description: "Most engineers build what they think is cool, not what customers will pay for. Learn how to validate ideas before you code.",
      category: "picking-winners",
      icon: <TrendingUp className="h-6 w-6" />,
      readTime: "30 min"
    },
    {
      step: 2,
      title: "Ship It (Break the 80% Trap)",
      description: "You'll never feel ready to launch. Learn how to ship imperfect products and iterate based on real feedback.",
      category: "ship-it",
      icon: <Rocket className="h-6 w-6" />,
      readTime: "25 min"
    },
    {
      step: 3,
      title: "Find Your First Customers",
      description: "From zero to $1K MRR requires different tactics than scaling to $10K. Start with manual, unscalable methods.",
      category: "first-customers",
      icon: <Users className="h-6 w-6" />,
      readTime: "45 min"
    },
    {
      step: 4,
      title: "Scale Without Burnout",
      description: "Grow your side project while keeping your day job and family relationships intact. Energy management is everything.",
      category: "scale",
      icon: <BarChart3 className="h-6 w-6" />,
      readTime: "35 min"
    }
  ];

  return (
    <div className="py-16">
      <div className="content-container">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="mb-6">Start Here: Your GTM Learning Path</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A structured approach to building and marketing your SaaS side project. 
            Follow this path to avoid the most common mistakes that kill 99% of engineer side projects.
          </p>
        </div>

        {/* Learning Path */}
        <div className="space-y-8 mb-16">
          {learningPath.map((item, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-lg">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        {item.icon}
                      </div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                    </div>
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">⏱️ {item.readTime} to complete</span>
                      <Button asChild variant="outline">
                        <Link to={`/articles/${item.category}`} className="flex items-center space-x-2">
                          <span>Start Step {item.step}</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Quick Tools Section */}
        <div className="border-t pt-16">
          <h2 className="text-center mb-8">Quick Assessment Tools</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Project Viability Scorer</h3>
                <p className="text-muted-foreground mb-4">Get an honest assessment of your side project idea's market potential in 5 minutes.</p>
                <Button asChild className="gtm-button-primary">
                  <Link to="/tools/project-scorer">Take Assessment →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Will I Ever Launch?</h3>
                <p className="text-muted-foreground mb-4">Brutally honest diagnostic about your actual launch probability.</p>
                <Button asChild className="gtm-button-primary">
                  <Link to="/tools/launch-diagnostic">Get Diagnosis →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartHere;
