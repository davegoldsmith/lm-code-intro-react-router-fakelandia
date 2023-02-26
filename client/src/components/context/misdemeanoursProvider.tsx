import React, { ReactElement, useEffect, useState } from "react";
import { getMisdemeanours } from "../../helper/apiCalls";
import { Misdemeanour } from "../../types/misdemeanours.types";

interface MisdemeanoursProviderProps {
  children: ReactElement;
}

export const MisdemeanoursContext = React.createContext<Misdemeanour[]>([]);
export const UpdateMisdemeanoursContext = React.createContext(
  (misdemeanours: Array<Misdemeanour>) => {}
);


const MisdemeanoursProvider: React.FC<MisdemeanoursProviderProps> = ({
  children
}) => {

  const [misdemeanours, setMisdemeanours] = useState<Array<Misdemeanour>>([]);
  useEffect(() => {
    getMisdemeanours(setMisdemeanours);
  }, []);
  return (
    <MisdemeanoursContext.Provider value={misdemeanours}>
      <UpdateMisdemeanoursContext.Provider value={setMisdemeanours}>
        {children}
      </UpdateMisdemeanoursContext.Provider>
    </MisdemeanoursContext.Provider>
  );
};

export default MisdemeanoursProvider;
