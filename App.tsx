import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Router } from './Router';
import { ScrollToTop } from './components/ScrollToTop';
import { ToastProvider } from './components/ToastProvider';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AuthProvider } from './contexts/AuthContext';
import { BrandAestheticProvider } from './components/brand/BrandAestheticProvider';

const App: React.FC = () => {
  return (
    <HashRouter>
      <ErrorBoundary>
        <AuthProvider>
          <ToastProvider>
            <BrandAestheticProvider>
              <ScrollToTop />
              <Router />
            </BrandAestheticProvider>
          </ToastProvider>
        </AuthProvider>
      </ErrorBoundary>
    </HashRouter>
  );
};

export default App;