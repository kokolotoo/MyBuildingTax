// DataContext.jsx
import { createContext, useState, useEffect } from "react";
import { getTaxData } from "../Functions/FirebaseFunctions";
import Spinner from "../Helpers/Spinner"; // или друг fallback

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [dataSettings, setDataSettings] = useState(null);
    const [isReady, setIsReady] = useState(false); // <--- флаг за готовност

    useEffect(() => {
        const load = async () => {
            try {
                // 1) прочит от storage (session или local)
                const sessionUser = sessionStorage.getItem("loginUser");
                const localUser = localStorage.getItem("loginUser");
                const storedUser = sessionUser || localUser;

                if (storedUser) {
                    const parsed = JSON.parse(storedUser);
                    setUser(parsed);
                    setLogin(true);
                    // 2) след като имаме user (или дори без user), зареждаме settings
                    const settings = await getTaxData();
                    if (settings) setDataSettings(settings);
                } else {
                    // няма логнат потребител — може пак да заредиш настройки за публични данни
                    // const settings = await getTaxData(); setDataSettings(settings);
                }
            } catch (err) {
                console.error("Грешка при инициализация на DataProvider:", err);
            } finally {
                setIsReady(true); // винаги поставяме ready, за да не блокираме forever
            }
        };

        load();
    }, []);

    // Ако все още не сме готови — покажи Spinner (или друг fallback)
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
