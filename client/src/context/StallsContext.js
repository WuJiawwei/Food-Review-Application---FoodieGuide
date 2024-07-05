import React, { useState, createContext } from "react";

export const StallsContext = createContext()

export const StallsContextProvider = (props) => {
    const [stalls, setStalls] = useState([])
    const [selectedStall, setSelectedStall] = useState(null)
    const addStalls = (stall) => {
        setStalls([...stalls, stall])
    }
    return (
        <StallsContext.Provider 
          value={{
            stalls, 
            setStalls, 
            addStalls, 
            selectedStall, 
            setSelectedStall
          }}
        >
            {props.children}
        </StallsContext.Provider>
    )
}