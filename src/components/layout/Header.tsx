
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
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="content-container">
        <div className="flex h-16 items-center justify-between">
          {/* Left Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/3222aa60-bd38-45b5-894f-28240705ed60.png" 
              alt="GTMjon" 
              className="h-16 w-auto"
            />
          </Link>

          {/* Right Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
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

            <Button 
              asChild 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-full font-semibold"
            >
              <Link to="/newsletter">Subscribe</Link>
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

            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground w-full rounded-full">
              <Link to="/newsletter" onClick={() => setIsMenuOpen(false)}>
                Subscribe
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
