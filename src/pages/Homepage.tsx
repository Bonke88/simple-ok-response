
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
  const mostPopularArticles = [
    {
      title: "State of the product job market in 2025",
      readTime: "15 min",
      author: "LENNY RACHITSKY",
      publishedDate: "MAY 13",
      link: "/articles/fatal-flaw",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&h=80&fit=crop"
    },
    {
      title: "A guide to AI prototyping for product managers",
      readTime: "12 min",
      author: "COLIN MATTHEWS",
      publishedDate: "JAN 7",
      link: "/articles/anonymous-saas",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=80&h=80&fit=crop"
    },
    {
      title: "How Duolingo reignited user growth",
      readTime: "8 min",
      author: "JORGE MAZAL",
      publishedDate: "FEB 28, 2023",
      link: "/articles/validation-framework",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=80&h=80&fit=crop"
    },
    {
      title: "Product manager is an unfair role. So work unfairly.",
      readTime: "10 min",
      author: "TAL RAVIV",
      publishedDate: "NOV 12, 2024",
      link: "/articles/energy-management",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=80&h=80&fit=crop"
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
      
      <div className="space-y-1">
        {/* Featured Article Section - Lenny Style */}
        <section className="py-8">
          <div className="content-container">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left - Image */}
              <div className="order-2 md:order-1">
                <div className="rounded-xl overflow-hidden bg-gray-100 p-8 text-center min-h-[280px] flex flex-col justify-center">
                  <div className="bg-white rounded-lg p-6 max-w-sm mx-auto shadow-sm">
                    <div className="flex items-center justify-center mb-4">
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" 
                        alt="Host" 
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-black mb-2">GTM Night Shift</h3>
                    <p className="text-sm text-gray-600 mb-3">With Jon Matthews</p>
                    <div className="bg-black text-white px-3 py-1.5 rounded-full text-sm font-semibold">
                      Corporate Engineers
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right - Content */}
              <div className="order-1 md:order-2">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                  Corporate engineer quits OpenAI, GTM predictions, $100M talent wars, 20% unemployment, and the...
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
                  Ben Mann on why scaling laws are accelerating, how 20% unemployment is coming, why AI safety creates better products, and what he's teaching his kids about the future of work in an AI-driven world.
                </p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="text-lg">🔒</span>
                  <span className="font-semibold">9 HRS AGO</span>
                  <span>•</span>
                  <span className="font-semibold">LENNY RACHITSKY</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Most Popular Section - Lenny Style */}
        <section className="py-2">
          <div className="content-container">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Most Popular</h2>
              <Link 
                to="/articles" 
                className="text-muted-foreground hover:text-foreground font-semibold text-sm"
              >
                VIEW ALL
              </Link>
            </div>
            
            <div className="space-y-4">
              {mostPopularArticles.map((article, index) => (
                <div key={index} className="group border-b border-border pb-4 last:border-b-0">
                  <Link to={article.link} className="flex items-start gap-4 hover:bg-muted/30 p-3 rounded-lg transition-colors">
                    <div className="flex-shrink-0">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors leading-tight">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="text-base">🔒</span>
                        <span className="font-semibold">{article.publishedDate}</span>
                        <span>•</span>
                        <span className="font-semibold">{article.author}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Homepage;
