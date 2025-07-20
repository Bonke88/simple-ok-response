
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, CheckSquare, Users, Zap } from 'lucide-react';

const Resources = () => {
  const resources = [
    {
      icon: <CheckSquare className="h-6 w-6" />,
      title: "Side Project Validation Checklist",
      description: "20-point checklist to validate your idea before writing code",
      format: "PDF Checklist",
      pages: "3 pages"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "First Customer Outreach Templates",
      description: "Copy-paste email templates that actually get responses",
      format: "PDF + Text",
      pages: "8 pages"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Energy Management Framework",
      description: "System for optimizing side project work around your day job",
      format: "PDF Guide",
      pages: "12 pages"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Anonymous Launch Playbook",
      description: "Complete guide to launching while employed at a big tech company",
      format: "PDF Guide",
      pages: "15 pages"
    }
  ];

  const handleDownload = (title: string) => {
    // This would trigger actual download in production
    console.log(`Downloading: ${title}`);
  };

  return (
    <div className="py-16">
      <div className="content-container">
        <div className="text-center mb-16">
          <h1 className="mb-6">Free Resources & Guides</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Downloadable templates, checklists, and guides to accelerate your side project journey. 
            All designed for engineers with limited time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {resources.map((resource, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-accent/10 rounded-lg text-accent">
                    {resource.icon}
                  </div>
                </div>
                <CardTitle className="text-xl">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{resource.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">{resource.format}</span>
                  <span className="text-sm text-muted-foreground">{resource.pages}</span>
                </div>
                <Button 
                  onClick={() => handleDownload(resource.title)}
                  className="w-full gtm-button-primary"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Free
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="text-center bg-muted/30 p-12 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Want More Resources?</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Join our newsletter to get new templates, checklists, and tactical guides 
            delivered to your inbox every Tuesday.
          </p>
          <Button className="gtm-button-primary text-lg px-8 py-3">
            Get Weekly Resources
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Resources;
