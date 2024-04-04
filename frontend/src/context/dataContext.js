import { createContext , useContext } from "react";

export const DataContext = createContext({
      questionState:[],
    updateQuestion:()=>{}
});

// this is the provider of the context that i am gonna use through out my page app
export const DataContextProvider = DataContext.Provider


export const useData = () => {
  return useContext(DataContext);
}