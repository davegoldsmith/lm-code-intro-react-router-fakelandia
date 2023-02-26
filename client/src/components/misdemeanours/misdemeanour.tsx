import { useContext } from "react";
import { Misdemeanour, MisdemeanourKindDisplayMap } from "../../types/misdemeanours.types"
import { UserContext } from "../context/UserProvider";
const Misdemeanor : React.FC<Misdemeanour> = (props: Misdemeanour) => {
  
  const displayMisdemonour = MisdemeanourKindDisplayMap.get(props.misdemeanour);
  const loggedInUser = useContext(UserContext);
  const className = loggedInUser.citizenID === props.citizenId ? "misdemeanour-self" : "misdemeanour";

  return (
    <tr className={className}>
      <td data-th="Citizen ID" className="misdemeanour__cell">{props.citizenId}</td>
      <td data-th="Date" className="misdemeanour__cell">{props.date}</td>
      <td data-th="Misdemeanour" className="misdemeanour__cell">{displayMisdemonour}</td>
      <td data-th="Punishment Idea"><img alt="Punishment idea image" className="punish-image" src={props.punishImage} /></td>
    </tr>
  )
}

export default Misdemeanor;