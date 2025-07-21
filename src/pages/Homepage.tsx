
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
import SEO from '@/components/seo/SEO';

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

  const mostPopularArticles = [
    {
      title: "State of the product job market in 2025",
      readTime: "15 min",
      author: "LENNY RACHITSKY",
      publishedDate: "MAY 13",
      link: "/articles/fatal-flaw",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop"
    },
    {
      title: "A guide to AI prototyping for product managers",
      readTime: "12 min",
      author: "COLIN MATTHEWS",
      publishedDate: "JAN 7",
      link: "/articles/anonymous-saas",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop"
    },
    {
      title: "How Duolingo reignited user growth",
      readTime: "8 min",
      author: "JORGE MAZAL",
      publishedDate: "FEB 28, 2023",
      link: "/articles/validation-framework",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop"
    },
    {
      title: "Product manager is an unfair role. So work unfairly.",
      readTime: "10 min",
      author: "TAL RAVIV",
      publishedDate: "NOV 12, 2024",
      link: "/articles/energy-management",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop"
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
    <>
      <SEO
        title="GTM Night Shift - Go-to-Market Advice for Corporate Engineers"
        description="Practical sales & marketing tactics for engineers building SaaS side projects. Learn to validate ideas, find customers, and scale without burnout."
        keywords={['go-to-market', 'side projects', 'engineers', 'SaaS', 'marketing', 'sales', 'validation', 'startup']}
        url="/"
        type="website"
      />
      
      <div className="space-y-6">
        {/* Featured Article Section - Ultra Compact */}
        <section className="py-0">
          <div className="content-container">
            <div className="grid md:grid-cols-2 gap-4 items-center">
              {/* Left - Image */}
              <div className="order-2 md:order-1">
                <div className="rounded-lg overflow-hidden bg-gradient-to-br from-orange-300 to-orange-500 p-4 text-center min-h-[160px] flex flex-col justify-center">
                  <div className="bg-white rounded-lg p-3 max-w-xs mx-auto">
                    <h3 className="text-sm font-bold text-black mb-1">GTM Night Shift</h3>
                    <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-2"></div>
                    <div className="bg-black text-white px-2 py-1 rounded text-xs font-bold">
                      Corporate Engineers
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right - Content */}
              <div className="order-1 md:order-2">
                <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2 leading-tight">
                  Corporate engineer quits OpenAI, GTM predictions, $100M talent wars, 20% unemployment, and the...
                </h1>
                <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                  Ben Mann on why scaling laws are accelerating, how 20% unemployment is coming, why AI safety creates better products, and what he's teaching his kids...
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>🔒</span>
                  <span>9 HRS AGO</span>
                  <span>•</span>
                  <span>LENNY RACHITSKY</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Most Popular Section - Compact */}
        <section>
          <div className="content-container">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold">Most Popular</h2>
              <Link 
                to="/articles" 
                className="text-muted-foreground hover:text-foreground font-medium text-sm"
              >
                VIEW ALL
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
              {mostPopularArticles.map((article, index) => (
                <div key={index} className="group">
                  <Link to={article.link}>
                    <div className="mb-2 overflow-hidden rounded-lg">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors leading-tight">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span>🔒</span>
                      <span>{article.publishedDate}</span>
                      <span>•</span>
                      <span>{article.author}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content Pillars */}
        <section>
          <div className="content-container">
            <h2 className="mb-6 text-xl font-bold">Core GTM Areas</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {contentPillars.map((pillar, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3 mb-2">
                      {pillar.icon}
                    </div>
                    <CardTitle className="text-lg">{pillar.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground mb-3 text-sm">{pillar.description}</p>
                    <Link 
                      to={pillar.link}
                      className="text-accent font-medium hover:underline text-sm"
                    >
                      {pillar.articleCount} articles →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Preview */}
        <section>
          <div className="content-container">
            <h2 className="mb-6 text-xl font-bold">Tools That Save Your Weekends</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        {tool.icon}
                      </div>
                      <CardTitle className="text-base">{tool.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground text-xs">{tool.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link 
                to="/tools" 
                className="text-accent font-medium hover:underline text-base"
              >
                Try all tools →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Homepage;
