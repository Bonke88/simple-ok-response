
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  Shield,
  Clock,
  User
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
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=240&fit=crop&crop=face",
      category: "CAREER",
      excerpt: "Deep dive into the evolving landscape of product management roles and what it means for your career trajectory."
    },
    {
      title: "A guide to AI prototyping for product managers",
      readTime: "12 min",
      author: "COLIN MATTHEWS",
      publishedDate: "JAN 7",
      link: "/articles/anonymous-saas",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=240&fit=crop&crop=face",
      category: "AI & TECH",
      excerpt: "Learn how to leverage AI tools for rapid prototyping and validation in your product development process."
    },
    {
      title: "How Duolingo reignited user growth",
      readTime: "8 min",
      author: "JORGE MAZAL",
      publishedDate: "FEB 28, 2023",
      link: "/articles/validation-framework",
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=400&h=240&fit=crop&crop=face",
      category: "GROWTH",
      excerpt: "Behind-the-scenes look at the strategies that helped Duolingo achieve massive user engagement."
    },
    {
      title: "Product manager is an unfair role. So work unfairly.",
      readTime: "10 min",
      author: "TAL RAVIV",
      publishedDate: "NOV 12, 2024",
      link: "/articles/energy-management",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=240&fit=crop&crop=face",
      category: "STRATEGY",
      excerpt: "Why traditional approaches to product management fail and how to gain unfair advantages."
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
        {/* Hero Feature Article */}
        <section className="py-8 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="content-container">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left - Enhanced Visual */}
              <div className="order-2 md:order-1">
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 p-8 text-center min-h-[320px] flex flex-col justify-center shadow-2xl">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-black/5"></div>
                  
                  <div className="relative bg-white rounded-2xl p-6 max-w-sm mx-auto shadow-xl border border-orange-100">
                    <div className="flex items-center justify-center mb-4">
                      <div className="relative">
                        <img 
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" 
                          alt="Jon Matthews" 
                          className="w-20 h-20 rounded-full object-cover border-3 border-orange-200 shadow-lg"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">GTM Night Shift</h3>
                    <p className="text-sm text-gray-600 mb-4">With Jon Matthews</p>
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1.5 rounded-full text-sm font-bold border-0">
                      Corporate Engineers
                    </Badge>
                  </div>
                </div>
              </div>
              
              {/* Right - Enhanced Content */}
              <div className="order-1 md:order-2">
                <div className="space-y-4">
                  <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    FEATURED
                  </Badge>
                  
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                    Corporate engineer quits OpenAI, GTM predictions, $100M talent wars, 20% unemployment, and the...
                  </h1>
                  
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Ben Mann on why scaling laws are accelerating, how 20% unemployment is coming, why AI safety creates better products, and what he's teaching his kids about the future of work in an AI-driven world.
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>15 min read</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>Jon Matthews</span>
                    </div>
                    <span className="font-semibold text-gray-700">9 HRS AGO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Most Popular Section - Enhanced Cards */}
        <section className="py-12 bg-white">
          <div className="content-container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Most Popular</h2>
              <Link 
                to="/articles" 
                className="text-gray-600 hover:text-orange-600 font-semibold text-sm transition-colors duration-200 flex items-center gap-1"
              >
                VIEW ALL
                <TrendingUp className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mostPopularArticles.map((article, index) => (
                <div key={index} className="group">
                  <Link to={article.link} className="block">
                    <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md overflow-hidden">
                      {/* Enhanced Image with Overlay */}
                      <div className="relative">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <Badge className="absolute top-3 left-3 bg-white/90 text-gray-800 hover:bg-white border-0 text-xs font-bold">
                          {article.category}
                        </Badge>
                      </div>
                      
                      <CardContent className="p-5">
                        <div className="space-y-3">
                          <h3 className="font-bold text-base text-gray-900 group-hover:text-orange-600 transition-colors leading-tight line-clamp-2 min-h-[48px]">
                            {article.title}
                          </h3>
                          
                          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                            {article.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>{article.readTime}</span>
                            </div>
                            <span className="text-xs font-bold text-gray-700">{article.publishedDate}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Divider */}
        <section className="py-8">
          <div className="content-container">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <div className="bg-white px-6">
                  <div className="flex items-center gap-2 text-gray-400">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Articles - Enhanced 3x3 Grid */}
        <section className="py-12 bg-gray-50">
          <div className="content-container space-y-12">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group">
                <Link to="/articles/ai-startup" className="block">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md overflow-hidden bg-white">
                    <div className="relative">
                      <img 
                        src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop" 
                        alt="AI startup article"
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      <Badge className="absolute top-4 left-4 bg-blue-600 text-white border-0 text-xs font-bold">
                        STARTUP
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2 min-h-[56px]">
                          The AI-native startup: 5 products, 7-figure revenue, 100% AI-written code
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          How one founder built multiple profitable products using only AI tools and no traditional coding.
                        </p>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>12 min</span>
                          </div>
                          <span className="text-xs font-bold text-gray-700">JUL 17</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>

              <div className="group">
                <Link to="/articles/essential-reading" className="block">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md overflow-hidden bg-white">
                    <div className="relative">
                      <img 
                        src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop" 
                        alt="Essential reading article"
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      <Badge className="absolute top-4 left-4 bg-purple-600 text-white border-0 text-xs font-bold">
                        RESOURCES
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-600 transition-colors leading-tight line-clamp-2 min-h-[56px]">
                          Essential reading for product builders—part 1
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          Curated list of must-read books and articles that every product builder should have on their shelf.
                        </p>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>8 min</span>
                          </div>
                          <span className="text-xs font-bold text-gray-700">JUL 15</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>

              <div className="group">
                <Link to="/articles/foundation-sprint" className="block">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md overflow-hidden bg-white">
                    <div className="relative">
                      <img 
                        src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop" 
                        alt="Foundation sprint article"
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      <Badge className="absolute top-4 left-4 bg-green-600 text-white border-0 text-xs font-bold">
                        VALIDATION
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-green-600 transition-colors leading-tight line-clamp-2 min-h-[56px]">
                          Rapidly test and validate any startup idea with the 2-day Foundation Sprint
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          A proven framework to validate your startup idea in just 48 hours before you write a single line of code.
                        </p>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>15 min</span>
                          </div>
                          <span className="text-xs font-bold text-gray-700">JUL 13</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group">
                <Link to="/articles/product-metrics" className="block">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md overflow-hidden bg-white">
                    <div className="relative">
                      <img 
                        src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop" 
                        alt="Product metrics article"
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      <Badge className="absolute top-4 left-4 bg-orange-600 text-white border-0 text-xs font-bold">
                        METRICS
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors leading-tight line-clamp-2 min-h-[56px]">
                          The most important metrics for every type of business
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          Stop tracking vanity metrics. Here are the KPIs that actually matter for different business models.
                        </p>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>10 min</span>
                          </div>
                          <span className="text-xs font-bold text-gray-700">JUL 10</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>

              <div className="group">
                <Link to="/articles/user-research" className="block">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md overflow-hidden bg-white">
                    <div className="relative">
                      <img 
                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop" 
                        alt="User research article"
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      <Badge className="absolute top-4 left-4 bg-indigo-600 text-white border-0 text-xs font-bold">
                        RESEARCH
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors leading-tight line-clamp-2 min-h-[56px]">
                          A comprehensive guide to user research methods
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          From interviews to analytics: the complete toolkit for understanding your users and their needs.
                        </p>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>18 min</span>
                          </div>
                          <span className="text-xs font-bold text-gray-700">JUL 8</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>

              <div className="group">
                <Link to="/articles/growth-loops" className="block">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md overflow-hidden bg-white">
                    <div className="relative">
                      <img 
                        src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop" 
                        alt="Growth loops article"
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      <Badge className="absolute top-4 left-4 bg-pink-600 text-white border-0 text-xs font-bold">
                        GROWTH
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-pink-600 transition-colors leading-tight line-clamp-2 min-h-[56px]">
                          Building sustainable growth loops that scale
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          How to create viral growth mechanisms that compound over time and drive exponential user acquisition.
                        </p>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>14 min</span>
                          </div>
                          <span className="text-xs font-bold text-gray-700">JUL 5</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group">
                <Link to="/articles/pricing-strategy" className="block">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md overflow-hidden bg-white">
                    <div className="relative">
                      <img 
                        src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop" 
                        alt="Pricing strategy article"
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      <Badge className="absolute top-4 left-4 bg-emerald-600 text-white border-0 text-xs font-bold">
                        PRICING
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-emerald-600 transition-colors leading-tight line-clamp-2 min-h-[56px]">
                          The ultimate guide to SaaS pricing strategies
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          From freemium to value-based pricing: choosing the right model for your SaaS business.
                        </p>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>16 min</span>
                          </div>
                          <span className="text-xs font-bold text-gray-700">JUL 3</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>

              <div className="group">
                <Link to="/articles/customer-feedback" className="block">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md overflow-hidden bg-white">
                    <div className="relative">
                      <img 
                        src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop" 
                        alt="Customer feedback article"
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      <Badge className="absolute top-4 left-4 bg-cyan-600 text-white border-0 text-xs font-bold">
                        FEEDBACK
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-cyan-600 transition-colors leading-tight line-clamp-2 min-h-[56px]">
                          How to collect and act on customer feedback effectively
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          Turn customer insights into product improvements with these proven feedback collection strategies.
                        </p>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>11 min</span>
                          </div>
                          <span className="text-xs font-bold text-gray-700">JUL 1</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>

              <div className="group">
                <Link to="/articles/product-roadmap" className="block">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md overflow-hidden bg-white">
                    <div className="relative">
                      <img 
                        src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=200&fit=crop" 
                        alt="Product roadmap article"
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      <Badge className="absolute top-4 left-4 bg-violet-600 text-white border-0 text-xs font-bold">
                        ROADMAP
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-violet-600 transition-colors leading-tight line-clamp-2 min-h-[56px]">
                          Building product roadmaps that actually drive results
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          Stop building features nobody wants. Here's how to create roadmaps that align with business goals.
                        </p>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>13 min</span>
                          </div>
                          <span className="text-xs font-bold text-gray-700">JUN 28</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
