import MainLayout from "../components/layouts/MainLayout";

export const MISDEMEANOURS = [
  "rudeness",
  "vegetables",
  "lift",
  "united",
] as const;
export type MisdemeanourKind = (typeof MISDEMEANOURS)[number];

export const MisdemeanourKindDisplayMap = new Map()
  .set(MISDEMEANOURS[0], "Mild Public Rudeness 🤪")
  .set(MISDEMEANOURS[1], "Not Eating Your Vegetables 🥗")
  .set(MISDEMEANOURS[2], "Speaking in a Lift 🗣")
  .set(MISDEMEANOURS[3], "Supporting Manchester United 😈");

export const JUST_TALK = "just-talk";
export type JustTalk = typeof JUST_TALK;

export type Misdemeanour = {
  citizenId: string;
  misdemeanour: MisdemeanourKind;
  date: string; // we'll stringify this for easy sending via HTTP rather than storing the full Date object
	punishImage?: string;
};
