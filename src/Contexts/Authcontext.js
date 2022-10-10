import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase";
import { onAuthStateChanged } from "firebase/auth";

export const Authentcontext = createContext();

export const Authcontext = ({ children }) => {
  const [currentUser, setcurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setcurrentUser(user);
      }
    });
  }, []);

  return (
    <Authentcontext.Provider value={currentUser}>
      {children}
    </Authentcontext.Provider>
  );
};
