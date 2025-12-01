
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from './DataContext';


export const useAuthGuard = (redirectTo = '/') => {
    const { user, isReady, dataSettings } = useContext(DataContext);
    const navigate = useNavigate();


    useEffect(() => {

        if (isReady) {

            if (!user) {

                navigate(redirectTo);
                return;
            }

        }
    }, [isReady, user, navigate, redirectTo]);


    return { user, isReady, dataSettings };
};