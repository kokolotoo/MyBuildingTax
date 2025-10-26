import { createContext, useState, useEffect } from "react";
import { getTaxData } from "../Helpers/FirebaseFunctions";


const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [login, setLogin] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const isLogin = sessionStorage.getItem('loginData')
        if (isLogin) {
            setLogin(true)
            setUser(JSON.parse(isLogin))
        }

    }, [])

    return (
        <DataContext.Provider value={{
            login, setLogin, user, setUser
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
