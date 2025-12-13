
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Router } from './Router';
import { ScrollToTop } from './components/ScrollToTop';
import { ToastProvider } from './components/ToastProvider';
import { ErrorBoundary } from './components/ErrorBoundary';

const App: React.FC = () => {
  return (
    // Using HashRouter for compatibility with static file hosting/preview environments
    <HashRouter>
      <ErrorBoundary>
        <ToastProvider>
          <ScrollToTop />
          <Router />
        </ToastProvider>
      </ErrorBoundary>
    </HashRouter>
  );
};

export default App;
