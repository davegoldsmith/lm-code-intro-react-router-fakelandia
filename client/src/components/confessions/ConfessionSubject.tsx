import { useState } from "react";
import { ConfessionChangeHandler } from "../../types/confession.types";
import ErrorMessage from "./errors/ErrorMessage";

export interface SubjectInputProps {
  subject: string;
  onChangeHandler: ConfessionChangeHandler;
  validate: (subject: string) => string | undefined;
  doSubmitValidation: boolean;
}

const SubjectInput: React.FC<SubjectInputProps> = ({
  subject,
  onChangeHandler,
  validate,
  doSubmitValidation,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  let submitError = undefined;
  if (doSubmitValidation === true) {
    submitError = validate(subject);
  }
  let inputClass = "confession-subject__input";
  if (errorMessage || submitError) {
    inputClass += " error-border";
  }

  return (
    <div>
      <div className="confession-subject">
        <label className="confession-subject__label" htmlFor="subject">
          Subject:
        </label>
        <input
          className={inputClass}
          aria-label="Subject"
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => {
            const error = validate(e.target.value);
            setErrorMessage(error);
            onChangeHandler(e.target.value, "subject");
          }}
        />
      </div>
      <ErrorMessage
        errorMessage={errorMessage || submitError}
        errorClassName="error-confess"
      />
    </div>
  );
};

export default SubjectInput;
