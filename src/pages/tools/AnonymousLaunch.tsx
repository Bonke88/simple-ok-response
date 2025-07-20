
import React from 'react';
import SEO from '@/components/seo/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AnonymousLaunch = () => {
  return (
    <>
      <SEO 
        title="Anonymous Launch Checklist - Launch Without Personal Branding"
        description="Step-by-step guide to launching your side project without using your personal brand or network."
        url="/tools/anonymous-launch"
      />
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Anonymous Launch Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Coming soon - This tool will provide a step-by-step checklist for launching anonymously.</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AnonymousLaunch;
