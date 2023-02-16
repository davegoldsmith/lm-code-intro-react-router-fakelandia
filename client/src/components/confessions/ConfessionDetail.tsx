interface ConfessionDetailsProps {
  confessionDetails: string;
  setConfessionDetails: (details: string) => void;
}

const ConfessionDetails: React.FC<ConfessionDetailsProps> = ({
  confessionDetails,
  setConfessionDetails,
}) => {
  return (
    <div className="confession-detail">
      <textarea
        className="confession-detail__input"
        aria-label="Confession Detail"
        id="confession-detail"
        value={confessionDetails}
        onChange={(e) => {
          setConfessionDetails(e.target.value);
        }}
      ></textarea>
    </div>
  );
};

export default ConfessionDetails;
