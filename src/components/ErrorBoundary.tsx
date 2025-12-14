import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Button } from './Button';
import { ButtonVariant } from '../types';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    // Attempt to recover by clearing potentially corrupt state
    // localStorage.removeItem('active_campaign'); 
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
          <div className="max-w-md w-full bg-white border border-gray-200 rounded-xl p-8 shadow-xl text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="text-red-500 w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">Something went wrong.</h2>
            <p className="text-gray-500 text-sm mb-6">
              The application encountered an unexpected error. 
              <br/>
              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                {this.state.error?.message || 'Unknown Error'}
              </span>
            </p>
            <div className="flex justify-center gap-4">
               <Button onClick={() => window.location.href = '/' } variant={ButtonVariant.SECONDARY} className="border-gray-200">Go Home</Button>
               <Button onClick={this.handleReset}>
                  <RefreshCcw size={16} className="mr-2" /> Reload App
               </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}