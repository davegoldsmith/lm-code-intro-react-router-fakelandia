// import "./App.css";
import "./styles.css";

import { BrowserRouter } from "react-router-dom";
import Router from "./components/router/router";
import { Misdemeanour } from "./types/misdemeanours.types";
import { useEffect, useState } from "react";
import MisdemeanoursProvider from "./components/context/misdemeanoursProvider";

function App() {
  const [misdemeanours, setMisdemeanours] = useState<Array<Misdemeanour>>([]);

  const getMisdemeanours = async () => {
    const apiResponse = await fetch(
      "http://localhost:8080/api/misdemeanours/5"
    );
    const json = (await apiResponse.json()) as {misdemeanours: Misdemeanour[]};
    json.misdemeanours.map((mis, index)  => {
      mis.punishImage =`https://picsum.photos/300/200?t=${new Date().getTime()}${index}`;      
    });

    setMisdemeanours(json.misdemeanours);
  };

  useEffect(() => {
    getMisdemeanours();
  }, []);

  return (
    <MisdemeanoursProvider
      misdemeanours={misdemeanours}
      setMisdemeanours={setMisdemeanours}
    >
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </MisdemeanoursProvider>
  );
}

export default App;
