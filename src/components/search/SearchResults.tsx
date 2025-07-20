
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, ArrowRight } from 'lucide-react';
import { Article } from '@/lib/content';

interface SearchResultsProps {
  results: Article[];
  query: string;
  className?: string;
}

const SearchResults = ({ results, query, className = "" }: SearchResultsProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner friendly': return 'text-green-600 bg-green-50';
      case 'Tactical': return 'text-blue-600 bg-blue-50';
      case 'Advanced tactics': return 'text-purple-600 bg-purple-50';
      case 'Uncomfortable but necessary': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  if (!query) {
    return null;
  }

  if (results.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-muted-foreground">
          No articles found for "{query}". Try different keywords or browse by category.
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Search Results ({results.length})
        </h3>
        <p className="text-sm text-muted-foreground">
          for "{query}"
        </p>
      </div>
      
      <div className="space-y-4">
        {results.map((article) => (
          <Link key={article.slug} to={`/articles/${article.category}/${article.slug}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 hover:text-accent transition-colors">
                      {highlightText(article.title, query)}
                    </CardTitle>
                    <p className="text-muted-foreground mb-3">
                      {highlightText(article.description, query)}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground ml-4 flex-shrink-0" />
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
                        {highlightText(tag, query)}
                      </span>
                    ))}
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
