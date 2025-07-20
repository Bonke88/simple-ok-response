import { Suspense, lazy } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';
import './App.css';

const Homepage = lazy(() => import('@/pages/Homepage'));
const Article = lazy(() => import('@/pages/Article'));
const ArticleCategory = lazy(() => import('@/pages/ArticleCategory'));
const Newsletter = lazy(() => import('@/pages/Newsletter'));
const Tools = lazy(() => import('@/pages/Tools'));
const About = lazy(() => import('@/pages/About'));
const StartHere = lazy(() => import('@/pages/StartHere'));
const ProjectScorer = lazy(() => import('@/pages/tools/ProjectScorer'));
const CustomerFinder = lazy(() => import('@/pages/tools/CustomerFinder'));
const LaunchDiagnostic = lazy(() => import('@/pages/tools/LaunchDiagnostic'));
const AnonymousLaunch = lazy(() => import('@/pages/tools/AnonymousLaunch'));

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AnalyticsProvider>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <Layout>
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/articles/:category/:slug" element={<Article />} />
                    <Route path="/articles/:category" element={<ArticleCategory />} />
                    <Route path="/newsletter" element={<Newsletter />} />
                    <Route path="/tools" element={<Tools />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/start" element={<StartHere />} />
                    <Route path="/tools/project-scorer" element={<ProjectScorer />} />
                    <Route path="/tools/customer-finder" element={<CustomerFinder />} />
                    <Route path="/tools/launch-diagnostic" element={<LaunchDiagnostic />} />
                    <Route path="/tools/anonymous-launch" element={<AnonymousLaunch />} />
                  </Routes>
                </Suspense>
              </Layout>
            </BrowserRouter>
          </TooltipProvider>
        </AnalyticsProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
