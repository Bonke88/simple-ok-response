
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import Layout from "./components/layout/Layout";
import Homepage from "./pages/Homepage";
import StartHere from "./pages/StartHere";
import About from "./pages/About";
import Tools from "./pages/Tools";
import Resources from "./pages/Resources";
import Newsletter from "./pages/Newsletter";
import ArticleCategory from "./pages/ArticleCategory";
import Article from "./pages/Article";
import Tool from "./pages/Tool";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AnalyticsProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/start" element={<StartHere />} />
              <Route path="/about" element={<About />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/tools/:toolSlug" element={<Tool />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/newsletter" element={<Newsletter />} />
              <Route path="/articles/:category" element={<ArticleCategory />} />
              <Route path="/articles/:category/:slug" element={<Article />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </AnalyticsProvider>
  </QueryClientProvider>
);

export default App;
