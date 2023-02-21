import { useState } from "react";
import { FormError } from "../../types/general.types";
import ErrorMessage from "../confessions/errors/ErrorMessage";

interface LoginInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  inputType: string;
  inputLabel: string;
  id: string;
  className: string;
  errorMessages: Array<FormError>;
}

const LoginInput: React.FC<LoginInputProps> = ({
  inputValue,
  setInputValue,
  inputType,
  inputLabel,
  id,
  className,
  errorMessages,
}) => {
  const errorMessage = errorMessages.find(
    (message) => message.inputName === id
  );
  let inputClass = className + "__input";
  if (errorMessage) {
    inputClass += " error-border";
  }
  console.log(inputClass);
  return (
    <div>
      <div className={className}>
        <label className={className + "__label"} htmlFor={id}>
          {inputLabel}:
        </label>
        <input
          className={inputClass}
          type={inputType}
          id={id}
          aria-label={inputLabel}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </div>
      <ErrorMessage
        errorMessage={errorMessage ? errorMessage.message : undefined}
        errorClassName="error-login"
      />
    </div>
  );
};

export default LoginInput;
