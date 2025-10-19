import { createContext, useState, useEffect } from "react";


const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [login, setLogin] = useState(false)
    const [user, setUser] = useState(null)
    const [isCashier, setIsCashier] = useState(false)

    useEffect(() => {
        const isLogin = sessionStorage.getItem('loginData')
        if (isLogin) {
            setLogin(true)
            setUser(JSON.parse(isLogin))
        }
    }, [])

    return (
        <DataContext.Provider value={{
            login, setLogin, user, setUser,
            isCashier, setIsCashier
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;






/*
                       Използване на провайдъра
    import { useContext } from "react";
    import DataContext from '../../context/DataContext';
    const {cart} = useContext(DataContext)

  
                              



*/