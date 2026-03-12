import React from 'react'
import { Toaster } from "./components/ui/toaster"
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';

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
    <Router>
      <Routes>
        {/* Начална страница */}
        <Route path="/" element={
          <LayoutWrapper currentPageName={mainPageKey}>
            <MainPage />
          </LayoutWrapper>
        } />

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
    </Router>
  );
}

export default App;
