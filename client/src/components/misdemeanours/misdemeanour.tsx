import { useEffect, useState } from "react";
import { Misdemeanour, MisdemeanourKindDisplayMap } from "../../types/misdemeanours.types"
const MisdemeanorComp : React.FC<Misdemeanour> = (props: Misdemeanour) => {
  
  const displayMisdemonour = MisdemeanourKindDisplayMap.get(props.misdemeanour);

  return (
    <tr className="misdemeanour">
      <td className="misdemeanour__cell">{props.citizenId}</td>
      <td className="misdemeanour__cell">{props.date}</td>
      <td className="misdemeanour__cell">{displayMisdemonour}</td>
      <td><img src={props.punishImage} /></td>
    </tr>
  )
}

export default MisdemeanorComp;