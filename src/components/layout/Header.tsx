
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CommandSearch from '@/components/search/CommandSearch';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isArticlesOpen, setIsArticlesOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const articleCategories = [
    { name: 'Picking Winners', path: '/articles/picking-winners' },
    { name: 'Ship It', path: '/articles/ship-it' },
    { name: 'First Customers', path: '/articles/first-customers' },
    { name: 'Scale', path: '/articles/scale' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="content-container">
        {/* First Row - Logo, Tagline, Search and Subscribe Button */}
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Left Side - Mobile Menu + Search */}
          <div className="flex items-center gap-2">
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="md:hidden">
              <CommandSearch />
            </div>
          </div>

          {/* Center Logo */}
          <div className="flex flex-col items-center flex-1 max-w-4xl mx-auto">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/3222aa60-bd38-45b5-894f-28240705ed60.png" 
                alt="GTMjon" 
                className="h-24 w-auto"
              />
            </Link>
          </div>

          {/* Right Side - Search and Subscribe */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <CommandSearch />
            </div>
            <Button 
              asChild 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 md:px-6 rounded-full font-semibold text-sm whitespace-nowrap"
            >
              <Link to="/newsletter">Subscribe</Link>
            </Button>
          </div>
        </div>

        {/* Tagline Row - Centered beneath logo */}
        <div className="flex justify-center pb-3">
          <p className="text-muted-foreground italic font-bold text-xs md:text-sm text-center max-w-2xl px-2">
            Where engineers at corporates get practical sales and marketing advice for their SaaS side hustle
          </p>
        </div>

        {/* Second Row - Navigation */}
        <div className="hidden md:flex h-12 items-center justify-center border-t border-border/50">
          <nav className="flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary border-b-2 border-primary pb-1' : 'text-foreground'
              }`}
            >
              Home
            </Link>

            {/* Articles Dropdown */}
            <div className="relative">
              <button
                className={`flex items-center font-medium transition-colors hover:text-primary ${
                  location.pathname.startsWith('/articles') ? 'text-primary border-b-2 border-primary pb-1' : 'text-foreground'
                }`}
                onMouseEnter={() => setIsArticlesOpen(true)}
                onMouseLeave={() => setIsArticlesOpen(false)}
              >
                Articles
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              {isArticlesOpen && (
                <div 
                  className="absolute top-full left-0 mt-1 w-48 bg-background border rounded-lg shadow-lg py-2 z-50"
                  onMouseEnter={() => setIsArticlesOpen(true)}
                  onMouseLeave={() => setIsArticlesOpen(false)}
                >
                  {articleCategories.map((category) => (
                    <Link
                      key={category.path}
                      to={category.path}
                      className="block px-4 py-2 text-sm hover:bg-muted transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link 
              to="/tools" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive('/tools') ? 'text-primary border-b-2 border-primary pb-1' : 'text-foreground'
              }`}
            >
              Free Tools
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-4">
            <Link 
              to="/" 
              className="block py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            <div className="space-y-2">
              <div className="font-medium text-muted-foreground text-sm">Articles</div>
              {articleCategories.map((category) => (
                <Link
                  key={category.path}
                  to={category.path}
                  className="block py-1 pl-4 text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <Link 
              to="/tools" 
              className="block py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Free Tools
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
