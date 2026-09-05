import React, { useState } from 'react';
import { Mail, MapPin, Phone, CheckCircle2, Loader2 } from 'lucide-react';
import { useDocumentTitle } from '../hooks/usePageMeta';
import { motion, Variants, AnimatePresence } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0, duration: 0.8 } }
};

export default function Support() {
  useDocumentTitle("Help & Support | Serasé");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    /*
     * TODO — CONNECT SUPPORT BACKEND
     *
     * Replace this mock with a real ticket/email route before launch.
     * The "within 24 hours" SLA copy below the confirmation message is a
     * real promise once this ships — confirm it with Support ops, or
     * remove it, before connecting a real endpoint.
     *
     * const response = await supportApi.submitTicket({ firstName, lastName, email, message });
     * if (response.ok) setIsSubmitted(true);
     */
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const tapeStyle = { 
    backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent)' 
  };

  return (
    <div className="min-h-screen bg-background selection:bg-accent/30 selection:text-primary pt-24 pb-12 relative overflow-x-hidden">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto px-6 flex flex-col gap-8"
      >
        
        <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-4 mt-8">
          <h1 className="text-4xl md:text-[3.5rem] font-black text-gray-900 tracking-tight mb-6">
            Help & Support
          </h1>
          <p className="text-lg text-gray-500 font-medium">
            We are here to assist you. Reach out to us directly below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          
          <motion.a 
            href="https://maps.google.com/?q=Netmedias+Leashares+Phileo+Damansara+Selangor" 
            target="_blank" 
            rel="noopener noreferrer"
            variants={itemVariants} 
            className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] transition-all group cursor-pointer block relative"
          >
            <div className="absolute -top-3 left-[30%] -translate-x-1/2 w-12 h-6 bg-white/60 backdrop-blur-sm border border-gray-200 shadow-sm rotate-2 z-20 rounded-sm" style={tapeStyle}></div>
            <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-4 tracking-tight group-hover:text-primary transition-colors">Headquarters</h3>
            <div className="text-sm text-gray-500 font-medium leading-relaxed">
              <p className="font-bold text-gray-700 mb-1">Netmedias Leashares</p>
              <p>Unit 713, Block E, Pusat Dagangan</p>
              <p>Phileo Damansara, 1, Jalan 16/11</p>
              <p>46350 Petaling Jaya, Selangor</p>
            </div>
          </motion.a>

          {/* 🚀 修复区域：补齐了 Phone 卡片的 hover:shadow 和 transition-all，并加上了 group-hover:text-primary */}
          <motion.div variants={itemVariants} className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] transition-all group relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-white/60 backdrop-blur-sm border border-gray-200 shadow-sm -rotate-2 z-20 rounded-sm" style={tapeStyle}></div>
            <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-4 tracking-tight group-hover:text-primary transition-colors">Phone</h3>
            <div className="text-sm text-gray-500 font-medium leading-relaxed space-y-4 w-full">
              <div>
                <p className="font-bold text-gray-700 mb-1">General Inquiries</p>
                <p>+60 3-1234 5678</p>
              </div>
              <div className="pt-4 border-t border-dashed border-gray-200">
                <p className="font-bold text-gray-700 mb-1">Support Line</p>
                <p>+60 3-8765 4321</p>
              </div>
            </div>
          </motion.div>

          {/* 🚀 修复区域：补齐了 Email 卡片的 hover:shadow 和 transition-all，并加上了 group-hover:text-primary */}
          <motion.div variants={itemVariants} className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] transition-all group relative">
            <div className="absolute -top-3 left-[70%] -translate-x-1/2 w-12 h-6 bg-white/60 backdrop-blur-sm border border-gray-200 shadow-sm rotate-1 z-20 rounded-sm" style={tapeStyle}></div>
            <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-4 tracking-tight group-hover:text-primary transition-colors">Email</h3>
            <div className="text-sm text-gray-500 font-medium leading-relaxed space-y-4 w-full">
              <div>
                <p className="font-bold text-gray-700 mb-1">Customer Support</p>
                <a href="mailto:CS@seraseapp.com" className="hover:text-primary font-semibold transition-colors">CS@seraseapp.com</a>
              </div>
              <div className="pt-4 border-t border-dashed border-gray-200">
                <p className="font-bold text-gray-700 mb-1">Partnerships</p>
                <a href="mailto:partners@seraseapp.com" className="hover:text-primary font-semibold transition-colors">partners@seraseapp.com</a>
              </div>
            </div>
          </motion.div>

        </div>

        <motion.div variants={itemVariants} className="mt-8 relative z-10">
          
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/60 backdrop-blur-md border border-gray-200 shadow-sm -rotate-1 z-30 rounded-sm" style={tapeStyle}></div>

          <div className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-[0_12px_40px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col lg:flex-row gap-12 lg:gap-20 relative overflow-hidden min-h-[480px]">
            
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-50/50 rounded-full blur-[80px] pointer-events-none translate-y-1/2 translate-x-1/3"></div>

            <div className="lg:w-2/5 relative z-10 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 tracking-tight">Message Us</h2>
              <p className="text-gray-500 font-medium leading-relaxed text-sm md:text-base">
                If you wish to get in touch with our team regarding account issues, feedback, or general inquiries, please complete the form. Our Support department will review and contact you within 24 hours.
              </p>
            </div>

            <div className="lg:w-3/5 relative z-10 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                
                {isSubmitted ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-green-50/50 border border-green-100 rounded-3xl p-10 flex flex-col items-center text-center h-full justify-center"
                  >
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-3">Message Sent Successfully!</h3>
                    <p className="text-gray-600 font-medium mb-8 max-w-sm">
                      Thank you for reaching out. A member of our support team will get back to you within 24 hours.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="text-primary font-bold hover:opacity-80 transition-opacity flex items-center gap-2"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="flex flex-col gap-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="relative">
                        <label htmlFor="support-first-name" className="sr-only">First Name</label>
                        <input 
                          id="support-first-name"
                          type="text" 
                          placeholder="First Name" 
                          required
                          disabled={isSubmitting}
                          className="w-full bg-gray-50/80 border border-transparent px-5 py-4 rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-semibold text-sm placeholder:text-gray-400 text-gray-900 shadow-sm disabled:opacity-50" 
                        />
                      </div>
                      <div className="relative">
                        <label htmlFor="support-last-name" className="sr-only">Last Name</label>
                        <input 
                          id="support-last-name"
                          type="text" 
                          placeholder="Last Name" 
                          disabled={isSubmitting}
                          className="w-full bg-gray-50/80 border border-transparent px-5 py-4 rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-semibold text-sm placeholder:text-gray-400 text-gray-900 shadow-sm disabled:opacity-50" 
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label htmlFor="support-email" className="sr-only">Email Address</label>
                      <input 
                        id="support-email"
                        type="email" 
                        placeholder="Email Address" 
                        required
                        disabled={isSubmitting}
                        className="w-full bg-gray-50/80 border border-transparent px-5 py-4 rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-semibold text-sm placeholder:text-gray-400 text-gray-900 shadow-sm disabled:opacity-50" 
                      />
                    </div>

                    <div className="relative">
                      <label htmlFor="support-message" className="sr-only">How can we help you?</label>
                      <textarea 
                        id="support-message"
                        placeholder="How can we help you?" 
                        rows={5} 
                        required
                        disabled={isSubmitting}
                        className="w-full bg-gray-50/80 border border-transparent px-5 py-4 rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-semibold text-sm placeholder:text-gray-400 text-gray-900 resize-none shadow-sm disabled:opacity-50"
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-primary text-white font-extrabold py-4.5 rounded-2xl hover:bg-primary/90 shadow-[0_8px_20px_rgb(138,33,40,0.25)] transition-all active:scale-[0.98] mt-2 text-[15px] h-14 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}