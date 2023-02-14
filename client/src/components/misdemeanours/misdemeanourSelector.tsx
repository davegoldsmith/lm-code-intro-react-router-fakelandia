import {
  MisdemeanourKind,
  MisdemeanourKindDisplayMap,
  MISDEMEANOURS,
} from "../../types/misdemeanours.types";

interface MisdemeanourSelectorProps {
  setMisdemeanourKind: (
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
        {MISDEMEANOURS.map((mis, index) => (
          <option key={index} value={mis}>
            {MisdemeanourKindDisplayMap.get(mis)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MisdemeanourSelector;
