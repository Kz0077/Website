import React, { useEffect, useRef, useState } from "react";
import {
  Bell,
  Bookmark,
  ChevronDown,
  Clock3,
  Heart,
  MapPin,
  MessageCircle,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Star,
  User,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useDocumentTitle } from "../hooks/usePageMeta";
import PhoneFrame from "../components/PhoneFrame";
import seraseLogo from "../../.figma/attachments/image-0.png";


type ProductSectionId = "discover" | "timed" | "ai";
type DiscoverScreen = "discover" | "matched";

const YAYA_DISCOVER_CARD = "data:image/webp;base64,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";

function PrototypeMatchScreen({
  visible,
  shouldReduceMotion,
  onSkip,
}: {
  visible: boolean;
  shouldReduceMotion: boolean | null;
  onSkip: () => void;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.28 }}
          className="absolute inset-x-0 bottom-0 top-[29px] z-[70] overflow-hidden bg-[#65191F]"
        >
          {/* Prototype burgundy dotted background */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg,#7A1720 0%,#68151D 26%,#5A1119 66%,#4F0F16 100%)",
            }}
          />

          <div
            className="absolute inset-0 opacity-[0.78]"
            style={{
              backgroundImage:
                "radial-gradient(circle,rgba(224,101,108,0.62) 0 4px,transparent 4.5px)",
              backgroundSize: "14px 14px",
              WebkitMaskImage:
                "radial-gradient(ellipse at 20% 15%,black 0%,transparent 34%), radial-gradient(ellipse at 82% 27%,black 0%,transparent 42%), radial-gradient(ellipse at 18% 75%,black 0%,transparent 38%), radial-gradient(ellipse at 79% 85%,black 0%,transparent 36%)",
              maskImage:
                "radial-gradient(ellipse at 20% 15%,black 0%,transparent 34%), radial-gradient(ellipse at 82% 27%,black 0%,transparent 42%), radial-gradient(ellipse at 18% 75%,black 0%,transparent 38%), radial-gradient(ellipse at 79% 85%,black 0%,transparent 36%)",
            }}
          />

          <motion.button
            type="button"
            onClick={onSkip}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.18 }}
            className="absolute right-4 top-4 z-30 rounded-full border border-white/30 bg-white/5 px-3 py-1.5 text-[7px] font-black uppercase tracking-[0.14em] text-white/80"
          >
            Skip
          </motion.button>

          <motion.div
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0, y: -8, scale: 0.82 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: shouldReduceMotion ? 0.1 : 0.45,
              type: shouldReduceMotion ? "tween" : "spring",
              bounce: 0.25,
            }}
            className="absolute inset-x-0 top-[34px] z-20 flex justify-center"
          >
            <img
              src={seraseLogo}
              alt="Serasé"
              className="h-[38px] w-[38px] object-contain brightness-[1.18] sepia-[0.2]"
            />
          </motion.div>

          <motion.h2
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 12, filter: "blur(3px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.34,
              duration: shouldReduceMotion ? 0.1 : 0.42,
            }}
            className="absolute inset-x-0 top-[112px] z-20 text-center text-[31px] font-medium text-[#FFF8EF]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            You &amp; Yaya
          </motion.h2>

          {/* Prototype frequency wave */}
          <div className="absolute inset-x-0 top-[229px] z-10 h-[92px] overflow-hidden">
            <motion.div
              className="h-full w-[200%]"
              animate={
                shouldReduceMotion
                  ? undefined
                  : { x: ["0%", "-50%"] }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      duration: 3.8,
                      repeat: Infinity,
                      ease: "linear",
                    }
              }
            >
              <svg
                viewBox="0 0 640 92"
                preserveAspectRatio="none"
                className="h-full w-full"
                aria-hidden="true"
              >
                <path
                  d="M0 46 C18 8,42 8,62 46 C82 84,106 84,126 46 C146 8,170 8,190 46 C210 84,234 84,254 46 C274 8,298 8,318 46 C338 84,362 84,382 46 C402 8,426 8,446 46 C466 84,490 84,510 46 C530 8,554 8,574 46 C594 84,618 84,640 46"
                  fill="none"
                  stroke="#E7B95B"
                  strokeWidth="6.2"
                  strokeLinecap="round"
                  opacity="0.22"
                />
                <path
                  d="M0 46 C18 8,42 8,62 46 C82 84,106 84,126 46 C146 8,170 8,190 46 C210 84,234 84,254 46 C274 8,298 8,318 46 C338 84,362 84,382 46 C402 8,426 8,446 46 C466 84,490 84,510 46 C530 8,554 8,574 46 C594 84,618 84,640 46"
                  fill="none"
                  stroke="#D9A94E"
                  strokeWidth="3.1"
                  strokeLinecap="round"
                />
                <path
                  d="M0 43 C18 5,42 5,62 43 C82 81,106 81,126 43 C146 5,170 5,190 43 C210 81,234 81,254 43 C274 5,298 5,318 43 C338 81,362 81,382 43 C402 5,426 5,446 43 C466 81,490 81,510 43 C530 5,554 5,574 43 C594 81,618 81,640 43"
                  fill="none"
                  stroke="#F0CE82"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          </div>

          {/* Prototype avatars */}
          <div className="absolute inset-x-0 top-[225px] z-20 flex items-center justify-center gap-[48px]">
            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 1, x: 34 }
                  : { opacity: 0, x: -72, scale: 0.72 }
              }
              animate={{ opacity: 1, x: 34, scale: 1 }}
              transition={{
                delay: shouldReduceMotion ? 0 : 0.55,
                duration: shouldReduceMotion ? 0.1 : 0.8,
                type: shouldReduceMotion ? "tween" : "spring",
                bounce: 0.25,
              }}
              className="h-[74px] w-[74px] rounded-full border border-[#D4A64D] bg-[linear-gradient(145deg,#C22C39,#8C2029)] shadow-[0_10px_22px_rgba(0,0,0,0.23)]"
            />

            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 1, x: -34 }
                  : { opacity: 0, x: 72, scale: 0.72 }
              }
              animate={{ opacity: 1, x: -34, scale: 1 }}
              transition={{
                delay: shouldReduceMotion ? 0 : 0.55,
                duration: shouldReduceMotion ? 0.1 : 0.8,
                type: shouldReduceMotion ? "tween" : "spring",
                bounce: 0.25,
              }}
              className="relative h-[74px] w-[74px] overflow-hidden rounded-full border border-[#D4A64D] bg-[#BDA79D] shadow-[0_10px_22px_rgba(0,0,0,0.23)]"
            >
              <img
                src={YAYA_DISCOVER_CARD}
                alt="Yaya"
                className="h-full w-full scale-[1.55] object-cover"
                style={{ objectPosition: "50% 35%" }}
              />
            </motion.div>
          </div>

          {!shouldReduceMotion && (
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.35 }}
              animate={{
                opacity: [0, 0.9, 0],
                scale: [0.35, 0.95, 1.6],
              }}
              transition={{
                delay: 1.03,
                duration: 0.75,
                ease: "easeOut",
              }}
              className="absolute left-1/2 top-[262px] z-[19] h-[92px] w-[92px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#E6BB63] shadow-[0_0_24px_rgba(230,187,99,0.45)]"
            />
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 1.3,
              duration: shouldReduceMotion ? 0.1 : 0.42,
            }}
            className="absolute inset-x-0 top-[374px] z-20 text-center"
          >
            <div className="text-[12px] font-black uppercase tracking-[0.3em] text-[#E2BC79]">
              Frequencies Synced
            </div>
            <p className="mx-auto mt-4 max-w-[200px] text-[8.5px] font-semibold leading-[1.45] text-white/65">
              You both connected. The window is 48 hours.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProductPhonePreview({
  activeSection,
}: {
  activeSection: ProductSectionId;
}) {
  const shouldReduceMotion = useReducedMotion();

  const [discoverScreen, setDiscoverScreen] =
    useState<DiscoverScreen>("discover");
  const [swipeState, setSwipeState] = useState<
    "idle" | "swiping-right" | "swiping-left"
  >("idle");
  const [hasInteracted, setHasInteracted] = useState(false);

  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const discoverScrollRef = useRef<HTMLDivElement | null>(null);
  const profileAnchorRef = useRef<HTMLDivElement | null>(null);

  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const cardRotate = useTransform(
    cardX,
    [-200, 200],
    shouldReduceMotion ? [0, 0] : [-15, 15],
  );
  const connectOpacity = useTransform(cardX, [20, 120], [0, 1]);
  const passOpacity = useTransform(cardX, [-20, -120], [0, 1]);

  const clearAllTimers = () => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  };

  const resetDiscoverCard = () => {
    cardX.set(0);
    cardY.set(0);
    setSwipeState("idle");
    setDiscoverScreen("discover");

    requestAnimationFrame(() => {
      discoverScrollRef.current?.scrollTo({
        top: 0,
        behavior: "auto",
      });
    });
  };

  const swipeDuration = shouldReduceMotion ? 0.12 : 0.38;

  const handleSwipeRight = (
    customY?: number,
    userInitiated = true,
  ) => {
    if (
      activeSection !== "discover" ||
      discoverScreen !== "discover" ||
      swipeState !== "idle"
    ) {
      return;
    }

    clearAllTimers();
    if (userInitiated) {
      setHasInteracted(true);
    }
    setSwipeState("swiping-right");

    animate(cardX, 560, {
      duration: swipeDuration,
      ease: "easeOut",
    });
    animate(
      cardY,
      shouldReduceMotion
        ? 0
        : typeof customY === "number"
          ? customY
          : 72,
      {
        duration: swipeDuration,
        ease: "easeOut",
      },
    );

    const matchTimer = setTimeout(() => {
      setDiscoverScreen("matched");
      setSwipeState("idle");
      cardX.set(0);
      cardY.set(0);
    }, swipeDuration * 1000);

    const resetTimer = setTimeout(
      () => {
        resetDiscoverCard();
      },
      shouldReduceMotion ? 1800 : 5200,
    );

    timeoutRefs.current.push(matchTimer, resetTimer);
  };

  const handleSwipeLeft = (
    customY?: number,
    userInitiated = true,
  ) => {
    if (
      activeSection !== "discover" ||
      discoverScreen !== "discover" ||
      swipeState !== "idle"
    ) {
      return;
    }

    clearAllTimers();
    if (userInitiated) {
      setHasInteracted(true);
    }
    setSwipeState("swiping-left");

    animate(cardX, -560, {
      duration: swipeDuration,
      ease: "easeOut",
    });
    animate(
      cardY,
      shouldReduceMotion
        ? 0
        : typeof customY === "number"
          ? customY
          : 54,
      {
        duration: swipeDuration,
        ease: "easeOut",
      },
    );

    const resetTimer = setTimeout(
      () => {
        cardX.set(0);
        cardY.set(0);
        setSwipeState("idle");
      },
      shouldReduceMotion ? 260 : 800,
    );

    timeoutRefs.current.push(resetTimer);
  };

  const handleDragEnd = (_event: unknown, info: any) => {
    setHasInteracted(true);
    const threshold = 70;

    if (info.offset.x > threshold || info.velocity.x > 450) {
      handleSwipeRight(
        info.offset.y + info.velocity.y * 0.15,
        true,
      );
      return;
    }

    if (info.offset.x < -threshold || info.velocity.x < -450) {
      handleSwipeLeft(
        info.offset.y + info.velocity.y * 0.15,
        true,
      );
      return;
    }

    animate(cardX, 0, {
      type: "spring",
      stiffness: 300,
      damping: 22,
    });
    animate(cardY, 0, {
      type: "spring",
      stiffness: 300,
      damping: 22,
    });
  };

  useEffect(() => {
    return () => {
      clearAllTimers();
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  useEffect(() => {
    clearAllTimers();

    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }

    cardX.set(0);
    cardY.set(0);
    setSwipeState("idle");
    setDiscoverScreen("discover");
    setHasInteracted(false);

    requestAnimationFrame(() => {
      discoverScrollRef.current?.scrollTo({
        top: 0,
        behavior: "auto",
      });
    });
  }, [activeSection, cardX, cardY]);

  useEffect(() => {
    if (
      activeSection !== "discover" ||
      hasInteracted ||
      discoverScreen !== "discover"
    ) {
      return;
    }

    autoPlayRef.current = setInterval(() => {
      handleSwipeRight(undefined, false);
    }, 7000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };
  }, [
    activeSection,
    hasInteracted,
    discoverScreen,
    swipeState,
  ]);

  const sharedBottomNav = (
    <div className="absolute bottom-[11px] left-[7px] right-[7px] z-40 h-[52px] overflow-visible rounded-[1.55rem] bg-white/90 px-[13px] pt-[9px] shadow-[0_10px_24px_rgba(98,64,57,0.10)] backdrop-blur-md">
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
  );

  const discoverHeader = (
    <div className="absolute inset-x-0 top-[33px] z-40 h-[39px] px-3">
      <div className="relative flex h-full items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative flex h-7 w-7 items-center justify-center rounded-full border border-[#E5D9D0] bg-white/90 shadow-sm">
            <RotateCcw
              className="h-3 w-3 text-primary"
              strokeWidth={1.9}
            />
            <span className="absolute -right-1 -top-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-[#E1B85C] px-1 text-[6px] font-black text-[#82252B]">
              5
            </span>
          </div>

          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E5D9D0] bg-white/90 shadow-sm">
            <Zap
              className="h-3 w-3 text-primary"
              strokeWidth={1.9}
            />
          </div>
        </div>

        <div
          className="absolute left-1/2 -translate-x-1/2 text-[16px] font-medium text-primary"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Serasé
        </div>

        <div className="relative flex h-7 w-7 items-center justify-center rounded-full border border-[#E5D9D0] bg-white/90 shadow-sm">
          <Bell
            className="h-3 w-3 text-primary"
            strokeWidth={1.9}
          />
          <span className="absolute right-[4px] top-[4px] h-2 w-2 rounded-full bg-[#EF5965] ring-2 ring-white" />
        </div>
      </div>
    </div>
  );

  return (
    <PhoneFrame screenClassName="bg-[#F8F1EA]">
      <div className="relative h-full overflow-hidden bg-[#F8F1EA]">
        {/* ==================== DISCOVER & CONNECT ==================== */}
        {activeSection === "discover" && (
          <>
            {discoverScreen !== "matched" && discoverHeader}

            {discoverScreen === "discover" && (
              <>
                {/* Real app-like internal scrolling:
                    vertical scroll = browse Yaya's profile
                    horizontal drag on the card = Pass / Connect */}
                <div
                  ref={discoverScrollRef}
                  onScroll={(event) => {
                    if (event.currentTarget.scrollTop > 4) {
                      setHasInteracted(true);
                    }
                  }}
                  className="absolute inset-x-0 bottom-[63px] top-[72px] z-20 overflow-y-auto overscroll-contain scroll-smooth bg-[#F8F1EA] pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {/* ==================== Discover card ==================== */}
                  <div className="relative min-h-[405px] px-3 pt-2">
                    <motion.div
                      drag={swipeState === "idle" ? "x" : false}
                      dragElastic={0.16}
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragStart={() => setHasInteracted(true)}
                      onDragEnd={handleDragEnd}
                      style={{
                        x: cardX,
                        y: cardY,
                        rotate: cardRotate,
                      }}
                      className="relative h-[278px] origin-bottom cursor-grab touch-pan-y overflow-hidden rounded-[1.7rem] bg-[#B9AAA3] shadow-[0_15px_28px_rgba(73,51,48,0.20)] active:cursor-grabbing"
                    >
                      {/* Exact Yaya prototype image/content */}
                      <img
                        src={YAYA_DISCOVER_CARD}
                        alt="Yaya, 26 — verified Serasé profile"
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        draggable={false}
                      />

                      {/* Story progress */}
                      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[28px] bg-[#B4A09A]/92 px-3 pt-2">
                        <div className="flex items-center gap-1.5">
                          <div className="h-2.5 w-5 rounded-full bg-[#7C6F6B]" />
                          <div className="h-[3px] w-10 rounded-full bg-white/80" />
                          <div className="h-[3px] flex-1 rounded-full bg-white/42" />
                          <div className="h-[3px] flex-1 rounded-full bg-white/42" />
                          <div className="h-[3px] flex-1 rounded-full bg-white/42" />
                          <div className="h-[3px] flex-1 rounded-full bg-white/42" />
                        </div>
                      </div>

                      {/* Swipe feedback */}
                      <motion.div
                        style={{ opacity: connectOpacity }}
                        className="pointer-events-none absolute left-4 top-10 z-30 -rotate-12 rounded-md border-2 border-[#8BBD3E] bg-black/30 px-2 py-1 text-[13px] font-black tracking-widest text-[#8BBD3E] backdrop-blur-sm"
                      >
                        CONNECT
                      </motion.div>

                      <motion.div
                        style={{ opacity: passOpacity }}
                        className="pointer-events-none absolute right-4 top-10 z-30 rotate-12 rounded-md border-2 border-rose-500 bg-black/30 px-2 py-1 text-[13px] font-black tracking-widest text-rose-500 backdrop-blur-sm"
                      >
                        PASS
                      </motion.div>
                    </motion.div>

                    {/* Pass / Signal */}
                    <div className="mt-[-10px] flex items-center justify-center gap-6">
                      <motion.button
                        type="button"
                        aria-label="Pass"
                        whileTap={{
                          scale: shouldReduceMotion ? 1 : 0.9,
                        }}
                        onClick={() => handleSwipeLeft(undefined, true)}
                        disabled={swipeState !== "idle"}
                        className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white text-[#5B4D49] shadow-[0_8px_20px_rgba(50,42,40,0.10)] ring-1 ring-black/5 disabled:opacity-40"
                      >
                        <X className="h-[17px] w-[17px]" strokeWidth={2.1} />
                      </motion.button>

                      <motion.button
                        type="button"
                        aria-label="Send Signal"
                        whileTap={{
                          scale: shouldReduceMotion ? 1 : 0.9,
                        }}
                        onClick={() => handleSwipeRight(undefined, true)}
                        disabled={swipeState !== "idle"}
                        className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#F3E8D7] text-[#B87582] shadow-[0_8px_20px_rgba(177,103,117,0.12)] ring-1 ring-[#EEDFD9] disabled:opacity-40"
                      >
                        <Star className="h-[18px] w-[18px]" strokeWidth={2} />
                      </motion.button>
                    </div>

                    {/* This is only a hint; the user can freely scroll */}
                    <button
                      type="button"
                      onClick={() => {
                        setHasInteracted(true);
                        const scrollBox = discoverScrollRef.current;
                        const anchor = profileAnchorRef.current;

                        if (!scrollBox || !anchor) return;

                        scrollBox.scrollTo({
                          top: Math.max(0, anchor.offsetTop - 8),
                          behavior: shouldReduceMotion ? "auto" : "smooth",
                        });
                      }}
                      className="mx-auto mt-3 flex w-max flex-col items-center"
                    >
                      <span className="text-[6px] font-black uppercase tracking-[0.24em] text-[#C88792]">
                        Scroll for Yaya&apos;s profile
                      </span>
                      <ChevronDown
                        className="mt-1 h-3.5 w-3.5 text-[#B76D6D]"
                        strokeWidth={2.2}
                      />
                    </button>
                  </div>

                  {/* ==================== Yaya full profile — SAME scroll surface ==================== */}
                  <div
                    ref={profileAnchorRef}
                    className="mx-[10px] mt-2 rounded-[1.25rem] bg-[#FFFDFC] px-4 pb-6 pt-4 shadow-[0_12px_28px_rgba(76,52,46,0.08)]"
                  >
                    <div className="flex items-center justify-between">
                      <h3
                        className="text-[19px] font-medium text-[#9D262E]"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        Yaya
                      </h3>
                      <span className="text-[7.2px] font-semibold text-[#8F817A]">
                        26 · Commercial operations
                      </span>
                    </div>

                    <div className="mt-5 flex gap-5 border-b border-[#E5DAD3] pb-2">
                      <span className="border-b-2 border-[#A52730] pb-2 text-[7.8px] font-black text-[#A52730]">
                        About
                      </span>
                      <span className="pb-2 text-[7.8px] font-bold text-[#B2A39B]">
                        Photos
                      </span>
                    </div>

                    <p className="mt-4 text-[8.4px] font-medium leading-[1.75] text-[#675955]">
                      Commercial operations: I sit between the product and the
                      people buying it, and I keep our partner accounts growing.
                      Off the clock I am the one holding the aux cable. Happy to
                      drive, happier if you have somewhere in mind.
                    </p>

                    <div className="mt-4 overflow-hidden rounded-[1rem] bg-[#F8F2EC]">
                      {[
                        ["LIVES", "City centre · 5 km"],
                        ["WORK", "Commercial operations"],
                        ["SPEAKS", "English, Malay"],
                        ["INTO", "Live music"],
                      ].map(([label, value], index) => (
                        <div
                          key={label}
                          className={`flex items-center justify-between px-3 py-3 ${
                            index > 0 ? "border-t border-[#EDE4DD]" : ""
                          }`}
                        >
                          <span className="text-[5.7px] font-black tracking-[0.18em] text-[#A99A92]">
                            {label}
                          </span>
                          <span className="text-[7.8px] font-black text-[#5A4C48]">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 rounded-[1rem] border border-[#E9C16C] bg-[#FFF4DA] px-3 py-3">
                      <div className="text-[5.7px] font-black uppercase tracking-[0.17em] text-[#9F645D]">
                        Looking for
                      </div>
                      <div className="mt-2 text-[8.8px] font-black text-[#B12A34]">
                        Something serious, taken slowly
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {[
                        "Music first",
                        "Organised",
                        "Easy company",
                        "Late drives",
                        "Straight talker",
                        "Always early",
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[#F8E9E7] px-3 py-2 text-[6.8px] font-bold text-[#A63339]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 overflow-hidden rounded-[1.1rem]">
                      <img
                        src={YAYA_DISCOVER_CARD}
                        alt="Yaya"
                        className="h-[170px] w-full object-cover"
                        style={{ objectPosition: "50% 25%" }}
                        draggable={false}
                      />
                    </div>

                    <div className="mt-5 flex justify-center">
                      <motion.button
                        type="button"
                        onClick={() => {
                          setHasInteracted(true);
                          handleSwipeRight(undefined, true);
                        }}
                        whileTap={{
                          scale: shouldReduceMotion ? 1 : 0.96,
                        }}
                        className="inline-flex h-10 items-center gap-2 rounded-full bg-[#A51F2C] px-5 text-[9px] font-black text-white shadow-[0_8px_18px_rgba(165,31,44,0.18)]"
                      >
                        <Heart className="h-3.5 w-3.5" />
                        Connect with Yaya
                      </motion.button>
                    </div>
                  </div>

                  <div className="h-5" />
                </div>

                {/* Bottom nav remains fixed while content scrolls */}
                {sharedBottomNav}
              </>
            )}

            <PrototypeMatchScreen
              visible={discoverScreen === "matched"}
              shouldReduceMotion={shouldReduceMotion}
              onSkip={() => {
                clearAllTimers();
                resetDiscoverCard();
                setHasInteracted(true);
              }}
            />
          </>
        )}

        {/* ==================== TIMED CONNECTIONS ==================== */}
        {activeSection === "timed" && (
          <>
            {/* Fixed Messages header */}
            <div className="absolute inset-x-0 top-[30px] z-40 h-[58px] bg-[#FFF9F3]/98 px-4 pt-3">
              <div
                className="text-[24px] font-medium leading-none text-[#8A2128]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Messages
              </div>

              <div className="mt-2 flex h-[27px] items-center rounded-full bg-[#F2DFC1] px-3 text-[7px] font-semibold text-[#A76B66]">
                Search connections
              </div>
            </div>

            {/* User can freely scroll the real Messages content */}
            <div className="absolute inset-x-0 bottom-[63px] top-[88px] z-20 overflow-y-auto overscroll-contain bg-[#FFF9F3] pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="border-b border-[#E9DCCF] px-3 pb-4 pt-4">
                <div className="flex items-center justify-between">
                  <div className="text-[7px] font-black uppercase tracking-[0.17em] text-[#9A746C]">
                    New connections
                  </div>
                  <div className="text-[7px] font-bold text-[#9C756B]">
                    Say hi before the ring empties
                  </div>
                </div>

                <div className="mt-3 flex items-start justify-between">
                  {[
                    ["Y", "Yaya", "4:15 left", 78, false],
                    ["S", "Soso", "29h left", 62, false],
                    ["A", "Amira", "35h left", 72, false],
                    ["P", "Priya", "3:05 left", 58, false],
                    ["Y", "Yuki", "57m left", 14, true],
                  ].map(([initial, name, time, progress, urgent]) => (
                    <div
                      key={String(name)}
                      className="flex w-[42px] flex-col items-center"
                    >
                      <div
                        className="flex h-[36px] w-[36px] items-center justify-center rounded-full p-[2px]"
                        style={{
                          background: `conic-gradient(${
                            urgent ? "#A72B37" : "#D0A34C"
                          } ${progress}%, #D3CDC6 ${progress}%)`,
                        }}
                      >
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#C6ADA6] text-[9px] font-black text-[#8A2128]">
                          {initial}
                        </div>
                      </div>
                      <div className="mt-1 text-[7px] font-black text-[#5A4D48]">
                        {name}
                      </div>
                      <div
                        className={`mt-0.5 whitespace-nowrap text-[6.2px] font-bold ${
                          urgent ? "text-[#BB3340]" : "text-[#9A8178]"
                        }`}
                      >
                        {time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mx-3 mt-3 flex h-[48px] items-center gap-3 rounded-[1rem] bg-[#A51F2C] px-3 text-white shadow-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#E4BF67] text-[#8A2128]">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[9px] font-black">
                    Serasé Coach
                  </div>
                  <div className="mt-0.5 truncate text-[7px] font-medium text-white/78">
                    Want me to plan Thursday for you and Amira?
                  </div>
                </div>
              </div>

              <div className="mx-3 mt-3 overflow-hidden rounded-[1.1rem] bg-white/55">
                {[
                  ["A", "Amira", "Ha. You get one vote. Are you around...", "11:36", "1"],
                  ["Y", "Yaya", "Sent you the set list. Third track is...", "10:12", "2"],
                  ["S", "Soso", "Sunday drive. I am picking the route.", "10:04", ""],
                        ].map(([initial, name, copy, time, badge]) => (
                  <div
                    key={String(name)}
                    className="flex h-[54px] items-center gap-3 border-b border-[#EADFD5] px-3 last:border-b-0"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C5AAA5] text-[9px] font-black text-[#8A2128]">
                      {initial}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[9px] font-black text-[#4E423E]">
                        {name}
                      </div>
                      <div className="mt-1 truncate text-[7.2px] font-medium text-[#8F8078]">
                        {copy}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="text-[6.1px] font-semibold text-[#A19189]">
                        {time}
                      </div>
                      {badge && (
                        <div className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E1B75C] px-1 text-[6.1px] font-black text-[#8A2128]">
                          {badge}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {sharedBottomNav}
          </>
        )}

        {/* ==================== SERASÉ AI ==================== */}
        {activeSection === "ai" && (
          <>
            {/* Fixed Coach header */}
            <div className="absolute inset-x-0 top-[30px] z-40 h-[52px] bg-[#9E202B] px-3 text-white">
              <div className="flex h-full items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/12">
                  <span className="text-[12px]">‹</span>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#E5BE66] text-[#8A2128]">
                  <Sparkles className="h-4 w-4" />
                </div>

                <div>
                  <div className="text-[11px] font-black">
                    Serasé Coach
                  </div>
                  <div className="mt-0.5 text-[6.6px] font-semibold text-white/72">
                    Private · never shown to your matches
                  </div>
                </div>
              </div>
            </div>

            {/* User-controlled Coach conversation scroll */}
            <div className="absolute inset-x-0 bottom-[124px] top-[82px] z-20 overflow-y-auto overscroll-contain bg-[#F8F1EA] px-3 pb-5 pt-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="rounded-[1.2rem] border border-[#E9DED3] bg-white/86 px-4 py-4 shadow-sm">
                <p className="text-[8.4px] font-semibold leading-[1.65] text-[#5E504A]">
                  Amira asked about Thursday. Want me to shape it into something specific?
                </p>
                <p className="mt-3 text-[8.4px] font-semibold leading-[1.65] text-[#5E504A]">
                  She likes slow dinners and walkable streets, and you both listed night walker.
                </p>
              </div>

              {/* Prototype intentionally leaves breathing room here */}
              <div className="h-[225px]" aria-hidden="true" />
            </div>

            {/* Quick actions + composer remain fixed */}
            <div className="absolute inset-x-3 bottom-[93px] z-40 flex gap-1.5">
              {["Plan a date", "Recommend a restaurant", "Outfit Check"].map(
                (action) => (
                  <button
                    key={action}
                    type="button"
                    className="flex-1 whitespace-nowrap rounded-full border border-[#D9BEB8] bg-[#FFF9F4] px-2 py-2 text-[6.3px] font-black text-[#8A2128]"
                  >
                    {action}
                  </button>
                ),
              )}
            </div>

            <div className="absolute inset-x-3 bottom-[61px] z-40 flex items-center gap-2">
              <div className="flex h-[30px] flex-1 items-center rounded-full border border-[#D9CEC5] bg-[#FFF9F4] px-3 text-[7px] font-semibold text-[#A69A93]">
                Ask the coach anything...
              </div>
              <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#9E202B] text-white">
                <span className="translate-x-[1px] text-[11px]">›</span>
              </div>
            </div>

            {sharedBottomNav}
          </>
        )}
      </div>
    </PhoneFrame>
  );
}

const PRODUCT_CATEGORIES = [
  {
    id: "discover" as const,
    label: "Discover & Connect",
    shortLabel: "Discover",
    icon: Heart,
  },
  {
    id: "timed" as const,
    label: "Timed Connections",
    shortLabel: "48H",
    icon: Clock3,
  },
  {
    id: "ai" as const,
    label: "Serasé AI",
    shortLabel: "AI",
    icon: Sparkles,
  },
];

const PRODUCT_DETAILS: Record<
  ProductSectionId,
  {
    eyebrow: string;
    title: string;
    copy: string;
    icon: React.ElementType;
    panelClass: string;
    eyebrowClass: string;
    iconWrapClass: string;
    titleClass: string;
    copyClass: string;
    pointIconClass: string;
    pointTitleClass: string;
    pointCopyClass: string;
    points: Array<[string, string]>;
  }
> = {
  discover: {
    eyebrow: "01 · Discover & Connect",
    title: "Discover with intention.",
    copy:
      "Profiles are designed to give you more context before you decide. Connect when the interest feels mutual, or use Signal when someone genuinely stands out.",
    icon: Heart,
    panelClass: "border-[#E5D7D0] bg-[#F8ECE8]",
    eyebrowClass: "text-[#8A2128]",
    iconWrapClass: "bg-[#EACDCA] text-[#8A2128]",
    titleClass: "text-[#241F1D]",
    copyClass: "text-muted-foreground",
    pointIconClass: "bg-white text-[#8A2128]",
    pointTitleClass: "text-[#3E3431]",
    pointCopyClass: "text-[#776963]",
    points: [
      [
        "Verified context",
        "Trust signals are visible before the first conversation.",
      ],
      [
        "Intentional discovery",
        "See more than a photo before deciding whether to connect.",
      ],
      [
        "Signal",
        "A clearer way to show stronger interest when someone stands out.",
      ],
    ],
  },

  timed: {
    eyebrow: "02 · Timed Connections",
    title: "Momentum, without pressure.",
    copy:
      "Every new connection starts with a visible 48-hour window. It is a gentle reason to show up while the connection is still fresh—not a reason to rush.",
    icon: Clock3,
    panelClass: "border-[#E8DEC9] bg-[#F8F2E6]",
    eyebrowClass: "text-[#946423]",
    iconWrapClass: "bg-[#EEDDBA] text-[#946423]",
    titleClass: "text-[#241F1D]",
    copyClass: "text-muted-foreground",
    pointIconClass: "bg-white text-[#A77025]",
    pointTitleClass: "text-[#3E3431]",
    pointCopyClass: "text-[#776963]",
    points: [
      [
        "48-hour window",
        "New connections begin with visible momentum.",
      ],
      [
        "Clear countdown",
        "Both people can see how much time remains.",
      ],
      [
        "Conversation first",
        "The goal is simply to start talking while interest is fresh.",
      ],
    ],
  },

  ai: {
    eyebrow: "03 · Serasé AI",
    title: "Helpful, without taking over.",
    copy:
      "Serasé AI is private support for the moments where a little help is useful—starting a reply, planning a date, or getting unstuck—while your choices stay yours.",
    icon: Sparkles,
    panelClass: "border-[#E0D5D1] bg-[#2A2322]",
    eyebrowClass: "text-[#E3BC66]",
    iconWrapClass: "bg-[#E3BC66]/14 text-[#E3BC66]",
    titleClass: "text-white",
    copyClass: "text-white/68",
    pointIconClass: "bg-white/10 text-[#E3BC66]",
    pointTitleClass: "text-white",
    pointCopyClass: "text-white/55",
    points: [
      [
        "Reply support",
        "Get help shaping a message while keeping your own voice.",
      ],
      [
        "Private coaching",
        "Guidance stays private and is never shown to your match.",
      ],
      [
        "Date ideas",
        "Turn mutual interest into practical ideas for meeting offline.",
      ],
    ],
  },
};


export default function Product() {
  useDocumentTitle("Product | Serasé");

  const shouldReduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState<ProductSectionId>("discover");

  const goToSection = (id: ProductSectionId) => {
    setActiveSection(id);
  };

  const activeDetails = PRODUCT_DETAILS[activeSection];
  const ActiveDescriptionIcon = activeDetails.icon;

  return (
    <div className="relative overflow-x-clip pb-24 pt-20 md:pb-28 md:pt-24">
      {/* ==================== Intro ==================== */}
      <section className="relative isolate min-h-[610px] overflow-hidden">
        {/* Single decorative heart-line only — no dots, particles, or extra shapes. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 610"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        >
          <defs>
            <linearGradient
              id="seraseProductHeartStroke"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop offset="0%" stopColor="#8A2128" stopOpacity="0.18" />
              <stop offset="42%" stopColor="#8A2128" stopOpacity="0.58" />
              <stop offset="100%" stopColor="#65171D" stopOpacity="0.78" />
            </linearGradient>
          </defs>

          <path
            d="M 650 545 C 790 585 920 548 985 480 C 1034 429 1039 374 1004 333 C 970 292 912 298 885 344 C 865 300 807 286 768 321 C 724 359 732 424 775 467 C 835 527 930 533 1038 501 C 1190 456 1322 363 1460 218"
            fill="none"
            stroke="url(#seraseProductHeartStroke)"
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="serase-container-wide relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-4xl pt-3 md:pt-5"
          >
            <div className="text-[12px] font-black uppercase tracking-[0.18em] text-[#8A2128]">
              Product
            </div>

            <h1 className="mt-5 text-[48px] font-black leading-[0.96] tracking-[-0.055em] text-[#241F1D] sm:text-[58px] md:text-[68px] lg:text-[78px]">
              Three parts.
              <br />
              <span className="bg-gradient-to-r from-[#A21F2D] via-[#C71E3B] to-[#E56A0A] bg-clip-text text-transparent">
                One connected experience.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-[17px] font-medium leading-[1.8] text-muted-foreground md:text-[18px]">
              Discover intentionally, keep new connections moving, and get private
              support when you need it. Everything is designed to work as one
              journey—not three separate products.
            </p>

            <div className="mt-8 text-[13px] font-black text-[#8A2128]">
              Choose a product category from the phone.
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== Product Layout ==================== */}
      <section className="serase-container-wide mt-16 px-6 md:mt-20">
        <div className="grid gap-12 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[330px_minmax(0,1fr)]">
          {/* ==================== Fixed / Sticky Phone Category Rail ==================== */}
          <aside className="relative hidden lg:block">
            <div className="sticky top-[9vh] flex justify-center">
              <div className="relative h-[610px] w-[340px] xl:w-[365px]">
                {/* Reuse the exact same PhoneFrame component as Home — near full visual scale */}
                <div className="absolute left-1/2 top-1/2 h-[546px] w-[260px] -translate-x-1/2 -translate-y-1/2">
                  <div className="origin-top-left scale-[1.05]">
                    <ProductPhonePreview activeSection={activeSection} />
                  </div>
                </div>

                {/* ==================== Floating category icons outside phone ==================== */}

                {/* Discover & Connect — upper right */}
                <button
                  type="button"
                  onClick={() => goToSection("discover")}
                  aria-label="Discover & Connect"
                  aria-current={activeSection === "discover" ? "true" : undefined}
                  className={`group absolute right-[8px] top-[62px] z-20 flex h-[54px] w-[54px] items-center justify-center rounded-full border-[3px] transition-all duration-300 ${
                    activeSection === "discover"
                      ? "border-white bg-[#8A2128] text-white shadow-[0_12px_28px_rgba(138,33,40,0.24)]"
                      : "border-white bg-[#FFF8F3] text-[#8A2128] shadow-[0_10px_24px_rgba(75,45,42,0.12)] hover:-translate-y-0.5"
                  }`}
                >
                  <Heart className="h-5 w-5" strokeWidth={1.9} />

                </button>

                {/* Timed Connections — left middle */}
                <button
                  type="button"
                  onClick={() => goToSection("timed")}
                  aria-label="Timed Connections"
                  aria-current={activeSection === "timed" ? "true" : undefined}
                  className={`group absolute left-[4px] top-[265px] z-20 flex h-[54px] w-[54px] items-center justify-center rounded-full border-[3px] transition-all duration-300 ${
                    activeSection === "timed"
                      ? "border-white bg-[#8A2128] text-white shadow-[0_12px_28px_rgba(138,33,40,0.24)]"
                      : "border-white bg-[#FFF8F3] text-[#8A2128] shadow-[0_10px_24px_rgba(75,45,42,0.12)] hover:-translate-y-0.5"
                  }`}
                >
                  <Clock3 className="h-5 w-5" strokeWidth={1.9} />

                </button>

                {/* Serasé AI — lower right */}
                <button
                  type="button"
                  onClick={() => goToSection("ai")}
                  aria-label="Serasé AI"
                  aria-current={activeSection === "ai" ? "true" : undefined}
                  className={`group absolute right-[6px] bottom-[68px] z-20 flex h-[54px] w-[54px] items-center justify-center rounded-full border-[3px] transition-all duration-300 ${
                    activeSection === "ai"
                      ? "border-white bg-[#8A2128] text-white shadow-[0_12px_28px_rgba(138,33,40,0.24)]"
                      : "border-white bg-[#FFF8F3] text-[#8A2128] shadow-[0_10px_24px_rgba(75,45,42,0.12)] hover:-translate-y-0.5"
                  }`}
                >
                  <Sparkles className="h-5 w-5" strokeWidth={1.9} />

                </button>


                {/* One fixed category label: its position never changes */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`desktop-category-label-${activeSection}`}
                    initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -6 }}
                    transition={{ duration: shouldReduceMotion ? 0.1 : 0.2 }}
                    className="pointer-events-none absolute left-[306px] top-[76px] z-30 whitespace-nowrap rounded-full border border-[#E3D5CE] bg-white/95 px-4 py-2.5 text-[10px] font-black text-[#4E403B] shadow-[0_8px_22px_rgba(75,45,42,0.10)] backdrop-blur-md xl:left-[324px]"
                  >
                    {PRODUCT_DETAILS[activeSection].eyebrow.replace(
                      /^\d+\s*·\s*/,
                      "",
                    )}
                  </motion.div>
                </AnimatePresence>

              </div>
            </div>
          </aside>

          {/* Mobile sticky category tabs */}
          <div className="sticky top-[72px] z-40 -mx-2 overflow-x-auto px-2 py-2 lg:hidden">
            <div className="mx-auto flex w-max items-center gap-2 rounded-full border border-[#E2D4CD] bg-[#FFF9F5]/92 p-1.5 shadow-[0_12px_30px_rgba(75,45,42,0.09)] backdrop-blur-xl">
              {PRODUCT_CATEGORIES.map((category) => {
                const Icon = category.icon;
                const active = activeSection === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => goToSection(category.id)}
                    className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-[11px] font-black transition-all ${
                      active
                        ? "bg-[#8A2128] text-white"
                        : "text-[#665752] hover:bg-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {category.shortLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ==================== Right-side Description — one fixed panel ==================== */}
          <div className="min-w-0 w-full max-w-[830px]">
            <section
              className={`overflow-hidden rounded-[3rem] border p-7 transition-colors duration-300 md:p-10 lg:h-[620px] lg:px-10 lg:py-9 xl:px-11 ${activeDetails.panelClass}`}
            >
              <div className="h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSection}
                    initial={{
                      opacity: 0,
                      x: shouldReduceMotion ? 0 : 20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: shouldReduceMotion ? 0 : -16,
                    }}
                    transition={{
                      duration: shouldReduceMotion ? 0.12 : 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="h-full w-full max-w-[720px] pt-1"
                  >
                    <div
                      className={`flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.16em] ${activeDetails.eyebrowClass}`}
                    >
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${activeDetails.iconWrapClass}`}
                      >
                        <ActiveDescriptionIcon className="h-4 w-4" />
                      </span>
                      {activeDetails.eyebrow}
                    </div>

                    <div className="mt-7 flex min-h-[118px] items-start">
                      <h2
                        className={`text-[42px] font-black leading-[1] tracking-[-0.045em] md:text-[54px] ${activeDetails.titleClass}`}
                      >
                        {activeDetails.title}
                      </h2>
                    </div>

                    <div className="mt-2 min-h-[116px]">
                      <p
                        className={`max-w-[680px] text-[17px] font-medium leading-[1.85] ${activeDetails.copyClass}`}
                      >
                        {activeDetails.copy}
                      </p>
                    </div>

                    <div className="mt-7 space-y-5">
                      {activeDetails.points.map(([title, copy]) => (
                        <div key={title} className="flex gap-4">
                          <div
                            className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-sm ${activeDetails.pointIconClass}`}
                          >
                            <ActiveDescriptionIcon className="h-4 w-4" />
                          </div>

                          <div>
                            <div
                              className={`text-[15px] font-black ${activeDetails.pointTitleClass}`}
                            >
                              {title}
                            </div>
                            <div
                              className={`mt-1.5 max-w-[600px] text-[14px] font-medium leading-[1.7] ${activeDetails.pointCopyClass}`}
                            >
                              {copy}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
