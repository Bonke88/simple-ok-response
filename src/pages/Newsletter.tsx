
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would connect to ConvertKit or similar service in production
    console.log('Newsletter signup:', email);
    setSubscribed(true);
  };

  const benefits = [
    "One practical GTM tactic every Tuesday",
    "5-minute reads that respect your time",
    "Templates and checklists you can use immediately",
    "Real examples from engineers who've launched successfully",
    "No fluff, no motivational quotes, just tactics that work"
  ];

  const recentIssues = [
    {
      title: "The 15-Minute Customer Research Method",
      description: "How to validate your idea during your lunch break",
      date: "Dec 17, 2024"
    },
    {
      title: "Anonymous SaaS Launch: 5 Legal Must-Dos",
      description: "Protect yourself when launching while employed",
      date: "Dec 10, 2024"
    },
    {
      title: "The $1K MRR Formula for Busy Engineers",
      description: "Prioritize the 20% of marketing that gets 80% of results",
      date: "Dec 3, 2024"
    }
  ];

  if (subscribed) {
    return (
      <div className="py-16">
        <div className="content-container">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardContent className="pt-12 pb-12">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                <h1 className="mb-4">Welcome to GTM Night Shift!</h1>
                <p className="text-xl text-muted-foreground mb-6">
                  Thanks for subscribing! Check your email for a confirmation link.
                </p>
                <p className="text-muted-foreground">
                  Your first GTM tactic will arrive next Tuesday at 7am PT. 
                  Perfect timing for your morning coffee before the chaos begins.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="content-container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="mb-6">GTM Night Shift Newsletter</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              One practical go-to-market tactic every Tuesday. 5 minutes to read, 
              immediately actionable for your side project.
            </p>
            <p className="text-sm text-muted-foreground">
              Read by 12,000+ engineers at Google, Meta, Microsoft, and more
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Signup Form */}
            <Card>
              <CardContent className="pt-8 pb-8">
                <h2 className="text-2xl font-bold mb-6">Join 12,000+ Engineers</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      type="email"
                      placeholder="your.email@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="text-lg py-4"
                    />
                  </div>
                  <Button type="submit" className="w-full gtm-button-primary text-lg py-4">
                    Get Weekly GTM Tactics
                  </Button>
                </form>
                <p className="text-sm text-muted-foreground mt-4">
                  Unsubscribe anytime. No spam, ever.
                </p>
              </CardContent>
            </Card>

            {/* Benefits */}
            <div>
              <h3 className="text-xl font-bold mb-6">What You'll Get</h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Issues */}
          <div className="border-t pt-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Recent Issues</h2>
            <div className="space-y-6">
              {recentIssues.map((issue, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{issue.title}</h3>
                        <p className="text-muted-foreground">{issue.description}</p>
                      </div>
                      <span className="text-sm text-muted-foreground ml-4">{issue.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
