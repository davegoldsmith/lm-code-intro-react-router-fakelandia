import { Misdemeanour } from "../../types/misdemeanours.types"
const MisdemeanorComp : React.FC<Misdemeanour> = (props: Misdemeanour) => {
  return (
    <div className="misdemeanour">
      <p className="misdemeanour__cell">{props.citizenId}</p>
      <p>{props.date}</p>
      <p>{props.misdemeanour}</p>
    </div>
  )
}

export default MisdemeanorComp;