import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";

// 统一过渡参数，方便全局调整
export const TRANSITIONS = {
  fast: { duration: 0.2, ease: "easeOut" },
  normal: { duration: 0.4, ease: "easeOut" },
  slow: { duration: 0.7, ease: "easeOut" },
  spring: { type: "spring", bounce: 0, duration: 0.5 },
  springBouncy: { type: "spring", stiffness: 260, damping: 20 },
} as const;

// 动态生成交错容器 (支持无障碍降级)
export const getStaggerContainer = (
  shouldReduceMotion: boolean | null,
): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: shouldReduceMotion ? 0 : 0.12,
      delayChildren: 0.1,
    },
  },
});

// 动态生成向上浮现元素 (支持无障碍降级)
export const getFadeUpItem = (
  shouldReduceMotion: boolean | null,
): Variants => ({
  hidden: {
    opacity: 0,
    y: shouldReduceMotion ? 0 : 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: TRANSITIONS.normal,
  },
});

type FrequenciesSyncedAnimationProps = {
  visible: boolean;
  profileName: string;
  logoSrc: string;
  shouldReduceMotion: boolean | null;
  onSkip: () => void;
};

/**
 * Serasé "Frequencies Synced" full-screen animation.
 *
 * Sequence:
 * 1. Burgundy halftone background enters
 * 2. Logo + "You & Name" appear
 * 3. Smooth sine frequency wave starts moving
 * 4. Two profile circles move together, collide and remain attached
 * 5. Gold collision pulse
 * 6. "Frequencies Synced" + 48-hour message appear
 */
export function FrequenciesSyncedAnimation({
  visible,
  profileName,
  logoSrc,
  shouldReduceMotion,
  onSkip,
}: FrequenciesSyncedAnimationProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0.1 : 0.35,
          }}
          className="absolute inset-x-0 bottom-0 top-[29px] z-50 overflow-hidden bg-[#641A20]"
        >
          {/* ================= Background ================= */}
          <motion.div
            initial={{
              opacity: 0,
              scale: shouldReduceMotion ? 1 : 1.03,
            }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: shouldReduceMotion ? 0.1 : 0.65,
            }}
            className="absolute inset-0 overflow-hidden"
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, #7A1720 0%, #6B1320 18%, #5E121C 55%, #541018 100%)",
              }}
            />

            {/* deep shadow areas */}
            <div className="absolute right-[-10%] top-[10%] h-[180px] w-[180px] rounded-[45%] bg-[#421015]/55 blur-[2px]" />
            <div className="absolute left-[10%] top-[22%] h-[220px] w-[82px] rotate-[14deg] rounded-[45%] bg-[#54131A]/48 blur-[1px]" />
            <div className="absolute left-[22%] bottom-[5%] h-[120px] w-[120px] rounded-[48%] bg-[#3D0F14]/58 blur-[1px]" />
            <div className="absolute right-[8%] bottom-[22%] h-[170px] w-[100px] rotate-[-18deg] rounded-[46%] bg-[#431018]/42 blur-[1px]" />

            {/* top-left halftone */}
            <div
              className="absolute left-[-2%] top-0 h-[180px] w-[150px] opacity-[0.95]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(216,96,104,0.82) 0 4px, transparent 4.5px)",
                backgroundSize: "14px 14px",
                WebkitMaskImage:
                  "radial-gradient(ellipse at 28% 22%, black 0%, black 60%, transparent 100%)",
                maskImage:
                  "radial-gradient(ellipse at 28% 22%, black 0%, black 60%, transparent 100%)",
              }}
            />

            {/* upper-right halftone */}
            <div
              className="absolute right-[-6%] top-[12%] h-[265px] w-[205px] opacity-[0.92]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(215,95,103,0.76) 0 4.1px, transparent 4.6px)",
                backgroundSize: "13px 13px",
                WebkitMaskImage:
                  "radial-gradient(circle at 45% 40%, black 0%, black 55%, transparent 100%)",
                maskImage:
                  "radial-gradient(circle at 45% 40%, black 0%, black 55%, transparent 100%)",
              }}
            />

            {/* lower-left halftone */}
            <div
              className="absolute left-[-10%] top-[46%] h-[250px] w-[190px] opacity-[0.92]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(216,96,104,0.76) 0 4.2px, transparent 4.7px)",
                backgroundSize: "13px 13px",
                WebkitMaskImage:
                  "radial-gradient(ellipse at 60% 45%, black 0%, black 58%, transparent 100%)",
                maskImage:
                  "radial-gradient(ellipse at 60% 45%, black 0%, black 58%, transparent 100%)",
              }}
            />

            {/* lower-right halftone */}
            <div
              className="absolute right-[-8%] bottom-[6%] h-[205px] w-[200px] opacity-[0.85]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(207,82,92,0.7) 0 4px, transparent 4.5px)",
                backgroundSize: "13px 13px",
                WebkitMaskImage:
                  "radial-gradient(circle at 35% 40%, black 0%, black 56%, transparent 100%)",
                maskImage:
                  "radial-gradient(circle at 35% 40%, black 0%, black 56%, transparent 100%)",
              }}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(177,42,49,0.18),transparent_48%),radial-gradient(circle_at_50%_78%,rgba(131,23,32,0.16),transparent_44%)]" />
          </motion.div>

          {/* moving background glow */}
          {!shouldReduceMotion && (
            <>
              <motion.div
                aria-hidden="true"
                animate={{
                  x: [0, 8, -5, 0],
                  y: [0, -5, 7, 0],
                  opacity: [0.5, 0.75, 0.55, 0.5],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -left-12 top-[42%] h-40 w-40 rounded-full bg-[#A42D35]/25 blur-2xl"
              />

              <motion.div
                aria-hidden="true"
                animate={{
                  x: [0, -7, 6, 0],
                  y: [0, 8, -4, 0],
                  opacity: [0.32, 0.5, 0.36, 0.32],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-10 top-16 h-44 w-44 rounded-full bg-black/20 blur-3xl"
              />
            </>
          )}

          {/* ================= Skip ================= */}
          <motion.button
            type="button"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.18,
              duration: 0.25,
            }}
            onClick={onSkip}
            className="absolute right-4 top-4 z-30 rounded-full border border-white/25 bg-white/5 px-3 py-1.5 text-[7px] font-black uppercase tracking-[0.14em] text-white/75 backdrop-blur-sm"
          >
            Skip
          </motion.button>

          {/* ================= Logo ================= */}
          <motion.div
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0, y: -12, scale: 0.8 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.15,
              duration: shouldReduceMotion ? 0.1 : 0.55,
              type: shouldReduceMotion ? "tween" : "spring",
              bounce: shouldReduceMotion ? 0 : 0.28,
            }}
            className="absolute inset-x-0 top-[34px] z-20 flex justify-center"
          >
            <img
              src={logoSrc}
              alt="Serasé"
              className="h-[38px] w-[38px] object-contain brightness-[1.2] sepia-[0.25]"
            />
          </motion.div>

          {/* ================= Heading ================= */}
          <motion.h2
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : {
                    opacity: 0,
                    y: 14,
                    filter: "blur(4px)",
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.5,
              duration: shouldReduceMotion ? 0.1 : 0.55,
            }}
            className="absolute inset-x-0 top-[112px] z-20 text-center text-[31px] font-medium text-[#FFF9F1]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            You &amp; {profileName}
          </motion.h2>

          {/* ================= Frequency wave ================= */}
          <div className="absolute inset-x-0 top-[228px] z-10 h-[96px] overflow-hidden pointer-events-none">
            <motion.div
              className="h-full w-[200%]"
              initial={{ x: 0, opacity: 0 }}
              animate={
                shouldReduceMotion
                  ? { x: 0, opacity: 1 }
                  : {
                      x: ["0%", "-50%"],
                      opacity: 1,
                    }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0.1 }
                  : {
                      x: {
                        delay: 0.85,
                        duration: 3.6,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      opacity: {
                        delay: 0.75,
                        duration: 0.35,
                      },
                    }
              }
            >
              <svg
                viewBox="0 0 640 96"
                preserveAspectRatio="none"
                className="h-full w-full"
                aria-hidden="true"
              >
                <defs>
                  <filter
                    id="serase-frequency-wave-glow"
                    x="-20%"
                    y="-80%"
                    width="140%"
                    height="260%"
                  >
                    <feGaussianBlur stdDeviation="2.1" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* glow */}
                <path
                  d="M 0 48 C 20 14,44 14,64 48 C 84 82,108 82,128 48 C 148 14,172 14,192 48 C 212 82,236 82,256 48 C 276 14,300 14,320 48 C 340 82,364 82,384 48 C 404 14,428 14,448 48 C 468 82,492 82,512 48 C 532 14,556 14,576 48 C 596 82,620 82,640 48"
                  fill="none"
                  stroke="#E8B95C"
                  strokeWidth="7"
                  strokeLinecap="round"
                  opacity="0.22"
                  filter="url(#serase-frequency-wave-glow)"
                />

                {/* main wave */}
                <path
                  d="M 0 48 C 20 14,44 14,64 48 C 84 82,108 82,128 48 C 148 14,172 14,192 48 C 212 82,236 82,256 48 C 276 14,300 14,320 48 C 340 82,364 82,384 48 C 404 14,428 14,448 48 C 468 82,492 82,512 48 C 532 14,556 14,576 48 C 596 82,620 82,640 48"
                  fill="none"
                  stroke="#D6A64E"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />

                {/* highlight */}
                <path
                  d="M 0 45 C 20 11,44 11,64 45 C 84 79,108 79,128 45 C 148 11,172 11,192 45 C 212 79,236 79,256 45 C 276 11,300 11,320 45 C 340 79,364 79,384 45 C 404 11,428 11,448 45 C 468 79,492 79,512 45 C 532 11,556 11,576 45 C 596 79,620 79,640 45"
                  fill="none"
                  stroke="#F1CB78"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  opacity="0.95"
                />
              </svg>
            </motion.div>
          </div>

          {/* ================= Avatars ================= */}
          <div className="absolute inset-x-0 top-[224px] z-20 flex items-center justify-center gap-[48px]">
            {/* You */}
            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 1, x: 34, scale: 1 }
                  : {
                      opacity: 0,
                      x: -72,
                      scale: 0.72,
                    }
              }
              animate={
                shouldReduceMotion
                  ? { opacity: 1, x: 34, scale: 1 }
                  : {
                      opacity: [0, 1, 1, 1],
                      x: [-72, 38, 31, 34],
                      scale: [0.72, 1.08, 0.98, 1],
                    }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0.1 }
                  : {
                      delay: 0.7,
                      duration: 1.15,
                      times: [0, 0.62, 0.82, 1],
                      ease: "easeInOut",
                    }
              }
              className="h-[74px] w-[74px] rounded-full border border-[#D3A34F] bg-[linear-gradient(145deg,#C4313E,#8F1F28)] shadow-[0_10px_22px_rgba(0,0,0,0.22)]"
            />

            {/* Matched profile */}
            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 1, x: -34, scale: 1 }
                  : {
                      opacity: 0,
                      x: 72,
                      scale: 0.72,
                    }
              }
              animate={
                shouldReduceMotion
                  ? { opacity: 1, x: -34, scale: 1 }
                  : {
                      opacity: [0, 1, 1, 1],
                      x: [72, -38, -31, -34],
                      scale: [0.72, 1.08, 0.98, 1],
                    }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0.1 }
                  : {
                      delay: 0.7,
                      duration: 1.15,
                      times: [0, 0.62, 0.82, 1],
                      ease: "easeInOut",
                    }
              }
              className="relative h-[74px] w-[74px] overflow-hidden rounded-full border border-[#D3A34F] bg-[radial-gradient(circle_at_50%_32%,#D8C8C0_0%,#AF9187_52%,#725650_100%)] shadow-[0_10px_22px_rgba(0,0,0,0.24)]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-white/5" />
              <div className="absolute inset-x-0 bottom-2 text-center text-[8px] font-black uppercase tracking-[0.12em] text-white/80">
                {profileName}
              </div>
            </motion.div>
          </div>

          {/* collision pulse */}
          {!shouldReduceMotion && (
            <motion.div
              aria-hidden="true"
              initial={{
                opacity: 0,
                scale: 0.35,
              }}
              animate={{
                opacity: [0, 0, 0.9, 0],
                scale: [0.35, 0.35, 0.95, 1.55],
              }}
              transition={{
                delay: 1.35,
                duration: 0.7,
                times: [0, 0.12, 0.42, 1],
                ease: "easeOut",
              }}
              className="absolute left-1/2 top-[261px] z-[19] h-[92px] w-[92px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#E6BB63] shadow-[0_0_24px_rgba(230,187,99,0.45)]"
            />
          )}

          {/* ================= Result ================= */}
          <motion.div
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : {
                    opacity: 0,
                    y: 14,
                    filter: "blur(5px)",
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              delay: shouldReduceMotion ? 0 : 1.65,
              duration: shouldReduceMotion ? 0.1 : 0.55,
            }}
            className="absolute inset-x-0 top-[374px] z-20 text-center"
          >
            <div className="text-[12px] font-black uppercase tracking-[0.32em] text-[#E2BC79]">
              Frequencies Synced
            </div>
          </motion.div>

          <motion.p
            initial={{
              opacity: shouldReduceMotion ? 0.55 : 0,
              y: shouldReduceMotion ? 0 : 8,
            }}
            animate={{
              opacity: 0.55,
              y: 0,
            }}
            transition={{
              delay: shouldReduceMotion ? 0 : 2.05,
              duration: shouldReduceMotion ? 0.1 : 0.5,
            }}
            className="absolute inset-x-[38px] top-[432px] z-20 text-center text-[8.5px] font-semibold leading-[1.45] text-white"
          >
            You both connected. The window is 48 hours.
          </motion.p>

          {/* subtle synced pulse */}
          {!shouldReduceMotion && (
            <motion.div
              aria-hidden="true"
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              animate={{
                opacity: [0, 0.2, 0],
                scale: [0.75, 1.15, 1.35],
              }}
              transition={{
                delay: 1.85,
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 0.7,
              }}
              className="absolute left-1/2 top-[259px] z-0 h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E2B35C]"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}