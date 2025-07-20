
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="py-16">
      <div className="content-container">
        <div className="max-w-3xl mx-auto">
          <h1 className="mb-8">About GTM Night Shift</h1>
          
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-muted-foreground mb-8">
              GTM Night Shift exists because most marketing advice is written for people with unlimited time, 
              venture funding, and no other responsibilities. That's not you.
            </p>
            
            <p className="mb-6">
              You're a corporate engineer. You make $200K+, you have kids, and you're building something 
              meaningful in the 10 hours a week you can scrape together after everyone else is asleep.
            </p>
            
            <p className="mb-6">
              The problem isn't that you can't code. The problem is that 99% of side projects die not 
              from technical issues, but from never finding paying customers. You know how to build it, 
              but not how to sell it.
            </p>
            
            <p className="mb-6">
              Most marketing content is either too basic ("just post on social media!") or written for 
              people who can work on their startup 60 hours a week. Neither helps you.
            </p>
            
            <p className="mb-8">
              GTM Night Shift provides tactical, time-conscious go-to-market advice specifically for 
              engineers with limited time. Every strategy can be executed in small chunks. Every tactic 
              respects that you have a day job and a family.
            </p>
          </div>

          <Card className="mb-12">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Who This Is For</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-accent mr-2">→</span>
                  Corporate engineers at FAANG+ companies ($200K+ salary)
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">→</span>
                  Parents with limited time (10 hours/week or less for side projects)
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">→</span>
                  People who can build but struggle with go-to-market
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">→</span>
                  Builders who want to reach $1K-$10K MRR, not unicorn status
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">→</span>
                  Engineers who value practical tactics over motivational fluff
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Stop Building and Start Selling?</h2>
            <p className="text-muted-foreground mb-8">
              Join 12,000+ engineers getting one practical GTM tactic every Tuesday.
            </p>
            <Button asChild className="gtm-button-primary text-lg px-8 py-3">
              <Link to="/newsletter">Get Weekly GTM Tactics</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
