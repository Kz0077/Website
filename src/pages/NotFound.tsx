import { Link, useNavigate } from "react-router";
import { Compass, Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useDocumentTitle } from "../hooks/usePageMeta";

export default function NotFound() {
  useDocumentTitle("404 - Page Not Found | Serasé");
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* 氛围灯 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-rose-500/15 via-amber-500/10 to-primary/15 rounded-full blur-[140px] -z-10 pointer-events-none"></div>

      <div className="text-center max-w-md mx-auto space-y-8 relative z-10">
        
        {/* 动态悬浮 Icon */}
        <motion.div 
          animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="w-24 h-24 bg-white/80 backdrop-blur-xl border border-rose-100 rounded-3xl flex items-center justify-center text-primary mx-auto shadow-2xl shadow-rose-900/10"
        >
          <Compass className="w-12 h-12 stroke-[1.5]" />
        </motion.div>

        {/* 文案 */}
        <div className="space-y-3">
          <span className="text-xs font-black text-amber-600 bg-amber-50 border border-amber-200/60 px-3.5 py-1 rounded-full uppercase tracking-widest shadow-sm">
            404 Error
          </span>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Lost in Connection.
          </h1>
          <p className="text-sm text-muted-foreground font-medium leading-relaxed">
            Looks like this page stepped out for a coffee. Let's get you back to where the magic happens.
          </p>
        </div>

        {/* 返回按钮 */}
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-primary text-white font-extrabold text-xs hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white border border-gray-200 text-gray-700 font-extrabold text-xs hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

      </div>
    </div>
  );
}