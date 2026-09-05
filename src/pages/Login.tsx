import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AnimatePresence, motion, useReducedMotion, Variants } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, ShieldCheck } from "lucide-react";

import Logo from "../components/Logo";
import OtpInput from "../components/OtpInput";
import { COUNTRY_CODES, DEFAULT_COUNTRY_CODE } from "../data/countryCodes";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { usePageMeta } from "../hooks/usePageMeta";

type AuthMode = "signin" | "signup";
type SignInIdentifier = "phone" | "email";
type Step = "auth" | "otp" | "verification";
type SocialProvider = "Google" | "Apple" | "Digital ID";

const OTP_LENGTH = 6;
// Prototype-only code. Remove this constant when the SMS verification API is connected.
const DEMO_OTP = "123456";

export default function Login() {
  usePageMeta(
    "Sign in or create an account | Serasé",
    "Sign in to Serasé or create your account to start making verified, intentional connections."
  );

  const { showToast } = useToast();
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const [mode, setMode] = useState<AuthMode>("signin");
  const [step, setStep] = useState<Step>("auth");
  const [signInIdentifier, setSignInIdentifier] = useState<SignInIdentifier>("phone");

  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_CODE);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [signInEmail, setSignInEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [otpResetSignal, setOtpResetSignal] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<SocialProvider | null>(null);
  const verificationStartedRef = useRef(false);

  const slideVariants: Variants = {
    initial: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : 24,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.35,
      },
    },
    exit: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : -24,
      transition: {
        duration: 0.2,
      },
    },
  };

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = window.setInterval(() => {
      setTimeLeft((previous) => Math.max(previous - 1, 0));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [timeLeft]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setStep("auth");
    setSignInIdentifier("phone");

    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setSignInEmail("");
    setOtp("");
    setOtpError(false);
    setOtpResetSignal((value) => value + 1);
  };

  const validatePhone = () => {
    const digits = phone.replace(/\D/g, "");
    return digits.length >= 8 && digits.length <= 15;
  };

  const validateEmailFormat = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  };

  const handleAuthSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (mode === "signin") {
      if (signInIdentifier === "phone" && !validatePhone()) {
        showToast("Please enter a valid phone number.");
        return;
      }

      if (signInIdentifier === "email" && !validateEmailFormat(signInEmail)) {
        showToast("Please enter a valid email address.");
        return;
      }

      if (!password) {
        showToast("Please enter your password.");
        return;
      }

      setIsLoading(true);

      /*
       * TODO — CONNECT BACKEND
       *
       * const response = await authApi.signIn({
       *   identifier: signInIdentifier === "phone" ? `${countryCode}${phone}` : signInEmail,
       *   password,
       *   rememberMe,
       * });
       *
       * if (response.ok) {
       *   login();
       *   navigate("/");
       * }
       */

      setTimeout(() => {
        setIsLoading(false);
        login();
        showToast("Welcome back to Serasé!");
        navigate("/", { replace: true });
      }, 500);

      return;
    }

    // Sign up always collects both phone and email — phone is what gets verified.
    if (!validatePhone()) {
      showToast("Please enter a valid phone number.");
      return;
    }

    if (!validateEmailFormat(email)) {
      showToast("Please enter a valid email address.");
      return;
    }

    if (!password) {
      showToast("Please enter your password.");
      return;
    }

    if (password.length < 8) {
      showToast("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      showToast("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    /*
     * TODO — SEND REAL SMS OTP
     *
     * await authApi.requestPhoneVerification({
     *   phone: `${countryCode}${phone}`,
     *   email,
     *   password,
     * });
     */

    setTimeout(() => {
      setIsLoading(false);
      setOtp("");
      setOtpResetSignal((value) => value + 1);
      setTimeLeft(60);
      setStep("otp");
    }, 500);
  };

  const handleConfirmOtp = async (event: React.FormEvent) => {
    event.preventDefault();

    if (otp.length !== OTP_LENGTH) return;

    if (otp !== DEMO_OTP) {
      setOtpError(true);
      showToast("Incorrect code. Use 123456 for this prototype.");
      window.setTimeout(() => setOtpError(false), 500);
      return;
    }

    setIsLoading(true);

    /*
     * TODO — VERIFY OTP WITH BACKEND
     *
     * const response = await authApi.verifyPhone({
     *   phone: `${countryCode}${phone}`,
     *   code: otp,
     * });
     *
     * if (response.ok) {
     *   // Show Verification Successful modal
     *   // Then continue to profile / identity verification flow.
     * }
     */

    setTimeout(() => {
      setIsLoading(false);
      setStep("verification");
    }, 500);
  };

  const handleResend = () => {
    if (timeLeft > 0) return;

    /*
     * TODO — CALL SMS RESEND API
     */

    setOtp("");
    setOtpError(false);
    setOtpResetSignal((value) => value + 1);
    setTimeLeft(60);
  };

  const handleSocialLogin = (provider: SocialProvider) => {
    setSocialLoading(provider);

    /*
     * TODO
     *
     * Google     -> OAuth
     * Apple      -> Sign in with Apple
     * Digital ID -> redirect to MyDigital ID; on success, skip the OTP step entirely
     */

    setTimeout(() => {
      setSocialLoading(null);
      showToast(`${provider} authentication needs provider integration.`);
    }, 500);
  };

  const handleForgotPassword = () => {
    if (signInIdentifier === "phone" && !validatePhone()) {
      showToast("Enter your phone number first so we can send reset instructions.");
      return;
    }

    if (signInIdentifier === "email" && !validateEmailFormat(signInEmail)) {
      showToast("Enter your email first so we can send reset instructions.");
      return;
    }

    /*
     * TODO — CONNECT PASSWORD-RESET API
     */

    showToast("Password-reset flow is ready. Connect your authentication API here.");
  };

  const handleVerificationChoice = (
    method: "MyDigital ID" | "Passport / IC"
  ) => {
    if (verificationStartedRef.current) return;
    verificationStartedRef.current = true;

    /*
     * TODO — CONNECT IDENTITY-VERIFICATION PROVIDER
     *
     * MyDigital ID  -> redirect to the MyDigital ID verification flow.
     * Passport / IC -> start document capture followed by a liveness check.
     */

    login();
    showToast(`${method} selected. Welcome to Serasé!`);
    navigate("/", { replace: true });
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
    if (otpError) setOtpError(false);
  };

  const maskedPhone = () => {
    const digits = phone.replace(/\D/g, "");

    if (digits.length <= 4) {
      return `${countryCode} ${digits}`;
    }

    const start = digits.slice(0, 2);
    const end = digits.slice(-4);

    return `${countryCode} ${start} ••• ${end}`;
  };

  const inputClass =
    "w-full rounded-2xl border border-accent/50 bg-white px-5 py-4 text-sm font-semibold text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-primary/50 focus:ring-4 focus:ring-primary/5";

  const socialCopy =
    mode === "signup"
      ? "These confirm your email for you, so you skip the code and go straight to the ID check."
      : "Already verified with one of these? You go straight in — no code needed.";

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-background px-5 py-10 flex items-start justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-14 items-center justify-center">
            <Logo height={42} />
          </div>

          <h1 className="text-4xl font-black text-primary tracking-tight">
            Serasé
          </h1>

          <p className="text-sm text-muted-foreground mt-2 font-medium">
            Real People. Real Connections.
          </p>
        </div>

        <div className="bg-white border border-gray-200/80 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 p-7 sm:p-9 overflow-hidden">
          <AnimatePresence mode="wait">
            {step === "auth" && (
              <motion.div
                key="auth"
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {/* SIGN IN / SIGN UP TOGGLE */}
                <div className="grid grid-cols-2 bg-primary rounded-2xl p-1 mb-6">
                  <button
                    type="button"
                    onClick={() => switchMode("signin")}
                    className={`py-3 rounded-xl text-sm font-extrabold transition-all ${
                      mode === "signin"
                        ? "bg-accent text-primary shadow-sm"
                        : "text-white/75"
                    }`}
                  >
                    Sign In
                  </button>

                  <button
                    type="button"
                    onClick={() => switchMode("signup")}
                    className={`py-3 rounded-xl text-sm font-extrabold transition-all ${
                      mode === "signup"
                        ? "bg-accent text-primary shadow-sm"
                        : "text-white/75"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                {/* PHONE / EMAIL IDENTIFIER TOGGLE — sign in only */}
                {mode === "signin" && (
                  <div className="grid grid-cols-2 bg-muted/60 rounded-2xl p-1 mb-6">
                    <button
                      type="button"
                      onClick={() => setSignInIdentifier("phone")}
                      className={`py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all ${
                        signInIdentifier === "phone"
                          ? "bg-white text-primary shadow-sm"
                          : "text-muted-foreground"
                      }`}
                    >
                      Phone
                    </button>
                    <button
                      type="button"
                      onClick={() => setSignInIdentifier("email")}
                      className={`py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all ${
                        signInIdentifier === "email"
                          ? "bg-white text-primary shadow-sm"
                          : "text-muted-foreground"
                      }`}
                    >
                      Email
                    </button>
                  </div>
                )}

                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  {/* PHONE — sign up always, sign in when identifier === phone */}
                  {(mode === "signup" || signInIdentifier === "phone") && (
                    <div>
                      <label className="block text-xs font-extrabold text-gray-700 mb-2 ml-1">
                        Phone number
                      </label>

                      <div className="flex gap-2">
                        <select
                          value={countryCode}
                          onChange={(event) => setCountryCode(event.target.value)}
                          className="w-[105px] rounded-2xl border border-accent/50 bg-white px-3 py-4 text-sm font-bold text-primary outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5"
                          aria-label="Country code"
                        >
                          {COUNTRY_CODES.map((country) => (
                            <option key={country.code} value={country.code}>
                              {country.code}
                            </option>
                          ))}
                        </select>

                        <input
                          type="tel"
                          value={phone}
                          onChange={(event) => setPhone(event.target.value)}
                          placeholder="12 345 6789"
                          className={inputClass}
                          required
                        />
                      </div>

                      {mode === "signup" && (
                        <p className="text-[11px] text-muted-foreground font-medium mt-1.5 ml-1">
                          Required — every account is tied to one confirmed number.
                        </p>
                      )}
                    </div>
                  )}

                  {/* EMAIL — sign up always, sign in when identifier === email */}
                  {(mode === "signup" || signInIdentifier === "email") && (
                    <div>
                      <label className="block text-xs font-extrabold text-gray-700 mb-2 ml-1">
                        Email address
                      </label>

                      <input
                        type="email"
                        value={mode === "signup" ? email : signInEmail}
                        onChange={(event) =>
                          mode === "signup"
                            ? setEmail(event.target.value)
                            : setSignInEmail(event.target.value)
                        }
                        placeholder="you@example.com"
                        className={inputClass}
                        required
                      />
                    </div>
                  )}

                  {/* PASSWORD */}
                  <div>
                    <label className="block text-xs font-extrabold text-gray-700 mb-2 ml-1">
                      {mode === "signup" ? "Create password" : "Password"}
                    </label>

                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="••••••••"
                        className={`${inputClass} pr-12`}
                        autoComplete={
                          mode === "signup" ? "new-password" : "current-password"
                        }
                        required
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((visible) => !visible)}
                        className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-primary transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        aria-pressed={showPassword}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* CONFIRM PASSWORD */}
                  {mode === "signup" && (
                    <div>
                      <label className="block text-xs font-extrabold text-gray-700 mb-2 ml-1">
                        Confirm password
                      </label>

                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(event) =>
                            setConfirmPassword(event.target.value)
                          }
                          placeholder="••••••••"
                          className={`${inputClass} pr-12`}
                          autoComplete="new-password"
                          required
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword((visible) => !visible)
                          }
                          className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-primary transition-colors"
                          aria-label={
                            showConfirmPassword
                              ? "Hide confirmation password"
                              : "Show confirmation password"
                          }
                          aria-pressed={showConfirmPassword}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SIGN-IN HELPERS */}
                  {mode === "signin" && (
                    <div className="flex items-center justify-between px-1 pt-1">
                      <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(event) =>
                            setRememberMe(event.target.checked)
                          }
                          className="accent-primary"
                        />
                        Remember me
                      </label>

                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-xs font-bold text-primary hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  {/* SIGN-UP TERMS */}
                  {mode === "signup" && (
                    <p className="text-[11px] leading-relaxed text-gray-500 px-1 pt-1">
                      By continuing you agree to our{" "}
                      <Link to="/terms" className="font-bold text-primary underline">
                        Terms
                      </Link>{" "}
                      and confirm you are 18 or older. Next we send a code to your number.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 bg-primary text-white rounded-2xl font-extrabold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-60 mt-3"
                  >
                    {isLoading
                      ? "Please wait..."
                      : mode === "signup"
                      ? "Send code"
                      : "Sign in"}
                  </button>
                </form>

                {/* SOCIAL LOGIN */}
                <div className="flex items-center gap-3 my-7">
                  <div className="h-px flex-1 bg-gray-200" />
                  <span className="text-[10px] font-black tracking-[0.18em] text-gray-400">
                    OR CONTINUE WITH
                  </span>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("Google")}
                    disabled={!!socialLoading}
                    className="h-12 rounded-2xl bg-white border border-accent/50 font-black text-sm text-gray-800 hover:border-primary/30 transition-all flex flex-col items-center justify-center gap-0.5"
                    aria-label="Continue with Google"
                  >
                    {socialLoading === "Google" ? (
                      "…"
                    ) : (
                      <>
                        <span>G</span>
                        <span className="text-[9px] font-bold text-gray-500">Google</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialLogin("Apple")}
                    disabled={!!socialLoading}
                    className="h-12 rounded-2xl bg-white border border-accent/50 font-black text-sm text-gray-900 hover:border-primary/30 transition-all flex flex-col items-center justify-center gap-0.5"
                    aria-label="Continue with Apple"
                  >
                    {socialLoading === "Apple" ? (
                      "…"
                    ) : (
                      <>
                        <span className="text-base leading-none"></span>
                        <span className="text-[9px] font-bold text-gray-500">Apple</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialLogin("Digital ID")}
                    disabled={!!socialLoading}
                    className="h-12 rounded-2xl bg-white border border-accent/50 font-black text-sm text-gray-900 hover:border-primary/30 transition-all flex flex-col items-center justify-center gap-0.5"
                    aria-label="Continue with Digital ID"
                  >
                    {socialLoading === "Digital ID" ? (
                      "…"
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span className="text-[9px] font-bold text-gray-500">Digital ID</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="mt-4 text-center text-[11px] leading-relaxed text-gray-500">
                  {socialCopy}
                </p>

                <p className="mt-5 text-center text-[11px] leading-relaxed text-gray-500">
                  By continuing, you acknowledge our{" "}
                  <Link
                    to="/privacy"
                    className="font-bold text-primary underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </motion.div>
            )}

            {/* ============================
                OTP SCREEN
            ============================= */}
            {step === "otp" && (
              <motion.form
                key="otp"
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                onSubmit={handleConfirmOtp}
              >
                <button
                  type="button"
                  onClick={() => setStep("auth")}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-primary hover:bg-gray-50 transition-colors mb-8"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <div className="mb-8">
                  <p className="text-xs font-black text-amber-600 uppercase tracking-widest mb-3">
                    Confirm your number
                  </p>

                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                    Enter the code
                  </h2>

                  <p className="text-sm text-gray-500 leading-relaxed mt-3">
                    We sent a {OTP_LENGTH}-digit code by SMS. Confirming the
                    number is what ties one account to one person.
                  </p>
                </div>

                <div className="flex items-center justify-between bg-muted/50 border border-accent/30 px-4 py-3 rounded-2xl mb-7">
                  <span className="text-sm font-bold text-gray-800">
                    {maskedPhone()}
                  </span>

                  <button
                    type="button"
                    onClick={() => setStep("auth")}
                    className="text-xs font-black text-primary"
                  >
                    Change
                  </button>
                </div>

                <motion.div
                  animate={otpError ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <OtpInput
                    idPrefix="signup-otp"
                    length={OTP_LENGTH}
                    resetSignal={otpResetSignal}
                    onChange={handleOtpChange}
                    className="flex justify-between gap-2"
                  />
                </motion.div>

                <p className={`mt-3 mb-6 text-center text-[11px] font-semibold ${otpError ? "text-red-600" : "text-gray-400"}`}>
                  Prototype code: {DEMO_OTP}
                </p>

                <div className="text-center mb-7">
                  <button
                    type="button"
                    disabled={timeLeft > 0}
                    onClick={handleResend}
                    className={`text-xs font-bold ${
                      timeLeft > 0
                        ? "text-gray-400"
                        : "text-primary hover:underline"
                    }`}
                  >
                    {timeLeft > 0
                      ? `● Resend in ${timeLeft}s`
                      : "Resend code"}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={otp.length !== OTP_LENGTH || isLoading}
                  className="w-full h-14 bg-primary text-white rounded-2xl font-extrabold text-sm shadow-lg shadow-primary/20 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none transition-all"
                >
                  {isLoading ? "Confirming..." : "Confirm number"}
                </button>

                <p className="mt-6 text-center text-[11px] font-semibold text-gray-400">
                  One number, one account. This is the first of three checks.
                </p>
              </motion.form>
            )}

            {step === "verification" && (
              <motion.div
                key="verification"
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <button
                  type="button"
                  onClick={() => setStep("otp")}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-primary hover:bg-gray-50 transition-colors mb-8"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <div className="mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                    <ShieldCheck className="w-6 h-6" />
                  </div>

                  <p className="text-xs font-black text-amber-600 uppercase tracking-widest mb-3">
                    Identity verification
                  </p>

                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                    Choose how to verify
                  </h2>

                  <p className="text-sm text-gray-500 leading-relaxed mt-3">
                    Every profile on Serasé is checked against a real document. Nobody sees your
                    ID — only that you passed. Select either option to continue.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => handleVerificationChoice("MyDigital ID")}
                    className="w-full rounded-2xl border border-accent/50 bg-white p-5 text-left hover:border-primary/40 hover:bg-primary/5 transition-all"
                  >
                    <span className="block text-sm font-extrabold text-gray-900">
                      Continue with MyDigital ID
                    </span>
                    <span className="block text-xs text-gray-500 mt-1.5 leading-relaxed">
                      Verify securely through your MyDigital ID account.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleVerificationChoice("Passport / IC")}
                    className="w-full rounded-2xl border border-accent/50 bg-white p-5 text-left hover:border-primary/40 hover:bg-primary/5 transition-all"
                  >
                    <span className="block text-sm font-extrabold text-gray-900">
                      Use Passport or IC
                    </span>
                    <span className="block text-xs text-gray-500 mt-1.5 leading-relaxed">
                      Capture your document, then a quick selfie proves you're a real person right now.
                    </span>
                  </button>
                </div>

                <p className="mt-6 text-[11px] leading-relaxed text-gray-500">
                  Your verification information is handled according to our{" "}
                  <Link to="/privacy" className="font-bold text-primary underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}