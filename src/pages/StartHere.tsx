
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Rocket, Users, BarChart3, ArrowRight } from 'lucide-react';
import { ContentAPI } from '@/lib/api/content';
import SEO from '@/components/seo/SEO';

const StartHere = () => {
  const [pillars, setPillars] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPillars = async () => {
      try {
        const pillarsData = await ContentAPI.getPillars();
        setPillars(pillarsData || []);
      } catch (error) {
        console.error('Failed to load pillars:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPillars();
  }, []);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp': return <TrendingUp className="h-8 w-8" />;
      case 'Rocket': return <Rocket className="h-8 w-8" />;
      case 'Users': return <Users className="h-8 w-8" />;
      case 'BarChart3': return <BarChart3 className="h-8 w-8" />;
      default: return <TrendingUp className="h-8 w-8" />;
    }
  };

  if (isLoading) {
    return (
      <div className="py-16">
        <div className="content-container">
          <div className="animate-pulse space-y-8">
            <div className="text-center space-y-4">
              <div className="h-12 bg-muted rounded w-1/2 mx-auto"></div>
              <div className="h-6 bg-muted rounded w-3/4 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Start Here - GTM Night Shift Learning Path"
        description="Your step-by-step guide to building and launching successful side projects. From idea validation to scaling your first $10K MRR."
        keywords={['start here', 'learning path', 'side projects', 'go-to-market', 'validation', 'launch']}
        url="/start"
      />
      
      <div className="py-16">
        <div className="content-container">
          <div className="text-center mb-16">
            <h1 className="mb-6">Your GTM Learning Path</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Follow this step-by-step path to build and launch successful side projects. 
              Each pillar builds on the previous one, designed specifically for engineers with limited time.
            </p>
          </div>

          {pillars.length > 0 ? (
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {pillars
                  .sort((a, b) => a.order_index - b.order_index)
                  .map((pillar, index) => (
                    <Link key={pillar.id} to={`/articles/${pillar.slug}`}>
                      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                        <CardHeader>
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                              {getIconComponent(pillar.icon_name)}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                STEP {index + 1}
                              </Badge>
                              {pillar.content_percentage && (
                                <Badge variant="secondary" className="text-xs">
                                  {pillar.content_percentage}% of content
                                </Badge>
                              )}
                            </div>
                          </div>
                          <CardTitle className="text-2xl group-hover:text-accent transition-colors">
                            {pillar.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-6 leading-relaxed">
                            {pillar.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-accent">
                              Explore {pillar.name} →
                            </span>
                            <ArrowRight className="h-4 w-4 text-accent group-hover:translate-x-1 transition-transform" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
              </div>

              {/* Call to Action */}
              <div className="text-center mt-16">
                <Card className="max-w-2xl mx-auto">
                  <CardContent className="pt-8 pb-8">
                    <h2 className="text-2xl font-bold mb-4">Ready to Start Building?</h2>
                    <p className="text-muted-foreground mb-6">
                      Get our free toolkit with templates, checklists, and frameworks 
                      to validate and launch your side project in 90 days.
                    </p>
                    <div className="space-y-4">
                      <Link 
                        to="/tools" 
                        className="inline-block bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                      >
                        Get Free GTM Toolkit →
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        No email required. Instant access to all tools.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold mb-4">Content Coming Soon</h2>
              <p className="text-muted-foreground mb-8">
                We're building an amazing learning path for you. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StartHere;
