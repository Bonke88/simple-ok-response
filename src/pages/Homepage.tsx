
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  Rocket, 
  Users, 
  BarChart3,
  Calculator,
  CheckSquare,
  Calendar,
  Zap,
  Search,
  Shield
} from 'lucide-react';

const Homepage = () => {
  const contentPillars = [
    {
      icon: <TrendingUp className="h-8 w-8 text-accent" />,
      title: "Pick Winners, Not Just Cool Tech",
      description: "Choose projects that can actually find paying customers",
      articleCount: 12,
      link: "/articles/picking-winners"
    },
    {
      icon: <Rocket className="h-8 w-8 text-accent" />,
      title: "Ship It (Breaking the 80% Trap)",
      description: "Stop perfecting and start selling your side project",
      articleCount: 8,
      link: "/articles/ship-it"
    },
    {
      icon: <Users className="h-8 w-8 text-accent" />,
      title: "First Customers (0 to $1K MRR)",
      description: "Find and convert your first paying customers",
      articleCount: 15,
      link: "/articles/first-customers"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-accent" />,
      title: "Scale Without Burnout",
      description: "Grow to $10K MRR while keeping your day job",
      articleCount: 10,
      link: "/articles/scale"
    }
  ];

  const latestArticles = [
    {
      title: "The Fatal Flaw: Why 99% of Side Projects Make $0",
      readTime: "15 min",
      difficulty: "Uncomfortable but necessary",
      category: "Picking Winners",
      publishedDate: "3 days ago",
      link: "/articles/fatal-flaw"
    },
    {
      title: "Anonymous SaaS: How to Launch Without Your Boss Knowing",
      readTime: "12 min",
      difficulty: "Advanced tactics",
      category: "Ship It",
      publishedDate: "1 week ago",
      link: "/articles/anonymous-saas"
    },
    {
      title: "The $1K Validation Framework for Busy Engineers",
      readTime: "8 min",
      difficulty: "Beginner friendly",
      category: "First Customers",
      publishedDate: "2 weeks ago",
      link: "/articles/validation-framework"
    },
    {
      title: "Energy Management: Code at 6am or Market at 11pm?",
      readTime: "10 min",
      difficulty: "Tactical",
      category: "Scale",
      publishedDate: "3 weeks ago",
      link: "/articles/energy-management"
    }
  ];

  const tools = [
    {
      icon: <Calculator className="h-6 w-6" />,
      name: "Project Viability Scorer",
      description: "Score your side project idea's market potential"
    },
    {
      icon: <CheckSquare className="h-6 w-6" />,
      name: "Will I Ever Launch? Diagnostic",
      description: "Honest assessment of your launch probability"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      name: "This Week's Customer Plan",
      description: "3 prioritized customer acquisition tasks"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      name: "Energy-Reality Scheduler",
      description: "Match tasks to your energy patterns"
    },
    {
      icon: <Search className="h-6 w-6" />,
      name: "First Customer Finder",
      description: "Where to find your ideal early customers"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      name: "Anonymous Launch Checklist",
      description: "Launch safely without corporate conflicts"
    }
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="content-container text-center">
          <h1 className="mb-6">
            GTM advice for corporate engineers building SaaS late at night
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Practical sales & marketing tactics for your 10 hours a week. 
            No fluff, just what works when the kids are asleep.
          </p>
          <p className="text-sm text-muted-foreground">
            Read by 12,000+ engineers at Google, Meta, Microsoft, and more
          </p>
        </div>
      </section>

      {/* Content Pillars */}
      <section>
        <div className="content-container">
          <div className="grid md:grid-cols-2 gap-8">
            {contentPillars.map((pillar, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    {pillar.icon}
                  </div>
                  <CardTitle className="text-xl">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{pillar.description}</p>
                  <Link 
                    to={pillar.link}
                    className="text-accent font-medium hover:underline"
                  >
                    {pillar.articleCount} articles →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section>
        <div className="content-container">
          <h2 className="mb-8">Recent Guides</h2>
          <div className="space-y-6">
            {latestArticles.map((article, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col space-y-3">
                    <Link to={article.link}>
                      <h3 className="text-xl font-semibold hover:text-accent transition-colors">
                        {article.title}
                      </h3>
                    </Link>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span>🕐 {article.readTime}</span>
                      <span>💪 {article.difficulty}</span>
                      <span>📁 {article.category}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Published {article.publishedDate}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              to="/articles" 
              className="text-accent font-medium hover:underline text-lg"
            >
              View all articles →
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Preview */}
      <section>
        <div className="content-container">
          <h2 className="mb-8">Tools That Save Your Weekends</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      {tool.icon}
                    </div>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{tool.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              to="/tools" 
              className="text-accent font-medium hover:underline text-lg"
            >
              Try all tools →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
