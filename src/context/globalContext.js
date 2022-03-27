import React, { createContext, useReducer } from "react";
import { globalReducer, initialState } from "./globalReducer";

export const GlobalContext = createContext({
  globalDispatch: ({ type, payload }) => undefined,
  globalState: initialState,
});

const GlobalProvider = ({ children, ...other }) => {
  const [globalState, globalDispatch] = useReducer(globalReducer, initialState);
  const value = { globalState, globalDispatch, ...other };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
