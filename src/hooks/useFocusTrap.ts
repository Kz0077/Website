import { useEffect, useRef } from 'react';

export function useFocusTrap(isOpen: boolean, onClose: () => void) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // 记录打开弹窗前，用户的焦点在哪里（比如触发弹窗的那个按钮）
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      // 弹窗打开时，自动将焦点移入弹窗容器
      // setTimeout 确保在 Framer Motion 渲染 DOM 后再 focus
      setTimeout(() => {
        modalRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
          return;
        }

        if (e.key === 'Tab') {
          const focusableElements = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          
          if (focusableElements && focusableElements.length > 0) {
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

            // Shift + Tab
            if (e.shiftKey) {
              if (document.activeElement === firstElement || document.activeElement === modalRef.current) {
                lastElement.focus();
                e.preventDefault();
              }
            } 
            // Tab
            else {
              if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
              }
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        // 弹窗关闭时，把焦点还给之前的元素！
        previousFocusRef.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  return modalRef;
}