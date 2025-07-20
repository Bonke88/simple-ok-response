
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

export interface FilterOptions {
  category?: string;
  difficulty?: string;
  readTime?: string;
  tags?: string[];
}

interface ArticleFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  availableTags: string[];
  className?: string;
}

const ArticleFilters = ({ filters, onFiltersChange, availableTags, className = "" }: ArticleFiltersProps) => {
  const categories = [
    { value: 'picking-winners', label: 'Picking Winners' },
    { value: 'ship-it', label: 'Ship It' },
    { value: 'first-customers', label: 'First Customers' },
    { value: 'scale', label: 'Scale' }
  ];

  const difficulties = [
    'Beginner friendly',
    'Tactical',
    'Advanced tactics',
    'Uncomfortable but necessary'
  ];

  const readTimes = [
    { value: 'short', label: 'Short (< 5 min)' },
    { value: 'medium', label: 'Medium (5-10 min)' },
    { value: 'long', label: 'Long (> 10 min)' }
  ];

  const updateFilter = (key: keyof FilterOptions, value: string | undefined) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const toggleTag = (tag: string) => {
    const currentTags = filters.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    
    onFiltersChange({
      ...filters,
      tags: newTags.length > 0 ? newTags : undefined
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(filter => 
    filter !== undefined && (Array.isArray(filter) ? filter.length > 0 : true)
  );

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-wrap gap-4">
        <Select value={filters.category || ''} onValueChange={(value) => updateFilter('category', value || undefined)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.difficulty || ''} onValueChange={(value) => updateFilter('difficulty', value || undefined)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Levels</SelectItem>
            {difficulties.map((difficulty) => (
              <SelectItem key={difficulty} value={difficulty}>
                {difficulty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.readTime || ''} onValueChange={(value) => updateFilter('readTime', value || undefined)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Read Time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any Length</SelectItem>
            {readTimes.map((time) => (
              <SelectItem key={time.value} value={time.value}>
                {time.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear Filters
          </Button>
        )}
      </div>

      {availableTags.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">Tags:</p>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <Badge
                key={tag}
                variant={filters.tags?.includes(tag) ? "default" : "outline"}
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleFilters;
