import { useState } from "react"
import Navbar from "../../Component/Navbar/NavBar"
import CreateTopic from "../../Component/Discussinons/CreateTopic"
import TopicsList from "../../Component/Discussinons/TopicsList"


const DiscussionsPage = () => {
    const [createTopicVisible, setCreateTopicVisible] = useState(false)

    return (
        <div>
            <Navbar />
            <button
                onClick={() => setCreateTopicVisible(prev => !prev)}>
                {createTopicVisible ? 'Затвори' : 'Нова тема'}
            </button>
            <CreateTopic
                createTopicVisible={createTopicVisible}
                setCreateTopicVisible={setCreateTopicVisible}
            />
            <TopicsList />
        </div>
    );
}

export default DiscussionsPage
