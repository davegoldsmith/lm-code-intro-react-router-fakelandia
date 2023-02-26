import { citizens } from "../data/users";
import { ConfessionData } from "../types/confession.types";
import { FormError } from "../types/general.types";
import {
  JustTalk,
  MisdemeanourKind,
} from "../types/misdemeanours.types";

export const validateConfessionType = (
  confessionType: MisdemeanourKind | undefined | JustTalk | string
): string | undefined => {
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

export const validateConfession = (confession: ConfessionData): Array<string> => {
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

export const validateLoginCredentials = (username: string | undefined, password: string | undefined) : Array<FormError> => {
  const formErrors: Array<FormError> = [];
  const citizen = citizens.find((user) => user.citizenID === username);
  if (citizen === undefined) {
    formErrors.push({ inputName: "citizen-id", message : "🚫Invalid Citizen ID"});
  } else if (citizen.password !== password) {
    formErrors.push({ inputName: "password", message : "🚫Invalid Password"});
  }
  return formErrors;
}