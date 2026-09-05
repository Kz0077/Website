import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Sparkles, Bot, Shield, Calendar, MessageSquareText, ArrowRight, MapPin, Shirt, LockKeyhole, CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion } from 'framer-motion';
import { usePageMeta } from "../hooks/usePageMeta";

export default function AICompanion() {
  usePageMeta("Serasé AI Companion & Coach", "See how Serasé AI can help with replies, date ideas, restaurant suggestions and private coaching.");

  const shouldReduceMotion = useReducedMotion();

  const fullText = '"I saw you\'re into modern art! If you could teleport to any gallery right now, where are we heading?"';
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✨ 唯一的打字机实现：基于 currentIndex 驱动，逻辑闭环、无竞态
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (currentIndex < fullText.length) {
      // 正在打字阶段
      timeoutId = setTimeout(() => {
        setTypedText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex((prev) => prev + 1);
      }, 58);
    } else {
      // 打字完成，等待 3 秒后重置
      timeoutId = setTimeout(() => {
        setTypedText('');
        setCurrentIndex(0);
      }, 3600);
    }

    return () => clearTimeout(timeoutId);
  }, [currentIndex, fullText]);

  return (
    <div className="pt-20 md:pt-24 pb-32 relative overflow-hidden">
      <style>{`
        @keyframes aiGlowDrift {
          0%,100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(22px,-18px,0) scale(1.04); }
        }
        @keyframes aiPromptFloat {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes aiFlowNode {
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
      
      {/* Serasé AI background */}
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <div className="serase-css-motion absolute -left-[15%] top-[4%] h-[680px] w-[680px] rounded-full bg-[#D6AA54]/[0.12] blur-[125px]" style={{ animation: shouldReduceMotion ? "none" : "aiGlowDrift 23s cubic-bezier(0.45, 0, 0.55, 1) infinite" }} />
        <div className="serase-css-motion absolute -right-[16%] top-[18%] h-[720px] w-[720px] serase-btn-nav bg-[#8A2128]/[0.11] blur-[130px]" style={{ animation: shouldReduceMotion ? "none" : "aiGlowDrift 27s cubic-bezier(0.45, 0, 0.55, 1) infinite reverse" }} />
        <div className="absolute left-[22%] top-[58%] h-[620px] w-[620px] rounded-full bg-[#C98A94]/[0.08] blur-[130px]" />
        <div className="serase-css-motion absolute left-[7%] top-[300px] rounded-[1.4rem] border border-[#DDCFC5]/40 bg-[#FFF9F5]/25 px-4 py-3 text-[12px] font-bold text-[#8A2128]/20" style={{ animation: shouldReduceMotion ? "none" : "aiPromptFloat 11s cubic-bezier(0.45, 0, 0.55, 1) infinite" }}>Help me reply…</div>
        <div className="serase-css-motion absolute right-[8%] top-[430px] rounded-[1.4rem] border border-[#DDCFC5]/40 bg-[#FFF9F5]/25 px-4 py-3 text-[12px] font-bold text-[#9A6B27]/20" style={{ animation: shouldReduceMotion ? "none" : "aiPromptFloat 13s cubic-bezier(0.45, 0, 0.55, 1) infinite reverse" }}>Plan a date…</div>
      </div>

      {/* 顶部标题区 */}
      <div className="text-center px-6 mb-20 max-w-3xl mx-auto space-y-4">
        <div className="serase-icon-lg bg-gradient-to-tr from-amber-500/20 to-primary/20 text-primary rounded-2xl mx-auto mb-6 shadow-md border border-amber-500/20 backdrop-blur-md">
          <Sparkles className="w-8 h-8 text-amber-600" />
        </div>
        <div className="serase-eyebrow serase-eyebrow-pill">
          Serasé AI
        </div>
        <h1 className="serase-h1">
          A little help, right when you need it.
        </h1>
        <p className="serase-lead max-w-2xl mx-auto">
          Ask naturally for help with a reply, a date idea, a restaurant recommendation or what to wear. Serasé AI gives you a useful starting point — you decide what happens next.
        </p>
      </div>

      {/* 核心双卡片展示区 */}
      <div className="serase-container-content px-6 grid lg:grid-cols-2 gap-8 items-stretch relative z-10">
        
        {/* 左卡片：Help me reply */}
        <div className="bg-white/80 backdrop-blur-xl border border-amber-200/60 rounded-serase-section p-8 shadow-2xl shadow-amber-900/10 flex flex-col justify-between relative overflow-hidden group serase-interact-card">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-300/20 rounded-full blur-2xl pointer-events-none"></div>

          <div>
            <div className="w-12 h-12 bg-amber-100/80 rounded-2xl flex items-center justify-center text-amber-700 mb-6 border border-amber-300/50 shadow-sm">
              <Sparkles className="w-6 h-6 fill-current" />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-3">
              Help me reply
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Stuck on what to say next? Ask in your own words and get a suggestion you can edit, ignore or send in your own voice.
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-amber-200/60 shadow-lg space-y-3">
            <div className="bg-slate-50/90 p-3 rounded-xl border border-gray-200/80 text-xs font-semibold text-gray-700 flex items-center gap-2.5">
              <MessageSquareText className="w-4 h-4 text-amber-500 shrink-0" />
              <p className="truncate">"Help me write an icebreaker about her love for modern art"</p>
            </div>

            <div className="bg-primary/5 border border-primary/20 text-primary p-3.5 rounded-xl text-xs font-medium space-y-1 min-h-[80px]">
              <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-primary">
                <Sparkles className="w-3.5 h-3.5 fill-current" /> Serasé AI suggestion
              </div>
              <p className="leading-relaxed font-semibold text-gray-800">
                {typedText}
                <span className="inline-block w-1 h-3.5 bg-amber-500 ml-1 animate-pulse"></span>
              </p>
            </div>
          </div>
        </div>

        {/* 右卡片：Serasé AI - The Signature Coach */}
        <div className="bg-gradient-to-br from-primary via-primary/95 to-rose-950 text-white rounded-serase-section p-8 shadow-2xl shadow-primary/30 flex flex-col justify-between relative overflow-hidden group border border-white/15 hover:scale-[1.008] transition-all duration-700 ease-out">
          <div className="absolute -top-12 -right-12 w-44 h-44 bg-amber-400/20 rounded-full blur-2xl pointer-events-none"></div>

          <div>
            <div className="flex justify-between items-start mb-6">
              <motion.div 
                animate={shouldReduceMotion ? {} : { scale: [1, 1.025, 1] }}
                transition={{ repeat: Infinity, duration: 4.8, ease: [0.45, 0, 0.55, 1] }}
                className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-amber-300 border border-white/20 shadow-inner"
              >
                <Bot className="w-6 h-6" />
              </motion.div>
              <span className="bg-amber-400/20 border border-amber-300/40 text-amber-200 text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider flex items-center gap-1.5 backdrop-blur-sm shadow-sm">
                <Shield className="w-3 h-3" /> Private by design
              </span>
            </div>

            <h3 className="text-2xl font-extrabold mb-3 text-white">
              Serasé Coach
            </h3>
            <p className="text-white/80 text-sm leading-relaxed mb-6 font-normal">
              Use Serasé Coach for practical help with date ideas, restaurant recommendations and outfit planning. Your Coach conversation stays private and is never shown to your match.
            </p>
          </div>

          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-3 shadow-xl">
            <div className="flex items-center justify-between text-xs font-bold text-amber-300 border-b border-white/10 pb-2.5">
              <span className="flex items-center gap-2"><Bot className="w-4 h-4" /> Serasé AI Coach</span>
              <span className="text-[10px] bg-amber-400/20 px-2 py-0.5 rounded text-amber-200 font-normal flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Active Thread
              </span>
            </div>
            
            <div className="bg-white/10 p-3 rounded-xl border border-white/10 space-y-1">
              <div className="text-[10px] font-bold text-amber-200 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Itinerary Card
              </div>
              <p className="text-xs font-bold text-white">Saturday Date: Coffee & Modern Art Walk</p>
              <p className="text-[11px] text-white/70">Tailored to your mutual interests in City Gallery.</p>
            </div>
          </div>

        </div>
      </div>
      {/* Real use cases */}
      <section className="serase-container-content px-6 mt-24">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <div className="serase-eyebrow text-[#8A2128]">Ask naturally</div>
          <h2 className="mt-3 text-[40px] md:text-[46px] font-black tracking-[-0.04em] text-[#241F1D]">Get something useful, not something generic.</h2>
          <p className="mt-4 text-[16px] font-medium leading-[1.75] text-muted-foreground">
            Serasé AI is designed around the moments where a little help can keep things moving.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: MessageSquareText, prompt: "Help me reply", result: "Draft a natural response based on the conversation.", tone: "bg-[#F7E9E7]" },
            { icon: MapPin, prompt: "Recommend a restaurant", result: "Turn the vibe you want into a place to consider.", tone: "bg-[#F6EFE0]" },
            { icon: Shirt, prompt: "Outfit check", result: "Get a practical suggestion for the kind of date you have planned.", tone: "bg-[#F7E9EB]" },
          ].map((item, index) => (
            <motion.article
              key={item.prompt}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1], delay: shouldReduceMotion ? 0 : index * 0.07 }}
              className={`rounded-serase-card border serase-card-border ${item.tone} p-6 serase-shadow-card`}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/75 text-[#8A2128]">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="mt-5 rounded-2xl border border-white/70 bg-white/60 px-4 py-3 text-[13px] font-black text-[#8A2128]">“{item.prompt}”</div>
              <p className="mt-4 text-[14px] font-medium leading-[1.7] text-muted-foreground">{item.result}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Prompt-to-plan flow */}
      <section className="serase-container-content px-6 mt-24">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-serase-section border serase-card-border bg-[#FFF9F5]/86 p-8 md:p-10"
        >
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <div className="serase-eyebrow text-[#8A2128]">From prompt to plan</div>
            <h2 className="mt-3 text-[38px] md:text-[44px] font-black tracking-[-0.04em] text-[#282220]">Serasé suggests. You decide.</h2>
          </div>
          <div className="relative">
            {/* Track starts at Your prompt centre and ends at You decide centre */}
            <div
              aria-hidden="true"
              className="absolute top-[24px] z-0 hidden h-[2px] bg-gradient-to-r from-[#D4A74D]/50 via-[#8A2128]/50 to-[#D4A74D]/50 md:block"
              style={{
                left: "calc((100% - 84px) / 8)",
                right: "calc((100% - 84px) / 8)",
              }}
            >
              <span
                className="serase-css-motion absolute left-0 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D5AA54] shadow-[0_0_18px_rgba(213,170,84,0.68)]"
                style={{
                  animation: shouldReduceMotion ? "none" : "aiFlowNode 10.5s cubic-bezier(0.45, 0, 0.55, 1) infinite",
                  willChange: "left",
                }}
              />
            </div>

            <div className="relative z-10 grid gap-7 md:grid-cols-4">
              {[
                ["01", "Your prompt", MessageSquareText],
                ["02", "Context", Sparkles],
                ["03", "Suggestion", Bot],
                ["04", "You decide", CheckCircle2],
              ].map(([step, label, Icon]) => {
                const FlowIcon = Icon as any;
                return (
                  <div key={label as string} className="relative flex flex-col items-center text-center">
                    <div className="relative z-20 flex h-12 w-12 items-center justify-center serase-btn-nav bg-[#8A2128] text-white ring-[5px] ring-[#F8EEE8] shadow-[0_7px_16px_rgba(138,33,40,0.13)]">
                      <FlowIcon className="h-5 w-5" />
                    </div>
                    <div className="mt-4 text-[10px] font-black uppercase tracking-[0.14em] text-[#9A7A6D]">
                      Step {step as string}
                    </div>
                    <div className="mt-1 text-[17px] font-black text-[#332C29]">
                      {label as string}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Privacy */}
      <section className="serase-container-content px-6 mt-24">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="grid items-center gap-10 rounded-serase-section bg-[#7F1F26] p-8 text-white md:grid-cols-[0.9fr_1.1fr] md:p-10"
        >
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#E8C76E]">
              <LockKeyhole className="h-5 w-5" />
            </div>
            <div className="mt-5 serase-eyebrow text-[#E8C76E]">Private by design</div>
            <h2 className="mt-3 text-[38px] md:text-[44px] font-black tracking-[-0.04em]">Your Coach conversation stays yours.</h2>
          </div>
          <div className="space-y-3">
            {[
              "Your match does not see your Serasé Coach conversation.",
              "You choose what to use, edit or send.",
              "AI suggestions support your judgment — they do not replace it.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3.5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#E8C76E]" />
                <span className="text-[14px] font-semibold leading-[1.6] text-white/90">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="serase-container-content px-6 mt-24">
        <div className="rounded-serase-section border serase-card-border bg-[#F8EEE8] px-8 py-12 text-center">
          <div className="mx-auto max-w-2xl">
            <div className="text-[11px] font-black uppercase tracking-[0.16em] text-[#8A2128]">A little help when you need it</div>
            <h2 className="mt-3 text-[36px] md:text-[42px] font-black tracking-[-0.04em] text-[#292321]">See how Serasé AI fits into the wider experience.</h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] font-medium leading-[1.75] text-muted-foreground">
              Explore how Serasé moves from discovery to connection, conversation and real date planning.
            </p>
            <Link to="/features" className="group mt-7 inline-flex items-center gap-2 serase-btn-nav bg-[#8A2128] px-5 py-3 text-[13px] font-black text-white serase-interact-nav">
              Explore Product Features <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>


    </div>
  );
}