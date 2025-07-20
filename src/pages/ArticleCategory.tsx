
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getArticlesByCategory } from '@/lib/content';

const ArticleCategory = () => {
  const { category } = useParams<{ category: string }>();
  
  const categoryData: Record<string, { title: string; description: string; icon: React.ReactNode }> = {
    'picking-winners': {
      title: 'Picking Winners',
      description: 'Learn to validate ideas before you code. Most side projects fail because engineers build cool tech that nobody wants to pay for.',
      icon: <TrendingUp className="h-8 w-8" />
    },
    'ship-it': {
      title: 'Ship It',
      description: 'Break the 80% trap. You\'ll never feel ready to launch, but shipping imperfect products beats perfect products that never ship.',
      icon: <TrendingUp className="h-8 w-8" />
    },
    'first-customers': {
      title: 'First Customers',
      description: 'Find and convert your first paying customers. From zero to $1K MRR requires different tactics than scaling to $10K.',
      icon: <TrendingUp className="h-8 w-8" />
    },
    'scale': {
      title: 'Scale',
      description: 'Grow your side project while keeping your day job and sanity. Energy management and smart automation are everything.',
      icon: <TrendingUp className="h-8 w-8" />
    }
  };

  const currentCategory = categoryData[category as string];
  const articles = getArticlesByCategory(category as string);

  if (!currentCategory) {
    return (
      <div className="py-16">
        <div className="content-container text-center">
          <h1>Category Not Found</h1>
          <p className="text-muted-foreground mb-8">The category you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/start">← Back to Start Here</Link>
          </Button>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner friendly': return 'text-green-600 bg-green-50';
      case 'Tactical': return 'text-blue-600 bg-blue-50';
      case 'Advanced tactics': return 'text-purple-600 bg-purple-50';
      case 'Uncomfortable but necessary': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="py-16">
      <div className="content-container">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/start" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Start Here</span>
            </Link>
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-accent/10 rounded-lg">
                {currentCategory.icon}
              </div>
            </div>
            <h1 className="mb-6">{currentCategory.title}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {currentCategory.description}
            </p>
          </div>

          {articles.length > 0 ? (
            <div className="space-y-6">
              {articles.map((article) => (
                <Link key={article.slug} to={`/articles/${category}/${article.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2 hover:text-accent transition-colors">
                            {article.title}
                          </CardTitle>
                          <p className="text-muted-foreground mb-4">
                            {article.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{article.readTime}</span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(article.difficulty)}`}>
                            {article.difficulty}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {article.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-muted rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold mb-4">Articles Coming Soon</h2>
              <p className="text-muted-foreground mb-8">
                We're working on creating high-quality, tactical content for this category. 
                Check back soon or subscribe to our newsletter to get notified when new articles are published.
              </p>
              <Button asChild className="gtm-button-primary">
                <Link to="/newsletter">Get Notified →</Link>
              </Button>
            </div>
          )}

          {/* Related Tools Section */}
          <div className="border-t pt-16 mt-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Helpful Tools for {currentCategory.title}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {category === 'picking-winners' && (
                <>
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-2">Project Viability Scorer</h3>
                      <p className="text-muted-foreground mb-4">Get an honest assessment of your side project idea's market potential.</p>
                      <Button asChild className="gtm-button-primary">
                        <Link to="/tools/project-scorer">Try Tool →</Link>
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-2">Customer Finder</h3>
                      <p className="text-muted-foreground mb-4">Discover where your ideal early customers hang out online.</p>
                      <Button asChild className="gtm-button-primary">
                        <Link to="/tools/customer-finder">Try Tool →</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </>
              )}
              {category === 'ship-it' && (
                <>
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-2">Will I Ever Launch?</h3>
                      <p className="text-muted-foreground mb-4">Brutally honest diagnostic about your actual launch probability.</p>
                      <Button asChild className="gtm-button-primary">
                        <Link to="/tools/launch-diagnostic">Try Tool →</Link>
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-2">Anonymous Launch Checklist</h3>
                      <p className="text-muted-foreground mb-4">Launch safely without corporate conflicts of interest.</p>
                      <Button asChild className="gtm-button-primary">
                        <Link to="/tools/anonymous-launch">Try Tool →</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCategory;
