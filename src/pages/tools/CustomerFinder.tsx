
import React from 'react';
import { SEO } from '@/components/seo/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CustomerFinder = () => {
  return (
    <>
      <SEO 
        title="Customer Finder Tool - Find Your First Customers"
        description="Discover where your potential customers hang out online and how to reach them effectively."
        canonical="/tools/customer-finder"
      />
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Customer Finder Tool</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Coming soon - This tool will help you find and reach your first customers.</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CustomerFinder;
