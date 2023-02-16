import { Confession } from "../types/confession.types";
import { Misdemeanour } from "../types/misdemeanours.types";

export const getMisdemeanours = async (
  setMisdemeanours: (misdemeanours: Array<Misdemeanour>) => void
) => {
  const apiResponse = await fetch("http://localhost:8080/api/misdemeanours/5");
  const json = (await apiResponse.json()) as { misdemeanours: Misdemeanour[] };
  json.misdemeanours.map((mis, index) => {
    mis.punishImage = `https://picsum.photos/300/200?t=${new Date().getTime()}${index}`;
  });

  setMisdemeanours(json.misdemeanours);
};

export const postConfession = async (
  confession: Confession,
  handleResponse: (response: Response) => void
) => {
  console.log(JSON.stringify(confession));
  const response = await fetch("http://localhost:8080/api/confess", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(confession),
  });
  handleResponse(response);
};
