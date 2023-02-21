import { FormEvent, useContext, useState } from "react";
import { citizens } from "../../data/users";
import { validateCitizenID, validateLoginCredentials, validatePassword } from "../../helper/validation";
import { Citizen,  FormError } from "../../types/general.types";
import { UpdateUserContext } from "../context/UserProvider";
import LoginInput from "./LoginInput";

interface loginProps {
  setIsLoggedIn: (loggedIn: boolean) => void;
}

const LoginForm: React.FC<loginProps> = ({ setIsLoggedIn }) => {
  const [errorMessages, setErrorMessages] = useState<Array<FormError>>([]);
  const [citizenID, setCitizenID] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useContext(UpdateUserContext);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formErrors = validateLoginCredentials(citizenID, password);
    setErrorMessages(formErrors);
    setIsLoggedIn(formErrors.length === 0);
    const citizen = citizens.find((user) => user.citizenID === citizenID);
    if (citizen) {
      setUser(citizen);
    }    
  };

  return (
    <div className="form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <svg className="login-svg" viewBox="0 0 500 200">
          <path
            className="login-svg__path"
            id="curve"
            d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97"
          />
          <text className="login-svg__text" width="800">
            <textPath xlinkHref="#curve">
              Fakelandia Justice Department
            </textPath>
          </text>
        </svg>
        <div className="badge-container">
          <img className="login-badge" src="./src/assets/images/badge.png" />
        </div>
        <LoginInput
          inputValue={citizenID}
          setInputValue={setCitizenID}
          inputType="text"
          inputLabel="Citizen ID"
          id="citizen-id"
          className="input-container"
          errorMessages={errorMessages}
        />
        <LoginInput
          inputValue={password}
          setInputValue={setPassword}
          inputType="password"
          inputLabel="Password"
          id="password"
          className="input-container"
          errorMessages={errorMessages}
        />        
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
