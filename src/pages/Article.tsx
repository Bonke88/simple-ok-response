
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Clock, Zap, Calendar } from 'lucide-react';

const Article = () => {
  const { category, slug } = useParams();

  // This would normally fetch from a CMS or markdown files
  const sampleArticle = {
    title: "The Fatal Flaw: Why 99% of Side Projects Make $0",
    content: `
Most engineers build what they think is cool, not what customers will pay for. This is the fatal flaw that kills 99% of side projects before they ever see their first dollar of revenue.

## The Problem: Engineer-First Thinking

You see a technical problem and think "I can build a better solution." You spend months perfecting the architecture, optimizing performance, and adding features. You launch to... crickets.

The issue isn't your code. The issue is you solved a problem that either:
1. Doesn't actually exist for your target customers
2. Exists but isn't painful enough for people to pay to solve it
3. Exists and is painful, but your solution doesn't fit how people actually work

## The Solution: Customer-First Validation

Before you write a single line of code, you need to validate three things:

### 1. Does this problem actually exist?
Talk to 10 potential customers. Not your engineering friends—actual people who would use and pay for your solution.

### 2. Is it painful enough that they'd pay to solve it?
Ask them: "If I could solve this problem for you, what would it be worth?" If they hesitate or say "maybe $10/month," move on.

### 3. How do they currently solve this problem?
If they're not currently spending time or money on this problem, they won't spend money on your solution either.

## Key Takeaway

Build solutions to problems that people are already paying to solve, just not very well. That's where the money is.
    `,
    readTime: "15 min",
    difficulty: "Uncomfortable but necessary",
    publishedDate: "3 days ago",
    category: "Picking Winners"
  };

  return (
    <div className="py-16">
      <div className="content-container">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link to={`/articles/${category}`} className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to {category}</span>
            </Link>
          </Button>
        </div>

        <article className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-12">
            <h1 className="mb-6">{sampleArticle.title}</h1>
            <div className="flex flex-wrap gap-6 text-muted-foreground mb-8">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{sampleArticle.readTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span>{sampleArticle.difficulty}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{sampleArticle.publishedDate}</span>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-16">
            {sampleArticle.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-bold mt-12 mb-6">{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('### ')) {
                return <h3 key={index} className="text-xl font-semibold mt-8 mb-4">{paragraph.replace('### ', '')}</h3>;
              }
              if (paragraph.trim() === '') {
                return <br key={index} />;
              }
              return <p key={index} className="mb-6 text-lg leading-relaxed">{paragraph}</p>;
            })}
          </div>

          {/* Key Takeaway Box */}
          <Card className="mb-16 border-accent/20 bg-accent/5">
            <CardContent className="pt-6">
              <h3 className="text-lg font-bold mb-3 text-accent">💡 Key Takeaway</h3>
              <p className="text-muted-foreground">
                Build solutions to problems that people are already paying to solve, just not very well. 
                That's where the money is.
              </p>
            </CardContent>
          </Card>

          {/* Newsletter CTA */}
          <div className="text-center bg-muted/30 p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Want More Tactical GTM Advice?</h3>
            <p className="text-muted-foreground mb-6">
              Join 12,000+ engineers getting one practical tactic every Tuesday.
            </p>
            <Button asChild className="gtm-button-primary">
              <Link to="/newsletter">Get Weekly GTM Tactics</Link>
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Article;
