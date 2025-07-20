
import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { searchArticles, Article } from '@/lib/content';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  onResults?: (results: Article[]) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({ onResults, placeholder = "Search articles...", className = "" }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim()) {
      setIsSearching(true);
      const results = searchArticles(query);
      onResults?.(results);
      setIsSearching(false);
    } else {
      onResults?.([]);
    }
  }, [query, onResults]);

  const clearSearch = () => {
    setQuery('');
    onResults?.([]);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      {isSearching && (
        <div className="absolute top-full left-0 right-0 mt-1 text-sm text-muted-foreground">
          Searching...
        </div>
      )}
    </div>
  );
};

export default SearchBar;
