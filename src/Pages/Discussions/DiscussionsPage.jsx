import { useState, useContext } from "react"
import Navbar from "@/Component/Navbar/NavBar"
import CreateTopic from "@/Component/Discussinons/CreateTopic"
import TopicsList from "@/Component/Discussinons/TopicsList"
import DataContex from '../../Context/DataContext'

const DiscussionsPage = () => {
    const [createTopicVisible, setCreateTopicVisible] = useState(false)
    const { user } = useContext(DataContex)
    return (
        <div>
            <Navbar />
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
