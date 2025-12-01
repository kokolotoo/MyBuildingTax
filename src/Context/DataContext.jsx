// DataContext.jsx
import { createContext, useState, useEffect } from "react";
import { getTaxData } from "../Functions/FirebaseFunctions";
import Spinner from "../Helpers/Spinner";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [dataSettings, setDataSettings] = useState(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const load = async () => {
            let storedUser = null;
            let settings = null;

            try {
                // 1. Проверка за логнат потребител в storage
                const sessionUser = sessionStorage.getItem("loginUser");
                const localUser = localStorage.getItem("loginUser");
                storedUser = sessionUser || localUser;

                if (storedUser) {
                  
                    const parsed = JSON.parse(storedUser);
                    setUser(parsed);
                    setLogin(true);
                    settings = await getTaxData();
                    if (settings) setDataSettings(settings);

                } else {
                  
                    setDataSettings({});
                }

            } catch (err) {
                console.error("Грешка при инициализация/Firebase Access Denied:", err);
               
                setDataSettings({});
                setUser(null);
                setLogin(false);
            } finally {
                setIsReady(true);
            }
        };

        load();
    }, []);

    // Показваме Spinner докато зареждането не приключи (isReady: true)
    if (!isReady) {
        return <Spinner />;
    }

    return (
        <DataContext.Provider value={{
            login, setLogin, user, setUser, dataSettings, setDataSettings, isReady
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;