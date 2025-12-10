import { useState, useContext } from "react"
import styles from '../../Styles/discusions.module.css'
import { useAuthGuard } from '@/Hooks/useAuthGuard'; // ⬅️ НОВ ИМПОРТ

import CreateTopic from "@/Component/Discussinons/CreateTopic"
import TopicsList from "@/Component/Discussinons/TopicsList"
import Spinner from "@/Helpers/Spinner"; // ⬅️ Добавяме Spinner

const DiscussionsPage = () => {

    const { user, isReady, dataSettings } = useAuthGuard();
    const [createTopicVisible, setCreateTopicVisible] = useState(false);


    if (!isReady || !user) {
        return <Spinner />;
    }


    return (
        <div style={{ marginTop: '4.5em' }}>

            <button
                onClick={() => setCreateTopicVisible(prev => !prev)}
                className={createTopicVisible ? styles.invisibleButton : styles.openNewByn}
            >
                Нова тема
            </button>


            <CreateTopic
                createTopicVisible={createTopicVisible}
                setCreateTopicVisible={setCreateTopicVisible}
                user={user}
                dataSettings={dataSettings}
            />

            <TopicsList user={user} />
        </div>
    );
}

export default DiscussionsPage
