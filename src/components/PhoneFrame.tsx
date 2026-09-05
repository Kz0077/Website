import type { ReactNode } from "react";
import { motion, type MotionStyle } from "framer-motion";

type StatusBarTheme = "light" | "dark";

interface PhoneFrameProps {
  children: ReactNode;
  screenClassName?: string;
  className?: string;
  style?: MotionStyle;
  statusBarTheme?: StatusBarTheme;
}

function StatusBar({ theme = "dark" }: { theme?: StatusBarTheme }) {
  const foreground = theme === "dark" ? "text-[#111318]" : "text-white";

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-0 z-50 flex h-8 items-center justify-between px-[16px] ${foreground}`}
      aria-hidden="true"
    >
      <span
        className="min-w-[38px] translate-y-[3px] text-center text-[12px] font-semibold leading-none tracking-[-0.045em]"
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
        }}
      >
        9:41
      </span>

      <div className="absolute left-1/2 top-[5px] flex h-[22px] w-[69px] -translate-x-1/2 items-center justify-end rounded-full bg-[#030303] px-[8px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_1px_2px_rgba(0,0,0,0.35)]">
        <div className="h-[5.5px] w-[5.5px] rounded-full bg-[#0A0C10] ring-1 ring-white/[0.035]">
          <div className="ml-[1.5px] mt-[1.5px] h-[1px] w-[1px] rounded-full bg-slate-500/20" />
        </div>
      </div>

      <div className="flex min-w-[52px] translate-y-[3px] items-center justify-end gap-[3px]">
        {/* iOS cellular bars */}
        <svg
          className="h-[9.5px] w-[13px] overflow-visible"
          viewBox="0 0 17 12"
          fill="currentColor"
          shapeRendering="geometricPrecision"
        >
          <rect x="0" y="8" width="3" height="4" rx="1.15" />
          <rect x="4.6" y="5.5" width="3" height="6.5" rx="1.15" />
          <rect x="9.2" y="2.75" width="3" height="9.25" rx="1.15" />
          <rect x="13.8" y="0" width="3" height="12" rx="1.15" />
        </svg>

        {/* iOS Wi-Fi glyph: three clean, rounded arcs */}
        <svg
          className="h-[9.5px] w-[15px] overflow-visible"
          viewBox="0 0 18 13"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          shapeRendering="geometricPrecision"
        >
          <path d="M1.25 4.1C5.72.28 12.28.28 16.75 4.1" strokeWidth="2.4" />
          <path d="M4.25 7.25a7.25 7.25 0 0 1 9.5 0" strokeWidth="2.4" />
          <path d="M7.35 10.25a2.55 2.55 0 0 1 3.3 0" strokeWidth="2.4" />
          <circle cx="9" cy="11.8" r="1.15" fill="currentColor" stroke="none" />
        </svg>

        {/* iOS battery outline, charge and terminal */}
        <svg
          className="h-[9.5px] w-[19px] overflow-visible"
          viewBox="0 0 25 12"
          fill="none"
          shapeRendering="geometricPrecision"
        >
          <rect
            x="0.65"
            y="0.65"
            width="20.2"
            height="10.7"
            rx="3.15"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.62"
          />
          <rect x="2.25" y="2.25" width="16.15" height="7.5" rx="1.75" fill="currentColor" />
          <path
            d="M22.15 4.05c.94.34 1.55 1.05 1.55 1.95s-.61 1.61-1.55 1.95V4.05Z"
            fill="currentColor"
            opacity="0.58"
          />
        </svg>
      </div>
    </div>
  );
}

export default function PhoneFrame({
  children,
  screenClassName = "bg-slate-50",
  className = "",
  style,
  statusBarTheme = "dark",
}: PhoneFrameProps) {
  return (
    <motion.div
      style={style}
      className={`relative z-10 h-[520px] w-[248px] rounded-[3.02rem] bg-[linear-gradient(105deg,#F8FAFC_0%,#A7ADB5_5%,#3E434B_9%,#EEF1F4_13%,#FFFFFF_20%,#8D939B_47%,#F8FAFC_78%,#5B6169_92%,#E9EDF1_97%,#FFFFFF_100%)] p-[4px] shadow-[0_38px_75px_-30px_rgba(15,23,42,0.58),0_18px_32px_-20px_rgba(15,23,42,0.48),inset_0_0_0_1px_rgba(255,255,255,0.85)] transition-transform duration-500 group-hover:scale-[1.02] ${className}`}
      aria-label="iPhone-style device preview"
    >
      {/* Polished stainless-steel highlights */}
      <div className="pointer-events-none absolute inset-[1px] rounded-[2.96rem] border border-white/80 shadow-[inset_1px_0_1px_rgba(255,255,255,0.9),inset_-1px_0_1px_rgba(17,24,39,0.35)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-8 top-[2px] h-px bg-white" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-[2px] left-10 right-10 h-px bg-black/25" aria-hidden="true" />

      {/*
        Clean continuous frame:
        no mute/action switch, volume buttons, power button,
        or visible side antenna/button pieces.
      */}

      {/* Narrow black bezel and edge-to-edge front glass */}
      <div className="relative h-full w-full rounded-[2.77rem] bg-[#020304] p-[6px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.13),inset_0_0_7px_rgba(0,0,0,0.95),0_0_0_1px_rgba(0,0,0,0.72)]">
        <div
          className={`${screenClassName} relative flex h-full w-full flex-col overflow-hidden rounded-[2.39rem] font-sans ring-1 ring-black/90`}
        >
          <StatusBar theme={statusBarTheme} />
          {children}

          <div
            className="pointer-events-none absolute inset-x-3 top-px z-40 h-16 rounded-t-[2.15rem] bg-gradient-to-b from-white/15 to-transparent opacity-55 mix-blend-screen"
            aria-hidden="true"
          />

          <div
            className={`pointer-events-none absolute bottom-[7px] left-1/2 z-50 h-[4px] w-[78px] -translate-x-1/2 rounded-full ${
              statusBarTheme === "dark" ? "bg-black/35" : "bg-white/70"
            }`}
            aria-hidden="true"
          />
        </div>
      </div>
    </motion.div>
  );
}