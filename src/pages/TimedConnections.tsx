import { Clock, AlertCircle, MessageCircle, Sparkles, Search, ShieldCheck, Check, Bookmark, Bell, User, TimerReset, Eye, MessagesSquare, CalendarHeart, CheckCircle2, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router";
import PhoneFrame from "../components/PhoneFrame";
import { usePageMeta } from "../hooks/usePageMeta";
import { getStaggerContainer, getFadeUpItem } from "../utils/animations";
import seraseLogo from "../../.figma/attachments/image-0.png";

const CONNECTIONS = [
  { name: "Yaya", hoursLeft: "41h left", progress: 85, urgent: false },
  { name: "Soso", hoursLeft: "29h left", progress: 60, urgent: false },
  { name: "Amira", hoursLeft: "35h left", progress: 73, urgent: false },
  { name: "Priya", hoursLeft: "18h left", progress: 38, urgent: false },
  { name: "Yuki", hoursLeft: "57m left", progress: 4, urgent: true },
];

const VISIBLE_CONNECTIONS = [CONNECTIONS[0], CONNECTIONS[1], CONNECTIONS[2], CONNECTIONS[4]];

export default function TimedConnections() {
  usePageMeta("Timed Connections | Serasé", "Learn how Serasé uses a visible 48-hour connection window to encourage new connections to move forward.");

  const shouldReduceMotion = useReducedMotion();
  const stagger = getStaggerContainer(shouldReduceMotion);
  const fadeUp = getFadeUpItem(shouldReduceMotion);

  return (
    <div className="relative pt-20 md:pt-24 pb-32 overflow-x-hidden">
      <style>{`
        @keyframes timedRingBreath {
          0%,100% { transform: translateX(-50%) scale(1); opacity: .16; }
          50% { transform: translateX(-50%) scale(1.04); opacity: .28; }
        }
        @keyframes timedNodeTravel {
          0% { left: 0%; }
          50% { left: 100%; }
          100% { left: 0%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .serase-css-motion {
            animation: none !important;
          }

          .serase-timed-ring-motion {
            transform: translateX(-50%) !important;
          }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <div className="serase-css-motion serase-timed-ring-motion absolute left-1/2 top-[-320px] h-[900px] w-[900px] rounded-full border border-[#8A2128]/10" style={{ animation: shouldReduceMotion ? "none" : "timedRingBreath 15s cubic-bezier(0.45, 0, 0.55, 1) infinite", transform: shouldReduceMotion ? "translateX(-50%)" : undefined }} />
        <div className="absolute left-1/2 top-[-230px] h-[720px] w-[720px] -translate-x-1/2 rounded-full border border-[#D5AA54]/10" />
        <div className="absolute -left-[15%] top-[20%] h-[680px] w-[680px] rounded-full bg-[#8A2128]/[0.065] blur-[130px]" />
        <div className="absolute -right-[15%] top-[55%] h-[680px] w-[680px] rounded-full bg-[#D6AA54]/[0.09] blur-[130px]" />
        <div className="absolute left-[4%] top-[330px] select-none text-[180px] font-black leading-none text-[#8A2128]/[0.025] md:text-[230px]">48</div>
        <div className="absolute right-[7%] top-[880px] select-none text-[160px] font-black leading-none text-[#C89B42]/[0.035] md:text-[210px]">24</div>
      </div>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="serase-container-content px-6"
      >
        <motion.div variants={fadeUp} className="text-center mb-20 max-w-3xl mx-auto space-y-4">
          <motion.div
            animate={{ scale: shouldReduceMotion ? 1 : [1, 1.06, 1] }}
            transition={{ repeat: Infinity, duration: 4.2, ease: [0.45, 0, 0.55, 1] }}
            className="serase-icon-lg bg-red-50 text-primary rounded-full mx-auto mb-6 shadow-inner"
          >
            <Clock className="w-10 h-10" />
          </motion.div>
          <div className="serase-eyebrow serase-eyebrow-pill">
            48-Hour Connections
          </div>
          <h1 className="serase-h1">Timed Connections</h1>
          <p className="serase-lead">
            The end of ghosting. If nothing moves forward, the connection closes on its own.
          </p>
        </motion.div>


        {/* Why 48 hours */}
        <motion.section variants={fadeUp} className="mb-24">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <div className="serase-eyebrow text-[#8A2128]">Why 48 hours?</div>
            <h2 className="mt-3 text-[38px] md:text-[44px] font-black tracking-[-0.04em] text-[#25201F]">Enough time to connect. Not enough time to disappear.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { icon: Sparkles, title: "Start while interest is fresh", copy: "A clear window encourages that first message while the connection still feels current." },
              { icon: TimerReset, title: "Less connection collecting", copy: "The goal is conversation, not building a list of people you never speak to." },
              { icon: Eye, title: "Know where things stand", copy: "The countdown stays visible so both people understand how much time remains." },
            ].map((item) => (
              <div key={item.title} className="rounded-serase-card border serase-card-border bg-[#FFF8F4]/85 p-6 serase-shadow-card">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F2DDDA] text-[#8A2128]">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-[19px] font-black tracking-[-0.02em] text-[#2B2523]">{item.title}</h3>
                <p className="mt-2 text-[14.5px] font-medium leading-[1.7] text-muted-foreground">{item.copy}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">

          <motion.div variants={fadeUp} className="space-y-8">
            <div>
              <h3 className="text-3xl font-extrabold text-foreground tracking-tight mb-4">How it works</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Once you connect with someone, a 48-hour window opens. If the first message isn't sent,
                or a reply isn't received within that window, the connection quietly closes — no
                notification, no awkward silence to explain.
              </p>
            </div>

            <div className="bg-red-50/80 border border-red-100 p-6 rounded-2xl flex items-start gap-4 shadow-sm">
              <AlertCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
              <p className="text-primary font-medium leading-relaxed text-sm">
                This encourages intentional, high-quality conversations instead of collecting
                connections for validation.
              </p>
            </div>

            <div className="flex items-start gap-3 text-sm text-muted-foreground font-medium">
              <MessageCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p>Your Messages tab shows exactly how much time is left on each open connection, so nothing quietly slips away.</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="relative flex justify-center items-center group w-full">
            <div className="absolute w-[110%] h-[110%] bg-gradient-to-br from-red-500/15 to-orange-500/5 rounded-full blur-[80px] -z-10 transition-opacity duration-700 ease-out group-hover:opacity-75"></div>

            <PhoneFrame screenClassName="bg-[#F8F1EA]">
              <div className="relative h-full overflow-hidden bg-[#F8F1EA]">

                {/* Global Messages header — centered Serasé logo */}
                <div className="absolute inset-x-0 top-[30px] z-30 h-[44px] border-b border-[#E8DED1] bg-[#FFF9F3]/98 backdrop-blur-md">
                  <div className="flex h-full items-center justify-center">
                    <img src={seraseLogo} alt="Serasé" className="h-[22px] w-[22px] object-contain" />
                  </div>
                </div>

                {/* New Connections + collapsed Search */}
                <div className="absolute inset-x-0 top-[84px] z-20 px-3">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="text-[6.4px] font-black uppercase tracking-[0.16em] text-[#766C67]">
                      New connections
                    </span>
                    <span className="whitespace-nowrap text-[5.8px] font-semibold text-[#9D928C]">
                      Say hi before the ring empties
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-1">
                    {VISIBLE_CONNECTIONS.map((c, idx) => (
                      <motion.div
                        key={c.name}
                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: shouldReduceMotion ? 0 : 0.08 * idx,
                          duration: 0.5,
                        }}
                        className="flex w-[43px] flex-col items-center"
                      >
                        <motion.div
                          animate={
                            c.urgent && !shouldReduceMotion
                              ? { scale: [1, 1.05, 1] }
                              : undefined
                          }
                          transition={{
                            duration: 2.4,
                            repeat: c.urgent ? Infinity : 0,
                            ease: [0.45, 0, 0.55, 1],
                          }}
                          className="relative flex h-[40px] w-[40px] items-center justify-center rounded-full"
                          style={{
                            background: `conic-gradient(#D7A743 ${c.progress}%, #C9C5C1 ${c.progress}% 100%)`,
                          }}
                        >
                          <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#FFF9F3]">
                            <div className={`flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[radial-gradient(circle_at_50%_30%,#B69791_0%,#8A6C6C_55%,#654E50_100%)] text-[8.5px] font-black text-white ${c.urgent ? "brightness-75" : ""}`}>
                              {c.name.charAt(0)}
                            </div>
                          </div>
                        </motion.div>

                        <span className="mt-1 text-[5.9px] font-extrabold text-[#342E2C]">
                          {c.name}
                        </span>
                        <span
                          className={`mt-0.5 text-[5.3px] font-bold ${
                            c.urgent ? "text-[#D6505A]" : "text-[#8D837D]"
                          }`}
                        >
                          {c.hoursLeft}
                        </span>
                      </motion.div>
                    ))}

                    <button
                      type="button"
                      aria-label="Search connections"
                      className="mt-1 flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-[#DBB774] text-[#8A2128] shadow-sm ring-1 ring-[#C99F4D]/30"
                    >
                      <Search className="h-3.5 w-3.5" strokeWidth={2.2} />
                    </button>
                  </div>
                </div>

                {/* Active chat list */}
                <div className="absolute inset-x-0 bottom-[74px] top-[186px] z-10 overflow-y-auto px-3 pr-4 [scrollbar-width:thin] [scrollbar-color:#C4BCB6_transparent] [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#C4BCB6]">
                  <div className="flex flex-col">
                    {[
                      {
                        name: "Amira",
                        preview: "Ha. You get one vote. Are you around Thursday?",
                        time: "11:36",
                        unread: 1,
                        sent: false,
                      },
                      {
                        name: "Yaya",
                        preview: "Sent you the set list. Third track is the one.",
                        time: "10:12",
                        unread: 0,
                        sent: true,
                      },
                      {
                        name: "Soso",
                        preview: "Sunday drive. I am picking the route.",
                        time: "10:04",
                        unread: 0,
                        sent: true,
                      },
                    ].map((m, idx) => (
                      <motion.div
                        key={m.name}
                        initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: shouldReduceMotion ? 0 : 0.32 + idx * 0.08,
                          duration: 0.5,
                        }}
                        className="flex min-h-[55px] items-center gap-2.5 border-b border-[#E7DDD5] px-1 py-2"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#DBB774] bg-[radial-gradient(circle_at_50%_30%,#B69791_0%,#8A6C6C_55%,#654E50_100%)]" />

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex min-w-0 items-center gap-1">
                              <span className="truncate text-[8.2px] font-black text-[#8A2128]">
                                {m.name}
                              </span>
                              <ShieldCheck className="h-2.5 w-2.5 shrink-0 text-[#D3A739]" />
                            </div>
                            <span className="shrink-0 text-[5.8px] font-semibold text-[#A29993]">
                              {m.time}
                            </span>
                          </div>

                          <div className="mt-0.5 flex items-center gap-2">
                            <div
                              className={`min-w-0 flex-1 truncate text-[6.8px] leading-tight ${
                                m.unread
                                  ? "font-semibold text-[#5A504B]"
                                  : "font-medium text-[#8D837D]"
                              }`}
                            >
                              {m.preview}
                            </div>

                            {m.unread ? (
                              <span className="flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full bg-[#DBB774] px-1 text-[5.6px] font-black text-[#8A2128]">
                                {m.unread}
                              </span>
                            ) : m.sent ? (
                              <Check className="h-2.5 w-2.5 shrink-0 text-[#8A2128]" strokeWidth={2.5} />
                            ) : null}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Messages bottom navigation */}
                <div className="absolute bottom-[12px] left-2 right-2 z-30 h-[54px] rounded-[1.4rem] bg-white/82 px-3 pt-[6px] shadow-[0_10px_24px_rgba(98,64,57,0.11)] backdrop-blur-md">
                  <div className="relative mx-auto grid h-[40px] w-[95%] max-w-[220px] grid-cols-5 items-center rounded-full bg-[#A91F2D] px-2 text-white shadow-[0_8px_18px_rgba(169,31,45,0.28)]">
                    <div className="flex h-full items-center justify-center">
                      <div className="flex h-[29px] w-[29px] items-center justify-center rounded-full bg-[#DBB774] text-[#8A2128]">
                        <MessageCircle className="h-[13px] w-[13px]" strokeWidth={2} />
                      </div>
                    </div>
                    <div className="flex h-full items-center justify-center">
                      <Bookmark className="h-[13px] w-[13px]" strokeWidth={1.9} />
                    </div>
                    <div className="flex h-full items-center justify-center">
                      <img src={seraseLogo} alt="Home" className="h-[17px] w-[17px] object-contain brightness-0 invert" />
                    </div>
                    <div className="flex h-full items-center justify-center">
                      <Bell className="h-[13px] w-[13px]" strokeWidth={1.9} />
                    </div>
                    <div className="flex h-full items-center justify-center">
                      <User className="h-[13px] w-[13px]" strokeWidth={1.9} />
                    </div>
                  </div>
                </div>
              </div>
            </PhoneFrame>
          </motion.div>

        </div>
        {/* Connection rhythm */}
        <motion.section variants={fadeUp} className="mt-28">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="serase-eyebrow text-[#8A2128]">A connection has a rhythm</div>
            <h2 className="mt-3 text-[40px] md:text-[46px] font-black tracking-[-0.04em] text-[#24201E]">Watch the connection move forward.</h2>
            <p className="mx-auto mt-4 max-w-xl text-[16px] font-medium leading-[1.75] text-muted-foreground">
              The timer is not there to rush you. It gives a new connection a visible sense of momentum.
            </p>
          </div>

          <div className="overflow-hidden rounded-serase-section border serase-card-border bg-[#FFF9F5]/88 p-7 md:p-10">
            <div className="relative">
              {/* Track starts at Connected centre and ends at Plan the date centre */}
              <div
                aria-hidden="true"
                className="absolute top-[24px] z-0 hidden h-[2px] bg-gradient-to-r from-[#D3A544]/45 via-[#8A2128]/55 to-[#D3A544]/45 md:block"
                style={{
                  left: "calc((100% - 96px) / 8)",
                  right: "calc((100% - 96px) / 8)",
                }}
              >
                <span
                  className="serase-css-motion absolute left-0 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D5AA54] shadow-[0_0_18px_rgba(213,170,84,0.72)]"
                  style={{
                    animation: shouldReduceMotion ? "none" : "timedNodeTravel 10s cubic-bezier(0.45, 0, 0.55, 1) infinite",
                    willChange: "left",
                  }}
                />
              </div>

              <div className="relative z-10 grid gap-8 md:grid-cols-4">
                {[
                  ["48:00", "Connected", ShieldCheck],
                  ["35:42", "First message", MessageCircle],
                  ["18:20", "Conversation moving", MessagesSquare],
                  ["Ready", "Plan the date", CalendarHeart],
                ].map(([time, label, Icon], index) => {
                  const TimelineIcon = Icon as any;
                  return (
                    <div key={label as string} className="relative flex flex-col items-center text-center">
                      <div className={`relative z-20 flex h-12 w-12 items-center justify-center rounded-full ring-[5px] ring-[#F8EEE8] ${index === 3 ? "bg-[#D6AA50] text-[#6E181E]" : "bg-[#8A2128] text-white"}`}>
                        <TimelineIcon className="h-5 w-5" />
                      </div>
                      <div className="mt-4 text-[20px] font-black text-[#8A2128]">
                        {time as string}
                      </div>
                      <div className="mt-1 text-[15px] font-bold text-[#403937]">
                        {label as string}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Visibility */}
        <motion.section variants={fadeUp} className="mt-24 grid items-center gap-10 rounded-serase-section bg-[#F6E9E7] p-8 md:grid-cols-[0.95fr_1.05fr] md:p-10">
          <div>
            <div className="serase-eyebrow text-[#8A2128]">Nothing hidden</div>
            <h2 className="mt-3 text-[38px] md:text-[44px] font-black tracking-[-0.04em] text-[#282321]">You can always see the state of the connection.</h2>
            <p className="mt-4 text-[15px] font-medium leading-[1.75] text-muted-foreground">
              Your Messages view keeps the countdown visible and makes urgent connections easy to recognize.
            </p>
          </div>
          <div className="space-y-3">
            {[
              "Countdown visible in Messages",
              "Urgent connections become visually distinct",
              "Both people can see how much time remains",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-[#E5D5D2] bg-white/75 px-4 py-3.5">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[#8A2128]" />
                <span className="text-[14px] font-bold text-[#4B4240]">{item}</span>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section variants={fadeUp} className="mt-24 rounded-serase-section bg-[#7F1F26] px-8 py-12 text-center text-white">
          <div className="mx-auto max-w-2xl">
            <div className="serase-eyebrow text-[#E8C76E]">Make the connection count</div>
            <h2 className="mt-3 text-[36px] md:text-[42px] font-black tracking-[-0.04em]">See where Timed Connections fit into Serasé.</h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] font-medium leading-[1.75] text-white/80">
              Discover how verified profiles, conversation, readiness and date planning all connect.
            </p>
            <Link to="/features" className="group mt-7 inline-flex items-center gap-2 serase-btn-nav bg-[#E2B958] px-5 py-3 text-[13px] font-black text-[#6E181E] serase-interact-nav">
              Explore Product Features <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.section>


      </motion.div>
    </div>
  );
}