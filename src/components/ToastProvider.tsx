
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem: React.FC<{ toast: Toast; onDismiss: (id: string) => void }> = ({ toast, onDismiss }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleDismiss();
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss(toast.id);
    }, 300); // Wait for exit animation
  };

  const icons = {
    success: <CheckCircle size={18} className="text-green-400" />,
    error: <AlertCircle size={18} className="text-red-500" />,
    info: <Info size={18} className="text-blue-400" />,
  };

  const styles = {
    success: 'bg-[#111111] text-white border-gray-800',
    error: 'bg-white text-gray-900 border-red-200 shadow-red-100',
    info: 'bg-white text-gray-900 border-gray-200',
  };

  return (
    <div
      className={`
        pointer-events-auto flex items-center gap-3 px-5 py-4 min-w-[300px] max-w-sm rounded-lg border shadow-xl backdrop-blur-md transition-all duration-300
        ${styles[toast.type]}
        ${isExiting ? 'opacity-0 translate-x-4' : 'animate-in slide-in-from-right-8 fade-in'}
      `}
    >
      <div className="shrink-0">{icons[toast.type]}</div>
      <p className="text-sm font-medium flex-1 leading-snug">{toast.message}</p>
      <button 
        onClick={handleDismiss} 
        className="shrink-0 opacity-50 hover:opacity-100 transition-opacity p-1"
      >
        <X size={14} />
      </button>
    </div>
  );
};
