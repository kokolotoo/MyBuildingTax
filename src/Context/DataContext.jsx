import { createContext, useState, useEffect } from "react";
import { getTaxData } from "../Functions/FirebaseFunctions";


const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [login, setLogin] = useState(false)
    const [user, setUser] = useState(null)
    const [dataSettings, setDataSettings] = useState(null)

    useEffect(() => {
        const isLogin = sessionStorage.getItem('loginUser')
        if (isLogin) {
            setLogin(true)
            setUser(JSON.parse(isLogin))
            setLogin(true)
        }

        const getData = async () => {
            const data = await getTaxData()
            if (data) {
                setDataSettings(data)
            }
        }
        getData()

    }, [])

    return (
        <DataContext.Provider value={{
            login, setLogin, user, setUser, dataSettings
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
