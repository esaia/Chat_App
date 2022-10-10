import { createContext, useState } from "react";

export const Searchcontext = createContext();

export const Searchingcontext = ({ children }) => {
  const [search, setSearch] = useState(false);
  const [info, setinfo] = useState(false);

  return (
    <Searchcontext.Provider value={{ search, setSearch, info, setinfo }}>
      {children}
    </Searchcontext.Provider>
  );
};
