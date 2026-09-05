import React, { useState, useEffect } from "react";
import { useOutlet, Link, useLocation } from "react-router";
import { ChevronDown, Globe, Menu, X, User } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Logo from "./Logo";
import DownloadModal from "./DownloadModal";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { ToastProvider, useToast } from "../context/ToastContext";
import { useFocusTrap } from '../hooks/useFocusTrap';
import "../styles/seraseAmbient.css";

function LayoutContent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const location = useLocation();
  const currentOutlet = useOutlet(); 
  const shellToneClass = location.pathname === "/" ? "serase-home-shell" : "serase-inner-shell";
  
  const { isAuthenticated, logout } = useAuth();
  const { showToast } = useToast();

  const shouldReduceMotion = useReducedMotion();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  
  const mobileMenuRef = useFocusTrap(isMobileMenuOpen, closeMobileMenu);

  useEffect(() => setIsMobileMenuOpen(false), [location.pathname]);
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : previousOverflow;
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 36);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Header size and header surface are intentionally separate:
  // - size: compact while scrolled, expanded again on hover/menu interaction
  // - surface: transparent ONLY at the top; glass whenever the page has scrolled
  const isHeaderCompact = hasScrolled && !isHeaderHovered && !isMobileMenuOpen;
  const headerSurfaceClass = hasScrolled
    ? "serase-header-surface-glass"
    : "serase-header-surface-transparent";

  const handleLanguageClick = () => {
    showToast("Language switching is coming soon!");
  };

  const handleLogout = () => {
    logout();
    showToast("Successfully logged out");
    closeMobileMenu();
  };

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
    closeMobileMenu();
  };

  return (
    <div className={`serase-site-shell ${shellToneClass} min-h-screen flex flex-col font-sans selection:bg-primary/20 selection:text-primary`}>
      <a href="#main-content" className="serase-skip-link">Skip to main content</a>
      <DownloadModal isOpen={isDownloadModalOpen} onClose={() => setIsDownloadModalOpen(false)} />

      <div className="serase-ambient" aria-hidden="true">
        <div className="serase-aurora serase-aurora-primary" />
        <div className="serase-aurora serase-aurora-blush" />
        <div className="serase-aurora serase-aurora-gold" />

        <div className="serase-frequency-field" />

        <div className="serase-ribbon serase-ribbon-a" />
        <div className="serase-ribbon serase-ribbon-b" />

        <div className="serase-orbit serase-orbit-a">
          <span className="serase-orbit-node serase-orbit-node-gold" />
        </div>
        <div className="serase-orbit serase-orbit-b">
          <span className="serase-orbit-node serase-orbit-node-burgundy" />
        </div>

        <div className="serase-light-beam serase-light-beam-a" />
        <div className="serase-light-beam serase-light-beam-b" />

        <div className="serase-ambient-node serase-ambient-node-a" />
        <div className="serase-ambient-node serase-ambient-node-b" />
        <div className="serase-ambient-node serase-ambient-node-c" />
        <div className="serase-ambient-node serase-ambient-node-d" />

        <div className="serase-soft-vignette" />
        <div className="serase-grain" />
      </div>

      <header
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={() => setIsHeaderHovered(false)}
        className={`serase-glass-header sticky top-0 z-[80] isolate ${headerSurfaceClass}`}
      >
        <div
          className={`serase-header-inner max-w-7xl mx-auto px-6 flex items-center justify-between ${
            isHeaderCompact ? "h-[58px]" : "h-20"
          }`}
        >
          
          <Link 
            to="/" 
            onClick={handleLogoClick} 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity z-50"
          >
            <Logo height={isHeaderCompact ? 30 : 40} />
            <span
              className={`font-bold text-primary tracking-tight transition-all duration-300 ${
                isHeaderCompact ? "text-xl" : "text-2xl"
              }`}
            >
              Serasé
            </span>
          </Link>

          <nav
            className={`hidden md:flex items-center font-medium transition-all duration-300 ${
              isHeaderCompact ? "gap-6 text-[14px]" : "gap-8 text-base"
            }`}
          >
            <Link
              to="/product"
              aria-current={location.pathname === "/product" ? "page" : undefined}
              className="hover:text-primary transition-colors"
            >
              Product
            </Link>
            
            <Link to="/pricing" aria-current={location.pathname === "/pricing" ? "page" : undefined} className="hover:text-primary transition-colors">Subscriptions</Link>
            <Link to="/safety" aria-current={location.pathname === "/safety" ? "page" : undefined} className="hover:text-primary transition-colors">Trust &amp; Safety</Link>
            <Link to="/support" aria-current={location.pathname === "/support" ? "page" : undefined} className="hover:text-primary transition-colors">Support</Link>
          </nav>

          <div
            className={`flex items-center h-full transition-all duration-300 ${
              isHeaderCompact ? "gap-2 sm:gap-3" : "gap-2 sm:gap-4"
            }`}
          >
            <div className="relative group hidden md:flex items-center h-full cursor-pointer">
              <button onClick={handleLanguageClick} className="flex items-center gap-1 hover:text-primary transition-colors font-medium">
                <Globe className="w-5 h-5" />
                <span className="text-sm">EN</span>
                <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform" />
              </button>
              
              <div className="absolute top-full right-0 z-[90] mt-0 w-40 bg-white rounded-[1.5rem] shadow-xl border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all flex flex-col overflow-hidden pointer-events-auto">
                <button onClick={handleLanguageClick} className="px-5 py-3 hover:bg-muted/50 text-primary font-medium transition-colors text-left flex items-center justify-between">
                  English <span>EN</span>
                </button>
                <button onClick={handleLanguageClick} className="px-5 py-3 hover:bg-muted/50 text-foreground transition-colors text-left flex items-center justify-between border-t border-border/50">
                  简体中文 <span>ZH</span>
                </button>
                <button onClick={handleLanguageClick} className="px-5 py-3 hover:bg-muted/50 text-foreground transition-colors text-left flex items-center justify-between border-t border-border/50">
                  Bahasa Melayu <span>MS</span>
                </button>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              {isAuthenticated ? (
                <motion.div 
                  key="user-logged-in"
                  initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="relative group hidden sm:flex items-center h-full px-2"
                >
                   <button className="flex items-center gap-2 font-bold text-primary hover:opacity-80 transition-opacity">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><User className="w-4 h-4" /></div>
                      Profile
                   </button>
                   <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all flex flex-col overflow-hidden py-1">
                      <motion.button 
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLogout} 
                        className="px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 font-medium w-full"
                      >
                        Log out
                      </motion.button>
                   </div>
                </motion.div>
              ) : (
                <motion.div
                  key="user-logged-out"
                  initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to="/login" className="hidden sm:inline font-bold text-primary hover:opacity-80 transition-opacity px-2">
                    Log in
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setIsDownloadModalOpen(true)}
              className={`bg-primary text-primary-foreground serase-btn-nav serase-interact-nav font-medium hover:bg-primary/90 ${
                isHeaderCompact
                  ? "px-4 py-2 text-sm"
                  : "px-4 sm:px-6 py-2.5 text-sm sm:text-base"
              }`}
            >
              Download
            </button>

            <button
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-panel"
              className="md:hidden p-2 -mr-2 text-foreground hover:text-primary transition-colors z-50 relative"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              id="mobile-nav-panel"
              ref={mobileMenuRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="md:hidden fixed inset-0 top-0 left-0 w-full h-screen bg-background z-30 pt-24 px-6 pb-6 overflow-y-auto flex flex-col gap-1 font-medium outline-none"
            >
              <span className="text-xs uppercase tracking-wider text-muted-foreground px-2 pt-2 pb-1">Product</span>
              <Link
                to="/product"
                onClick={closeMobileMenu}
                className="px-2 py-3 rounded-xl hover:bg-muted/50 text-foreground transition-colors"
              >
                Product Overview
              </Link>

              <span className="text-xs uppercase tracking-wider text-muted-foreground px-2 pt-4 pb-1">Subscriptions</span>
              <Link to="/pricing" onClick={closeMobileMenu} className="px-2 py-3 rounded-xl hover:bg-muted/50 text-foreground transition-colors">All Plans</Link>

              <span className="text-xs uppercase tracking-wider text-muted-foreground px-2 pt-4 pb-1">More</span>
              <Link to="/safety" onClick={closeMobileMenu} className="px-2 py-3 rounded-xl hover:bg-muted/50 text-foreground transition-colors">Trust &amp; Safety</Link>
              <Link to="/support" onClick={closeMobileMenu} className="px-2 py-3 rounded-xl hover:bg-muted/50 text-foreground transition-colors">Support</Link>
              
              <div className="mt-8 flex flex-col gap-4">
                  {isAuthenticated ? (
                    <motion.button 
                      whileTap={{ scale: 0.98 }}
                      onClick={handleLogout} 
                      className="w-full py-4 text-center border-2 border-red-200 text-red-600 font-bold rounded-2xl"
                    >
                      Log out
                    </motion.button>
                  ) : (
                    <Link to="/login" onClick={closeMobileMenu} className="w-full py-4 text-center border-2 border-primary text-primary font-bold rounded-2xl transition-colors hover:bg-primary/5">Account</Link>
                  )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence 
        mode="wait" 
        initial={false}
        onExitComplete={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}
      >
        <motion.main
          id="main-content"
          tabIndex={-1}
          key={location.pathname} 
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -15 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="serase-main flex-grow"
        >
          {currentOutlet && React.cloneElement(currentOutlet, { key: location.pathname })}
        </motion.main>
      </AnimatePresence>

      <footer className="serase-global-footer border-t border-white/65 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          <div className="sm:col-span-2 lg:col-span-3">
            <Link to="/" onClick={handleLogoClick} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Logo height={32} />
              <span className="text-2xl font-bold text-primary tracking-tight">Serasé</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground pr-4">Real People. Real Connections.</p>
          </div>
          
          <div className="lg:col-span-2">
            <h4 className="font-semibold mb-4 text-gray-900">Quick Links</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/features" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link to="/pricing" aria-current={location.pathname === "/pricing" ? "page" : undefined} className="hover:text-primary transition-colors">Subscriptions</Link></li>
              <li><Link to="/safety" className="hover:text-primary transition-colors">Trust & Safety</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">Help Centre</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-semibold mb-4 text-gray-900">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-semibold mb-4 text-gray-900">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-muted-foreground pr-4">
              <li>
                <a href="mailto:CS@seraseapp.com" className="font-bold text-primary hover:text-primary/80 transition-colors">
                  CS@seraseapp.com
                </a>
              </li>
              <li>
                {/* Clickable Google Maps address without hover underline */}
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Unit+713,+Block+E,+Pusat+Dagangan+Phileo+Damansara+1,+Selangor,+Malaysia" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block leading-relaxed no-underline transition-colors hover:text-primary hover:no-underline"
                  title="View on Google Maps"
                >
                  Unit 713, Block E, Pusat Dagangan Phileo<br />
                  <span>Damansara, 1, Selangor</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold text-gray-900 mb-4">Follow Us</h4>
            <div className="flex flex-wrap gap-3">
              <a href="https://facebook.com/seraseapp" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </a>
              <a href="https://instagram.com/seraseapp" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://tiktok.com/@seraseapp" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.95-.57 3.9-1.74 5.43-1.14 1.51-2.8 2.6-4.66 2.92-1.9.33-3.92.1-5.63-.82-1.63-.88-2.92-2.31-3.62-4.04-.68-1.69-.8-3.63-.33-5.41.44-1.66 1.48-3.14 2.87-4.14 1.42-1.02 3.23-1.5 4.96-1.39v4.03c-1.35-.11-2.73.47-3.56 1.48-.82 1-1.12 2.38-.85 3.68.27 1.29 1.1 2.42 2.27 3.04 1.19.64 2.65.68 3.87.16 1.25-.53 2.18-1.62 2.54-2.91.24-.87.26-1.8.25-2.69V.02z" /></svg>
              </a>
              <a href="https://x.com/seraseapp" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function AppLayout() {
  return (
    <AuthProvider>
      <ToastProvider>
        <LayoutContent />
      </ToastProvider>
    </AuthProvider>
  );
}
