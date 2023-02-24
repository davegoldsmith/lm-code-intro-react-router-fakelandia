import { JustTalk, MisdemeanourKind } from "./misdemeanours.types";

export interface ConfessionData {
  subject: string;
  reason: MisdemeanourKind | undefined | JustTalk;
  details: string;
}

export type ConfessionChangeHandler = <TKey extends keyof ConfessionData>(
	value: ConfessionData[TKey],
	name: TKey
) => void;

export type MisdemeanourChangeHandler = (
	value: MisdemeanourKind | undefined | JustTalk,
) => void;