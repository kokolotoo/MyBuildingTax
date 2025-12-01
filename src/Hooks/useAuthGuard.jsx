// useAuthGuard.js

import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../Context/DataContext'; // Уверете се, че пътят към контекста е коректен


export const useAuthGuard = () => {
    // Извличаме всичко необходимо
    const { user, isReady, dataSettings } = useContext(DataContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Логиката за пренасочване се изпълнява само след като DataContext е приключил с проверките
        if (isReady) {
            // Ако user е null (след като е проверен storage)
            if (!user) {
                console.warn("Потребителските данни липсват. Пренасочване към вход.");
                navigate('/');
            }
        }
    }, [isReady, user, navigate]); // Зависимостите са задължителни!

    // Връщаме данните, за да може компонентите да ги използват
    return { user, isReady, dataSettings };
};