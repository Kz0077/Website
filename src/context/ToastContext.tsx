import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

interface Toast {
  id: number;
  message: string;
}

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string) => {
    const id = Date.now();
    setToasts((prev) => {
      // 🚀 限制最大数量为 3 条，超出则把最早的挤掉
      const newToasts = [...prev, { id, message }];
      return newToasts.length > 3 ? newToasts.slice(newToasts.length - 3) : newToasts;
    });
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* ♿ 增加 aria-live 和 role="status"，让屏幕阅读器自动朗读弹出的 toast */}
      <div 
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none w-full max-w-sm px-4"
        aria-live="polite"
        role="status"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="bg-gray-900 text-white text-sm font-bold px-5 py-3.5 rounded-2xl shadow-xl flex items-center justify-between w-full pointer-events-auto"
            >
              <span>{toast.message}</span>
              <button 
                onClick={() => removeToast(toast.id)} 
                className="p-1 hover:bg-white/20 rounded-full transition-colors ml-3 shrink-0"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) throw new Error('useToast must be used within a ToastProvider');
  return context;
}