import { Misdemeanour, MisdemeanourKindDisplayMap } from "../../types/misdemeanours.types"
const Misdemeanor : React.FC<Misdemeanour> = (props: Misdemeanour) => {
  
  const displayMisdemonour = MisdemeanourKindDisplayMap.get(props.misdemeanour);

  return (
    <tr className="misdemeanour">
      <td data-th="Citizen ID" className="misdemeanour__cell">{props.citizenId}</td>
      <td data-th="Date" className="misdemeanour__cell">{props.date}</td>
      <td data-th="Misdemeanour" className="misdemeanour__cell">{displayMisdemonour}</td>
      <td data-th="Punishment Idea"><img className="punish-image" src={props.punishImage} /></td>
    </tr>
  )
}

export default Misdemeanor;