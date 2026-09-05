import React, { useMemo, useState } from 'react';
import {
  Search,
  ChevronDown,
  MessageCircleQuestion,
  BookOpen,
  SlidersHorizontal,
  ShieldCheck,
  Sparkles,
  CreditCard,
  UserCircle,
  Smartphone,
  Lock,
  MapPin,
  MessageCircle,
  Ban,
  Database,
  Flag,
  ShieldAlert,
  Siren,
  Wrench,
  Eye,
} from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useDocumentTitle } from '../hooks/usePageMeta';
import { Link } from 'react-router';

type HelpSection = 'Help Centre' | 'App Control & Privacy' | 'Trust & Safety';

type FaqItem = {
  section: HelpSection;
  category: string;
  question: string;
  answer: string;
};

const faqData: FaqItem[] = [
  // ==================== Help Centre ====================
  {
    section: 'Help Centre',
    category: 'Getting Started',
    question: 'How do I create a Serasé account?',
    answer:
      'Open Sign Up, enter your phone number, email address, and password, then tap Send code. Enter the 6-digit SMS code Serasé sends to your phone to confirm your number.',
  },
  {
    section: 'Help Centre',
    category: 'Getting Started',
    question: 'Why am I not receiving the SMS verification code?',
    answer:
      'Check that the phone number and country code are correct, then wait for the resend timer to finish before requesting another code. If the problem continues, try again later or contact Support.',
  },
  {
    section: 'Help Centre',
    category: 'Getting Started',
    question: 'How do I sign in to my account?',
    answer:
      'Open Sign In and choose Phone or Email. Enter your registered details and password, then tap Sign in. Google, Apple, and Digital ID are also shown as sign-in options.',
  },
  {
    section: 'Help Centre',
    category: 'Getting Started',
    question: 'Where do I start after signing up?',
    answer:
      'Complete identity verification first, then build your profile. After publishing your profile, set your Matching Preferences and continue to Discover.',
  },

  {
    section: 'Help Centre',
    category: 'Account & Verification',
    question: 'How do I verify my identity?',
    answer:
      'Submit your identity document, complete the live selfie check, and send both for review. The document screen also lets you upload a photo of your ID instead of scanning it live.',
  },
  {
    section: 'Help Centre',
    category: 'Account & Verification',
    question: 'Why is my account showing “Pending”?',
    answer:
      'Your identity check is still under review. The current app says review is usually completed in under an hour, and you can continue building your profile and browsing while you wait.',
  },
  {
    section: 'Help Centre',
    category: 'Account & Verification',
    question: 'Can I change my name or date of birth?',
    answer:
      'Your name and date of birth come from your verified ID and cannot be changed once review is complete. Other editable profile details can be changed from Edit profile.',
  },
  {
    section: 'Help Centre',
    category: 'Account & Verification',
    question: 'Why was my new profile photo rejected?',
    answer:
      'The app states that profile photos must match your verified selfie. New photos added from Edit profile are re-checked against that verified selfie.',
  },

  {
    section: 'Help Centre',
    category: 'Profile Setup',
    question: 'How do I complete my profile?',
    answer:
      'Serasé guides you through Photos, Basics, What you are here for, About you, Interests, One prompt, and Safety. Complete the required fields, then publish your profile and set your preferences.',
  },
  {
    section: 'Help Centre',
    category: 'Profile Setup',
    question: 'How many profile photos can I add?',
    answer:
      'You can use up to 8 photo slots. The app recommends around 4 photos, and your first photo is the one shown first in Discover.',
  },
  {
    section: 'Help Centre',
    category: 'Profile Setup',
    question: 'How do I edit my profile later?',
    answer:
      'Open your Profile and tap Edit profile. You can update photos, work, height, personality type, languages, dating intention, bio, prompt, and interests, then tap Save changes.',
  },

  {
    section: 'Help Centre',
    category: 'Discover & Matching',
    question: 'How do I connect with someone?',
    answer:
      'Drag the profile to the right. A connection only opens when the interest is mutual.',
  },
  {
    section: 'Help Centre',
    category: 'Discover & Matching',
    question: 'How do I pass on a profile?',
    answer:
      'Drag the profile to the left. The Discover tutorial says passing costs nothing and does not count against your daily connections.',
  },
  {
    section: 'Help Centre',
    category: 'Discover & Matching',
    question: 'Why can’t I send a Serasé Signal?',
    answer:
      'Signal is shown as a Serasé Select-and-above feature. If you are on Core, the app shows an upgrade prompt instead of sending the Signal.',
  },
  {
    section: 'Help Centre',
    category: 'Discover & Matching',
    question: 'Why can’t I see who liked me?',
    answer:
      'The Liked You screen is shown as a Select-and-above feature. If you are on Core, you can see the locked preview but not the full list.',
  },
  {
    section: 'Help Centre',
    category: 'Discover & Matching',
    question: 'Why can’t I hide my age?',
    answer:
      'Hide my age appears in Matching Preferences and is marked as a Select feature. If it is locked, your current plan does not include it.',
  },
  {
    section: 'Help Centre',
    category: 'Discover & Matching',
    question: 'How do I change who I see in Discover?',
    answer:
      'Open Matching Preferences from your Profile. You can change who you see, age range, distance, location, and whether Serasé should match your dating intention.',
  },
  {
    section: 'Help Centre',
    category: 'Discover & Matching',
    question: 'Can other people see my exact location?',
    answer:
      'No exact live location is shown in the current matching flow. Serasé says distance is rounded, so other members only see roughly how far away you are.',
  },

  {
    section: 'Help Centre',
    category: 'Connections',
    question: 'What happens when we both connect?',
    answer:
      'Serasé shows the Frequencies Synced screen and creates the connection. The connection then appears in Messages with a countdown ring.',
  },
  {
    section: 'Help Centre',
    category: 'Connections',
    question: 'Why is there a countdown on my new connection?',
    answer:
      'New connections use a 48-hour window. The countdown ring in Messages shows how much time remains for that connection.',
  },
  {
    section: 'Help Centre',
    category: 'Connections',
    question: 'Where can I find my new connections?',
    answer:
      'Open Messages. New connections appear in the row at the top of the screen with their remaining time.',
  },
  {
    section: 'Help Centre',
    category: 'Connections',
    question: 'Where can I find profiles I saved?',
    answer:
      'Open Shortlist from the bottom navigation. Saved profiles are collected there so you can return to them later.',
  },

  {
    section: 'Help Centre',
    category: 'Chat & Messaging',
    question: 'Why can’t I message someone?',
    answer:
      'Normal messaging starts after a mutual connection is created. Open Messages and choose an active connection to continue the conversation.',
  },
  {
    section: 'Help Centre',
    category: 'Chat & Messaging',
    question: 'How do I send a photo or GIF?',
    answer:
      'Open an active chat and use the media controls beside the message field. The current chat screen shows Photo and GIF / Animated options.',
  },
  {
    section: 'Help Centre',
    category: 'Chat & Messaging',
    question: 'What does “I’m ready” mean?',
    answer:
      'It is a private signal that you are ready to meet in person. Serasé moves to date planning only when both people have indicated they are ready.',
  },

  {
    section: 'Help Centre',
    category: 'Date Planning',
    question: 'How do I create a date plan?',
    answer:
      'Once both of you are ready, open the date planner from the chat. Choose the date, time, and place, add another stop or a note if needed, then tap Send the plan.',
  },
  {
    section: 'Help Centre',
    category: 'Date Planning',
    question: 'What happens after I send a date plan?',
    answer:
      'The plan appears inside the chat and waits for the other person to confirm. Once both people confirm, the card changes to the confirmed state.',
  },
  {
    section: 'Help Centre',
    category: 'Date Planning',
    question: 'How do I add the confirmed date to my calendar?',
    answer:
      'After both people confirm the plan, tap Add to calendar on the confirmed date card. The same card also includes a Directions action.',
  },
  {
    section: 'Help Centre',
    category: 'Date Planning',
    question: 'Can I edit or cancel a date plan?',
    answer:
      'Yes. The date card shows Edit plan and Cancel actions in the current app flow.',
  },

  {
    section: 'Help Centre',
    category: 'Serasé AI',
    question: 'Where do I find Serasé Coach?',
    answer:
      'Open Messages and tap the Serasé Coach conversation near the top of the chat list.',
  },
  {
    section: 'Help Centre',
    category: 'Serasé AI',
    question: 'What can Serasé Coach help me with?',
    answer:
      'The current Coach screen includes Plan a date, Recommend a restaurant, and Outfit Check. You can also type your own question into Ask the coach anything.',
  },
  {
    section: 'Help Centre',
    category: 'Serasé AI',
    question: 'Can my match see what I ask Serasé Coach?',
    answer:
      'The current Coach screen says the conversation is private and never shown to your matches.',
  },
  {
    section: 'Help Centre',
    category: 'Serasé AI',
    question: 'Why can’t I use another AI prompt?',
    answer:
      'AI prompts have plan-based limits. The current Plan & Billing screen shows 5 prompts for Core, 30 for Select, 75 for Elite, and 150 for Signature.',
  },

  {
    section: 'Help Centre',
    category: 'Subscription & Billing',
    question: 'Why is a feature locked on my account?',
    answer:
      'Some features depend on your Serasé plan. Open Plan & Billing from your Profile to see your current plan and the features shown under Core, Select, Elite, and Signature.',
  },
  {
    section: 'Help Centre',
    category: 'Subscription & Billing',
    question: 'Why can’t I use Rewind?',
    answer:
      'The current Plan & Billing screen shows Rewind as unavailable on Core and includes 5 rewinds a day on Select. If Rewind is locked, check your current plan in Plan & Billing.',
  },
  {
    section: 'Help Centre',
    category: 'Subscription & Billing',
    question: 'Why can’t I use Boost?',
    answer:
      'Boost is a premium feature that moves you to the front of nearby decks for 30 minutes. The app shows an upgrade prompt when the feature is not included in your current plan.',
  },
  {
    section: 'Help Centre',
    category: 'Subscription & Billing',
    question: 'Where can I check my daily limits?',
    answer:
      'Open Plan & Billing. The Your day so far section shows your current daily usage, including likes and AI prompts.',
  },

  {
    section: 'Help Centre',
    category: 'Technical Support',
    question: 'Why isn’t my location updating?',
    answer:
      'Open Matching Preferences and check Share my location. Serasé uses your location for distance filtering and shows other members only a rounded distance.',
  },
  {
    section: 'Help Centre',
    category: 'Technical Support',
    question: 'Where can I find Help Centre inside the app?',
    answer:
      'Open your Profile and scroll through the settings list. Help centre appears below Language and above Privacy policy.',
  },

  // ==================== App Control & Privacy ====================
  {
    section: 'App Control & Privacy',
    category: 'Profile Visibility',
    question: 'How do I turn on Incognito mode?',
    answer:
      'Open App control & privacy and use the Incognito mode switch. The screen describes Incognito as allowing only people you have connected with to see your profile.',
  },
  {
    section: 'App Control & Privacy',
    category: 'Profile Visibility',
    question: 'Why can’t I turn on Incognito mode?',
    answer:
      'The current Plan & Billing screen lists Incognito under Serasé Signature. If the control is unavailable, check your active plan.',
  },

  {
    section: 'App Control & Privacy',
    category: 'Location & Distance',
    question: 'How does Serasé use my location?',
    answer:
      'Serasé uses your area for distance-based matching. The matching screen says it snaps you to your area centre before showing distance, so your precise location is not displayed.',
  },
  {
    section: 'App Control & Privacy',
    category: 'Location & Distance',
    question: 'Can someone see exactly where I am?',
    answer:
      'The current app says distances are always rounded. Other members only see roughly how far away you are, not your exact position.',
  },

  {
    section: 'App Control & Privacy',
    category: 'Read Receipts & Screenshot Warning',
    question: 'How do I turn Read receipts on or off?',
    answer:
      'Open App control & privacy and use the Read receipts switch. The screen describes this setting as showing when partners have read your messages.',
  },
  {
    section: 'App Control & Privacy',
    category: 'Read Receipts & Screenshot Warning',
    question: 'How do I manage Screenshot warning?',
    answer:
      'Open App control & privacy and use the Screenshot warning switch. The current screen says this setting tells the other person when a chat is captured.',
  },

  {
    section: 'App Control & Privacy',
    category: 'Blocked Accounts',
    question: 'Where can I see people I blocked?',
    answer:
      'Open App control & privacy and look under Blocked Accounts. The list shows blocked members and how long ago each account was blocked.',
  },
  {
    section: 'App Control & Privacy',
    category: 'Blocked Accounts',
    question: 'How do I unblock someone?',
    answer:
      'Open Blocked Accounts and tap Unblock beside that person.',
  },

  {
    section: 'App Control & Privacy',
    category: 'Data & Privacy',
    question: 'Where can I see my report history?',
    answer:
      'Open App control & privacy and tap Report history.',
  },
  {
    section: 'App Control & Privacy',
    category: 'Data & Privacy',
    question: 'How do I download my data?',
    answer:
      'Open App control & privacy and tap Download my data.',
  },
  {
    section: 'App Control & Privacy',
    category: 'Data & Privacy',
    question: 'Where can I read the Privacy Policy?',
    answer:
      'Open your Profile settings and tap Privacy policy.',
  },

  {
    section: 'App Control & Privacy',
    category: 'App Permissions',
    question: 'Why does Serasé need camera access?',
    answer:
      'Camera access is used for ID capture, live selfie verification, profile photos, and photo sharing when those actions are used.',
  },
  {
    section: 'App Control & Privacy',
    category: 'App Permissions',
    question: 'Why does Serasé need location access?',
    answer:
      'Location is used for matching distance and your approximate area. The app states that only rounded distance is shown to other members.',
  },

  // ==================== Trust & Safety ====================
  {
    section: 'Trust & Safety',
    category: 'Verification & Trust',
    question: 'How do I know someone is verified?',
    answer:
      'Look for the Verified badge on the profile. The current app uses an identity document and live selfie check before verification is cleared.',
  },
  {
    section: 'Trust & Safety',
    category: 'Verification & Trust',
    question: 'Are new profile photos checked again?',
    answer:
      'Yes. The Edit profile screen says new photos are re-checked against the member’s verified selfie.',
  },

  {
    section: 'Trust & Safety',
    category: 'Emergency Contact',
    question: 'How do I add an emergency contact?',
    answer:
      'Add one during the Safety step of profile setup or open Emergency contact from your Profile later. Choose the relationship, enter the phone number, review the preview, and save it.',
  },
  {
    section: 'Trust & Safety',
    category: 'Emergency Contact',
    question: 'Does Serasé message or track my emergency contact?',
    answer:
      'No. The Emergency contact screen says Serasé does not message or track them.',
  },
  {
    section: 'Trust & Safety',
    category: 'Emergency Contact',
    question: 'When does the emergency Call button appear?',
    answer:
      'Once a date is planned, a Call button appears inside that chat so you can reach your saved emergency contact without searching for the number.',
  },
  {
    section: 'Trust & Safety',
    category: 'Emergency Contact',
    question: 'Can my match see my emergency contact?',
    answer:
      'The Safety setup describes it as a private number. The current date flow keeps the emergency contact on your side of the safety experience.',
  },

  {
    section: 'Trust & Safety',
    category: 'Safety Centre',
    question: 'Where can I find Safety Centre?',
    answer:
      'Open App control & privacy and tap Safety centre.',
  },
  {
    section: 'Trust & Safety',
    category: 'Safety Centre',
    question: 'Where can I review reports I have submitted?',
    answer:
      'Open App control & privacy and tap Report history. The current prototype shows this entry point but does not show the detailed review workflow.',
  },
];

const sectionConfig = [
  { id: 'All', label: 'All', icon: MessageCircleQuestion },
  { id: 'Help Centre', label: 'Help Centre', icon: BookOpen },
  { id: 'App Control & Privacy', label: 'App Control & Privacy', icon: SlidersHorizontal },
  { id: 'Trust & Safety', label: 'Trust & Safety', icon: ShieldCheck },
] as const;

const categoryIconMap: Record<string, React.ElementType> = {
  'Getting Started': BookOpen,
  'Account & Verification': UserCircle,
  'Profile Setup': UserCircle,
  'Discover & Matching': MessageCircle,
  'Connections': MessageCircleQuestion,
  'Chat & Messaging': MessageCircle,
  'Date Planning': Sparkles,
  'Serasé AI': Sparkles,
  'Subscription & Billing': CreditCard,
  'Technical Support': Wrench,
  'Profile Visibility': Eye,
  'Location & Distance': MapPin,
  'Read Receipts & Screenshot Warning': MessageCircle,
  'Blocked Accounts': Ban,
  'Data & Privacy': Database,
  'App Permissions': Smartphone,
  'Verification & Trust': ShieldCheck,
  'Emergency Contact': Siren,
  'Safety Centre': ShieldAlert,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'tween', ease: 'easeOut', duration: 0.45 },
  },
};

export default function Faq() {
  useDocumentTitle('Help Centre | Serasé');

  const [activeSection, setActiveSection] = useState<'All' | HelpSection>('All');
  const [activeCategory, setActiveCategory] = useState('All Topics');
  const [searchQuery, setSearchQuery] = useState('');
  const [openKey, setOpenKey] = useState<string | null>(null);

  const visibleCategories = useMemo(() => {
    const source =
      activeSection === 'All'
        ? faqData
        : faqData.filter((faq) => faq.section === activeSection);

    return Array.from(new Set(source.map((faq) => faq.category)));
  }, [activeSection]);

  const filteredFaqs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return faqData.filter((faq) => {
      const matchesSection =
        activeSection === 'All' || faq.section === activeSection;
      const matchesCategory =
        activeCategory === 'All Topics' || faq.category === activeCategory;
      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query) ||
        faq.section.toLowerCase().includes(query);

      return matchesSection && matchesCategory && matchesSearch;
    });
  }, [activeSection, activeCategory, searchQuery]);

  const handleSectionChange = (section: 'All' | HelpSection) => {
    setActiveSection(section);
    setActiveCategory('All Topics');
    setOpenKey(null);
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] selection:bg-accent/30 selection:text-primary pt-12 pb-32 relative overflow-x-hidden font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-[#8A2128]/5 to-transparent rounded-full blur-[120px] -z-10 pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-6 relative z-10"
      >
        <motion.div
          variants={itemVariants}
          className="relative w-full rounded-[2.5rem] bg-gradient-to-br from-[#8A2128] via-[#751C21] to-[#4A0B13] p-10 md:p-16 lg:py-20 lg:px-24 overflow-hidden shadow-xl shadow-red-900/10 mb-6"
        >
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-black/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-[54px] font-black text-white mb-4 tracking-tight leading-tight">
              How can we help?
            </h1>
            <p className="text-white/90 font-medium text-base md:text-lg mb-10 max-w-2xl mx-auto">
              Find answers about your account, connections, privacy controls, subscriptions, AI, and safety.
            </p>

            <div className="relative w-full max-w-3xl mx-auto group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-[#8A2128] transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setOpenKey(null);
                }}
                placeholder="Search for answers (e.g., 'Verification')"
                className="w-full h-[72px] pl-[68px] pr-6 rounded-full bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.08)] font-semibold text-lg transition-all"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <span className="text-white/70 text-[13px] font-bold mr-1">Popular:</span>
              {['Verification', '48-hour connections', 'Serasé Coach', 'Emergency Contact'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    setActiveSection('All');
                    setActiveCategory('All Topics');
                    setOpenKey(null);
                  }}
                  className="px-4 py-1.5 rounded-full bg-black/20 hover:bg-black/30 border border-white/5 text-white text-[13px] font-bold transition-colors backdrop-blur-sm"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 w-full mb-5"
        >
          {sectionConfig.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => handleSectionChange(section.id)}
                className={`group min-h-[96px] rounded-2xl p-3 border transition-all duration-300 text-center flex flex-col items-center justify-center gap-2.5 ${
                  isActive
                    ? 'bg-[#8A2128] border-[#8A2128] shadow-[0_8px_20px_rgba(138,33,40,0.28)]'
                    : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-[#8A2128]/20 hover:-translate-y-1'
                }`}
              >
                <div
                  className={`w-[36px] h-[36px] rounded-full flex items-center justify-center transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#F8F3EF] text-gray-400 group-hover:text-[#8A2128]'
                  }`}
                >
                  <section.icon className="w-4.5 h-4.5" />
                </div>
                <span
                  className={`font-extrabold text-[11px] md:text-[12px] leading-tight ${
                    isActive ? 'text-white' : 'text-[#1A1A1A]'
                  }`}
                >
                  {section.label}
                </span>
              </button>
            );
          })}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex gap-2.5 overflow-x-auto pb-3 mb-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <button
            onClick={() => {
              setActiveCategory('All Topics');
              setOpenKey(null);
            }}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-extrabold transition-all ${
              activeCategory === 'All Topics'
                ? 'bg-[#8A2128] border-[#8A2128] text-white'
                : 'bg-white border-gray-200 text-gray-600 hover:border-[#8A2128]/30 hover:text-[#8A2128]'
            }`}
          >
            All Topics
          </button>

          {visibleCategories.map((category) => {
            const Icon = categoryIconMap[category] || MessageCircleQuestion;
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setOpenKey(null);
                }}
                className={`shrink-0 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-extrabold transition-all ${
                  isActive
                    ? 'bg-[#8A2128] border-[#8A2128] text-white'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-[#8A2128]/30 hover:text-[#8A2128]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {category}
              </button>
            );
          })}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white border border-gray-100 rounded-[2rem] p-6 md:p-10 shadow-xl shadow-gray-200/40"
        >
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-[11px] font-black uppercase tracking-[0.15em] text-[#8A2128]/65">
                {activeSection === 'All' ? 'All Help Topics' : activeSection}
              </div>
              <h2 className="mt-1 text-xl md:text-2xl font-black text-gray-900">
                {activeCategory === 'All Topics' ? 'Common questions' : activeCategory}
              </h2>
            </div>
            <div className="shrink-0 rounded-full bg-[#F8F3EF] px-3 py-1.5 text-[11px] font-extrabold text-gray-500">
              {filteredFaqs.length} {filteredFaqs.length === 1 ? 'answer' : 'answers'}
            </div>
          </div>

          {filteredFaqs.length === 0 ? (
            <div className="text-center py-14 text-gray-500 font-medium text-sm">
              No results found for "{searchQuery}". Try another keyword or browse all topics.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredFaqs.map((faq) => {
                const key = `${faq.section}-${faq.category}-${faq.question}`;
                const isOpen = openKey === key;

                return (
                  <div key={key} className="py-4 first:pt-0 last:pb-0">
                    <button
                      onClick={() => setOpenKey(isOpen ? null : key)}
                      className="w-full flex items-center justify-between text-left focus:outline-none group"
                    >
                      <div className="pr-6">
                        <div className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-gray-400 mb-1.5">
                          {faq.category}
                        </div>
                        <span
                          className={`text-base md:text-lg font-black tracking-tight transition-colors ${
                            isOpen
                              ? 'text-[#8A2128]'
                              : 'text-gray-900 group-hover:text-[#8A2128]'
                          }`}
                        >
                          {faq.question}
                        </span>
                      </div>

                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                          isOpen
                            ? 'bg-[#8A2128]/10 text-[#8A2128] rotate-180'
                            : 'bg-gray-50 text-gray-400 group-hover:bg-[#8A2128]/5 group-hover:text-[#8A2128]'
                        }`}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm md:text-base text-gray-600 font-medium leading-relaxed pr-10 pt-4 pb-2">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-12 text-center bg-white rounded-3xl p-8 border border-gray-100 max-w-3xl mx-auto shadow-sm"
        >
          <h3 className="text-xl font-black text-gray-900 mb-2">Still need help?</h3>
          <p className="text-gray-500 font-medium mb-6 text-sm">
            If you couldn't find the answer you're looking for, our Support team is here to help.
          </p>
          <Link
            to="/support"
            className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 text-gray-800 hover:border-[#8A2128] hover:text-[#8A2128] hover:bg-[#8A2128]/5 px-8 py-3.5 rounded-xl font-bold transition-all shadow-sm"
          >
            Message Support
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}