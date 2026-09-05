import React from "react";
import {
  ArrowRight,
  CheckCircle2,
  EyeOff,
  HeartHandshake,
  Lock,
  MapPin,
  MessageSquare,
  MessageCircleQuestion,
  Phone,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useDocumentTitle } from "../hooks/usePageMeta";

const protectionPillars = [
  {
    icon: UserCheck,
    title: "Verified people, clearer intent",
    description:
      "Dual Verification combines MyDigital ID with a liveness check to help confirm that members are real adults. A verified badge shows completion of these checks—not a guarantee of future conduct.",
    iconClass: "bg-[#EEF4DE] text-[#6F8429] border-[#DCE7BD]",
  },
  {
    icon: ShieldAlert,
    title: "Control every interaction",
    description:
      "Report, block or disconnect whenever something feels wrong. Safety reports are prioritised and reviewed against our rules, with action taken based on the available information.",
    iconClass: "bg-[#FBE7E6] text-[#A3262D] border-[#F1CFCD]",
  },
  {
    icon: Lock,
    title: "Privacy by design",
    description:
      "Profiles show an approximate area or distance—not a precise live location. Emergency Contact details are kept off your public profile and used only for the safety features you choose to set up.",
    iconClass: "bg-[#F8ECD7] text-[#A66A27] border-[#ECD8B8]",
  },
];

const safetyJourney = [
  {
    number: "01",
    title: "Before you connect",
    body: "Check the verified badge, read the profile carefully and keep your address, identity documents and financial information private.",
  },
  {
    number: "02",
    title: "While you chat",
    body: "Stay on Serasé while trust develops. Be cautious if someone asks for money, promotes an investment or pressures you to move the conversation elsewhere.",
  },
  {
    number: "03",
    title: "When you meet",
    body: "Choose a public place, arrange your own transport and tell someone you trust where you are going. Leave at any time if you feel uncomfortable.",
  },
];

const reportSteps = [
  "Choose the reason that best describes what happened and add useful context.",
  "Our team reviews the report and relevant account activity against our rules.",
  "We may warn, restrict or remove an account depending on the evidence and severity.",
];

export default function TrustAndSafety() {
  useDocumentTitle("Trust & Safety | Serasé");

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FBF7F2] pb-28 text-[#2F2926] selection:bg-[#E9C8C6] selection:text-[#751C21]">
      <section className="relative overflow-hidden px-6 pb-24 pt-20">
        <div className="pointer-events-none absolute left-1/2 top-8 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-[#E8EFCF]/70 via-[#F7DED8]/65 to-[#F6E3C7]/60 blur-[130px]" />

        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="space-y-7 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D8E5B6] bg-[#F2F7E6] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#667B24]">
              <ShieldCheck className="h-4 w-4" /> Safety by design
            </div>

            <div className="space-y-5">
              <h1 className="text-5xl font-black tracking-[-0.04em] text-[#751C21] md:text-6xl">
                Trust starts before<br className="hidden sm:block" /> the first hello.
              </h1>
              <p className="mx-auto max-w-xl text-lg font-medium leading-relaxed text-[#6F625C] lg:mx-0">
                Serasé combines verified identity, clear community rules and practical safety tools to support more intentional connections—online and in person.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start">
              <Link
                to="/support"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#96242B] px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-[#96242B]/20 transition hover:-translate-y-0.5 hover:bg-[#7F1E24]"
              >
                Get safety help <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/faq"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D8CBC0] bg-white/80 px-6 py-3.5 text-sm font-extrabold text-[#751C21] shadow-sm transition hover:-translate-y-0.5 hover:border-[#B99182] hover:bg-white"
              >
                <MessageCircleQuestion className="h-4 w-4" />
                Help Centre
              </Link>

              <a
                href="#safety-guides"
                className="inline-flex items-center justify-center rounded-full border border-[#D8CBC0] bg-transparent px-6 py-3.5 text-sm font-extrabold text-[#751C21] transition hover:border-[#B99182] hover:bg-white/70"
              >
                Read safety tips
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -inset-5 -z-10 rounded-[3rem] bg-white/40 blur-2xl" />
            <div className="rounded-[2.5rem] border border-white/80 bg-white/75 p-7 shadow-2xl shadow-[#7B3426]/10 backdrop-blur-xl">
              <div className="mb-7 flex items-center justify-between border-b border-[#E9DED5] pb-5">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#A17B69]">Your safety toolkit</p>
                  <h2 className="mt-1 text-xl font-black text-[#352C28]">Support at every step</h2>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F8E9E6] text-[#96242B]">
                  <ShieldCheck className="h-6 w-6" />
                </div>
              </div>

              <div className="space-y-4">
                {[
                  "Dual Verification for member authenticity",
                  "In-app reporting, blocking and disconnecting",
                  "Approximate—not precise—profile location",
                  "Emergency Contact access for planned dates",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#7E9632]" />
                    <span className="text-sm font-bold leading-relaxed text-[#574B45]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#96242B]">How Serasé protects you</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-[#332B27]">Protection without false promises.</h2>
            <p className="mt-4 leading-relaxed text-[#766861]">
              No platform can guarantee another person&apos;s behaviour. Our role is to reduce risk, give you control and respond when concerns are raised.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {protectionPillars.map((pillar, index) => (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-[2rem] border border-[#E9DED5] bg-white/85 p-7 shadow-lg shadow-[#5B3023]/5"
              >
                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border ${pillar.iconClass}`}>
                  <pillar.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-black text-[#332B27]">{pillar.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-[#74665F]">{pillar.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="safety-guides" className="px-6 py-20">
        <div className="mx-auto max-w-6xl rounded-[3rem] bg-[#302925] p-8 text-white shadow-2xl shadow-[#3B241D]/15 md:p-12">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr]">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E4B779]">Safer dating, step by step</p>
              <h2 className="mt-3 max-w-xl text-4xl font-black tracking-tight">Keep your instincts in the conversation.</h2>

              <div className="mt-10 space-y-8">
                {safetyJourney.map((step) => (
                  <div key={step.number} className="grid grid-cols-[44px_1fr] gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-xs font-black text-[#F1C58B]">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-white">{step.title}</h3>
                      <p className="mt-1.5 text-sm font-medium leading-relaxed text-white/65">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-7 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8C980]/15 text-[#F1C58B]">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/45">During a planned date</p>
                  <h3 className="text-xl font-black">Emergency Contact</h3>
                </div>
              </div>

              <p className="mt-5 text-sm font-medium leading-relaxed text-white/70">
                Set up a trusted contact before you meet. Serasé keeps that contact within reach so you can act quickly if a date becomes uncomfortable.
              </p>

              <div className="mt-6 rounded-2xl border border-[#E7BDB8]/20 bg-[#8D252C]/35 p-5">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#F1B7B1]" />
                  <p className="text-xs font-semibold leading-relaxed text-white/75">
                    If you are in immediate danger, leave when it is safe and contact local emergency services. Serasé safety tools do not replace police, medical or emergency assistance.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-white/55">
                <MapPin className="h-4 w-4" /> Never share your home address for a first meeting.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div className="rounded-[2.5rem] border border-[#E7DAD0] bg-white p-8 md:p-10">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F8E7E5] text-[#96242B]">
              <MessageSquare className="h-7 w-7" />
            </div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#96242B]">After you report</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">A clear review process.</h2>

            <div className="mt-7 space-y-5">
              {reportSteps.map((step, index) => (
                <div key={step} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F4E9E3] text-[11px] font-black text-[#96242B]">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium leading-relaxed text-[#6D6059]">{step}</p>
                </div>
              ))}
            </div>

            <p className="mt-7 rounded-2xl bg-[#F8F3EE] p-4 text-xs font-semibold leading-relaxed text-[#6D6059]">
              We do not disclose the reporter&apos;s identity to the reported member, except where disclosure is required by law or necessary to address an immediate safety risk.
            </p>
          </div>

          <div className="rounded-[2.5rem] border border-[#E7DAD0] bg-[#F2EADF] p-8 md:p-10">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/70 text-[#8C5A2B]">
              <HeartHandshake className="h-7 w-7" />
            </div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8C5A2B]">Our community standard</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">Respect is the baseline.</h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-[#6D6059]">
              Harassment, hate, threats, scams, sexual exploitation, impersonation and sharing another person&apos;s private information are not welcome on Serasé.
            </p>

            <div className="mt-7 space-y-3">
              {["Be honest about who you are.", "Respect boundaries and consent.", "Never pressure anyone for money or intimacy.", "Report behaviour that may put someone at risk."].map((rule) => (
                <div key={rule} className="flex items-center gap-3 text-sm font-bold text-[#514640]">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#829536]" /> {rule}
                </div>
              ))}
            </div>

            <Link to="/terms" className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-[#862128] hover:underline">
              Read our Terms of Service <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-6 pt-20">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#98262D] to-[#64131D] px-8 py-12 text-center text-white shadow-2xl shadow-[#7B2026]/20 md:px-14">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
            <EyeOff className="h-7 w-7 text-[#F2D39D]" />
          </div>
          <h2 className="mt-6 text-3xl font-black tracking-tight md:text-4xl">Something doesn&apos;t feel right?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-relaxed text-white/70">
            Trust your instincts. Block or report the account in Serasé, or contact our Support team for help with a safety concern.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/support" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-extrabold text-[#862128] transition hover:-translate-y-0.5">
              Contact Support <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/privacy" className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-white/15">
              Read our Privacy Policy
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}