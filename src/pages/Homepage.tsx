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
                <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-orange-400 to-red-500 p-6 text-center min-h-[288px] flex flex-col justify-center">
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
              <div className="order-1 md:order-2 w-[91%] ml-16">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-3 leading-tight">
                  Corporate engineer quits OpenAI, GTM predictions, $100M talent wars, 20% unemployment, and the...
                </h1>
                <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
                  Ben Mann on why scaling laws are accelerating, how 20% unemployment is coming, why AI safety creates better products, and what he's teaching his kids about the future of work in an AI-driven world.
                </p>
                <div className="flex items-center justify-center text-xs text-muted-foreground">
                  <span className="font-bold">9 HRS AGO</span>
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
                  <Link to={article.link} className="block hover:bg-muted/20 p-2 rounded-lg transition-colors h-full">
                    <div className="flex flex-col h-full">
                      <div className="mb-2">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col flex-grow">
                        <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors leading-tight line-clamp-3 flex-grow">
                          {article.title}
                        </h3>
                        <div className="flex items-center justify-center text-xs text-muted-foreground mt-auto">
                          <span className="font-bold">{article.publishedDate}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Light Divider */}
        <section className="py-6">
          <div className="content-container">
            <div className="w-full h-px bg-border"></div>
          </div>
        </section>

        {/* Additional Articles - 3 rows of 3 cards */}
        <section className="py-0">
          <div className="content-container space-y-8">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="group">
                <Link to="/articles/ai-startup" className="block hover:bg-muted/20 p-2 rounded-lg transition-colors h-full">
                  <div className="flex flex-col h-full">
                    <div className="mb-2">
                      <img 
                        src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop" 
                        alt="AI startup article"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors leading-tight line-clamp-3 flex-grow">
                        The AI-native startup: 5 products, 7-figure revenue, 100% AI-written code
                      </h3>
                      <div className="flex items-center justify-center text-xs text-muted-foreground mt-auto">
                        <span className="font-bold">JUL 17</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="group">
                <Link to="/articles/essential-reading" className="block hover:bg-muted/20 p-2 rounded-lg transition-colors h-full">
                  <div className="flex flex-col h-full">
                    <div className="mb-2">
                      <img 
                        src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop" 
                        alt="Essential reading article"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors leading-tight line-clamp-3 flex-grow">
                        Essential reading for product builders—part 1
                      </h3>
                      <div className="flex items-center justify-center text-xs text-muted-foreground mt-auto">
                        <span className="font-bold">JUL 15</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="group">
                <Link to="/articles/foundation-sprint" className="block hover:bg-muted/20 p-2 rounded-lg transition-colors h-full">
                  <div className="flex flex-col h-full">
                    <div className="mb-2">
                      <img 
                        src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop" 
                        alt="Foundation sprint article"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors leading-tight line-clamp-3 flex-grow">
                        Rapidly test and validate any startup idea with the 2-day Foundation Sprint
                      </h3>
                      <div className="flex items-center justify-center text-xs text-muted-foreground mt-auto">
                        <span className="font-bold">JUL 13</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="group">
                <Link to="/articles/product-metrics" className="block hover:bg-muted/20 p-2 rounded-lg transition-colors h-full">
                  <div className="flex flex-col h-full">
                    <div className="mb-2">
                      <img 
                        src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop" 
                        alt="Product metrics article"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors leading-tight line-clamp-3 flex-grow">
                        The most important metrics for every type of business
                      </h3>
                      <div className="flex items-center justify-center text-xs text-muted-foreground mt-auto">
                        <span className="font-bold">JUL 10</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="group">
                <Link to="/articles/user-research" className="block hover:bg-muted/20 p-2 rounded-lg transition-colors h-full">
                  <div className="flex flex-col h-full">
                    <div className="mb-2">
                      <img 
                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop" 
                        alt="User research article"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors leading-tight line-clamp-3 flex-grow">
                        A comprehensive guide to user research methods
                      </h3>
                      <div className="flex items-center justify-center text-xs text-muted-foreground mt-auto">
                        <span className="font-bold">JUL 8</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="group">
                <Link to="/articles/growth-loops" className="block hover:bg-muted/20 p-2 rounded-lg transition-colors h-full">
                  <div className="flex flex-col h-full">
                    <div className="mb-2">
                      <img 
                        src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop" 
                        alt="Growth loops article"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors leading-tight line-clamp-3 flex-grow">
                        Building sustainable growth loops that scale
                      </h3>
                      <div className="flex items-center justify-center text-xs text-muted-foreground mt-auto">
                        <span className="font-bold">JUL 5</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="group">
                <Link to="/articles/pricing-strategy" className="block hover:bg-muted/20 p-2 rounded-lg transition-colors h-full">
                  <div className="flex flex-col h-full">
                    <div className="mb-2">
                      <img 
                        src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop" 
                        alt="Pricing strategy article"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors leading-tight line-clamp-3 flex-grow">
                        The ultimate guide to SaaS pricing strategies
                      </h3>
                      <div className="flex items-center justify-center text-xs text-muted-foreground mt-auto">
                        <span className="font-bold">JUL 3</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="group">
                <Link to="/articles/customer-feedback" className="block hover:bg-muted/20 p-2 rounded-lg transition-colors h-full">
                  <div className="flex flex-col h-full">
                    <div className="mb-2">
                      <img 
                        src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop" 
                        alt="Customer feedback article"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors leading-tight line-clamp-3 flex-grow">
                        How to collect and act on customer feedback effectively
                      </h3>
                      <div className="flex items-center justify-center text-xs text-muted-foreground mt-auto">
                        <span className="font-bold">JUL 1</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="group">
                <Link to="/articles/product-roadmap" className="block hover:bg-muted/20 p-2 rounded-lg transition-colors h-full">
                  <div className="flex flex-col h-full">
                    <div className="mb-2">
                      <img 
                        src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=200&fit=crop" 
                        alt="Product roadmap article"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors leading-tight line-clamp-3 flex-grow">
                        Building product roadmaps that actually drive results
                      </h3>
                      <div className="flex items-center justify-center text-xs text-muted-foreground mt-auto">
                        <span className="font-bold">JUN 28</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Homepage;
