import { Check, Crown, Sparkles, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { usePageMeta } from "../hooks/usePageMeta";
import { getStaggerContainer, getFadeUpItem } from "../utils/animations";

const plans = [
  {
    name: "Serasé Core",
    price: "Free",
    period: "",
    description: "A verified starting point for intentional dating.",
    features: ["30 likes/day", "5 AI prompts", "Verified badge"],
    featured: false,
    signature: false,
  },
  {
    name: "Serasé Select",
    price: "RM 14.99",
    period: "/month",
    description: "More control over discovery and everyday matching.",
    features: ["Signal", "See who liked you", "5 rewinds/day", "30 AI prompts", "Hide age"],
    featured: false,
    signature: false,
  },
  {
    name: "Serasé Elite",
    price: "RM 39.99",
    period: "/month",
    description: "More visibility and conversation controls.",
    features: ["Includes Select features", "Read receipts", "75 AI prompts", "Weekly Boost", "Custom visibility"],
    featured: true,
    signature: false,
  },
  {
    name: "Serasé Signature",
    price: "RM 89.99",
    period: "/month",
    description: "The highest level of privacy and premium account support.",
    features: ["Includes Elite features", "Incognito", "Visitor insights", "150 AI prompts", "Priority verification"],
    featured: false,
    signature: true,
  },
];

export default function Pricing() {
  usePageMeta(
    "Subscriptions & Pricing | Serasé",
    "Compare Serasé Core, Select, Elite and Signature plans, including monthly prices and key plan features."
  );

  const shouldReduceMotion = useReducedMotion();
  const stagger = getStaggerContainer(shouldReduceMotion);
  const fadeUp = getFadeUpItem(shouldReduceMotion);

  return (
    <main className="min-h-screen bg-background pt-20 pb-32 md:pt-24">
      <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-br from-rose-500/10 via-amber-500/10 to-primary/10 blur-[140px]" />

      <div className="serase-container-hero px-6">
        <motion.header
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="serase-eyebrow serase-eyebrow-pill">
            <Sparkles className="h-3.5 w-3.5" /> Plans & Pricing
          </div>
          <h1 className="serase-h1 mt-4">Choose the level that fits you.</h1>
          <p className="serase-lead mx-auto mt-4 max-w-2xl">
            Start free, then unlock more discovery, visibility and privacy controls when you want them.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-[12px] font-semibold leading-[1.6] text-muted-foreground">
            Prices shown are monthly plan prices in the current product configuration. Billing availability may vary at launch.
          </p>
        </motion.header>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
        >
          {plans.map((plan) => (
            <motion.article
              key={plan.name}
              variants={fadeUp}
              className={`relative flex min-h-[470px] flex-col rounded-serase-section p-7 serase-interact-card ${
                plan.signature
                  ? "border-2 border-amber-400/40 bg-gradient-to-b from-rose-950 via-primary to-rose-950 text-white serase-shadow-elevated"
                  : plan.featured
                  ? "border-2 border-primary/30 bg-white serase-shadow-elevated"
                  : "border serase-card-border bg-white/90 serase-shadow-card"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white">
                  Most Popular
                </div>
              )}
              {plan.signature && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-amber-300 px-4 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#4A2D13]">
                  <Crown className="h-3 w-3" /> Signature
                </div>
              )}

              <div>
                <h2 className={`text-xl font-black ${plan.signature ? "text-amber-300" : "text-serase-heading"}`}>
                  {plan.name}
                </h2>
                <p className={`mt-2 text-[13px] font-medium leading-[1.65] ${plan.signature ? "text-white/70" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>

                <div className={`mt-7 border-b pb-6 ${plan.signature ? "border-white/10" : "border-border/70"}`}>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-black tracking-[-0.04em] ${plan.signature ? "text-white" : "text-serase-heading"}`}>
                      {plan.price}
                    </span>
                    <span className={`text-xs font-bold ${plan.signature ? "text-amber-200/80" : "text-muted-foreground"}`}>
                      {plan.period}
                    </span>
                  </div>
                </div>

                <ul className="mt-7 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-[13px] font-semibold leading-[1.6]">
                      <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${plan.signature ? "bg-amber-400/20 text-amber-300" : "bg-primary/10 text-primary"}`}>
                        <Check className="h-3 w-3 stroke-[3]" />
                      </div>
                      <span className={plan.signature ? "text-white/88" : "text-[#5F5551]"}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-8">
                <div className={`serase-btn-action flex min-h-12 items-center justify-center px-4 py-3 text-center text-xs font-black ${
                  plan.signature
                    ? "bg-white/10 text-white ring-1 ring-white/15"
                    : "bg-[#F5EEE9] text-primary"
                }`}>
                  Available at launch
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="mx-auto mt-14 flex max-w-3xl items-start gap-4 rounded-serase-sm border serase-card-border bg-white/75 p-6">
          <div className="serase-icon-sm shrink-0 rounded-xl bg-primary/8 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-[15px] font-black text-serase-heading">No website checkout yet</h2>
            <p className="mt-1 text-[13px] font-medium leading-[1.65] text-muted-foreground">
              This page does not simulate payment or activation. Purchase and billing actions should only be enabled when the production payment channel is connected.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
