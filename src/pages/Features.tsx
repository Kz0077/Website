import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { ShieldCheck, Zap, MessageSquare, MapPin, X, Heart, ChevronLeft, MoreVertical, Sparkles, Send, CheckCircle2, Phone, CalendarHeart, RotateCcw, Bell, Star, MessageCircle, Bookmark, User, Clock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useReducedMotion } from "framer-motion";
import PhoneFrame from "../components/PhoneFrame.tsx";
import { usePageMeta } from "../hooks/usePageMeta";
import { FrequenciesSyncedAnimation } from "../utils/animations.tsx";
import seraseLogo from "../../.figma/attachments/image-0.png";

// ==================== 🗂️ Profiles Data ====================
const PROFILES = [
  {
    name: "Yaya", age: 26, location: "City centre - ~5 km away",
    bio: "Everything runs on a playlist. Including me.", tags: ["Music first", "Straight talker", "Easy company"]
  },
  {
    name: "Alex", age: 29, location: "KLCC - ~2 km away",
    bio: "Coffee addict & weekend explorer.", tags: ["Photography", "Travel", "Coffee lover"]
  },
  {
    name: "Chloe", age: 24, location: "Bangsar - ~8 km away",
    bio: "Probably thinking about what to eat next 🍣", tags: ["Foodie", "Dog person", "Pilates"]
  }
];

export default function Features() {
  usePageMeta("Features | Serasé", "Explore Serasé features for verified discovery, intentional connections, chat, readiness, date planning and safety.");
  const shouldReduceMotion = useReducedMotion();

  // ==================== 🚀 Swipe & Match Logic ====================
  const [currentIndex, setCurrentIndex] = useState(0); 
  const currentProfile = PROFILES[currentIndex];
  const nextProfile = PROFILES[(currentIndex + 1) % PROFILES.length]; 

  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const cardRotate = useTransform(cardX, [-200, 200], shouldReduceMotion ? [0, 0] : [-15, 15]);
  const connectOpacity = useTransform(cardX, [20, 120], [0, 1]);
  const passOpacity = useTransform(cardX, [-20, -120], [0, 1]);

  const [swipeState, setSwipeState] = useState<'idle' | 'swiping-right' | 'swiping-left' | 'matched'>('idle');
  const [hasInteracted, setHasInteracted] = useState(false);

  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearAllTimers = () => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  };

  useEffect(() => {
    return () => {
      clearAllTimers();
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, []);

  const swipeDuration = shouldReduceMotion ? 0.15 : 0.4;

  const handleSwipeRight = (customY?: number) => {
    if (swipeState !== 'idle') return;
    clearAllTimers();
    setSwipeState('swiping-right'); setHasInteracted(true);
    animate(cardX, window.innerWidth || 600, { duration: swipeDuration, ease: "easeOut" });
    animate(cardY, shouldReduceMotion ? 0 : (typeof customY === 'number' ? customY : 100), { duration: swipeDuration, ease: "easeOut" });

    const t1 = setTimeout(() => setSwipeState('matched'), swipeDuration * 1000); 
    const t2 = setTimeout(() => { 
      setSwipeState('idle'); cardX.set(0); cardY.set(0); setCurrentIndex((prev) => (prev + 1) % PROFILES.length); 
    }, shouldReduceMotion ? 1400 : 5200); 
    timeoutRefs.current.push(t1, t2);
  };

  const handleSwipeLeft = (customY?: number) => {
    if (swipeState !== 'idle') return;
    clearAllTimers();
    setSwipeState('swiping-left'); setHasInteracted(true);
    animate(cardX, -(window.innerWidth || 600), { duration: swipeDuration, ease: "easeOut" });
    animate(cardY, shouldReduceMotion ? 0 : (typeof customY === 'number' ? customY : 100), { duration: swipeDuration, ease: "easeOut" });

    const t1 = setTimeout(() => { 
      setSwipeState('idle'); cardX.set(0); cardY.set(0); setCurrentIndex((prev) => (prev + 1) % PROFILES.length); 
    }, 1000); 
    timeoutRefs.current.push(t1);
  };

  const handleDragEnd = (e: any, info: any) => {
    setHasInteracted(true); const threshold = 80; 
    if (info.offset.x > threshold || info.velocity.x > 500) { handleSwipeRight(info.offset.y + info.velocity.y * 0.2); } 
    else if (info.offset.x < -threshold || info.velocity.x < -500) { handleSwipeLeft(info.offset.y + info.velocity.y * 0.2); } 
    else { animate(cardX, 0, { type: 'spring', stiffness: 300, damping: 20 }); animate(cardY, 0, { type: 'spring', stiffness: 300, damping: 20 }); }
  };

  useEffect(() => {
    if (hasInteracted) return;
    autoPlayRef.current = setInterval(() => handleSwipeRight(), 6000);
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [swipeState, hasInteracted]);

  return (
    <div className="relative serase-container-content px-6 pt-20 md:pt-24 pb-32 space-y-32 overflow-x-hidden font-sans">
      <style>{`
        @keyframes featureGlowDrift {
          0%,100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(22px,-16px,0) scale(1.04); }
        }
        @keyframes featureJourneyNode {
          0% { left: 0%; }
          50% { left: 100%; }
          100% { left: 0%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .serase-css-motion {
            animation: none !important;
          }
        }
      `}</style>

      <div className="pointer-events-none absolute -inset-x-[35vw] inset-y-0 -z-20 overflow-hidden">
        <div className="serase-css-motion absolute -left-[8%] top-[3%] h-[620px] w-[620px] rounded-full bg-[#8A2128]/[0.07] blur-[120px]" style={{ animation: shouldReduceMotion ? "none" : "featureGlowDrift 22s cubic-bezier(0.45, 0, 0.55, 1) infinite" }} />
        <div className="serase-css-motion absolute -right-[8%] top-[31%] h-[650px] w-[650px] rounded-full bg-[#D6AA54]/[0.09] blur-[125px]" style={{ animation: shouldReduceMotion ? "none" : "featureGlowDrift 26s cubic-bezier(0.45, 0, 0.55, 1) infinite reverse" }} />
        <div className="absolute left-[20%] top-[63%] h-[600px] w-[600px] rounded-full bg-[#C88993]/[0.07] blur-[130px]" />
      </div>
      
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center space-y-5 max-w-3xl mx-auto">
        <div className="serase-eyebrow serase-eyebrow-pill">
          <Sparkles className="h-4 w-4" /> Product Features
        </div>
        <h1 className="serase-h1">Built for connection that actually moves.</h1>
        <p className="mx-auto max-w-2xl text-[17px] md:text-[18px] leading-[1.75] text-muted-foreground font-medium">
          From a verified profile to a real date plan, every part of Serasé is designed to make meeting people feel more intentional.
        </p>
      </motion.div>

      {/* Intent pillars */}
      <motion.section
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="grid gap-4 md:grid-cols-3"
      >
        {[
          { icon: ShieldCheck, title: "Verified first", copy: "Identity checks create a more accountable starting point." },
          { icon: Clock, title: "Move with intention", copy: "48-hour connections encourage both people to actually engage." },
          { icon: CalendarHeart, title: "Plan real dates", copy: "Move from chat to a shared date plan without breaking the flow." },
        ].map((item, index) => (
          <div key={item.title} className={`rounded-serase-card border serase-card-border p-6 serase-shadow-card ${index === 1 ? "bg-[#F7F0E2]" : "bg-[#FFF8F4]"}`}>
            <div className={`serase-icon-sm rounded-2xl ${index === 1 ? "bg-[#EBD7AA] text-[#94621F]" : "bg-[#F0D9D7] text-[#8A2128]"}`}>
              <item.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-[19px] font-black tracking-[-0.02em] text-[#2B2523]">{item.title}</h3>
            <p className="mt-2 text-[14.5px] font-medium leading-[1.7] text-muted-foreground">{item.copy}</p>
          </div>
        ))}
      </motion.section>

      {/* ==================== 📱 Feature 1: Discover & Connect ==================== */}
      <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center items-center group w-full"
        >
          <div className="absolute w-[120%] h-[120%] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-[80px] -z-10 transition-opacity duration-700 ease-out group-hover:opacity-75" />

          <PhoneFrame screenClassName="bg-[#F8F1EA]">
            <div className="relative h-full overflow-hidden bg-[#F8F1EA]">

              {/* Finalized Discover header */}
              <div className="absolute inset-x-0 top-[33px] z-30 h-[39px] px-3 pointer-events-none select-none">
                <div className="relative flex h-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative flex h-7 w-7 items-center justify-center rounded-full border border-[#E5D9D0] bg-white/90 shadow-sm">
                      <RotateCcw className="h-3 w-3 text-primary" strokeWidth={1.9} />
                      <span className="absolute -right-1 -top-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-[#E1B85C] px-1 text-[6px] font-black text-[#82252B]">
                        5
                      </span>
                    </div>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E5D9D0] bg-white/90 shadow-sm">
                      <Zap className="h-3 w-3 text-primary" strokeWidth={1.9} />
                    </div>
                  </div>

                  <div
                    className="absolute left-1/2 -translate-x-1/2 text-[16px] font-medium text-primary"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Serasé
                  </div>

                  <div className="relative flex h-7 w-7 items-center justify-center rounded-full border border-[#E5D9D0] bg-white/90 shadow-sm">
                    <Bell className="h-3 w-3 text-primary" strokeWidth={1.9} />
                    <span className="absolute right-[4px] top-[4px] h-2 w-2 rounded-full bg-[#EF5965] ring-2 ring-white" />
                  </div>
                </div>
              </div>

              {/* Next profile beneath active card */}
              <motion.div
                animate={{ scale: swipeState !== 'idle' ? 1 : 0.97 }}
                transition={{ duration: shouldReduceMotion ? 0.1 : 0.35 }}
                className="absolute left-3 right-3 top-[80px] h-[278px] overflow-hidden rounded-[1.7rem] bg-[radial-gradient(circle_at_50%_28%,#D8C8C0_0%,#B89B91_45%,#785954_100%)] shadow-[0_15px_28px_rgba(73,51,48,0.14)]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-[18px] font-semibold" style={{ fontFamily: "Georgia, serif" }}>
                    {nextProfile.name}, {nextProfile.age}
                  </div>
                </div>
              </motion.div>

              <AnimatePresence>
                {(swipeState === 'idle' || swipeState === 'swiping-right' || swipeState === 'swiping-left') && (
                  <motion.div
                    drag={swipeState === 'idle'}
                    onDragStart={() => setHasInteracted(true)}
                    onDragEnd={handleDragEnd}
                    style={{ x: cardX, y: cardY, rotate: cardRotate }}
                    className="absolute left-3 right-3 top-[80px] h-[278px] overflow-hidden rounded-[1.7rem] bg-[#CBB8AF] shadow-[0_15px_28px_rgba(73,51,48,0.20)] origin-bottom cursor-grab active:cursor-grabbing touch-none"
                  >
                    {/* Story progress */}
                    <div className="absolute inset-x-0 top-0 z-20 h-[28px] bg-[#B4A09A]/95 px-4 pt-2 pointer-events-none">
                      <div className="flex items-center gap-1.5">
                        <div className="h-2.5 w-5 rounded-full bg-[#7C6F6B]" />
                        <div className="h-[3px] w-10 rounded-full bg-white/75" />
                        <div className="h-[3px] flex-1 rounded-full bg-white/35" />
                        <div className="h-[3px] flex-1 rounded-full bg-white/35" />
                        <div className="h-[3px] flex-1 rounded-full bg-white/35" />
                        <div className="h-[3px] flex-1 rounded-full bg-white/35" />
                      </div>
                    </div>

                    {/* Final photo goes here later — no external photo URL */}
                    <div
                      className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,#D8C8C0_0%,#B89B91_45%,#785954_100%)]"
                      aria-hidden="true"
                    >
                      <div className="absolute inset-x-0 top-[28px] h-px bg-white/15" />
                      <div className="absolute -left-8 top-10 h-40 w-28 rotate-[-8deg] rounded-[40%] bg-white/5 blur-xl" />
                      <div className="absolute -right-8 top-16 h-36 w-28 rotate-[8deg] rounded-[40%] bg-black/5 blur-xl" />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent pointer-events-none" />

                    {/* Drag feedback */}
                    <motion.div
                      style={{ opacity: connectOpacity }}
                      className="absolute top-10 left-4 z-30 -rotate-12 rounded-md border-2 border-[#8BBD3E] bg-black/30 px-2 py-1 text-[13px] font-black tracking-widest text-[#8BBD3E] backdrop-blur-sm pointer-events-none"
                    >
                      CONNECT
                    </motion.div>

                    <motion.div
                      style={{ opacity: passOpacity }}
                      className="absolute top-10 right-4 z-30 rotate-12 rounded-md border-2 border-rose-500 bg-black/30 px-2 py-1 text-[13px] font-black tracking-widest text-rose-500 backdrop-blur-sm pointer-events-none"
                    >
                      PASS
                    </motion.div>

                    {/* Profile copy */}
                    <div className="absolute inset-x-0 bottom-0 z-20 px-4 pb-4 pr-5 text-white pointer-events-none select-none">
                      <div className="mb-1.5 flex items-center gap-1.5">
                        <h3
                          className="shrink-0 whitespace-nowrap text-[20px] font-semibold leading-none"
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          {currentProfile.name}, {currentProfile.age}
                        </h3>
                        <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-[#E3BE69] px-1.5 py-0.5 text-[6px] font-black uppercase tracking-[0.06em] text-[#8A2B31]">
                          <span className="h-1.5 w-1.5 rounded-full border border-[#8A2B31]" />
                          Verified
                        </span>
                      </div>

                      <div className="mb-1.5 flex items-center gap-1 whitespace-nowrap text-[6.2px] font-semibold text-white/82">
                        <MapPin className="h-2.5 w-2.5 shrink-0" />
                        <span>{currentProfile.location}</span>
                      </div>

                      <p className="mb-2.5 whitespace-nowrap text-[6.2px] font-medium leading-none text-white/92">
                        {currentProfile.bio}
                      </p>

                      <div className="flex flex-nowrap items-center gap-1">
                        {currentProfile.tags.map((tag) => (
                          <span
                            key={tag}
                            className="whitespace-nowrap rounded-full border border-white/40 bg-black/15 px-2 py-1 text-[6.2px] font-bold leading-none"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

              <FrequenciesSyncedAnimation
                visible={swipeState === "matched"}
                profileName={currentProfile.name}
                logoSrc={seraseLogo}
                shouldReduceMotion={shouldReduceMotion}
                onSkip={() => {
                  clearAllTimers();
                  setSwipeState("idle");
                  cardX.set(0);
                  cardY.set(0);
                  setCurrentIndex((prev) => (prev + 1) % PROFILES.length);
                }}
              />

              {/* Pass / Signal controls */}
              <div className="absolute inset-x-0 top-[350px] z-30 flex items-center justify-center gap-6">
                <motion.button
                  type="button"
                  aria-label="Pass"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSwipeLeft()}
                  disabled={swipeState !== 'idle'}
                  className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white text-[#5B4D49] shadow-[0_8px_20px_rgba(50,42,40,0.10)] ring-1 ring-black/5 disabled:opacity-40"
                >
                  <X className="h-[17px] w-[17px]" strokeWidth={2.1} />
                </motion.button>

                <motion.button
                  type="button"
                  aria-label="Send Signal"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSwipeRight()}
                  disabled={swipeState !== 'idle'}
                  className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#F3E8D7] text-[#B87582] shadow-[0_8px_20px_rgba(177,103,117,0.12)] ring-1 ring-[#EEDFD9] disabled:opacity-40"
                >
                  <Star className="h-[18px] w-[18px]" strokeWidth={2} />
                </motion.button>
              </div>

              {/* Scroll hint */}
              <div className="absolute inset-x-0 top-[407px] z-20 text-center pointer-events-none select-none">
                <div className="text-[6px] font-black uppercase tracking-[0.24em] text-[#C88792]">
                  Scroll for {currentProfile.name}&apos;s profile
                </div>
                <div className="mt-1 text-[10px] leading-none text-[#C98991]">⌄</div>
              </div>

              {/* Bottom navigation — matched to finalized app prototype */}
              <div className="absolute bottom-[11px] left-[7px] right-[7px] z-20 h-[52px] overflow-visible rounded-[1.55rem] bg-white/90 px-[13px] pt-[9px] shadow-[0_10px_24px_rgba(98,64,57,0.10)] backdrop-blur-md pointer-events-none">
                <div className="relative mx-auto grid h-[40px] w-[84%] grid-cols-5 items-center rounded-full bg-[#A91F2D] px-[7px] text-white shadow-[0_8px_18px_rgba(169,31,45,0.26)]">
                  <div className="flex h-full items-center justify-center">
                    <MessageCircle className="h-[13px] w-[13px]" strokeWidth={1.9} />
                  </div>

                  <div className="flex h-full items-center justify-center">
                    <Bookmark className="h-[13px] w-[13px]" strokeWidth={1.9} />
                  </div>

                  <div className="relative flex h-full items-center justify-center">
                    <div className="absolute left-1/2 top-1/2 flex h-[45px] w-[45px] -translate-x-1/2 -translate-y-[73%] items-center justify-center rounded-full bg-[#F8ECDA] shadow-[0_8px_18px_rgba(117,77,31,0.22)]">
                      <div className="flex h-[39px] w-[39px] items-center justify-center rounded-full border-[2px] border-white bg-[#DDB95F] ring-1 ring-[#C9983A]/35">
                        <img
                          src={seraseLogo}
                          alt="Serasé logo"
                          className="h-[21px] w-[21px] object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex h-full items-center justify-center">
                    <Heart className="h-[13px] w-[13px]" strokeWidth={1.9} />
                  </div>

                  <div className="flex h-full items-center justify-center">
                    <User className="h-[13px] w-[13px]" strokeWidth={1.9} />
                  </div>
                </div>
              </div>
            </div>
          </PhoneFrame>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          className="space-y-6"
        >
          <div className="serase-icon-lg bg-[#FBE5E5] rounded-2xl text-primary mb-2">
            <Zap className="w-8 h-8" />
          </div>
          <h3 className="text-3xl font-extrabold text-[#333333] tracking-tight">
            Discover & Connect
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Browse identity-verified profiles built around personality and interests.
            Pass when it is not a fit, send a{" "}
            <span className="font-bold text-[#333333]">Signal</span> when someone stands out,
            and scroll deeper before deciding to connect.
          </p>
        </motion.div>
      </div>

      {/* ==================== 📱 Feature 2: Chat & Media ==================== */}
      <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          className="space-y-6 order-2 md:order-1"
        >
          <div className="w-14 h-14 bg-white border border-[#EBE3D5] rounded-2xl flex items-center justify-center text-[#8A2128] mb-2 shadow-sm">
            <MessageSquare className="w-6 h-6 stroke-[1.5]" />
          </div>

          <h3 className="text-3xl font-extrabold text-[#333333] tracking-tight">
            Chat & Media
          </h3>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Express yourself fully. Dive into deep conversations, set up real-life
            dates seamlessly, and let our built-in AI help you break the ice.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center items-center order-1 md:order-2 group w-full"
        >
          <div className="absolute w-[120%] h-[120%] bg-gradient-to-bl from-[#E5C8C4]/35 to-[#F4E6D4]/30 rounded-full blur-[80px] -z-10 transition-opacity duration-700 ease-out group-hover:opacity-75" />

          <PhoneFrame screenClassName="bg-[#F8F1EA]">
            <div className="relative h-full overflow-hidden bg-[#F8F1EA]">

              {/* Header */}
              <div className="absolute inset-x-0 top-[30px] z-30 h-[52px] border-b border-[#E8DED1] bg-[#FFF9F3]/98 px-3 backdrop-blur-md">
                <div className="flex h-full items-center justify-between">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <button
                      type="button"
                      aria-label="Back"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F8E9E7] text-[#98252D]"
                    >
                      <ChevronLeft className="h-3 w-3" strokeWidth={2} />
                    </button>

                    <div className="relative h-8 w-8 shrink-0 rounded-full bg-[radial-gradient(circle_at_50%_30%,#DCC8C1_0%,#A98480_52%,#755C64_100%)] shadow-sm">
                      <span className="absolute bottom-[1px] right-[1px] h-2.5 w-2.5 rounded-full border-2 border-[#FFF9F3] bg-[#8FA23D]" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1 text-[11.5px] font-extrabold leading-tight text-[#2E2928]">
                        <span>Amira</span>
                        <ShieldCheck className="h-2.5 w-2.5 shrink-0 text-[#C79A45]" />
                      </div>
                      <div className="mt-0.5 text-[6.8px] font-bold leading-none text-[#879B32]">
                        Active now
                      </div>
                    </div>
                  </div>

                  <MoreVertical className="h-4 w-4 shrink-0 text-[#98252D]" />
                </div>
              </div>

              {/* Readiness banner */}
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.45 }}
                className="absolute inset-x-0 top-[82px] z-20 h-[62px] border-b border-[#D9DDB9] bg-[#ECEFCE] px-3 py-2.5"
              >
                <div className="flex h-full items-center justify-between gap-2.5">
                  <div className="min-w-0 pr-1">
                    <div className="text-[9px] font-extrabold leading-tight text-[#292625]">
                      Ready to meet in person?
                    </div>
                    <div className="mt-1.5 text-[6.8px] font-medium leading-[1.35] text-[#66645C]">
                      A private signal. She only learns if she says yes too.
                    </div>
                  </div>

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.94 }}
                    className="shrink-0 rounded-full bg-[#A3222D] px-3 py-2 text-[6.8px] font-extrabold text-white shadow-[0_5px_12px_rgba(163,34,45,0.18)]"
                  >
                    I&apos;m ready
                  </motion.button>
                </div>
              </motion.div>

              {/* Chat stream */}
              <div className="absolute inset-x-0 bottom-[74px] top-[144px] z-10 overflow-y-auto overflow-x-hidden px-3 py-2.5.5 pr-5 [scrollbar-width:thin] [scrollbar-color:#C3BDB8_transparent] [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#C3BDB8]">
                <div className="flex min-h-full flex-col gap-2.5">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.35 }}
                    className="self-center rounded-full bg-[#E8D6D0] px-3 py-0.5 text-[6.3px] font-bold text-[#8D3C40]"
                  >
                    Today
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.22, duration: 0.45 }}
                    className="w-[82%] self-start rounded-[1.15rem] rounded-tl-[0.45rem] border border-[#E4C1BE]/70 bg-[#EBCBC8] px-3.5 py-3 text-[8.9px] font-medium leading-[1.55] text-[#342E2C] shadow-[0_5px_14px_rgba(83,51,46,0.055)]"
                  >
                    Okay the shophouse tiles arrived and they are the wrong green.
                    Devastating.
                    <div className="mt-1.5 text-[6.2px] font-medium text-[#9A6A6A]">
                      11:29
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.45 }}
                    className="relative w-[80%] self-end rounded-[1.15rem] rounded-tr-[0.45rem] bg-[#A6232D] px-3.5 pt-3 pb-[18px] text-[8.9px] font-semibold leading-[1.55] text-white shadow-[0_7px_16px_rgba(163,34,45,0.16)]"
                  >
                    Wrong green is still a green. Send a photo, I&apos;ll rule on it.

                    <div className="absolute bottom-[6px] right-3 flex items-center gap-1.5 text-[6.1px] font-medium text-white/65">
                      <span>11:34</span>
                      <span className="tracking-[-0.12em] text-white/70">✓✓</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.58, duration: 0.45 }}
                    className="w-[77%] self-start rounded-[1.15rem] rounded-tl-[0.45rem] border border-[#E4C1BE]/70 bg-[#EBCBC8] px-3.5 py-3 text-[8.9px] font-medium leading-[1.55] text-[#342E2C] shadow-[0_5px_14px_rgba(83,51,46,0.05)]"
                  >
                    Ha. You get one vote. Are you around Thursday?
                    <div className="mt-1.5 text-[6.2px] font-medium text-[#9A6A6A]">
                      11:36
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Composer */}
              <div className="absolute inset-x-0 bottom-0 z-30 h-[74px] border-t border-[#E8DED1] bg-[#FFF9F3]/98 px-3 pt-2.5">
                <div className="flex items-center gap-2">
                  <motion.button
                    type="button"
                    aria-label="Add attachment"
                    whileTap={{ scale: 0.94 }}
                    className="flex h-[25px] w-[25px] shrink-0 items-center justify-center rounded-lg border border-[#E2D4C7] bg-[#FFFDFC] text-[#A3222D]"
                  >
                    <span className="text-[14px] font-light leading-none">+</span>
                  </motion.button>

                  <motion.button
                    type="button"
                    aria-label="AI prompts"
                    whileTap={{ scale: 0.94 }}
                    className="flex h-[25px] w-[25px] shrink-0 items-center justify-center rounded-lg border border-[#EAD8B1] bg-[#F4E7CA]"
                  >
                    <Sparkles
                      className="h-3 w-3 text-[#98252D]"
                      fill="currentColor"
                    />
                  </motion.button>

                  <div className="flex h-7 flex-1 items-center rounded-full border border-[#D8CEC3] bg-white/90 px-3 text-[8.8px] text-[#AAA09A]">
                    Message...
                  </div>

                  <motion.button
                    type="button"
                    aria-label="Send"
                    whileTap={{ scale: 0.94 }}
                    className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#A3222D] pl-0.5 shadow-sm"
                  >
                    <Send className="h-[11px] w-[11px] text-white" />
                  </motion.button>
                </div>

                <div className="mt-1.5 pl-0.5 text-[6.4px] font-medium text-[#A69E99]">
                  3 AI prompts left today · Serasé Core
                </div>
              </div>
            </div>
          </PhoneFrame>
        </motion.div>
      </div>

      {/* ==================== 🚀 Feature 3: Date Planning & Safety ==================== */}
      <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center items-center group w-full"
        >
          <div className="absolute w-[120%] h-[120%] bg-gradient-to-tr from-amber-500/10 to-rose-500/10 rounded-full blur-[80px] -z-10 transition-opacity duration-700 ease-out group-hover:opacity-75" />

          <PhoneFrame screenClassName="bg-[#F8F1EA]">
            <div className="relative h-full overflow-hidden bg-[#F8F1EA]">

              {/* Header */}
              <div className="absolute inset-x-0 top-[30px] z-30 h-[52px] border-b border-[#E8DED1] bg-[#FFF9F3]/98 px-3 backdrop-blur-md">
                <div className="flex h-full items-center justify-between">
                  <div className="flex min-w-0 items-center gap-2">
                    <button
                      type="button"
                      aria-label="Back"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F8E9E7] text-[#98252D]"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2} />
                    </button>

                    <div className="relative h-8 w-8 shrink-0 rounded-full bg-[radial-gradient(circle_at_50%_30%,#DCC8C1_0%,#A98480_52%,#755C64_100%)] shadow-sm">
                      <span className="absolute bottom-[1px] right-[1px] h-2 w-2 rounded-full border-[1.5px] border-[#FFF9F3] bg-[#8FA23D]" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1 text-[11px] font-extrabold leading-tight text-[#2E2928]">
                        <span>Amira</span>
                        <ShieldCheck className="h-2.5 w-2.5 shrink-0 text-[#C79A45]" />
                      </div>
                      <div className="mt-0.5 text-[6.8px] font-bold leading-none text-[#879B32]">
                        Active now
                      </div>
                    </div>
                  </div>

                  <MoreVertical className="h-4 w-4 shrink-0 text-[#98252D]" />
                </div>
              </div>

              {/* Readiness banner — prototype wording */}
              <div className="absolute inset-x-0 top-[82px] z-20 h-[62px] border-b border-[#D8DDB5] bg-[#ECEFCE] px-3 py-2.5">
                <div className="flex h-full items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-[8.8px] font-extrabold leading-tight text-[#292625]">
                      Ready to meet in person?
                    </div>
                    <div className="mt-1 text-[6.2px] font-medium leading-[1.35] text-[#67665D]">
                      A private signal. She only learns if she says yes too.
                    </div>
                  </div>

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.94 }}
                    className="shrink-0 rounded-full bg-[#A3222D] px-3 py-1.5 text-[6.8px] font-extrabold text-white shadow-sm"
                  >
                    I&apos;m ready
                  </motion.button>
                </div>
              </div>

              {/* Scrollable content */}
              <div className="absolute inset-x-0 bottom-[74px] top-[144px] z-10 overflow-y-auto overflow-x-hidden px-3 py-3 pr-5 [scrollbar-width:thin] [scrollbar-color:#9B9996_transparent] [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#9B9996]">
                <div className="flex min-h-full flex-col gap-2.5">

                  {/* chat bubble */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.12, duration: 0.4 }}
                    className="w-[82%] self-start rounded-[1.05rem] rounded-tl-[0.42rem] bg-[#EBCBC8] px-3 py-2.5 text-[8.7px] font-medium leading-[1.5] text-[#342E2C]"
                  >
                    Ha. You get one vote. Are you around Thursday?
                    <div className="mt-1.5 text-[6.1px] font-medium text-[#9A6A6A]">
                      11:36
                    </div>
                  </motion.div>

                  {/* Date Plan */}
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.22, duration: 0.45 }}
                    className="overflow-hidden rounded-[1.2rem] border border-[#E8C785] bg-[#FFFDFC] shadow-[0_8px_18px_rgba(124,88,44,0.07)]"
                  >
                    <div className="flex items-center justify-between px-3 pt-3 pb-2">
                      <span className="text-[6px] font-black uppercase tracking-[0.16em] text-[#A3262D]">
                        Date Plan · Thu 27 Aug
                      </span>
                      <span className="text-[6.3px] font-extrabold text-[#71872C]">
                        Amira is in
                      </span>
                    </div>

                    <div className="px-3 pb-3">
                      {/* itinerary rows */}
                      <div className="space-y-0">
                        <div className="grid grid-cols-[42px_1fr] items-start gap-2 border-b border-[#EFE7DE] py-3">
                          <span className="text-[8px] font-black text-[#A3262D]">
                            18:30
                          </span>
                          <div>
                            <div className="text-[9px] font-bold text-[#2F2A28]">
                              Coffee
                            </div>
                            <div className="mt-1 flex items-center gap-1 text-[6.2px] font-medium text-[#8C827C]">
                              <MapPin className="h-2.5 w-2.5" />
                              Bangsar
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-[42px_1fr] items-start gap-2 border-b border-[#EFE7DE] py-3">
                          <span className="text-[8px] font-black text-[#A3262D]">
                            20:00
                          </span>
                          <div>
                            <div className="text-[9px] font-bold text-[#2F2A28]">
                              Dinner
                            </div>
                            <div className="mt-1 flex items-center gap-1 text-[6.2px] font-medium text-[#8C827C]">
                              <MapPin className="h-2.5 w-2.5" />
                              Jalan Telawi
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* mutual confirmation panel */}
                      <div className="mt-3 rounded-[1rem] border border-[#C8D37B] bg-[#EEF0CB] px-3 py-3">
                        <div className="flex items-center justify-center">
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#8EAE27] text-[#304000]">
                              <CheckCircle2 className="h-4 w-4" strokeWidth={2.2} />
                            </div>
                            <span className="text-[5.8px] font-black uppercase tracking-[0.08em] text-[#6E7E23]">
                              You
                            </span>
                          </div>

                          <div className="mx-3 h-px w-10 bg-[#A8BD42]" />

                          <div className="flex flex-col items-center gap-1">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#8EAE27] text-[#304000]">
                              <CheckCircle2 className="h-4 w-4" strokeWidth={2.2} />
                            </div>
                            <span className="text-[5.8px] font-black uppercase tracking-[0.08em] text-[#6E7E23]">
                              Amira
                            </span>
                          </div>
                        </div>

                        <div className="mt-2 text-center text-[6.6px] font-extrabold text-[#5F7119]">
                          Both confirmed at 17:04
                        </div>
                      </div>

                      {/* quick actions */}
                      <div className="mt-2.5 grid grid-cols-2 gap-1.5">
                        <button
                          type="button"
                          className="flex items-center justify-center gap-1.5 rounded-xl border border-[#E2D9D0] bg-white py-2 text-[6.8px] font-semibold text-[#4C4642]"
                        >
                          <CalendarHeart className="h-3 w-3" />
                          Add to calendar
                        </button>

                        <button
                          type="button"
                          className="flex items-center justify-center gap-1.5 rounded-xl border border-[#E2D9D0] bg-white py-2 text-[6.8px] font-semibold text-[#4C4642]"
                        >
                          <MapPin className="h-3 w-3" />
                          Directions
                        </button>
                      </div>

                      {/* edit actions */}
                      <div className="mt-2 grid grid-cols-[1fr_auto] gap-1.5">
                        <button
                          type="button"
                          className="rounded-full border border-[#D39B9C] bg-white py-1.5 text-[6.8px] font-bold text-[#872226]"
                        >
                          Edit plan
                        </button>

                        <button
                          type="button"
                          className="rounded-full border border-[#E5DDD6] bg-white px-4 py-1.5 text-[6.8px] font-semibold text-[#7E7671]"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </motion.div>

                  {/* locked-in bubble */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.42, duration: 0.4 }}
                    className="w-[64%] self-start rounded-[1rem] rounded-tl-[0.4rem] bg-[#EBCBC8] px-3 py-2.5 text-[8.4px] font-medium leading-[1.5] text-[#342E2C]"
                  >
                    Locked in. I will see you there.
                    <div className="mt-1.5 text-[6px] font-medium text-[#9A6A6A]">
                      17:04
                    </div>
                  </motion.div>

                  {/* Safety card */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.54, duration: 0.4 }}
                    className="rounded-[1rem] border border-[#F1A8AC] bg-[#FBE9E7] px-3 py-2.5"
                  >
                    <div className="mb-1.5 text-[5.8px] font-black uppercase tracking-[0.15em] text-[#E05A62]">
                      Date is set · Safety
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="text-[8.8px] font-extrabold text-[#2F2A28]">
                          Sibling
                        </div>
                        <div className="mt-0.5 whitespace-nowrap text-[6.2px] font-medium text-[#8A817C]">
                          +60 12 345 6789 · one tap to call
                        </div>
                      </div>

                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.94 }}
                        className="flex shrink-0 items-center gap-1 rounded-full bg-[#E75661] px-3 py-1.5 text-white"
                      >
                        <Phone className="h-2.5 w-2.5" />
                        <span className="text-[6.8px] font-extrabold">Call</span>
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Composer */}
              <div className="absolute inset-x-0 bottom-0 z-30 h-[74px] border-t border-[#E8DED1] bg-[#FFF9F3]/98 px-3 pt-2.5">
                <div className="flex items-center gap-2">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.94 }}
                    aria-label="Add attachment"
                    className="flex h-[25px] w-[25px] shrink-0 items-center justify-center rounded-lg border border-[#E2D4C7] bg-[#FFFDFC] text-[#A3222D]"
                  >
                    <span className="text-[14px] font-light leading-none">+</span>
                  </motion.button>

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.94 }}
                    aria-label="AI Prompt"
                    className="flex h-[25px] w-[25px] shrink-0 items-center justify-center rounded-lg border border-[#EAD8B1] bg-[#F4E7CA]"
                  >
                    <Sparkles className="h-3 w-3 text-[#98252D]" fill="currentColor" />
                  </motion.button>

                  <div className="flex h-7 flex-1 items-center rounded-full border border-[#D8CEC3] bg-white/90 px-3 text-[8px] text-[#AAA09A]">
                    Message...
                  </div>

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.94 }}
                    aria-label="Send"
                    className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#A3222D] pl-0.5 shadow-sm"
                  >
                    <Send className="h-[11px] w-[11px] text-white" />
                  </motion.button>
                </div>

                <div className="mt-1.5 pl-0.5 text-[6.4px] font-medium text-[#A69E99]">
                  3 AI prompts left today · Serasé Core
                </div>
              </div>
            </div>
          </PhoneFrame>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          className="space-y-6"
        >
          <div className="w-14 h-14 bg-[#FDF4E5] rounded-2xl flex items-center justify-center text-[#D4A373] mb-2">
            <CalendarHeart className="w-7 h-7" />
          </div>

          <h3 className="text-3xl font-extrabold text-[#333333] tracking-tight">
            Date Planning & Safety
          </h3>

          <p className="text-[17px] text-gray-500 leading-relaxed">
            Move from chatting to meeting with a shared date plan. Confirm the details
            together, add the plan to your calendar, get directions, and keep your{" "}
            <span className="font-bold text-[#333333]">safety contact</span>{" "}
            one tap away.
          </p>
        </motion.div>
      </div>

      {/* One connected journey */}
      <motion.section
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="serase-eyebrow text-[#8A2128]">One connected journey</div>
          <h2 className="mt-3 text-[38px] md:text-[44px] font-black tracking-[-0.04em] text-[#241F1D]">Not separate tools. One flow.</h2>
          <p className="mt-4 text-[16px] font-medium leading-[1.75] text-muted-foreground">
            Discover, connect, chat, signal readiness and build a real date plan without losing the thread.
          </p>
        </div>

        <div className="overflow-hidden rounded-serase-section border serase-card-border bg-[#FFF9F5]/90 p-7 md:p-10">
          <div className="relative">
            {/* Track starts at Discover centre and ends at Date Plan centre */}
            <div
              aria-hidden="true"
              className="absolute top-[24px] z-0 hidden h-[2px] bg-gradient-to-r from-[#D4A74D]/50 via-[#8A2128]/55 to-[#D4A74D]/50 md:block"
              style={{
                left: "calc((100% - 96px) / 10)",
                right: "calc((100% - 96px) / 10)",
              }}
            >
              <span
                className="serase-css-motion absolute left-0 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D5AA54] shadow-[0_0_18px_rgba(213,170,84,0.7)]"
                style={{
                  animation: shouldReduceMotion ? "none" : "featureJourneyNode 10.5s cubic-bezier(0.45, 0, 0.55, 1) infinite",
                  willChange: "left",
                }}
              />
            </div>

            <div className="relative z-10 grid gap-8 md:grid-cols-5 md:gap-6">
              {[
                ["01", "Discover", Sparkles],
                ["02", "Connect", Star],
                ["03", "Chat", MessageCircle],
                ["04", "Ready", CheckCircle2],
                ["05", "Date Plan", CalendarHeart],
              ].map(([step, label, Icon]) => {
                const JourneyIcon = Icon as React.ElementType;
                return (
                  <div key={label as string} className="relative flex flex-col items-center text-center">
                    <div className="relative z-20 flex h-12 w-12 items-center justify-center rounded-full bg-[#8A2128] text-white ring-[5px] ring-[#F8EEE8] shadow-[0_7px_16px_rgba(138,33,40,0.12)]">
                      <JourneyIcon className="h-5 w-5" />
                    </div>
                    <div className="mt-4 text-[10px] font-black uppercase tracking-[0.14em] text-[#9A7B6F]">
                      Step {step as string}
                    </div>
                    <div className="mt-1 text-[17px] font-black text-[#312B28]">
                      {label as string}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <section className="rounded-serase-section bg-[#7F1F26] px-8 py-12 text-center text-white shadow-[0_24px_60px_rgba(127,31,38,0.18)]">
        <div className="mx-auto max-w-2xl">
          <div className="serase-eyebrow text-[#E8C76E]">Explore Serasé your way</div>
          <h2 className="mt-3 text-[36px] md:text-[42px] font-black tracking-[-0.04em]">Go deeper into the experience.</h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] font-medium leading-[1.75] text-white/80">
            See how 48-hour connections work or explore how Serasé AI supports conversation and date planning.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/timed-connections" className="group inline-flex items-center gap-2 serase-btn-nav bg-[#E2B958] px-5 py-3 text-[13px] font-black text-[#6E181E] serase-interact-nav">
              See Timed Connections <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/ai-companion" className="group inline-flex items-center gap-2 serase-btn-nav border border-white/20 bg-white/10 px-5 py-3 text-[13px] font-black text-white transition hover:bg-white/15">
              Meet Serasé AI <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>


    </div>
  );
}