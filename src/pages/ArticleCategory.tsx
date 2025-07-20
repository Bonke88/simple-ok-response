
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ArticleCategory = () => {
  const { category } = useParams();

  const categoryData: Record<string, any> = {
    'picking-winners': {
      title: 'Pick Winners, Not Just Cool Tech',
      description: 'Choose side projects that can actually find paying customers, not just impress other engineers.',
      icon: '📊',
      articles: [
        {
          title: "The Fatal Flaw: Why 99% of Side Projects Make $0",
          slug: "fatal-flaw",
          description: "Most engineers build solutions to problems that don't exist or that people won't pay to solve.",
          readTime: "15 min",
          difficulty: "Uncomfortable but necessary",
          publishedDate: "3 days ago"
        },
        {
          title: "The $10K Validation Test (Before You Write Code)",
          slug: "validation-test",
          description: "How to validate market demand in 2 weeks using only landing pages and conversations.",
          readTime: "12 min",
          difficulty: "Beginner friendly",
          publishedDate: "1 week ago"
        }
      ]
    },
    'ship-it': {
      title: 'Ship It (Breaking the 80% Trap)',
      description: 'Stop perfecting and start selling. Your side project doesn\'t need to be perfect to make money.',
      icon: '🚀',
      articles: [
        {
          title: "Anonymous SaaS: How to Launch Without Your Boss Knowing",
          slug: "anonymous-saas",
          description: "Legal and practical strategies for launching while employed at a big tech company.",
          readTime: "12 min",
          difficulty: "Advanced tactics",
          publishedDate: "1 week ago"
        }
      ]
    },
    'first-customers': {
      title: 'First Customers (0 to $1K MRR)',
      description: 'Find and convert your first paying customers using manual, unscalable methods.',
      icon: '👥',
      articles: [
        {
          title: "The $1K Validation Framework for Busy Engineers",
          slug: "validation-framework",
          description: "Systematic approach to finding and validating your first 10 paying customers.",
          readTime: "8 min",
          difficulty: "Beginner friendly",
          publishedDate: "2 weeks ago"
        }
      ]
    },
    'scale': {
      title: 'Scale Without Burnout',
      description: 'Grow to $10K MRR while keeping your day job and family relationships intact.',
      icon: '📈',
      articles: [
        {
          title: "Energy Management: Code at 6am or Market at 11pm?",
          slug: "energy-management",
          description: "How to optimize your side project work around your energy patterns and family life.",
          readTime: "10 min",
          difficulty: "Tactical",
          publishedDate: "3 weeks ago"
        }
      ]
    }
  };

  const currentCategory = categoryData[category as string];

  if (!currentCategory) {
    return (
      <div className="py-16">
        <div className="content-container text-center">
          <h1>Category Not Found</h1>
          <p className="text-muted-foreground mb-8">The article category you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/">← Back to Homepage</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="content-container">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Homepage</span>
            </Link>
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Category Header */}
          <div className="text-center mb-16">
            <div className="text-6xl mb-4">{currentCategory.icon}</div>
            <h1 className="mb-6">{currentCategory.title}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {currentCategory.description}
            </p>
          </div>

          {/* Articles List */}
          <div className="space-y-8">
            {currentCategory.articles.map((article: any, index: number) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-8">
                  <Link to={`/articles/${category}/${article.slug}`}>
                    <h2 className="text-2xl font-semibold mb-4 hover:text-accent transition-colors">
                      {article.title}
                    </h2>
                  </Link>
                  <p className="text-muted-foreground mb-4 text-lg">
                    {article.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span>🕐 {article.readTime}</span>
                    <span>💪 {article.difficulty}</span>
                    <span>📅 {article.publishedDate}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Coming Soon Section */}
          <div className="mt-16 text-center p-8 bg-muted/30 rounded-lg">
            <h3 className="text-xl font-bold mb-4">More Articles Coming Soon</h3>
            <p className="text-muted-foreground mb-6">
              We're constantly adding new tactical guides to this category. 
              Join our newsletter to get notified when new articles are published.
            </p>
            <Button asChild className="gtm-button-primary">
              <Link to="/newsletter">Get Article Updates</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCategory;
