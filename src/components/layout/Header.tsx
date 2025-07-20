
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="content-container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded" />
            <span className="font-bold text-xl">GTM Night Shift</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/start" 
              className={`font-medium transition-colors hover:text-accent ${
                isActive('/start') ? 'text-accent' : 'text-foreground'
              }`}
            >
              Start Here
            </Link>

            {/* Articles Dropdown */}
            <div className="relative">
              <button
                className={`flex items-center font-medium transition-colors hover:text-accent ${
                  location.pathname.startsWith('/articles') ? 'text-accent' : 'text-foreground'
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
              className={`font-medium transition-colors hover:text-accent ${
                isActive('/tools') ? 'text-accent' : 'text-foreground'
              }`}
            >
              Tools
            </Link>

            <Link 
              to="/resources" 
              className={`font-medium transition-colors hover:text-accent ${
                isActive('/resources') ? 'text-accent' : 'text-foreground'
              }`}
            >
              Resources
            </Link>

            <Link 
              to="/about" 
              className={`font-medium transition-colors hover:text-accent ${
                isActive('/about') ? 'text-accent' : 'text-foreground'
              }`}
            >
              About
            </Link>

            <Button asChild className="gtm-button-primary">
              <Link to="/newsletter">Newsletter</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-4">
            <Link 
              to="/start" 
              className="block py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Start Here
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
              Tools
            </Link>

            <Link 
              to="/resources" 
              className="block py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </Link>

            <Link 
              to="/about" 
              className="block py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>

            <Button asChild className="gtm-button-primary w-full">
              <Link to="/newsletter" onClick={() => setIsMenuOpen(false)}>
                Newsletter
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
