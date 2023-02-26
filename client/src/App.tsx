// import "./App.css";
import "./styles.css";

import { BrowserRouter } from "react-router-dom";
import Router from "./components/router/Router";
import {  useState } from "react";
import MisdemeanoursProvider from "./components/context/MisdemeanoursProvider";
import LoginForm from "./components/login/LoginForm";
import UserProvider from "./components/context/UserProvider";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserProvider>
      <MisdemeanoursProvider>
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
