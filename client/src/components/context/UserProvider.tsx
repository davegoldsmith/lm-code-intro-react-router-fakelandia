import React, { ReactElement, useState } from "react";
import { Citizen } from "../../types/general.types";

interface UserProviderProps {
  children: ReactElement;
}

export const UserContext = React.createContext({} as Citizen);
export const UpdateUserContext = React.createContext((user: Citizen) => {});

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<Citizen>({
    citizenID: "",
    citizenName: "",
    password: "",
  });
  return (
    <UserContext.Provider value={currentUser}>
      <UpdateUserContext.Provider value={setCurrentUser}>
        {children}
      </UpdateUserContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;
