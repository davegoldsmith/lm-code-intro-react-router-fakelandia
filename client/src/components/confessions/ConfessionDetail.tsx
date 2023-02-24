import { ConfessionChangeHandler } from "../../types/confession.types";

export interface ConfessionDetailsProps {
  confessionDetails: string;
  onChangeHandler: ConfessionChangeHandler;
}

const ConfessionDetails: React.FC<ConfessionDetailsProps> = ({
  confessionDetails,
  onChangeHandler,
}) => {
  return (
    <div className="confession-detail">
      <textarea
        className="confession-detail__input"
        aria-label="Confession Detail"
        id="confession-detail"
        value={confessionDetails}
        onChange={(e) => {
          onChangeHandler(e.target.value, "details");
        }}
      ></textarea>
    </div>
  );
};

export default ConfessionDetails;
