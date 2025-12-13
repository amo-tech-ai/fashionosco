
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Router } from './Router';
import { ScrollToTop } from './components/ScrollToTop';
import { ToastProvider } from './components/ToastProvider';

const App: React.FC = () => {
  return (
    // Using HashRouter for compatibility with static file hosting/preview environments
    // where browser history API might cause 404s on refresh.
    <HashRouter>
      <ToastProvider>
        <ScrollToTop />
        <Router />
      </ToastProvider>
    </HashRouter>
  );
};

export default App;
