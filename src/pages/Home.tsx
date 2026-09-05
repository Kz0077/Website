import React from 'react';
import { Link } from 'react-router';
import { Sparkles, Star, ArrowRight, MapPin, MessageCircle, ShieldCheck, Clock3, CalendarCheck2 } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion'; 
import { useToast } from '../context/ToastContext';
import { usePageMeta } from "../hooks/usePageMeta";
import { getStaggerContainer, getFadeUpItem } from '../utils/animations';

import seraseLogo from '../../.figma/attachments/image-0.png';
import seraseHowItWorksBg from '../../.figma/attachments/serase-how-it-works.png';
import seraseHeroPhoto1 from '../../.figma/attachments/serase-hero-photo-01.png';
import seraseHeroPhoto2 from '../../.figma/attachments/serase-hero-photo-02.png';
import seraseHeroPhoto3 from '../../.figma/attachments/serase-hero-photo-03.png';

export default function Home() {
  usePageMeta("Serasé | Real People. Real Connections.", "Identity-verified dating with intentional connections, private AI support, 48-hour connection windows, and built-in date planning.");
  const { showToast } = useToast();
  
  const shouldReduceMotion = useReducedMotion();
  const stagger = getStaggerContainer(shouldReduceMotion);
  const fadeUp = getFadeUpItem(shouldReduceMotion);

  const handleStoreClick = (platform: 'ios' | 'android') => {
    const platformName = platform === 'ios' ? 'iOS' : 'Android';
    showToast(`Serasé for ${platformName} is coming soon.`);
  };


  return (
    <div className="min-h-screen bg-background selection:bg-accent/30 selection:text-primary overflow-x-hidden pt-8 pb-32 relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap');

        .serase-caveat {
          font-family: 'Caveat', cursive;
          font-optical-sizing: auto;
        }

        @keyframes seraseProductOrbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes seraseJourneyTravel {
          0% { left: 0%; }
          50% { left: 100%; }
          100% { left: 0%; }
        }

        @keyframes seraseNodePulse {
          0%, 100% {
            box-shadow: 0 0 12px rgba(212, 167, 77, 0.42),
                        0 0 0 0 rgba(212, 167, 77, 0.24);
          }
          50% {
            box-shadow: 0 0 20px rgba(212, 167, 77, 0.82),
                        0 0 0 7px rgba(212, 167, 77, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .serase-css-motion {
            animation: none !important;
          }
        }
      `}</style>
      <section className="relative isolate -mt-20 serase-container-hero px-6 pb-24 pt-[7.5rem] lg:pb-28 lg:pt-[8.5rem]">
        {/* Cinematic hero atmosphere now continues behind the transparent full header. */}
        <div className="pointer-events-none absolute inset-x-[-12vw] top-[-80px] z-0 h-[720px] overflow-hidden">
          <motion.div
            animate={shouldReduceMotion ? undefined : { scale: [0.96, 1.06, 0.96], opacity: [0.72, 1, 0.72] }}
            transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
            className="absolute left-[47%] top-[42%] h-[510px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(184,62,76,0.19)_0%,rgba(226,164,131,0.14)_36%,rgba(232,191,111,0.08)_58%,transparent_74%)] blur-[58px]"
          />
          <div className="absolute left-[57%] top-[47%] h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8A2128]/[0.055]" />
          <div className="absolute left-[57%] top-[47%] h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4A66E]/[0.055]" />
          <div className="absolute left-[57%] top-[47%] h-[770px] w-[770px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8A2128]/[0.035]" />
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10 grid min-h-[610px] w-full items-center gap-10 lg:grid-cols-[1.03fr_0.97fr]"
        >
          {/* Copy */}
          <div className="relative z-10 mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <motion.div
              variants={fadeUp}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#8A2128]/15 bg-white/55 px-4 py-2 serase-eyebrow text-[#8A2128] shadow-[0_8px_28px_rgba(90,46,41,0.05)] backdrop-blur-xl"
            >
              <Sparkles className="h-3.5 w-3.5" />
              The New Standard of Dating
            </motion.div>

            <motion.div variants={fadeUp} className="relative">
              <div className="pointer-events-none absolute -left-5 top-2 hidden h-28 w-[3px] rounded-full bg-gradient-to-b from-[#8A2128] via-[#C0474F] to-[#DDAA56] opacity-70 xl:block" />
              <h1 className="text-[54px] font-black leading-[0.98] tracking-[-0.055em] text-serase-heading sm:text-6xl lg:text-[76px]">
                Real People.
                <br />
                <span className="bg-gradient-to-r from-[#A21F2D] via-[#C71E3B] to-[#E56A0A] bg-clip-text text-transparent">
                  Real Connections.
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-8 max-w-xl text-[17px] font-semibold leading-[1.8] text-muted-foreground lg:mx-0 lg:text-[18px]"
            >
              Dating should feel clear, intentional and human. Serasé is being built for people who want less noise, more meaning, and a connection that can move beyond the screen.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
            >
              {/* Google Play — branded badge style, launch-safe copy */}
              <button
                type="button"
                onClick={() => handleStoreClick('android')}
                aria-label="Google Play — coming soon"
                className="group flex h-[64px] w-full min-w-[214px] items-center gap-3 rounded-[12px] border border-black/10 bg-[#171717] px-5 text-white shadow-[0_14px_30px_rgba(17,24,39,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_18px_34px_rgba(17,24,39,0.22)] active:translate-y-0 sm:w-auto"
              >
                <svg
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                  className="h-9 w-9 shrink-0"
                >
                  <path d="M5.3 4.7c-.8.9-1.3 2.2-1.3 3.8v31c0 1.6.5 2.9 1.3 3.8L25.6 24 5.3 4.7Z" fill="#00D9FF" />
                  <path d="M32.4 17.5 8.3 3.8c-.9-.5-1.8-.6-2.5-.3L25.6 24l6.8-6.5Z" fill="#00F076" />
                  <path d="M32.4 30.5 25.6 24 5.8 44.5c.7.3 1.6.2 2.5-.3l24.1-13.7Z" fill="#FFDB3A" />
                  <path d="M43 23.2 35.4 19l-9.8 5 9.8 5 7.6-4.2c1.3-.8 1.3-2 0-2.6Z" fill="#FF4B55" />
                </svg>

                <div className="text-left">
                  <div className="text-[9px] font-bold uppercase leading-none tracking-[0.08em] text-white/72">
                    Coming soon on
                  </div>
                  <div className="mt-1 text-[21px] font-semibold leading-none tracking-[-0.02em]">
                    Google Play
                  </div>
                </div>
              </button>

              {/* App Store — branded badge style, launch-safe copy */}
              <button
                type="button"
                onClick={() => handleStoreClick('ios')}
                aria-label="App Store — coming soon"
                className="group flex h-[64px] w-full min-w-[214px] items-center gap-3 rounded-[12px] border border-black/10 bg-[#171717] px-5 text-white shadow-[0_14px_30px_rgba(17,24,39,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_18px_34px_rgba(17,24,39,0.22)] active:translate-y-0 sm:w-auto"
              >
                <svg
                  viewBox="0 0 384 512"
                  aria-hidden="true"
                  className="h-9 w-9 shrink-0 fill-current"
                >
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9Zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.1-12 69.5-34.3Z" />
                </svg>

                <div className="text-left">
                  <div className="text-[9px] font-bold uppercase leading-none tracking-[0.08em] text-white/72">
                    Coming soon on the
                  </div>
                  <div className="mt-1 text-[21px] font-semibold leading-none tracking-[-0.02em]">
                    App Store
                  </div>
                </div>
              </button>
            </motion.div>

          </div>

          {/* Brand photo story — replaces the product phone mockup */}
          <motion.div
            variants={fadeUp}
            className="relative mx-auto flex h-[540px] w-full max-w-[690px] items-center justify-center sm:h-[590px] lg:h-[610px]"
          >
            {/* Soft stage glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[470px] w-[570px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,247,239,0.88)_0%,rgba(230,177,162,0.22)_43%,rgba(138,33,40,0.06)_66%,transparent_76%)] blur-[16px]" />

            {/* Decorative connection rings */}
            <motion.div
              aria-hidden="true"
              animate={shouldReduceMotion ? undefined : { rotate: 360 }}
              transition={{ repeat: Infinity, duration: 44, ease: 'linear' }}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8A2128]/[0.07]"
            />
            <motion.div
              aria-hidden="true"
              animate={shouldReduceMotion ? undefined : { rotate: -360 }}
              transition={{ repeat: Infinity, duration: 58, ease: 'linear' }}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D2A968]/[0.07]"
            />

            {/* Back photo — left */}
            <motion.figure
              animate={shouldReduceMotion ? undefined : { y: [0, -7, 0], rotate: [-7, -5.8, -7] }}
              transition={{ repeat: Infinity, duration: 7.8, ease: 'easeInOut' }}
              whileHover={shouldReduceMotion ? undefined : { y: -10, rotate: -3.5, scale: 1.025 }}
              className="absolute left-[1%] top-[98px] z-10 w-[220px] overflow-hidden rounded-[1.8rem] border-[8px] border-white/90 bg-white shadow-[0_24px_55px_rgba(77,43,40,0.18)] sm:left-[2%] sm:w-[250px] lg:left-[0%] lg:top-[90px] lg:w-[270px]"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-[#EEDFD7]">
                {seraseHeroPhoto2 ? (
                  <img
                    src={seraseHeroPhoto2}
                    alt="Serasé lifestyle moment"
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(145deg,#F3E6DF,#D8BDB3)] text-[10px] font-black uppercase tracking-[0.14em] text-[#8A5C58]/55">
                    Photo 02
                  </div>
                )}
              </div>
            </motion.figure>

            {/* Back photo — right */}
            <motion.figure
              animate={shouldReduceMotion ? undefined : { y: [0, 8, 0], rotate: [6.5, 5.2, 6.5] }}
              transition={{ repeat: Infinity, duration: 8.6, ease: 'easeInOut', delay: 0.7 }}
              whileHover={shouldReduceMotion ? undefined : { y: 4, rotate: 3, scale: 1.025 }}
              className="absolute bottom-[54px] right-[0%] z-10 w-[210px] overflow-hidden rounded-[1.8rem] border-[8px] border-white/90 bg-white shadow-[0_24px_55px_rgba(77,43,40,0.18)] sm:right-[1%] sm:w-[238px] lg:bottom-[48px] lg:right-[0%] lg:w-[255px]"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-[#EEDFD7]">
                {seraseHeroPhoto3 ? (
                  <img
                    src={seraseHeroPhoto3}
                    alt="Serasé connection moment"
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(145deg,#EADBD3,#CDAAA1)] text-[10px] font-black uppercase tracking-[0.14em] text-[#8A5C58]/55">
                    Photo 03
                  </div>
                )}
              </div>
            </motion.figure>

            {/* Main photo — use the beach image here */}
            <motion.figure
              animate={shouldReduceMotion ? undefined : { y: [0, -6, 0], rotate: [1.4, 0.4, 1.4] }}
              transition={{ repeat: Infinity, duration: 6.8, ease: 'easeInOut' }}
              whileHover={shouldReduceMotion ? undefined : { y: -8, rotate: 0, scale: 1.018 }}
              className="group relative z-20 w-[78%] max-w-[480px] overflow-hidden rounded-[2.25rem] border-[9px] border-white/92 bg-white shadow-[0_34px_80px_rgba(71,36,36,0.24)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.7rem] bg-[#E7D7CC]">
                {seraseHeroPhoto1 ? (
                  <img
                    src={seraseHeroPhoto1}
                    alt="Couple walking together"
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.025]"
                    draggable={false}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(145deg,#F3E4DA,#CBA99D)] text-[11px] font-black uppercase tracking-[0.16em] text-[#7E554F]/60">
                    Main Photo 01
                  </div>
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#311A18]/28 via-transparent to-white/8" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#351B19]/34 to-transparent" />

                <div className="absolute bottom-5 left-5 rounded-full border border-white/30 bg-white/82 px-4 py-2 text-[11px] font-black tracking-[0.04em] text-[#4A302D] shadow-sm backdrop-blur-md">
                  Beyond the screen.
                </div>
              </div>
            </motion.figure>

            {/* Small accent dots */}
            <motion.span
              aria-hidden="true"
              animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 5.8, ease: 'easeInOut' }}
              className="pointer-events-none absolute right-[9%] top-[72px] h-3 w-3 rounded-full bg-[#D7AA4D] shadow-[0_0_20px_rgba(215,170,77,0.55)]"
            />
            <motion.span
              aria-hidden="true"
              animate={shouldReduceMotion ? undefined : { y: [0, 7, 0] }}
              transition={{ repeat: Infinity, duration: 6.4, ease: 'easeInOut', delay: 1 }}
              className="pointer-events-none absolute bottom-[84px] left-[9%] h-3.5 w-3.5 rounded-full bg-[#A8303B] shadow-[0_0_22px_rgba(168,48,59,0.42)]"
            />
          </motion.div>
        </motion.div>
      </section>



      {/* ==================== Why Serasé + How It Works (Combined) ==================== */}
      <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden py-0">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full overflow-hidden bg-[#F5ECE7]"
        >
          <div className="relative min-h-[980px] overflow-hidden md:min-h-[900px] lg:h-[calc(100svh-72px)] lg:min-h-[700px] lg:max-h-[900px]">
            <img
              src={seraseHowItWorksBg}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.90]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,249,245,0.93)_0%,rgba(255,249,245,0.82)_27%,rgba(255,248,244,0.56)_48%,rgba(255,246,240,0.22)_69%,rgba(67,35,31,0.12)_100%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[44%] bg-gradient-to-b from-[#FFF9F4]/44 via-[#FFF9F4]/10 to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-[#2B1917]/22 via-[#5B332C]/6 to-transparent"
            />

            {/* ==================== HEADING + BELIEFS ==================== */}
            <div className="absolute left-[4.2%] right-[4.2%] top-[4.5%] z-20 max-w-[940px]">
              <div className="inline-flex items-center gap-2.5 border-b-2 border-[#8A2128] pb-2.5 text-[13px] font-black uppercase tracking-[0.22em] text-[#8A2128] md:text-[14px]">
                <Sparkles className="h-4 w-4" />
                Why Serasé + How It Works
              </div>

              <div className="mt-6 max-w-[900px]">
                <h2 className="serase-caveat text-[54px] font-bold leading-[0.9] tracking-[-0.02em] text-[#231A18] sm:text-[64px] md:text-[72px] lg:text-[78px] xl:text-[82px]">
                  From verified hello
                  <br />
                  <span className="bg-gradient-to-r from-[#A21F2D] via-[#C71E3B] to-[#E56A0A] bg-clip-text text-transparent">
                    to a real date.
                  </span>
                </h2>

                <p className="serase-caveat mt-4 max-w-[760px] text-[22px] font-medium leading-[1.26] text-[#746762] md:text-[23px] lg:text-[24px]">
                  Serasé is built around three simple beliefs: trust should come first, technology should support you, and a connection should have somewhere to go.
                </p>
              </div>
            </div>

            {/* ==================== DESKTOP JOURNEY ==================== */}
            <div className="absolute inset-x-[2.5%] top-[41%] bottom-[2.5%] z-20 hidden md:block">
              {/*
                Natural one-line snake:
                01 → 02 → 03
                          ↘
                04 → 05 → 06

                Every icon centre is mapped directly onto the path.
              */}
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
                viewBox="0 0 1200 520"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="seraseJourneyLine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C8871E" />
                    <stop offset="28%" stopColor="#D99D24" />
                    <stop offset="58%" stopColor="#EDB93B" />
                    <stop offset="100%" stopColor="#F2C24C" />
                  </linearGradient>

                  <linearGradient id="seraseJourneyShadow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7E5422" stopOpacity="0.22" />
                    <stop offset="35%" stopColor="#9B6A27" stopOpacity="0.14" />
                    <stop offset="72%" stopColor="#C49336" stopOpacity="0.07" />
                    <stop offset="100%" stopColor="#DDB24D" stopOpacity="0.03" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0 112
                     C 72 108, 102 112, 122 112
                     C 235 128, 330 126, 432 92
                     C 555 52, 710 70, 840 120
                     C 930 154, 970 205, 940 248
                     C 880 320, 600 300, 340 330
                     C 430 356, 540 372, 650 360
                     C 780 344, 890 336, 986 342
                     C 1064 347, 1134 339, 1200 342"
                  fill="none"
                  stroke="url(#seraseJourneyShadow)"
                  strokeWidth="5.2"
                  strokeLinecap="round"
                  opacity="0.95"
                />
                <path
                  d="M 0 112
                     C 72 108, 102 112, 122 112
                     C 235 128, 330 126, 432 92
                     C 555 52, 710 70, 840 120
                     C 930 154, 970 205, 940 248
                     C 880 320, 600 300, 340 330
                     C 430 356, 540 372, 650 360
                     C 780 344, 890 336, 986 342
                     C 1064 347, 1134 339, 1200 342"
                  fill="none"
                  stroke="url(#seraseJourneyLine)"
                  strokeWidth="2.35"
                  strokeLinecap="round"
                  strokeDasharray="2.4 7.2"
                />
              </svg>

              {/* 01 VERIFY */}
              <div className="absolute z-20 h-0 w-0" style={{ left: '10.17%', top: '21.54%' }}>
                <div
                  tabIndex={0}
                  aria-label="Show Verify details"
                  className="peer absolute left-0 top-0 flex h-[54px] w-[54px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-[3px] border-[#FFF8F2] bg-[#9E2530] text-white shadow-[0_0_0_2px_rgba(238,194,87,0.30),0_0_20px_rgba(230,181,75,0.26),0_10px_24px_rgba(70,28,31,0.20)] outline-none transition-transform duration-200 hover:scale-[1.06] focus-visible:scale-[1.06] focus-visible:ring-4 focus-visible:ring-[#E7B84D]/30"
                >
                  <ShieldCheck className="h-[18px] w-[18px]" />
                </div>
                <div className="absolute left-0 top-[34px] -translate-x-1/2 rounded-full border border-white/70 bg-white/92 px-2 py-0.5 text-[8px] font-black text-[#9B3037] shadow-sm">01</div>
                <div className="absolute left-0 top-[61px] -translate-x-1/2 whitespace-nowrap serase-caveat text-[24px] font-bold leading-none text-[#40332F]">Verify</div>

                <div className="invisible pointer-events-none absolute left-[62px] top-0 z-40 w-[238px] -translate-y-1/2 translate-x-2 scale-[0.97] rounded-[1.35rem] border border-white/82 bg-white/95 p-4 opacity-0 shadow-[0_18px_38px_rgba(75,45,42,0.15)] backdrop-blur-[20px] transition-[opacity,transform,visibility] duration-200 ease-out peer-hover:visible peer-hover:pointer-events-auto peer-hover:translate-x-0 peer-hover:scale-100 peer-hover:opacity-100 peer-focus:visible peer-focus:pointer-events-auto peer-focus:translate-x-0 peer-focus:scale-100 peer-focus:opacity-100">
                  <div className="text-[8px] font-black uppercase tracking-[0.16em] text-[#A23B42]">Verified from the start</div>
                  <div className="serase-caveat mt-1.5 text-[21px] font-bold leading-none text-[#2B2321]">Trust first.</div>
                  <p className="serase-caveat mt-2 text-[16px] font-medium leading-[1.1] text-[#756863]">
                    Every introduction begins with identity confidence.
                  </p>
                  <div className="mt-3 flex items-center gap-3 border-t border-[#E9DDD7] pt-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#F1D8D5] text-[#8A2128]">
                      <ShieldCheck className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-black text-[#2E6842]">Identity verified</div>
                      <div className="serase-caveat mt-0.5 text-[15px] font-medium leading-[1.02] text-[#756863]">ID + live selfie check</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 02 DISCOVER */}
              <div className="absolute z-20 h-0 w-0" style={{ left: '36%', top: '17.69%' }}>
                <div
                  tabIndex={0}
                  aria-label="Show Discover details"
                  className="peer absolute left-0 top-0 flex h-[54px] w-[54px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-[3px] border-[#FFF8F2] bg-[#9E2530] text-white shadow-[0_0_0_2px_rgba(238,194,87,0.30),0_0_20px_rgba(230,181,75,0.26),0_10px_24px_rgba(70,28,31,0.20)] outline-none transition-transform duration-200 hover:scale-[1.06] focus-visible:scale-[1.06] focus-visible:ring-4 focus-visible:ring-[#E7B84D]/30"
                >
                  <Sparkles className="h-[18px] w-[18px]" />
                </div>
                <div className="absolute left-0 top-[34px] -translate-x-1/2 rounded-full border border-white/70 bg-white/92 px-2 py-0.5 text-[8px] font-black text-[#9B3037] shadow-sm">02</div>
                <div className="absolute left-0 top-[61px] -translate-x-1/2 whitespace-nowrap serase-caveat text-[24px] font-bold leading-none text-[#40332F]">Discover</div>

                <div className="invisible pointer-events-none absolute left-[62px] top-0 z-40 w-[225px] -translate-y-1/2 translate-x-2 scale-[0.97] rounded-[1.35rem] border border-white/82 bg-white/95 p-4 opacity-0 shadow-[0_18px_38px_rgba(75,45,42,0.15)] backdrop-blur-[20px] transition-[opacity,transform,visibility] duration-200 ease-out peer-hover:visible peer-hover:pointer-events-auto peer-hover:translate-x-0 peer-hover:scale-100 peer-hover:opacity-100 peer-focus:visible peer-focus:pointer-events-auto peer-focus:translate-x-0 peer-focus:scale-100 peer-focus:opacity-100">
                  <div className="flex gap-3">
                    <div className="h-[72px] w-[58px] shrink-0 rounded-[0.9rem] bg-[radial-gradient(circle_at_50%_26%,#E0C8BE_0%,#B99288_50%,#76534F_100%)]" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <div className="text-[12px] font-black text-[#2F2927]">Aisha, 27</div>
                        <span className="rounded-full bg-[#E7C66E] px-1.5 py-0.5 text-[5px] font-black uppercase text-[#8A2128]">Verified</span>
                      </div>
                      <div className="mt-1 text-[10px] font-bold text-[#756863]">Writer · KL</div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {['Travel', 'Art', 'Coffee'].map((tag) => (
                          <span key={tag} className="rounded-full bg-[#F4ECE6] px-2 py-1 text-[8px] font-black text-[#745F57]">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="serase-caveat mt-3 text-[15px] font-medium leading-[1.08] text-[#756863]">
                    See more than a photo before deciding whether to connect.
                  </div>
                </div>
              </div>

              {/* 03 CONNECT */}
              <div className="absolute z-20 h-0 w-0" style={{ left: '70%', top: '23.08%' }}>
                <div
                  tabIndex={0}
                  aria-label="Show Connect details"
                  className="peer absolute left-0 top-0 flex h-[54px] w-[54px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-[3px] border-[#FFF8F2] bg-[#9E2530] text-white shadow-[0_0_0_2px_rgba(238,194,87,0.30),0_0_20px_rgba(230,181,75,0.26),0_10px_24px_rgba(70,28,31,0.20)] outline-none transition-transform duration-200 hover:scale-[1.06] focus-visible:scale-[1.06] focus-visible:ring-4 focus-visible:ring-[#E7B84D]/30"
                >
                  <MessageCircle className="h-[18px] w-[18px]" />
                </div>
                <div className="absolute left-0 top-[34px] -translate-x-1/2 rounded-full border border-white/70 bg-white/92 px-2 py-0.5 text-[8px] font-black text-[#9B3037] shadow-sm">03</div>
                <div className="absolute left-0 top-[61px] -translate-x-1/2 whitespace-nowrap serase-caveat text-[24px] font-bold leading-none text-white drop-shadow-[0_2px_7px_rgba(38,24,21,0.36)]">Connect</div>

                <div className="invisible pointer-events-none absolute right-[62px] top-0 z-40 w-[230px] -translate-y-1/2 -translate-x-2 scale-[0.97] rounded-[1.35rem] border border-white/82 bg-white/95 p-4 opacity-0 shadow-[0_18px_38px_rgba(75,45,42,0.15)] backdrop-blur-[20px] transition-[opacity,transform,visibility] duration-200 ease-out peer-hover:visible peer-hover:pointer-events-auto peer-hover:translate-x-0 peer-hover:scale-100 peer-hover:opacity-100 peer-focus:visible peer-focus:pointer-events-auto peer-focus:translate-x-0 peer-focus:scale-100 peer-focus:opacity-100">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F5E6C2] text-[#B27823]">
                      <Clock3 className="h-4 w-4" />
                    </div>
                    <div className="text-[12px] font-black text-[#4A3C36]">48-hour connection</div>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#E8DED7]">
                    <div className="h-full w-[64%] rounded-full bg-gradient-to-r from-[#D2A44D] to-[#B87D2A]" />
                  </div>
                  <div className="serase-caveat mt-2.5 text-[16px] font-medium leading-[1.08] text-[#756863]">
                    Keep the momentum visible while the connection is still fresh.
                  </div>
                </div>
              </div>

              {/* 04 AI ICEBREAK */}
              <div className="absolute z-20 h-0 w-0" style={{ left: '28.33%', top: '63.46%' }}>
                <div
                  tabIndex={0}
                  aria-label="Show AI Icebreak details"
                  className="peer absolute left-0 top-0 flex h-[54px] w-[54px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-[3px] border-[#FFF8F2] bg-[#9E2530] text-white shadow-[0_0_0_2px_rgba(238,194,87,0.30),0_0_20px_rgba(230,181,75,0.26),0_10px_24px_rgba(70,28,31,0.20)] outline-none transition-transform duration-200 hover:scale-[1.06] focus-visible:scale-[1.06] focus-visible:ring-4 focus-visible:ring-[#E7B84D]/30"
                >
                  <Star className="h-[18px] w-[18px]" />
                </div>
                <div className="absolute left-0 top-[34px] -translate-x-1/2 rounded-full border border-white/70 bg-white/92 px-2 py-0.5 text-[8px] font-black text-[#9B3037] shadow-sm">04</div>
                <div className="absolute left-0 top-[61px] -translate-x-1/2 whitespace-nowrap serase-caveat text-[24px] font-bold leading-none text-[#40332F]">AI icebreak</div>

                <div className="invisible pointer-events-none absolute left-[62px] top-0 z-40 w-[245px] -translate-y-1/2 translate-x-2 scale-[0.97] rounded-[1.35rem] border border-white/82 bg-white/95 p-4 opacity-0 shadow-[0_18px_38px_rgba(75,45,42,0.15)] backdrop-blur-[20px] transition-[opacity,transform,visibility] duration-200 ease-out peer-hover:visible peer-hover:pointer-events-auto peer-hover:translate-x-0 peer-hover:scale-100 peer-hover:opacity-100 peer-focus:visible peer-focus:pointer-events-auto peer-focus:translate-x-0 peer-focus:scale-100 peer-focus:opacity-100">
                  <div className="text-[8px] font-black uppercase tracking-[0.16em] text-[#A06A1F]">AI that supports you</div>
                  <div className="serase-caveat mt-1.5 text-[21px] font-bold leading-none text-[#2B2321]">Support, not takeover.</div>
                  <p className="serase-caveat mt-2 text-[16px] font-medium leading-[1.1] text-[#756863]">
                    Serasé AI helps while your voice and choices stay yours.
                  </p>
                  <div className="serase-caveat mt-3 rounded-[0.95rem] bg-[#F8F2EE] px-3 py-2 text-[14px] font-medium leading-[1.08] text-[#544946]">
                    “Loved your travel photos — favourite weekend spot in KL?”
                  </div>
                </div>
              </div>

              {/* 05 PLAN A DATE */}
              <div className="absolute z-20 h-0 w-0" style={{ left: '54.17%', top: '69.23%' }}>
                <div
                  tabIndex={0}
                  aria-label="Show Plan a Date details"
                  className="peer absolute left-0 top-0 flex h-[54px] w-[54px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-[3px] border-[#FFF8F2] bg-[#9E2530] text-white shadow-[0_0_0_2px_rgba(238,194,87,0.30),0_0_20px_rgba(230,181,75,0.26),0_10px_24px_rgba(70,28,31,0.20)] outline-none transition-transform duration-200 hover:scale-[1.06] focus-visible:scale-[1.06] focus-visible:ring-4 focus-visible:ring-[#E7B84D]/30"
                >
                  <CalendarCheck2 className="h-[18px] w-[18px]" />
                </div>
                <div className="absolute left-0 top-[34px] -translate-x-1/2 rounded-full border border-white/70 bg-white/92 px-2 py-0.5 text-[8px] font-black text-[#9B3037] shadow-sm">05</div>
                <div className="absolute left-0 top-[61px] -translate-x-1/2 whitespace-nowrap serase-caveat text-[24px] font-bold leading-none text-white drop-shadow-[0_2px_7px_rgba(38,24,21,0.34)]">Plan a date</div>

                <div className="invisible pointer-events-none absolute left-[62px] top-0 z-40 w-[225px] -translate-y-1/2 translate-x-2 scale-[0.97] rounded-[1.35rem] border border-white/82 bg-white/95 p-4 opacity-0 shadow-[0_18px_38px_rgba(75,45,42,0.15)] backdrop-blur-[20px] transition-[opacity,transform,visibility] duration-200 ease-out peer-hover:visible peer-hover:pointer-events-auto peer-hover:translate-x-0 peer-hover:scale-100 peer-hover:opacity-100 peer-focus:visible peer-focus:pointer-events-auto peer-focus:translate-x-0 peer-focus:scale-100 peer-focus:opacity-100">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F4E1B6] text-[#A06A1F]">
                      <CalendarCheck2 className="h-4 w-4" />
                    </div>
                    <div className="text-[12px] font-black text-[#4A3C36]">Date ideas ready</div>
                  </div>
                  <div className="mt-3 grid gap-1.5 text-[11px] font-bold text-[#756863]">
                    <div className="rounded-full bg-[#F6EFE9] px-3 py-2">Coffee in Bangsar</div>
                    <div className="rounded-full bg-[#F6EFE9] px-3 py-2">Thursday · 8:00 PM</div>
                  </div>
                </div>
              </div>

              {/* 06 MEET */}
              <div className="absolute z-20 h-0 w-0" style={{ left: '82.17%', top: '65.77%' }}>
                <div
                  tabIndex={0}
                  aria-label="Show Meet details"
                  className="peer absolute left-0 top-0 flex h-[54px] w-[54px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-[3px] border-[#FFF8F2] bg-[#9E2530] text-white shadow-[0_0_0_2px_rgba(238,194,87,0.30),0_0_20px_rgba(230,181,75,0.26),0_10px_24px_rgba(70,28,31,0.20)] outline-none transition-transform duration-200 hover:scale-[1.06] focus-visible:scale-[1.06] focus-visible:ring-4 focus-visible:ring-[#E7B84D]/30"
                >
                  <MapPin className="h-[18px] w-[18px]" />
                </div>
                <div className="absolute left-0 top-[34px] -translate-x-1/2 rounded-full border border-white/70 bg-white/92 px-2 py-0.5 text-[8px] font-black text-[#9B3037] shadow-sm">06</div>
                <div className="absolute left-0 top-[61px] -translate-x-1/2 whitespace-nowrap serase-caveat text-[24px] font-bold leading-none text-white drop-shadow-[0_2px_7px_rgba(38,24,21,0.36)]">Meet</div>

                <div className="invisible pointer-events-none absolute right-[62px] top-0 z-40 w-[238px] -translate-y-1/2 -translate-x-2 scale-[0.97] rounded-[1.35rem] border border-white/82 bg-white/95 p-4 opacity-0 shadow-[0_18px_38px_rgba(75,45,42,0.15)] backdrop-blur-[20px] transition-[opacity,transform,visibility] duration-200 ease-out peer-hover:visible peer-hover:pointer-events-auto peer-hover:translate-x-0 peer-hover:scale-100 peer-hover:opacity-100 peer-focus:visible peer-focus:pointer-events-auto peer-focus:translate-x-0 peer-focus:scale-100 peer-focus:opacity-100">
                  <div className="text-[8px] font-black uppercase tracking-[0.16em] text-[#A23B42]">Built to move offline</div>
                  <div className="serase-caveat mt-1.5 text-[21px] font-bold leading-none text-[#2B2321]">Go somewhere real.</div>
                  <p className="serase-caveat mt-2 text-[16px] font-medium leading-[1.1] text-[#756863]">
                    The journey is designed to turn momentum into a real meeting.
                  </p>
                  <div className="mt-3 flex items-center gap-3 border-t border-[#E9DDD7] pt-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#F0D7D4] text-[#8A2128]">
                      <MapPin className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-black text-[#2E6842]">Date confirmed</div>
                      <div className="mt-0.5 text-[10px] font-black text-[#4A3C36]">Saturday · 8:00 PM</div>
                      <div className="serase-caveat mt-0.5 text-[14px] font-medium leading-[1.02] text-[#756863]">Bangsar · Kuala Lumpur</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ==================== MOBILE ==================== */}
            <div className="absolute inset-x-4 bottom-4 z-30 rounded-[1.6rem] border border-white/70 bg-[#FFF9F4]/94 p-3.5 shadow-[0_16px_38px_rgba(75,45,42,0.14)] backdrop-blur-xl md:hidden">
              <div className="grid grid-cols-3 gap-x-2 gap-y-3">
                {[
                  ['01', 'Verify', ShieldCheck],
                  ['02', 'Discover', Sparkles],
                  ['03', 'Connect', MessageCircle],
                  ['04', 'AI', Star],
                  ['05', 'Plan', CalendarCheck2],
                  ['06', 'Meet', MapPin],
                ].map(([step, label, Icon]) => {
                  const JourneyIcon = Icon as React.ElementType;
                  return (
                    <div key={step as string} className="flex flex-col items-center text-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8A2128] text-white shadow-[0_5px_14px_rgba(138,33,40,0.18)] ring-2 ring-white/80">
                        <JourneyIcon className="h-4 w-4" />
                      </div>
                      <div className="mt-1.5 text-[6.5px] font-black text-[#A23B42]">{step as string}</div>
                      <div className="mt-0.5 text-[8px] font-black text-[#5E4D47]">{label as string}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </section>
      {/* ==================== Brand Manifesto ==================== */}
      <section className="relative isolate flex min-h-[720px] w-full items-center overflow-hidden bg-[#241E1D] py-24 text-white md:min-h-[760px] md:py-28 lg:min-h-[calc(100svh-72px)] lg:py-20">
        {/* The original dark card background now becomes the entire section background. */}
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(105deg,#241E1D_0%,#2B1D1C_42%,#33291F_100%)]" />
        <div className="pointer-events-none absolute -left-[12%] -top-[28%] -z-10 h-[720px] w-[760px] rounded-full bg-[#8A2128]/28 blur-[150px]" />
        <div className="pointer-events-none absolute -right-[10%] bottom-[-36%] -z-10 h-[720px] w-[760px] rounded-full bg-[#D6A14B]/16 blur-[155px]" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_52%_48%,rgba(255,255,255,0.025),transparent_42%)]" />

        {/* Oversized orbit lines stay subtle and now belong to the page background. */}
        <div className="pointer-events-none absolute right-[15%] top-1/2 -z-10 h-[520px] w-[520px] -translate-y-1/2 rounded-full border border-white/[0.045]" />
        <div className="pointer-events-none absolute right-[8%] top-1/2 -z-10 h-[700px] w-[700px] -translate-y-1/2 rounded-full border border-white/[0.03]" />
        <div className="pointer-events-none absolute right-[1%] top-1/2 -z-10 h-[880px] w-[880px] -translate-y-1/2 rounded-full border border-white/[0.018]" />

        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="serase-container-wide relative z-10 w-full px-6 md:px-8 lg:px-10"
        >
          <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
            <div>
              <div className="text-[11px] font-black uppercase tracking-[0.18em] text-[#E3BC66]">
                The Serasé point of view
              </div>

              <h2 className="mt-6 max-w-4xl text-[52px] font-black leading-[0.95] tracking-[-0.055em] sm:text-[64px] md:text-[76px] lg:text-[88px]">
                Less noise.
                <br />
                <span className="text-[#E3BC66]">More intention.</span>
              </h2>
            </div>

            <div className="max-w-xl lg:justify-self-end">
              <p className="text-[18px] font-semibold leading-[1.8] text-white/76 md:text-[20px]">
                We are not building dating around endless attention. We are building it around the moments that matter: showing up honestly, choosing with intention, and making space for something real.
              </p>

              <div className="mt-7 h-px w-16 bg-[#E3BC66]/60" />

              <p className="mt-7 text-[15px] font-black uppercase tracking-[0.13em] text-white/92">
                Real people. Real connection. Real life.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ==================== Brand Closing ==================== */}
      <section className="relative px-6 pb-24 pt-10 md:pb-28 md:pt-14">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="serase-container-content relative mx-auto text-center"
        >
          <div className="mx-auto h-px w-16 bg-[#8A2128]/30" />

          <div className="mt-10 serase-eyebrow text-[#8A2128]">
            Coming soon
          </div>

          <h2 className="mx-auto mt-5 max-w-3xl text-[42px] font-black leading-[1.02] tracking-[-0.045em] text-serase-heading sm:text-[50px] md:text-[58px]">
            Something more intentional is coming.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-[16px] font-medium leading-[1.8] text-muted-foreground md:text-[17px]">
            Serasé is being built for people who still believe dating can feel thoughtful, safe and genuinely human.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/features"
              className="serase-btn-nav serase-interact-nav inline-flex items-center justify-center gap-2 bg-[#8A2128] px-6 py-3.5 text-[14px] font-black text-white"
            >
              Explore the product
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/trust-and-safety"
              className="serase-btn-nav serase-interact-nav inline-flex items-center justify-center gap-2 border border-[#DCCFC8] bg-white/55 px-6 py-3.5 text-[14px] font-black text-[#4C403C] backdrop-blur-sm"
            >
              Trust & Safety
              <ShieldCheck className="h-4 w-4 text-[#8A2128]" />
            </Link>
          </div>
        </motion.div>
      </section>


    </div>
  );
}
