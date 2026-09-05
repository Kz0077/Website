export interface CountryCode {
  code: string;
  label: string;
}

// Shared list so every phone-number input in the app (Login, Pricing, etc.)
// offers the same options and stays in sync if we add more countries later.
export const COUNTRY_CODES: CountryCode[] = [
  { code: "+60", label: "Malaysia" },
  { code: "+1", label: "US / Canada" },
  { code: "+44", label: "UK" },
];

export const DEFAULT_COUNTRY_CODE = COUNTRY_CODES[0].code;