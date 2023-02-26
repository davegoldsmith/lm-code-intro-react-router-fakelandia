import { useState } from "react";
import { ConfessionChangeHandler, MisdemeanourChangeHandler } from "../../types/confession.types";
import {
  JustTalk,
  JUST_TALK,
  MisdemeanourKind,
  MisdemeanourKindDisplayMap,
  MISDEMEANOURS,
} from "../../types/misdemeanours.types";
import ErrorMessage from "../confessions/errors/ErrorMessage";

export interface MisdemeanourSelectorProps {
  misdemeanourKind: MisdemeanourKind | undefined | JustTalk;
  labelForNoSelection: string;
  onChangeHandler: ConfessionChangeHandler | MisdemeanourChangeHandler;
  includeJustTalk?: boolean;
  validate?: (
    subject: MisdemeanourKind | undefined | JustTalk | string
  ) => string | undefined;
  doSubmitValidation?: boolean;
}

const MisdemeanourSelector: React.FC<MisdemeanourSelectorProps> = ({
  misdemeanourKind,
  onChangeHandler,
  includeJustTalk,
  labelForNoSelection,
  validate,
  doSubmitValidation,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  let className = "misdemeanour-selector";
  let label = "Filter by Misdemeanour";
  let inputClass = "misdemeanour-selector__select";
  let submitError = undefined;
  if (includeJustTalk) {
    if (doSubmitValidation === true && validate) {
      submitError = validate(misdemeanourKind);
    }
    className = "confession-selector";
    inputClass = className + "__select";
    label = "Reason for Contact";
    if (errorMessage || submitError) {
      inputClass += " error-border";
    }
  }
  return (
    <div>
      <div className={className}>
        <label className={className + "__label"} htmlFor="demeanour-type">
          {label}:
        </label>
        <select
          className={inputClass}
          aria-label={label}
          id="demeanour-type"
          value={misdemeanourKind ? misdemeanourKind : "none"}
          onChange={(e) => {
            let value: MisdemeanourKind | undefined | JustTalk | string = e.target.value;
            if (value === "none") {
              value = undefined;
            }
            if (validate) {
              const error = validate(value);
              setErrorMessage(error);
            }
    
            onChangeHandler(value as MisdemeanourKind | undefined | JustTalk, "reason");
          }}
        >
          <option value="none">{labelForNoSelection}</option>
          {MISDEMEANOURS.map((mis, index) => (
            <option key={index} value={mis}>
              {MisdemeanourKindDisplayMap.get(mis)}
            </option>
          ))}
          {includeJustTalk && (
            <option value={JUST_TALK}>I just want to talk</option>
          )}
        </select>
      </div>
      <ErrorMessage
        errorMessage={errorMessage || submitError}
        errorClassName="error-confess"
      />
    </div>
  );
};

export default MisdemeanourSelector;
