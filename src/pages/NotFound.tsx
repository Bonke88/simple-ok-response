
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const NotFound = () => {
  return (
    <div className="py-16">
      <div className="content-container">
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardContent className="pt-12 pb-12">
              <div className="text-6xl mb-6">🤔</div>
              <h1 className="mb-4">Page Not Found</h1>
              <p className="text-muted-foreground mb-8">
                The page you're looking for doesn't exist. Maybe it moved, or maybe you're trying to access 
                content that hasn't been created yet.
              </p>
              <div className="space-x-4">
                <Button asChild className="gtm-button-primary">
                  <Link to="/">Go Home</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/start">Start Here</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
