import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));

  return (
    <UserContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </UserContext.Provider>
  );
}
