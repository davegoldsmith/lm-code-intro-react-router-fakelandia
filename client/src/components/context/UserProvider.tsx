import React, { ReactElement } from "react";
import { Citizen } from "../../types/general.types";

interface UserProviderProps {
  children: ReactElement;
  user: Citizen;
  setUser: (user: Citizen) => void;
}

export const UserContext = React.createContext({} as Citizen);
export const UpdateUserContext = React.createContext(
  (user: Citizen) => {}
);

const UserProvider: React.FC<UserProviderProps> = ({
  children,
  setUser,
  user,
}) => {
  return (
    <UserContext.Provider value={user}>
      <UpdateUserContext.Provider value={setUser}>
        {children}
      </UpdateUserContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;