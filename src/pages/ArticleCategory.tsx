
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContentAPI } from '@/lib/api/content';
import { useAnalytics } from '@/components/analytics/AnalyticsProvider';
import SearchBar from '@/components/search/SearchBar';

const ArticleCategory = () => {
  const { category } = useParams<{ category: string }>();
  const { trackPageView } = useAnalytics();
  const [articles, setArticles] = useState<any[]>([]);
  const [pillar, setPillar] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      if (!category) return;
      
      try {
        // Get all pillars to find the current one
        const pillars = await ContentAPI.getPillars();
        const currentPillar = pillars?.find(p => p.slug === category);
        
        if (currentPillar) {
          setPillar(currentPillar);
          
          // Get articles for this pillar
          const articlesResponse = await ContentAPI.getArticles({
            pillar: currentPillar.id,
            limit: 50
          });
          
          setArticles(articlesResponse.data || []);
          
          trackPageView(`/articles/${category}`, {
            category: currentPillar.name,
            article_count: articlesResponse.data?.length || 0
          });
        }
      } catch (error) {
        console.error('Failed to load category content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [category, trackPageView]);

  const handleSearchResults = (results: any[]) => {
    setSearchResults(results);
    setIsSearching(results.length > 0);
  };

  if (isLoading) {
    return (
      <div className="py-16">
        <div className="content-container">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-12 bg-muted rounded w-1/2 mx-auto"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!pillar) {
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

  const articlesToShow = isSearching ? searchResults : articles;

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
                <TrendingUp className="h-8 w-8" />
              </div>
            </div>
            <h1 className="mb-6">{pillar.name}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {pillar.description}
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <SearchBar
              onResults={handleSearchResults}
              placeholder={`Search ${pillar.name.toLowerCase()} articles...`}
            />
          </div>

          {articlesToShow.length > 0 ? (
            <div className="space-y-6">
              {articlesToShow.map((article) => (
                <Link key={article.id} to={`/articles/${category}/${article.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2 hover:text-accent transition-colors">
                            {article.title}
                          </CardTitle>
                          <p className="text-muted-foreground mb-4">
                            {article.subtitle || article.meta_description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{article.reading_time} min</span>
                          </div>
                          {article.difficulty_level && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(article.difficulty_level)}`}>
                              {article.difficulty_level}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          {article.article_tags?.slice(0, 2).map((tagRelation: any) => (
                            <span key={tagRelation.tags.id} className="px-2 py-1 bg-muted rounded text-xs">
                              {tagRelation.tags.name}
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
              <h2 className="text-2xl font-bold mb-4">
                {isSearching ? 'No articles match your search' : 'No articles available'}
              </h2>
              <p className="text-muted-foreground mb-8">
                {isSearching 
                  ? 'Try adjusting your search terms to find more content.'
                  : 'Articles for this category will be added soon.'
                }
              </p>
              {isSearching && (
                <Button onClick={() => {setSearchResults([]); setIsSearching(false);}}>
                  Clear Search
                </Button>
              )}
            </div>
          )}

          {/* Related Tools Section */}
          <div className="border-t pt-16 mt-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Helpful Tools for {pillar.name}</h2>
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
