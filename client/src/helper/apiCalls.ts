import { ConfessionData } from "../types/confession.types";
import { Misdemeanour } from "../types/misdemeanours.types";

export const getMisdemeanours = async (
  setMisdemeanours: (misdemeanours: Array<Misdemeanour>) => void
) => {
  const apiResponse = await fetch("http://localhost:8080/api/misdemeanours/5");
  const json = (await apiResponse.json()) as { misdemeanours: Misdemeanour[] };
  json.misdemeanours.map((mis, index) => {
    mis.punishImage = getPunishmentImage(index);
  });
  setMisdemeanours(json.misdemeanours);
};

export const postConfession = async (confession: ConfessionData) => {
  const response = await fetch("http://localhost:8080/api/confess", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(confession),
  });
  return response;
};

export const getPunishmentImage = (suffix?: string | number) =>
  `https://picsum.photos/300/200?t=${new Date().getTime()}${suffix}`;