import {
  MisdemeanourKind,
  MISDEMEANOURS,
} from "../../types/misdemeanours.types";

interface MisdemeanourSelectorProps {
  setMisdemeanourKind : (
    setDeameanourChoice: MisdemeanourKind | undefined
  ) => void;
  misdemeanourKind: MisdemeanourKind | undefined;
}

const MisdemeanourSelector: React.FC<MisdemeanourSelectorProps> = ({
  setMisdemeanourKind,
  misdemeanourKind,
}) => {
  return (
    <div className="misdemeanour__selector">
      <label className="misdemeanour__selector-label" htmlFor="demeanour-type">
        Filter by Demeanour:
      </label>
      <select
        className="misdemeanour__selector-select"
        aria-label="Filter by Demeanour"
        id="demeanour-type"
        value={misdemeanourKind ? misdemeanourKind : "none"}
        onChange={(e) => {
          if (e.target.value !== "none") {
            setMisdemeanourKind(e.target.value as MisdemeanourKind);
          } else {
            setMisdemeanourKind(undefined);
          }
        }}
      >
        <option value="none">All</option>
        <option value={MISDEMEANOURS[0]}>{MISDEMEANOURS[0]}</option>
        <option value={MISDEMEANOURS[1]}>{MISDEMEANOURS[1]}</option>
        <option value={MISDEMEANOURS[2]}>{MISDEMEANOURS[2]}</option>
        <option value={MISDEMEANOURS[3]}>{MISDEMEANOURS[3]}</option>
      </select>
    </div>
  );
};

export default MisdemeanourSelector;
