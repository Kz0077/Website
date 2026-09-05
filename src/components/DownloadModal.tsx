import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import Logo from "./Logo";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform?: "ios" | "android" | null;
}

export default function DownloadModal({
  isOpen,
  onClose,
  platform = "ios",
}: DownloadModalProps) {
  const isIos = platform === "ios";
  const shouldReduceMotion = useReducedMotion();

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          [
            'button:not([disabled])',
            'a[href]',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
          ].join(",")
        )
      ).filter(
        (element) =>
          !element.hasAttribute("disabled") &&
          element.getAttribute("aria-hidden") !== "true"
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;

      window.requestAnimationFrame(() => {
        previouslyFocusedRef.current?.focus();
      });
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
          aria-hidden={false}
        >
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="download-modal-title"
            aria-describedby="download-modal-description"
            initial={{
              opacity: 0,
              scale: shouldReduceMotion ? 1 : 0.95,
              y: shouldReduceMotion ? 0 : 15,
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: shouldReduceMotion ? 1 : 0.95,
              y: shouldReduceMotion ? 0 : 15,
            }}
            transition={{
              type: "spring",
              bounce: 0,
              duration: shouldReduceMotion ? 0 : 0.4,
            }}
            onMouseDown={(event) => event.stopPropagation()}
            className="relative flex w-full max-w-md flex-col items-center rounded-[2.5rem] border border-gray-100 bg-white p-8 text-center shadow-2xl outline-none"
          >
            <motion.button
              ref={closeButtonRef}
              type="button"
              whileTap={shouldReduceMotion ? undefined : { scale: 0.9 }}
              onClick={onClose}
              aria-label="Close download dialog"
              className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-muted hover:text-gray-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <X className="h-5 w-5" />
            </motion.button>

            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 shadow-sm">
              <Logo height={36} />
            </div>

            <h3
              id="download-modal-title"
              className="text-2xl font-black tracking-tight text-gray-900"
            >
              Get Serasé for {isIos ? "iOS" : "Android"}
            </h3>

            <p
              id="download-modal-description"
              className="mt-2 max-w-xs text-sm font-medium leading-relaxed text-muted-foreground"
            >
              Scan the QR code with your phone&apos;s camera, or download
              directly below.
            </p>

            <div className="group relative my-6 flex h-52 w-52 flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-amber-300/60 bg-amber-50/50 p-4 shadow-inner">
              <div className="relative flex h-40 w-40 items-center justify-center rounded-2xl border border-gray-100 bg-white p-3 shadow-md">
                {!shouldReduceMotion && (
                  <motion.div
                    animate={{ y: [0, 130, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "linear",
                    }}
                    className="absolute left-2 right-2 top-2 z-10 h-0.5 rounded-full bg-primary/40 shadow-[0_0_10px_2px_rgba(225,29,72,0.3)]"
                  />
                )}

                <svg
                  className="h-full w-full text-gray-800"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm11-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm13-2h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm4 0h2v2h-2v-2zm-6-8h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z" />
                </svg>
              </div>
            </div>

            <div className="mb-6 h-px w-full bg-gray-100" />

            <div className="w-full space-y-3">
              <a
                href="https://apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-3.5 font-bold transition-all ${
                  isIos
                    ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20 hover:bg-gray-800"
                    : "bg-gray-100 text-gray-700 opacity-70 hover:bg-gray-200"
                }`}
              >
                <svg
                  className="h-5 w-5 shrink-0 fill-current"
                  viewBox="0 0 384 512"
                  aria-hidden="true"
                >
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.1-12 69.5-34.3z" />
                </svg>
                <span className="text-sm font-extrabold">App Store</span>
              </a>

              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-3.5 font-bold transition-all ${
                  !isIos
                    ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20 hover:bg-gray-800"
                    : "bg-gray-100 text-gray-700 opacity-70 hover:bg-gray-200"
                }`}
              >
                <svg
                  className="h-[18px] w-[18px] shrink-0 fill-current"
                  viewBox="0 0 512 512"
                  aria-hidden="true"
                >
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l220.7-221.3 60.1 60.1L104.6 499z" />
                </svg>
                <span className="text-sm font-extrabold">Google Play</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}