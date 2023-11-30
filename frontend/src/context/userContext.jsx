import { createContext , useState } from "react";


export const UserContext = createContext({});

export function UserContextProvider({ children }) {

    const intialToken = localStorage.getItem("token") ? JSON.parse( localStorage.getItem("token") ) : null;
    const user = localStorage.getItem("user") ? JSON.parse( localStorage.getItem("user"))  : null;

    
    const [userInfo, setUserInfo] = useState( user );
    const [ token , setToken ] = useState( intialToken );

    const value = {
        userInfo,
        setUserInfo,
        token,
        setToken,
    }

    
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}