import { useEffect, useReducer } from "react"
import { createContext } from "react"

const INIT_VALUE = {
    dark: localStorage.getItem("darkMode") === "true" || false
}

export const DarkContext = createContext(INIT_VALUE)

const reducer = (state, action) => {
    switch (action.type) {
        case "TOGGLE":
            return {
                dark: !state.dark
            }
        default:
            return state;
    }
}


const DarkModeProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, INIT_VALUE)
    useEffect(() => {
        localStorage.setItem("darkMode", state.dark)
    },[state.dark])
    return (
        <DarkContext.Provider value={{ dark: state.dark, dispatch }}>
            {children}
        </DarkContext.Provider>
    )
}

export default DarkModeProvider

