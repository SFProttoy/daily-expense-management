import React, { createContext } from "react";
import useTakeValues from "../hooks/useTakeValues";
export const AuthContext = createContext();
const DataProvider = ({ children }) => {
  const allContext = useTakeValues();
  return (
    <AuthContext.Provider value={allContext}>{children}</AuthContext.Provider>
  );
};

export default DataProvider;
