import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Share2, Bookmark } from 'lucide-react';
import { getArticleBySlug, getRelatedArticles } from '@/lib/content';
import { useAnalytics } from '@/components/analytics/AnalyticsProvider';
import { useReadingProgress } from '@/hooks/useReadingProgress';
import ReadingProgress from '@/components/ui/reading-progress';

const Article = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const { trackPageView, trackArticleEngagement } = useAnalytics();
  const article = getArticleBySlug(slug as string);
  const relatedArticles = article ? getRelatedArticles(article) : [];
  
  const { progress, isEngaged, readingTime, isComplete } = useReadingProgress(
    article?.slug || '', 
    { threshold: 25 }
  );

  useEffect(() => {
    if (article) {
      trackPageView(`/articles/${category}/${slug}`, {
        article_title: article.title,
        article_category: article.category,
        article_difficulty: article.difficulty
      });
    }
  }, [article, category, slug, trackPageView]);

  useEffect(() => {
    if (article && isEngaged) {
      trackArticleEngagement(article.slug, 'engaged', {
        reading_time: readingTime,
        progress: progress
      });
    }
  }, [article, isEngaged, trackArticleEngagement, readingTime, progress]);

  useEffect(() => {
    if (article && isComplete) {
      trackArticleEngagement(article.slug, 'completed', {
        total_reading_time: readingTime,
        final_progress: progress
      });
    }
  }, [article, isComplete, trackArticleEngagement, readingTime, progress]);

  if (!article) {
    return (
      <div className="py-16">
        <div className="content-container text-center">
          <h1>Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to={`/articles/${category}`}>← Back to {category}</Link>
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{paragraph.replace('# ', '')}</h1>;
      }
      if (paragraph.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{paragraph.replace('## ', '')}</h2>;
      }
      if (paragraph.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-bold mt-4 mb-2">{paragraph.replace('### ', '')}</h3>;
      }
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        return <p key={index} className="font-bold mb-4">{paragraph.replace(/\*\*/g, '')}</p>;
      }
      if (paragraph.trim() === '') {
        return <div key={index} className="mb-4"></div>;
      }
      return <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>;
    });
  };

  const handleShare = () => {
    if (article) {
      trackArticleEngagement(article.slug, 'shared');
      // Add actual sharing logic here
      if (navigator.share) {
        navigator.share({
          title: article.title,
          text: article.description,
          url: window.location.href
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
      }
    }
  };

  const handleBookmark = () => {
    if (article) {
      trackArticleEngagement(article.slug, 'bookmarked');
      // Add bookmarking logic (localStorage or user account)
      const bookmarks = JSON.parse(localStorage.getItem('gtm_bookmarks') || '[]');
      if (!bookmarks.includes(article.slug)) {
        bookmarks.push(article.slug);
        localStorage.setItem('gtm_bookmarks', JSON.stringify(bookmarks));
      }
    }
  };

  return (
    <div className="py-16">
      {/* Fixed reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <ReadingProgress progress={progress} className="px-4 py-2" />
      </div>

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
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(article.difficulty)}`}>
                  {article.difficulty}
                </span>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatDate(article.publishedDate)}
                </span>
              </div>
              
              <h1 className="mb-4">{article.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{article.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-muted rounded text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleBookmark}>
                    <Bookmark className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            {renderContent(article.content)}
          </div>

          {/* Reading Stats */}
          <div className="bg-muted/50 rounded-lg p-4 mb-12">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Reading Progress: {progress}%</span>
              <span>Time: {Math.floor(readingTime / 60)}:{(readingTime % 60).toString().padStart(2, '0')}</span>
            </div>
          </div>

          {/* Newsletter CTA */}
          <Card className="mb-12">
            <CardContent className="pt-8 pb-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Get More Tactical GTM Advice</h3>
              <p className="text-muted-foreground mb-6">
                Join 12,000+ engineers getting one practical go-to-market tactic every Tuesday. 
                5-minute reads that respect your time.
              </p>
              <Button asChild className="gtm-button-primary text-lg px-8 py-3">
                <Link to="/newsletter">Subscribe to GTM Night Shift →</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <Link key={relatedArticle.slug} to={`/articles/${relatedArticle.category}/${relatedArticle.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-lg hover:text-accent transition-colors">
                          {relatedArticle.title}
                        </CardTitle>
                        <p className="text-muted-foreground text-sm">
                          {relatedArticle.description}
                        </p>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xs text-muted-foreground">
                            {relatedArticle.readTime}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(relatedArticle.difficulty)}`}>
                            {relatedArticle.difficulty}
                          </span>
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </div>
  );
};

export default Article;
