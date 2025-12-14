
import React from 'react';
import ReactDOM from 'react-dom/client';
// Redirect to the feature-complete App in src/
import App from './src/App';
import './index.css'; // Ensure we have a CSS file or this line is harmless if handled by Tailwind script

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
