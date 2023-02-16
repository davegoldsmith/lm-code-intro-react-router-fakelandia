import { JustTalk, MisdemeanourKind } from "./misdemeanours.types";

export interface Confession {
  subject: string;
  reason: MisdemeanourKind | undefined | JustTalk;
  details: string;
}