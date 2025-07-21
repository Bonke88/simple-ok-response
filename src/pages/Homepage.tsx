
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
import PodcastCard from '@/components/cards/PodcastCard';

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

        {/* Additional Articles - Using PodcastCard Component */}
        <section className="py-12 bg-gray-50">
          <div className="content-container space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
              {/* AI-native startup card using PodcastCard */}
              <PodcastCard
                guestPhoto="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
                guestName="Dan Shipper"
                episodeTitle="The AI-native startup: 5 products, 7-figure revenue, 100% AI-written code"
                episodeBlurb="Inside a 15-person company where AI agents do most of the work, how they're building multiple products simultaneously, and what this means for the future of software development."
                episodeDate="JUL 17"
                authorName="LENNY RACHITSKY"
                category="AI & TECH"
                onClick={() => window.location.href = '/articles/ai-startup'}
              />

              {/* Essential reading card using PodcastCard */}
              <PodcastCard
                guestPhoto="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
                guestName="Essential Reading"
                episodeTitle="Essential reading for product builders—part 1"
                episodeBlurb="7 timeless essays you likely haven't read but definitely should. These foundational pieces will change how you think about building products."
                episodeDate="JUL 15"
                authorName="LENNY RACHITSKY"
                category="READING"
                onClick={() => window.location.href = '/articles/essential-reading'}
              />

              {/* Foundation Sprint card using PodcastCard */}
              <PodcastCard
                guestPhoto="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face"
                guestName="Jake Knapp & John Zeratsky"
                episodeTitle="Rapidly test and validate any startup idea with the 2-day Foundation Sprint"
                episodeBlurb="Inside the Foundation Sprint—a recipe to validate any startup idea in 48 hours, before you build anything."
                episodeDate="JUL 13"
                authorName="LENNY RACHITSKY"
                category="VALIDATION"
                onClick={() => window.location.href = '/articles/foundation-sprint'}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Homepage;
