import React from 'react'
import { Toaster } from "./components/ui/toaster"
import { Toaster as SonnerToaster } from "sonner"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from './lib/query-client'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from './lib/AuthContext';
import NavigationTracker from './lib/NavigationTracker';
import CourseDetail from './pages/CourseDetail';

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = Pages[mainPageKey] || (() => <></>);

const LayoutWrapper = ({ children, currentPageName }) => {
  return Layout ? 
    <Layout currentPageName={currentPageName}>{children}</Layout> 
    : <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <NavigationTracker />
          <Routes>
            {/* Начална страница */}
            <Route path="/" element={
              <LayoutWrapper currentPageName={mainPageKey}>
                <MainPage />
              </LayoutWrapper>
            } />

            {/* Canonical auth path (lowercase) */}
            {Pages.Auth && (
              <Route
                path="/auth"
                element={
                  <LayoutWrapper currentPageName="Auth">
                    <Pages.Auth />
                  </LayoutWrapper>
                }
              />
            )}

            <Route
              path="/courses/:slug"
              element={
                <LayoutWrapper currentPageName="Courses">
                  <CourseDetail />
                </LayoutWrapper>
              }
            />

            {/* Всички останали страници от твоя сайт */}
            {Object.entries(Pages).map(([path, Page]) => (
              <Route
                key={path}
                path={`/${path}`}
                element={
                  <LayoutWrapper currentPageName={path}>
                    <Page />
                  </LayoutWrapper>
                }
              />
            ))}

            {/* Страница за грешка 404 */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Toaster />
          <SonnerToaster position="top-center" />
          <Analytics />
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
