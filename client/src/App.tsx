// import "./App.css";
import "./styles.css";

import { BrowserRouter } from "react-router-dom";
import Router from "./components/router/Router";
import { Misdemeanour } from "./types/misdemeanours.types";
import { useEffect, useState } from "react";
import MisdemeanoursProvider from "./components/context/MisdemeanoursProvider";
import { getMisdemeanours } from "./helper/apiCalls";
import LoginForm from "./components/login/LoginForm";
import UserProvider from "./components/context/UserProvider";
import { Citizen } from "./types/general.types";

function App() {
  const [misdemeanours, setMisdemeanours] = useState<Array<Misdemeanour>>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<Citizen>({citizenID: "", citizenName:"", password:""});

  useEffect(() => {
    getMisdemeanours(setMisdemeanours);
  }, []);

  return (
    <UserProvider
      setUser={setCurrentUser}
      user={currentUser}      
    >
    <MisdemeanoursProvider
      misdemeanours={misdemeanours}
      setMisdemeanours={setMisdemeanours}
    >
      {isLoggedIn === false ? (
        <LoginForm setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      )}
    </MisdemeanoursProvider>
    </UserProvider>
  );
}

export default App;
