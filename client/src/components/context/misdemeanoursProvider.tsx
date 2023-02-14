import React, { ReactElement } from "react";
import { Misdemeanour } from "../../types/misdemeanours.types";

interface MisdemeanoursProviderProps {
  children: ReactElement;
  misdemeanours: Array<Misdemeanour>;
  setMisdemeanours: (favourites: Array<Misdemeanour>) => void;
}

export const MisdemeanoursContext = React.createContext<Misdemeanour[]>([]);
export const UpdateMisdemeanoursContext = React.createContext(
  (misdemeanours: Array<Misdemeanour>) => {}
);

const MisdemeanoursProvider: React.FC<MisdemeanoursProviderProps> = ({
  children,
  setMisdemeanours,
  misdemeanours,
}) => {
  return (
    <MisdemeanoursContext.Provider value={misdemeanours}>
      <UpdateMisdemeanoursContext.Provider value={setMisdemeanours}>
        {children}
      </UpdateMisdemeanoursContext.Provider>
    </MisdemeanoursContext.Provider>
  );
};

export default MisdemeanoursProvider;
