import type { Currency } from "./course";

export type AccountProfile = { name: string; email: string; bio: string };
export type AccountPreferences = { country: "EG" | "SA"; currency: Currency };
export type AccountSection = "profile" | "preferences" | "password" | "instructor";
