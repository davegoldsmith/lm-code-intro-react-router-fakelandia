import { MisdemeanoursContext } from "../context/misdemeanoursProvider";
import React, { useContext, useState } from "react";
import { Misdemeanour, MisdemeanourKind } from "../../types/misdemeanours.types";
import MisdemeanorComp from "./misdemeanour";
import MisdemeanourSelector from "./misdemeanourSelector";

const Misdemeanours: React.FC = () => {
  const [misdemeanourKind, setMisdemeanourKind] = useState<MisdemeanourKind | undefined>();
  const misdemeanours: Misdemeanour[] = useContext(MisdemeanoursContext);
  console.log(misdemeanours, "Misdemeanours component");
  console.log(misdemeanours[0]);

  const toShow = misdemeanours.filter((mis) => misdemeanourKind === undefined || mis.misdemeanour === misdemeanourKind);

  return (
    <div >
      <MisdemeanourSelector
        misdemeanourKind={misdemeanourKind}
        setMisdemeanourKind={(setMisdemeanourChoice: MisdemeanourKind | undefined) => setMisdemeanourKind(setMisdemeanourChoice)}
      />
      <div className="misdemeanours">
      {toShow.map((misdemeanour) => (
        <MisdemeanorComp
          citizenId={misdemeanour.citizenId}
          misdemeanour={misdemeanour.misdemeanour}
          date={misdemeanour.date}
        />
      ))}
      </div>
    </div>
  );
};

export default Misdemeanours;
