export const ERROR = "error";
export const TALK = "just-talk";
export const CONFESS = "confession";

export interface Citizen {
  citizenID: string;
  citizenName: string;
  password: string;
}

export interface FormError {
  inputName: string;
  message: string;
}

export const CONFESSION_MESSAGES = [ERROR, TALK, CONFESS] as const;
export type ConfessionMessageType = (typeof CONFESSION_MESSAGES)[number];

export interface ConfessionDisplayMessage {
  message: string;
  messageType: ConfessionMessageType;
  messageClass: string;
}
