
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Rocket, 
  Users, 
  BarChart3,
  Calculator,
  CheckSquare,
  Calendar,
  Zap,
  Search,
  Shield,
  Clock,
  User
} from 'lucide-react';
import SEO from '@/components/seo/SEO';
import PodcastCard from '@/components/cards/PodcastCard';
import { ContentAPI } from '@/lib/api/content';

const Homepage = () => {
  const [featuredArticles, setFeaturedArticles] = useState<any[]>([]);
  const [pillars, setPillars] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const [articlesResponse, pillarsData] = await Promise.all([
          ContentAPI.getArticles({ limit: 8 }),
          ContentAPI.getPillars()
        ]);
        
        setFeaturedArticles(articlesResponse.data || []);
        setPillars(pillarsData || []);
      } catch (error) {
        console.error('Failed to load homepage content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  if (isLoading) {
    return (
      <div className="py-16">
        <div className="content-container text-center">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/2 mx-auto"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getFeaturedArticle = () => {
    return featuredArticles.find(article => article.featured) || featuredArticles[0];
  };

  const getPopularArticles = () => {
    return featuredArticles.slice(0, 4);
  };

  const getAdditionalArticles = () => {
    return featuredArticles.slice(4, 8);
  };

  const featuredArticle = getFeaturedArticle();
  const popularArticles = getPopularArticles();
  const additionalArticles = getAdditionalArticles();

  return (
    <>
      <SEO
        title="GTM Night Shift - Go-to-Market Advice for Corporate Engineers"
        description="Practical sales & marketing tactics for engineers building SaaS side projects. Learn to validate ideas, find customers, and scale without burnout."
        keywords={['go-to-market', 'side projects', 'engineers', 'SaaS', 'marketing', 'sales', 'validation', 'startup']}
        url="/"
        type="website"
      />
      
      <div className="space-y-0">
        {/* Hero Feature Article */}
        {featuredArticle && (
          <section className="py-8 bg-gradient-to-br from-orange-50 to-red-50">
            <div className="content-container">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left - Enhanced Visual */}
                <div className="order-2 md:order-1">
                  <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 p-8 text-center min-h-[320px] flex flex-col justify-center shadow-2xl">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-black/5"></div>
                    
                    <div className="relative bg-white rounded-2xl p-6 max-w-sm mx-auto shadow-xl border border-orange-100">
                      <div className="flex items-center justify-center mb-4">
                        <div className="relative">
                          <img 
                            src={featuredArticle.article_authors?.[0]?.authors?.avatar_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"} 
                            alt={featuredArticle.article_authors?.[0]?.authors?.name || "GTM Night Shift"} 
                            className="w-20 h-20 rounded-full object-cover border-3 border-orange-200 shadow-lg"
                          />
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">GTM Night Shift</h3>
                      <p className="text-sm text-gray-600 mb-4">With {featuredArticle.article_authors?.[0]?.authors?.name || "Jon Matthews"}</p>
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1.5 rounded-full text-sm font-bold border-0">
                        {featuredArticle.content_pillars?.name || "Corporate Engineers"}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {/* Right - Enhanced Content */}
                <div className="order-1 md:order-2">
                  <div className="space-y-4">
                    <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      FEATURED
                    </Badge>
                    
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                      {featuredArticle.title}
                    </h1>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {featuredArticle.subtitle || featuredArticle.meta_description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{featuredArticle.reading_time} min read</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{featuredArticle.article_authors?.[0]?.authors?.name || "GTM Team"}</span>
                      </div>
                      <span className="font-semibold text-gray-700">
                        {new Date(featuredArticle.published_at).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <Link 
                      to={`/articles/${featuredArticle.content_pillars?.slug}/${featuredArticle.slug}`}
                      className="inline-block mt-4 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                    >
                      Read Article →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Most Popular Section */}
        {popularArticles.length > 0 && (
          <section className="py-12 bg-white">
            <div className="content-container">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Most Popular</h2>
                <Link 
                  to="/start" 
                  className="text-gray-600 hover:text-orange-600 font-semibold text-sm transition-colors duration-200 flex items-center gap-1"
                >
                  VIEW ALL
                  <TrendingUp className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {popularArticles.map((article) => (
                  <div key={article.id} className="group">
                    <Link to={`/articles/${article.content_pillars?.slug}/${article.slug}`} className="block">
                      <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md overflow-hidden">
                        {/* Article Image */}
                        <div className="relative">
                          <img 
                            src={article.article_authors?.[0]?.authors?.avatar_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=240&fit=crop&crop=face"} 
                            alt={article.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                          <Badge className="absolute top-3 left-3 bg-white/90 text-gray-800 hover:bg-white border-0 text-xs font-bold">
                            {article.content_pillars?.name || "GTM"}
                          </Badge>
                        </div>
                        
                        <CardContent className="p-5">
                          <div className="space-y-3">
                            <h3 className="font-bold text-base text-gray-900 group-hover:text-orange-600 transition-colors leading-tight line-clamp-2 min-h-[48px]">
                              {article.title}
                            </h3>
                            
                            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                              {article.subtitle || article.meta_description}
                            </p>
                            
                            <div className="flex items-center justify-between pt-2">
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                <span>{article.reading_time} min</span>
                              </div>
                              <span className="text-xs font-bold text-gray-700">
                                {new Date(article.published_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Enhanced Divider */}
        <section className="py-8">
          <div className="content-container">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <div className="bg-white px-6">
                  <div className="flex items-center gap-2 text-gray-400">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Articles using PodcastCard Component */}
        {additionalArticles.length > 0 && (
          <>
            <section className="py-8 bg-white">
              <div className="content-container space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
                  {additionalArticles.slice(0, 3).map((article) => (
                    <PodcastCard
                      key={article.id}
                      guestPhoto={article.article_authors?.[0]?.authors?.avatar_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"}
                      guestName={article.article_authors?.[0]?.authors?.name || "GTM Expert"}
                      episodeTitle={article.title}
                      episodeBlurb={article.subtitle || article.meta_description || ""}
                      episodeDate={new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      authorName={article.article_authors?.[0]?.authors?.name?.toUpperCase() || "GTM TEAM"}
                      category={article.content_pillars?.name?.toUpperCase() || "GTM"}
                      onClick={() => window.location.href = `/articles/${article.content_pillars?.slug}/${article.slug}`}
                    />
                  ))}
                </div>
              </div>
            </section>

            {additionalArticles.length > 3 && (
              <section className="py-8 bg-white">
                <div className="content-container space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
                    {additionalArticles.slice(3, 6).map((article) => (
                      <PodcastCard
                        key={article.id}
                        guestPhoto={article.article_authors?.[0]?.authors?.avatar_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"}
                        guestName={article.article_authors?.[0]?.authors?.name || "GTM Expert"}
                        episodeTitle={article.title}
                        episodeBlurb={article.subtitle || article.meta_description || ""}
                        episodeDate={new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        authorName={article.article_authors?.[0]?.authors?.name?.toUpperCase() || "GTM TEAM"}
                        category={article.content_pillars?.name?.toUpperCase() || "GTM"}
                        onClick={() => window.location.href = `/articles/${article.content_pillars?.slug}/${article.slug}`}
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Homepage;
