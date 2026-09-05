import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, Variants, useReducedMotion } from 'framer-motion'; 
import Logo from './Logo';
import { useFocusTrap } from '../hooks/useFocusTrap';

// ============================================================================
// 🔒 BUSINESS LOGIC WARNING:
// 话费支付 (Carrier Billing) 目前在产品逻辑上【仅限马来西亚地区】。
// 这里的运营商列表 (operators) 和 +60 国际区号是被有意硬编码 (Hardcoded) 的。
// 这不是 Bug，请勿在没有后端支付网关支持的情况下，随意将其修改为动态国际区号。
// ============================================================================

interface PlanInfo {
  name: string;
  price: string;
  period: string;
}

interface CarrierBillingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: PlanInfo | null;
}

const operators = [
  "CelcomDigi", "Maxis", "U Mobile", "Unifi Mobile", "Yes 5G", 
  "Hotlink", "Xpax", "redONE", "Tune Talk", "XOX / ONEXOX"
];

export default function CarrierBillingModal({ isOpen, onClose, selectedPlan }: CarrierBillingModalProps) {
  const shouldReduceMotion = useReducedMotion();
  const modalRef = useFocusTrap(isOpen, onClose); 

  const [step, setStep] = useState<'carrier' | 'phone' | 'otp' | 'success'>('carrier');
  const [carrier, setCarrier] = useState('CelcomDigi');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const stepVariants: Variants = {
    initial: { opacity: 0, x: shouldReduceMotion ? 0 : 20 },
    animate: { opacity: 1, x: 0, transition: { type: "spring", bounce: 0, duration: 0.35 } },
    exit: { opacity: 0, x: shouldReduceMotion ? 0 : -20, transition: { duration: 0.2 } }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    // 🛡️ 基础正则：剔除非数字后，马来西亚手机号长度通常为 8 到 12 位
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (!/^\d{8,12}$/.test(cleanPhone)) {
      setErrorMsg('Please enter a valid mobile number.');
      return;
    }
    
    setStep('otp');
  };

  const handleVerifyPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;
    setStep('success');
  };

  const handleClose = () => {
    setStep('carrier');
    setPhoneNumber('');
    setOtp('');
    setErrorMsg('');
    setIsDropdownOpen(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && selectedPlan && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            ref={modalRef}
            tabIndex={-1}
            aria-modal="true"
            role="dialog"
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95, y: shouldReduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95, y: shouldReduceMotion ? 0 : 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-white rounded-[2.5rem] max-w-md w-full p-8 relative shadow-2xl border border-gray-100 flex flex-col items-center text-center outline-none"
          >
            <button onClick={handleClose} aria-label="Close modal" className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted text-gray-400 transition-colors z-[60]">
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-4"><Logo height={36} /></div>

            <div className="w-full bg-amber-50/60 border border-amber-200/60 rounded-2xl p-4 mb-6 text-left flex justify-between">
              <div><div className="text-xs font-bold text-amber-900 uppercase tracking-wider">Selected Plan</div><div className="text-lg font-black text-gray-900">{selectedPlan.name}</div></div>
              <div className="text-right"><div className="text-xl font-black text-primary">{selectedPlan.price}</div><div className="text-[10px] font-bold text-muted-foreground">{selectedPlan.period}</div></div>
            </div>

            <div className="w-full relative min-h-[220px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {(step === 'carrier' || step === 'phone') && (
                  <motion.form key="step-carrier" variants={stepVariants} initial="initial" animate="animate" exit="exit" onSubmit={handleSendOtp} className="w-full space-y-5 text-left">
                    <div>
                      <label className="block text-xs font-extrabold text-gray-700 uppercase mb-2">1. Select Operator</label>
                      <div className="relative w-full">
                        <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full h-14 bg-gray-50 border border-gray-200 flex items-center justify-between px-4 rounded-2xl">
                          <span className="text-sm font-bold text-gray-900">{carrier}</span>
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        </button>
                        <AnimatePresence>
                          {isDropdownOpen && (
                            <>
                              <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 shadow-xl rounded-2xl z-50 max-h-[200px] overflow-y-auto py-2">
                                {operators.map(opt => (
                                  <button key={opt} type="button" onClick={() => { setCarrier(opt); setIsDropdownOpen(false); }} className="w-full text-left px-5 py-3 text-sm font-bold hover:bg-gray-50">{opt}</button>
                                ))}
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-gray-700 uppercase mb-2">2. Mobile Number</label>
                      <div className="relative flex items-center">
                        <span className="absolute left-4 text-sm font-bold text-gray-500">+60</span>
                        <input 
                          type="tel" 
                          required 
                          placeholder="12 345 6789" 
                          value={phoneNumber} 
                          onChange={(e) => { setPhoneNumber(e.target.value); setErrorMsg(''); }} 
                          className={`w-full h-14 pl-12 pr-4 bg-gray-50 border rounded-2xl font-bold text-gray-900 focus:ring-2 focus:outline-none transition-all ${errorMsg ? 'border-red-400 focus:ring-red-400/20' : 'border-gray-200 focus:ring-primary/20 focus:border-primary'}`} 
                        />
                      </div>
                      {errorMsg && <p className="text-red-500 text-xs font-bold mt-1.5 ml-1">{errorMsg}</p>}
                    </div>
                    <motion.button whileTap={{ scale: 0.98 }} type="submit" className="w-full py-4 rounded-2xl bg-primary text-white font-extrabold text-sm flex items-center justify-center gap-2">
                      <span>Continue</span> <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </motion.form>
                )}

                {step === 'otp' && (
                  <motion.form key="step-otp" variants={stepVariants} initial="initial" animate="animate" exit="exit" onSubmit={handleVerifyPayment} className="w-full space-y-5 text-left">
                    <div className="text-center space-y-1">
                      <h4 className="text-base font-black text-gray-900">Verify Payment</h4>
                      <p className="text-xs text-muted-foreground font-medium">SMS code sent to <span className="font-bold text-gray-800">+60 {phoneNumber}</span></p>
                    </div>
                    <input type="text" required maxLength={6} placeholder="6-Digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full text-center tracking-widest text-lg py-3.5 bg-gray-50 border border-gray-200 rounded-2xl font-black focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none" />
                    <motion.button whileTap={{ scale: 0.98 }} type="submit" className="w-full py-4 rounded-2xl bg-primary text-white font-extrabold text-sm">Confirm Charge</motion.button>
                  </motion.form>
                )}

                {step === 'success' && (
                  <motion.div key="step-success" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="w-full py-2 text-center space-y-4">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-md"><CheckCircle2 className="w-10 h-10" /></motion.div>
                    <h4 className="text-2xl font-black text-gray-900">Payment Successful!</h4>
                    <motion.button whileTap={{ scale: 0.98 }} onClick={handleClose} className="w-full py-3.5 rounded-2xl bg-gray-900 text-white font-extrabold text-xs">Start Enjoying</motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}