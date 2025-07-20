
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { searchArticles, Article } from '@/lib/content';
import { useNavigate } from 'react-router-dom';

interface CommandSearchProps {
  className?: string;
}

const CommandSearch = ({ className = "" }: CommandSearchProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchArticles(query);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = (article: Article) => {
    setOpen(false);
    setQuery('');
    navigate(article.slug);
  };

  return (
    <>
      <Button
        variant="outline"
        className={`relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2 ${className}`}
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 xl:mr-2" />
        <span className="hidden xl:inline-flex">Search articles...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search articles..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>No articles found.</CommandEmpty>
          {results.length > 0 && (
            <CommandGroup heading="Articles">
              {results.slice(0, 8).map((article) => (
                <CommandItem
                  key={article.slug}
                  value={article.title}
                  onSelect={() => handleSelect(article)}
                  className="cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{article.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {article.category}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CommandSearch;
