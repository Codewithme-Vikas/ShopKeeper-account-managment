import { createContext , useState } from "react";


export const UserContext = createContext({});

export function UserContextProvider({ children }) {

    const intialToken = localStorage.getItem("token") ? JSON.parse( localStorage.getItem("token") ) : null;

    // const [ userInfo , setUserInfo ] = useState( { name : 'Vikas' , id : '3kdsjfkjs3i' } );
    const [userInfo, setUserInfo] = useState(null);
    const [ token , setToken ] = useState( intialToken )
    const value = {
        userInfo,
        setUserInfo,
        token,
        setToken,
    }
    
    console.log( token , 'inside usercontext');
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}