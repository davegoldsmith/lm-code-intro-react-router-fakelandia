import { useContext } from "react";
// import { FormErrorsContext } from "./FormErrorsContext";


const SubmitConfession: React.FC = () => {
  // const formErrors = useContext(FormErrorsContext);
  /**
   * Checks errors on each component to see if submit is allowed
   *
   * @returns true if there are no validation errors otherwise false
   */
  // const canSubmit = (): boolean => {
  //   const compErr = formErrors.find(
  //     (componentError) => componentError.hasErrors === true
  //   );
  //   return compErr !== undefined;
  // };

  return (
    <div className="confession-submit">
      <input
        // disabled={canSubmit() === true}
        className="confession-submit__button"
        type="submit"
        value="Submit"
        id="submit-button"
        aria-label="Submit"
      />
    </div>
  );
};

export default SubmitConfession;