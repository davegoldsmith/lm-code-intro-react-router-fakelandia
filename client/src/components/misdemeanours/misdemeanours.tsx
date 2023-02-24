import { MisdemeanoursContext } from "../context/MisdemeanoursProvider";
import React, { useContext, useState } from "react";
import {
  JustTalk,
  Misdemeanour,
  MisdemeanourKind,
} from "../../types/misdemeanours.types";
import Misdemeanor from "./Misdemeanour";
import MisdemeanourSelector from "./MisdemeanourSelector";
import { MisdemeanourChangeHandler } from "../../types/confession.types";

const Misdemeanours: React.FC = () => {
  const [misdemeanourKind, setMisdemeanourKind] = useState<
    MisdemeanourKind | undefined
  >();
  const misdemeanours: Misdemeanour[] = useContext(MisdemeanoursContext);
  const toShow = misdemeanours.filter(
    (mis) =>
      misdemeanourKind === undefined || mis.misdemeanour === misdemeanourKind
  );

  const onChangeHandler: MisdemeanourChangeHandler = (
    value: MisdemeanourKind | undefined | JustTalk
  ) => {
    if (value != "just-talk") {
      setMisdemeanourKind(value);
    }
  };

  return (
    <div>
      <MisdemeanourSelector
        misdemeanourKind={misdemeanourKind}
        onChangeHandler = {onChangeHandler}
        labelForNoSelection={"All"}
      />
      {toShow.length === 0 && <p>No matching misdemeanours found. </p>}
      {toShow.length > 0 &&
      <div className="misdemeanours">
        <table className="misdemeanours-table">
          <thead>
            <tr>
              <th scope="col">Citizen ID</th>
              <th scope="col">Date</th>
              <th scope="col">Misdemeanour</th>
              <th scope="col">Punishment Idea</th>
            </tr>
          </thead>
          <tbody>
            {toShow.map((misdemeanour) => (
              <Misdemeanor
                key={misdemeanour.citizenId}
                citizenId={misdemeanour.citizenId}
                misdemeanour={misdemeanour.misdemeanour}
                date={misdemeanour.date}
                punishImage={misdemeanour.punishImage}
              />
            ))}
          </tbody>
        </table>
      </div>}
    </div>
  );
};

export default Misdemeanours;
