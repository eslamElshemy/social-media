import { useEffect, useReducer } from "react"
import { createContext } from "react"

const INIT_VALUE = {
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: false
}

export const AuthContext = createContext(INIT_VALUE)

const reducer = (state, action) => {
    switch (action.type) {
        case "START_LOGIN":
            return {
                loading: true,
                currentUser: null,
                error: false,
            }
        case "LOGIN_SUCCESS":
            return {
                loading: false,
                currentUser: action.payload,
                error: false,
            }
        case "LOGIN_FAILURE":
            return {
                loading: false,
                currentUser: null,
                error: action.payload,
            }
        default:
            return state;
    }
}


const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, INIT_VALUE)
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.currentUser))
    }, [state.currentUser])
    return (
        <AuthContext.Provider value={{ currentUser: state.currentUser, loading: state.loading, error: state.error, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider

