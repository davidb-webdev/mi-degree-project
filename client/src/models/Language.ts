export const Languages = {
  en: "en",
  sv: "sv"
} as const;

export type Language = (typeof Languages)[keyof typeof Languages];
