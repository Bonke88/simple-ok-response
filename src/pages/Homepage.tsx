
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
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
    },
    {
      title: "A guide to AI prototyping for product managers",
      readTime: "12 min",
      author: "COLIN MATTHEWS",
      publishedDate: "JAN 7",
      link: "/articles/anonymous-saas",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
    },
    {
      title: "How Duolingo reignited user growth",
      readTime: "8 min",
      author: "JORGE MAZAL",
      publishedDate: "FEB 28, 2023",
      link: "/articles/validation-framework",
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=60&h=60&fit=crop&crop=face"
    },
    {
      title: "Product manager is an unfair role. So work unfairly.",
      readTime: "10 min",
      author: "TAL RAVIV",
      publishedDate: "NOV 12, 2024",
      link: "/articles/energy-management",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face"
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
      
      <div className="space-y-0">
        {/* Featured Article Section - Compressed Layout */}
        <section className="py-3">
          <div className="content-container">
            <div className="grid md:grid-cols-2 gap-4 items-center">
              {/* Left - Image */}
              <div className="order-2 md:order-1">
                <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-orange-400 to-red-500 p-6 text-center min-h-[240px] flex flex-col justify-center">
                  <div className="bg-white rounded-xl p-4 max-w-sm mx-auto shadow-lg">
                    <div className="flex items-center justify-center mb-3">
                      <img 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face" 
                        alt="Jon Matthews" 
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-black mb-2">GTM Night Shift</h3>
                    <p className="text-sm text-gray-600 mb-3">With Jon Matthews</p>
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-sm font-bold">
                      Corporate Engineers
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right - Content */}
              <div className="order-1 md:order-2 w-[84%] ml-16">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-3 leading-tight">
                  Corporate engineer quits OpenAI, GTM predictions, $100M talent wars, 20% unemployment, and the...
                </h1>
                <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
                  Ben Mann on why scaling laws are accelerating, how 20% unemployment is coming, why AI safety creates better products, and what he's teaching his kids about the future of work in an AI-driven world.
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="text-lg">🔒</span>
                  <span className="font-bold">9 HRS AGO</span>
                  <span>•</span>
                  <span className="font-bold">LENNY RACHITSKY</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Most Popular Section - Horizontal Grid Layout */}
        <section className="py-0">
          <div className="content-container">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold">Most Popular</h2>
              <Link 
                to="/articles" 
                className="text-muted-foreground hover:text-foreground font-bold text-sm"
              >
                VIEW ALL
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mostPopularArticles.map((article, index) => (
                <div key={index} className="group">
                  <Link to={article.link} className="block hover:bg-muted/20 p-2 rounded-lg transition-colors">
                    <div className="mb-2">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors leading-tight line-clamp-3">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span className="text-sm">🔒</span>
                        <span className="font-bold">{article.publishedDate}</span>
                        <span>•</span>
                        <span className="font-bold">{article.author}</span>
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
