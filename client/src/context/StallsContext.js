import React, { useState, createContext } from "react";

export const StallsContext = createContext()

export const StallsContextProvider = (props) => {
    const [stalls, setStalls] = useState([])
    const addStalls = (stall) => {
        setStalls([...stalls, stall])
    }
    return (
        <StallsContext.Provider 
          value={{stalls, setStalls, addStalls}}>
            {props.children}
        </StallsContext.Provider>
    )
}