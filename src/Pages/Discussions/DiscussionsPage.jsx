import { useState, useContext } from "react"
import CreateTopic from "@/Component/Discussinons/CreateTopic"
import TopicsList from "@/Component/Discussinons/TopicsList"
import DataContex from '@/Context/DataContext'
import { useNavigate } from 'react-router-dom';

const DiscussionsPage = () => {
    const [createTopicVisible, setCreateTopicVisible] = useState(false)
    const { user } = useContext(DataContex)
    const navigate = useNavigate()

    if (!user) navigate('/')
    return (
        <div style={{ marginTop: '4.5em' }}>

            <button
                onClick={() => setCreateTopicVisible(prev => !prev)}
            >
                {createTopicVisible ? 'Затвори' : 'Нова тема'}
            </button>
            <CreateTopic
                createTopicVisible={createTopicVisible}
                setCreateTopicVisible={setCreateTopicVisible}
                user={user}
            />
            <TopicsList user={user} />
        </div>
    );
}

export default DiscussionsPage
