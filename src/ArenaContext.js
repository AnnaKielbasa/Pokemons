import { createContext, useState } from "react";

export const ArenaContext = createContext();

export const ArenaProvider = ({ children }) => {
  const [arena, setArena] = useState([]);

  return (
    <ArenaContext.Provider
      value={{
        arena,
      }}
    >
      {children}
    </ArenaContext.Provider>
  );
};

export default ArenaContext;
