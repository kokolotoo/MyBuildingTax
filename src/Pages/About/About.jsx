import { useState, useEffect } from 'react'
import styles from './about.module.css'
import { useAuthGuard } from "@/Hooks/useAuthGuard";
import { getTaxData } from '@/Functions/FirebaseFunctions';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Helpers/Spinner';
import DeleteAccount from '@/Component/About/DeleteAccount';
import DeleteData from '@/Component/About/DeleteData';
import EditAboutButtons from '../../Component/About/EditAboutButtons';


const About = () => {

    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { dataSettings, user, setUser, setLogin } = useAuthGuard();
    const [text, setText] = useState(null);


    useEffect(() => {
        const loadAboutData = async () => {
            try {
                const result = await getTaxData();
                if (result && result.about) {
                    setText(result.about);
                    return;
                }
            } catch (error) {
                console.error("Грешка при зареждане на TaxData:", error);
            }

            if (dataSettings && dataSettings.about) {
                setText(dataSettings.about);
            }
        };

        loadAboutData();
    }, [dataSettings]);



    return (
        <div className={styles.about_container}>

            <h2 className={styles.titles}>Относно това място!</h2>

            {!isEditing ? (
                <section className={styles.section}>
                    {text === null ? (
                        <Spinner />
                    ) : (
                        <p className={styles.content}>
                            {text || 'Няма въведена информация.'}
                        </p>
                    )}
                </section>
            ) :
                (<textarea
                    name="about"
                    value={text || ''}
                    onChange={e => setText(e.target.value)}
                    className={styles.areaTitle}
                    rows={10}
                ></textarea>)
            }


            <EditAboutButtons
                user={user}
                isEditing={isEditing}
                isLoading={isLoading}
                dataSettings={dataSettings}
                setIsEditing={setIsEditing}
                setText={setText}
                text={text}
            />

            <DeleteData
                user={user}
                isEditing={isEditing}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            />

            <DeleteAccount
                user={user}
                isEditing={isEditing}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                setUser={setUser}
                setLogin={setLogin}
                navigate={navigate}
            />

        </div>
    )
}

export default About