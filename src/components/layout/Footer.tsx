
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter signup logic will be implemented later
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="border-t bg-muted/30 mt-20">
      <div className="content-container py-16">
        {/* Newsletter Signup */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">
            One GTM tactic every Tuesday. 5 minutes to read.
          </h3>
          
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your.email@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
            <Button type="submit" className="gtm-button-primary">
              Join
            </Button>
          </form>
          
          <p className="text-sm text-muted-foreground mt-3">
            Unsubscribe anytime. Written by engineers who get it.
          </p>
        </div>

        {/* Footer Links */}
        <div className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <div className="mb-4 sm:mb-0">
            © 2024 GTM Night Shift. Built for engineers, by engineers.
          </div>
          
          <div className="flex space-x-6">
            <a href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="/rss" className="hover:text-foreground transition-colors">
              RSS
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
