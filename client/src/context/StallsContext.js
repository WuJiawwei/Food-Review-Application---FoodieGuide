import React, { useState, createContext } from "react";

export const StallsContext = createContext()

export const StallsContextProvider = (props) => {
    const [stalls, setStalls] = useState([])
    return (
        <StallsContext.Provider value={{stalls, setStalls}}>
            {props.children}
        </StallsContext.Provider>
    )
}