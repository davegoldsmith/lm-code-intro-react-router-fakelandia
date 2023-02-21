import { useContext } from "react";
import { Citizen } from "../../types/general.types";
import { UserContext } from "../context/UserProvider";
import Nav from "./Nav";

const Header = () => {
  const user = useContext(UserContext) as Citizen;
  return (
    <header className="header">
      <h3 className="header-title">Fakelandia Justice Department</h3>
      <Nav />
      <div className="user-heading">
        <img
          className="user-heading__icon"
          src="./src/assets/images/user.png"
        />
        <p className="user-heading__id">{user.citizenName}</p>
      </div>
    </header>
  );
};
export default Header;
