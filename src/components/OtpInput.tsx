import { useEffect, useState } from "react";

interface OtpInputProps {
  length?: number;
  /** Unique prefix so multiple OtpInput instances on one page don't collide on element ids */
  idPrefix: string;
  onChange: (otp: string) => void;
  /** Bump this value (e.g. Date.now()) to force the fields to clear, such as after a resend */
  resetSignal?: number | string;
  className?: string;
}

export default function OtpInput({
  length = 6,
  idPrefix,
  onChange,
  resetSignal,
  className,
}: OtpInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));

  // Clear the fields whenever the parent asks us to (e.g. moving to this step again, or resend)
  useEffect(() => {
    setValues(Array(length).fill(""));
  }, [resetSignal, length]);

  const focusField = (index: number) => {
    document.getElementById(`${idPrefix}-${index}`)?.focus();
  };

  const handleChange = (index: number, rawValue: string) => {
    const digit = rawValue.replace(/[^0-9]/g, "").slice(-1);
    const next = [...values];
    next[index] = digit;
    setValues(next);
    onChange(next.join(""));

    if (digit !== "" && index < length - 1) {
      focusField(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && values[index] === "" && index > 0) {
      focusField(index - 1);
    }
  };

  return (
    <div className={className ?? "flex justify-center gap-2"} role="group" aria-label="Verification code">
      {values.map((digit, index) => (
        <input
          key={index}
          id={`${idPrefix}-${index}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          autoFocus={index === 0}
          aria-label={`Digit ${index + 1} of ${length}`}
          className="w-11 h-14 bg-white border-2 border-border rounded-xl text-center text-xl font-bold text-primary focus:outline-none focus:border-primary transition-colors"
        />
      ))}
    </div>
  );
}