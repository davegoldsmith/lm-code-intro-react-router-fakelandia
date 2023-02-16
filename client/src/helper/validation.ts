import { Confession } from "../types/confession.types";
import {
  JustTalk,
  MisdemeanourKind,
} from "../types/misdemeanours.types";

export const validateConfessionType = (
  confessionType: MisdemeanourKind | undefined | JustTalk | string
): string | undefined => {
  console.log(confessionType);
  if (typeof confessionType === "undefined" || confessionType === "none") {
    return "🚫Reason for Contact must be Provided";
  } else {
    return undefined;
  }
};

export const validateSubject = (value: string): string | undefined => {
  if (value.length < 1 || value.length > 25) {
    return "🚫Subject Must have length between 1 and 25";
  }
  return undefined;
};

export const validateConfessionDetails = (
  value: string
): string | undefined => {
  if (value.length < 1 || value.length > 25) {
    return "🚫Subject Must have length between 1 and 25";
  }
  return undefined;
};

export const validateConfession = (confession: Confession): Array<string> => {
  const errors: Array<string> = [];
  const subjectError = validateSubject(confession.subject);
  if (subjectError) {
    errors.push(subjectError);
  }
  const misdemeanourKindError = validateConfessionType(
    confession.reason
  );
  if (misdemeanourKindError) {
    errors.push(misdemeanourKindError);
  }
  return errors;
};
