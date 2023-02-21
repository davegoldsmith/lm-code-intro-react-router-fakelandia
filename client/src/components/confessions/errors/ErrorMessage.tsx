interface ErrorMessageProps {
  errorMessage: string | undefined;
  errorClassName: string;
}
const ErrorMessage : React.FC<ErrorMessageProps> = ({errorMessage, errorClassName}) => {
  return (
    <>
    {errorMessage && <p className={errorClassName}>{errorMessage}</p>}
    </>
  )
}

export default ErrorMessage;