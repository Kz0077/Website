import React from 'react';
import { Shield, Lock, FileText, Mail, ArrowRight } from 'lucide-react';
import { useDocumentTitle } from '../hooks/usePageMeta';

export default function Privacy() {
  useDocumentTitle("Privacy Policy | Serasé");

  return (
    <div className="min-h-screen bg-background selection:bg-accent/30 selection:text-primary pt-12 pb-32 relative overflow-x-hidden">
      
      {/* ✨ 极简高阶的氛围灯：由于是阅读类页面，光晕调得非常淡且聚焦在顶部 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-rose-500/10 via-amber-500/5 to-transparent rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6">
        
        {/* 头部 Title 区域 */}
        <div className="text-center space-y-4 mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/15 px-4 py-1.5 rounded-full text-primary text-xs font-extrabold tracking-widest uppercase shadow-sm">
            <Lock className="w-3.5 h-3.5" /> Your Privacy First
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm font-bold text-muted-foreground">
            Last updated: August 2026
          </p>
        </div>

        {/* ✨ 核心阅读卡片容器：毛玻璃 + 阴影，把文字包裹起来提升高级感 */}
        <div className="bg-white/95 backdrop-blur-md border border-gray-200/80 rounded-[2.5rem] p-8 md:p-14 shadow-xl shadow-gray-200/40 relative z-10">
          
          <div className="space-y-12">
            
            {/* Section 1 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                <span className="text-primary text-xl">1.</span> Information We Collect
              </h2>
              <p className="text-gray-600 font-medium leading-relaxed text-sm md:text-base">
                At Serasé, your privacy is our priority. We collect information you provide directly to us when you create or modify an account, use MyDigital ID or a supported government-issued ID for verification, complete a liveness check, and interact with the App.
              </p>
            </section>

            <div className="w-full h-px bg-gray-100"></div>

            {/* Section 2 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                <span className="text-primary text-xl">2.</span> Emergency Contacts
              </h2>
              <p className="text-gray-600 font-medium leading-relaxed text-sm md:text-base">
                If you choose to add an Emergency Contact, their details are not displayed on your profile or shared with other members. The information is used to make your selected contact and safety tools available when you open the Safety Toolkit.
              </p>
            </section>

            <div className="w-full h-px bg-gray-100"></div>

            {/* Section 3 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                <span className="text-primary text-xl">3.</span> AI Data Processing
              </h2>
              <p className="text-gray-600 font-medium leading-relaxed text-sm md:text-base">
                Prompts and conversations with Serasé AI are processed to generate personalized icebreakers, date ideas, itineraries, and guidance. We do not sell your personal conversation data to third parties.
              </p>
            </section>

          </div>

          {/* ✨ 底部 DPO 联系模块：单独做一个高亮 Block，彰显合规与专业 */}
          <div className="mt-16 bg-gray-50 border border-gray-200/80 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:bg-gray-100/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-gray-100 shrink-0">
                <Shield className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-sm font-black text-gray-900">Data Protection Officer</h4>
                <p className="text-xs font-medium text-gray-500 mt-1">For full details or data requests, please contact our DPO.</p>
              </div>
            </div>
            <a 
              href="mailto:privacy@seraseapp.com" 
              className="w-full md:w-auto px-6 py-3 bg-white border border-gray-200 text-gray-900 rounded-xl font-bold text-sm shadow-sm hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <Mail className="w-4 h-4" />
              privacy@seraseapp.com
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}