interface ErrorMessageProps {
  errorMessage: string | undefined;
}
const ErrorMessage : React.FC<ErrorMessageProps> = ({errorMessage}) => {
  return (
    <>
    {errorMessage && <p className="error-message">{errorMessage}</p>}
    </>
  )
}

export default ErrorMessage;