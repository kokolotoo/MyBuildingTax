import { createContext, useState, useEffect } from "react";
import { getTaxData } from "../Functions/FirebaseFunctions";


const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [login, setLogin] = useState(false)
    const [user, setUser] = useState(null)
    const [dataSettings, setDataSettings] = useState(null)
    
    useEffect(() => {
        const sessionUser = sessionStorage.getItem('loginUser');
        const localUser = localStorage.getItem('loginUser');

        const storedUser = sessionUser || localUser;
        if (storedUser) {
            setLogin(true);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        if (!user) return; // излизаме, ако user още не е наличен

        const getData = async () => {
            try {
                const data = await getTaxData();
                if (data) setDataSettings(data);
            } catch (err) {
                console.error("Грешка при четене на данни:", err);
            }
        }

        getData();
    }, [user]);

    return (
        <DataContext.Provider value={{
            login, setLogin, user, setUser, dataSettings, setDataSettings
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
