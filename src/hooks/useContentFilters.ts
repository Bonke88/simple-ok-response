
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ContentAPI, ContentFilters } from '@/lib/api/content';

export const useContentFilters = (initialFilters: ContentFilters = {}) => {
  const [filters, setFilters] = useState<ContentFilters>(initialFilters);
  const [debouncedSearch, setDebouncedSearch] = useState(filters.searchQuery || '');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.searchQuery || '');
    }, 300);

    return () => clearTimeout(timer);
  }, [filters.searchQuery]);

  const { data: articles, isLoading, error } = useQuery({
    queryKey: ['filtered-articles', { ...filters, searchQuery: debouncedSearch }],
    queryFn: () => ContentAPI.getArticles({ ...filters, searchQuery: debouncedSearch }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const updateFilter = (key: keyof ContentFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      offset: 0 // Reset pagination when filters change
    }));
  };

  const toggleTag = (tag: string) => {
    setFilters(prev => {
      const currentTags = prev.tags || [];
      const newTags = currentTags.includes(tag)
        ? currentTags.filter(t => t !== tag)
        : [...currentTags, tag];
      
      return {
        ...prev,
        tags: newTags,
        offset: 0
      };
    });
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const loadMore = () => {
    if (articles?.pagination.hasMore) {
      setFilters(prev => ({
        ...prev,
        offset: (prev.offset || 0) + (prev.limit || 10)
      }));
    }
  };

  return {
    filters,
    articles: articles?.data || [],
    pagination: articles?.pagination,
    isLoading,
    error,
    updateFilter,
    toggleTag,
    resetFilters,
    loadMore
  };
};
